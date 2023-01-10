import{_ as l,V as o,W as s,X as n,a0 as i,Z as r,Y as e,y as d}from"./framework.591e63b2.js";const t={},p=e(`<h2 id="一、undo-log" tabindex="-1"><a class="header-anchor" href="#一、undo-log" aria-hidden="true">#</a> 一、undo log</h2><p>在事务执行过程中，会记录下操作回滚时需要的信息到一个日志里，在事务执行发生错误时，会通过这个日志回滚到事务开始之前的状态。这个日志就是 <mark>undo log（回滚日志）</mark>，它保证了事务的的原子性（Atomicity）。</p><p>每当 InnoDB 引擎对一条记录进行操作（增删改）时，要把回滚时需要的信息都记录到 undo log 里，比如：</p><ul><li>在插入一条记录时，要把这条记录的主键值记下来。回滚时，根据这个主键值删掉对应的记录；</li><li>在删除一条记录时，要把这条记录中的内容都记下来。回滚时，把这些内容全插入插入到表；</li><li>在更新一条记录时，要把被更新的列的旧值记下来。回滚时，把这些列更新为旧值就好了。</li></ul><h3 id="_1-1-版本链" tabindex="-1"><a class="header-anchor" href="#_1-1-版本链" aria-hidden="true">#</a> 1.1 版本链</h3><p>一条记录的每一次修改操作产生的 undo log 格式都有一个 roll_pointer 指针和一个 trx_id 事务id：</p><ul><li>trx_id: 产生此次操作的事务id;</li><li>roll_pointer: 连接不同事务提交的操作的指针；</li></ul><blockquote><p>版本链的作用</p><ul><li>undo log + read view 实现了mvcc</li><li>实现事务回滚，保障事务的原子性</li></ul></blockquote><h3 id="_1-2-刷盘" tabindex="-1"><a class="header-anchor" href="#_1-2-刷盘" aria-hidden="true">#</a> 1.2 刷盘</h3><p>undo log 和数据页的刷盘策略是一样的，都需要先保存到Buffer Poll中，都需要通过 redo log 保证持久化，然后再刷盘。</p><blockquote><p>buffer pool 中有 undo 页，对 undo 页的修改也都会记录到 redo log。redo log 会每秒刷盘，提交事务时也会刷盘，数据页和 undo 页都是靠这个机制保证持久化的。</p></blockquote><h2 id="二、buffer-pool" tabindex="-1"><a class="header-anchor" href="#二、buffer-pool" aria-hidden="true">#</a> 二、Buffer Pool</h2><p>缓冲池（Buffer Pool）是Innodb 存储引擎设计用来提高数据库的读写性能的：</p><ul><li>读取数据时，如果数据存在于 Buffer Pool 中，客户端就会直接读取其中的数据，否则再去磁盘中读取。</li><li>当修改数据时，如果数据存在于 Buffer Pool 中，那直接修改其中数据所在的页，然后将其页设置为脏页（该页的内存数据和磁盘上的数据已经不一致），为了减少磁盘I/O，不会立即将脏页写入磁盘，后续由后台线程选择一个合适的时机将脏页写入到磁盘。</li></ul><p>InnoDB 会把存储的数据划分为若干个「页」，以页作为磁盘和内存交互的基本单位，一个页的默认大小为 16KB。因此，Buffer Pool 同样需要按「页」来划分。</p><p>MySQL启动的时候，InnoDB 会为 Buffer Pool 申请一片连续的内存空间，然后按照默认的16KB的大小划分出一个个的页， Buffer Pool 中的页就叫做缓存页。此时这些缓存页都是空闲的，之后随着程序的运行，才会有磁盘上的页被缓存到 Buffer Pool 中</p><blockquote><p>Buffer Pool 除了缓存「索引页」和「数据页」，还包括了 Undo 页，插入缓存、自适应哈希索引、锁信息等等。</p></blockquote><h2 id="三、redo-log" tabindex="-1"><a class="header-anchor" href="#三、redo-log" aria-hidden="true">#</a> 三、redo log</h2><p>redo log 记录了某个数据页做了什么修改</p><blockquote><p>比如对 XXX 表空间中的 YYY 数据页 ZZZ 偏移量的地方做了AAA 更新</p></blockquote><p>每当执行一个事务就会产生这样的一条或者多条物理日志。</p><p>在事务提交时，先将 redo log 持久化到磁盘中。</p><p>当系统崩溃时，虽然脏页数据没有持久化，但是 redo log 已经持久化，MySQL可以根据 redo log 的内容，将所有数据恢复到最新的状态，保证了事务四大特性中的持久性</p><h3 id="_3-1-wal" tabindex="-1"><a class="header-anchor" href="#_3-1-wal" aria-hidden="true">#</a> 3.1 WAL</h3><p>Buffer Pool 是提高了读写效率没错，但是问题来了它是基于内存的，一旦断电，还没来得及落盘的脏页数据就会丢失。</p><p>为了解决这个问题，每当有数据更新时，InnoDB 引擎就会先更新Buffer Pool（同时标记为脏页），然后将本次修改以 redo log 的形式记录下来，这个时候更新就算完成了。由后台线程将设当的时机，将缓存在 Buffer Pool 的脏页刷新到磁盘里，这就是 WAL （Write-Ahead Logging）技术。redo log就是WAL技术的实现。</p><h3 id="_3-2-redo-log-要写到磁盘-数据也要写磁盘-为什么要多此一举" tabindex="-1"><a class="header-anchor" href="#_3-2-redo-log-要写到磁盘-数据也要写磁盘-为什么要多此一举" aria-hidden="true">#</a> 3.2 redo log 要写到磁盘，数据也要写磁盘，为什么要多此一举？</h3><ul><li>写redo log 是顺序写</li><li>而写入数据是随机写</li></ul><h3 id="_3-3-redo-log-buffer" tabindex="-1"><a class="header-anchor" href="#_3-3-redo-log-buffer" aria-hidden="true">#</a> 3.3 redo log buffer</h3><p>实际上， 执行一个事务的过程中，产生的 redo log 也不是直接写入磁盘的，因为这样会产生大量的 I/O 操作。 所以，redo log 也有自己的缓存—— redo log buffer。</p><p>redo log buffer 默认大小 16 MB，可以通过 innodb_log_Buffer_size 参数动态的调整大小，增大它的大小可以让 MySQL 处理大事务时是不必多次写入磁盘</p><h3 id="_3-4-redo-log-buffer-刷盘时机" tabindex="-1"><a class="header-anchor" href="#_3-4-redo-log-buffer-刷盘时机" aria-hidden="true">#</a> 3.4 redo log buffer 刷盘时机</h3><ul><li>MySQL 正常关闭时；</li><li>当 redo log buffer 中记录的写入量大于 redo log buffer 内存空间的一半时，会触发落盘；</li><li>InnoDB 的后台线程每隔 1 秒，将 redo log buffer 持久化到磁盘。</li><li>每次事务提交时都将缓存在 redo log buffer 里的 redo log 直接持久化到磁盘（这个策略可由 innodb_flush_log_at_trx_commit 参数控制，下面会说）。</li></ul><h2 id="四、binlog" tabindex="-1"><a class="header-anchor" href="#四、binlog" aria-hidden="true">#</a> 四、binlog</h2><p>binlog 文件是记录了所有数据库表结构变更和表数据修改的日志，不会记录查询类的操作，比如 SELECT 和 SHOW 操作。</p><p>MySQL 在完成一条更新操作后，Server层会生成一条 binlog，等之后事务提交的时候，会将该事物执行过程中产生的所有 binlog 统一写 入 binlog 文件。</p><h3 id="_4-1-redo-log-和-binlog-有什么区别" tabindex="-1"><a class="header-anchor" href="#_4-1-redo-log-和-binlog-有什么区别" aria-hidden="true">#</a> 4.1 redo log 和 binlog 有什么区别</h3><ol><li>适用对象不同：</li></ol><ul><li>binlog：Server层实现的日志，所有存储引擎都可以使用；</li><li>redo log： Innodb 存储引擎实现的日志；</li></ul><ol start="2"><li>文件格式不同</li></ol><ul><li><strong>binlog</strong> 有 3 种格式类型，分别是 STATEMENT（默认格式）、ROW、 MIXED，区别如下： <ul><li><strong>STATEMENT</strong>：<strong>记录修改数据的 SQL到 binlog 中</strong>。主从复制中 slave 端再根据 SQL 语句重现。但 STATEMENT 有动态函数的问题，比如你用了 uuid、now 这些函数，这种随机、结果不唯一的函数会主从数据不一致</li><li><strong>ROW</strong>：<strong>记录行数据最终被修改成什么样了</strong>。不会出现 STATEMENT 下动态函数的问题。但 ROW 的缺点是每行数据的变化结果都会被记录，比如执行批量 update 语句，更新多少行数据就会产生多少条记录，使 binlog 文件过大，而在 STATEMENT 格式下只会记录一个 update 语句而已</li><li><strong>MIXED</strong>：包含了 STATEMENT 和 ROW 模式，它会根据不同的情况自动使用 ROW 模式和 STATEMENT 模式；</li></ul></li><li><strong>redo log</strong>：记录的是在某个数据页做了什么修改，比如对 XXX 表空间中的 YYY 数据页 ZZZ 偏移量的地方做了AAA 更新</li></ul><ol start="3"><li>写入方式不同</li></ol><ul><li>binlog：追加写，写满一个文件，就创建一个新的文件继续写，不会覆盖以前的日志，保存的是全量的日志。</li><li>redo log：循环写，日志空间大小是固定，全部写满就从头开始，保存未被刷入磁盘的脏页日志。</li></ul><ol start="4"><li>用途不同</li></ol><ul><li>binlog：用于备份恢复、主从复制；</li><li>redo log：用于断电、故障恢复等场景。</li></ul><h3 id="_4-2-redo-log-不能用于文件恢复" tabindex="-1"><a class="header-anchor" href="#_4-2-redo-log-不能用于文件恢复" aria-hidden="true">#</a> 4.2 redo log 不能用于文件恢复</h3><p>不可以使用 redo log 文件恢复，只能使用 binlog 文件恢复。</p><p>因为 redo log 文件是循环写，是会边写边擦除日志的，只记录未被刷入磁盘的数据的物理日志，已经刷入磁盘的数据都会从 redo log 文件里擦除。</p><p>binlog 文件保存的是全量的日志，也就是保存了所有数据变更的情况，理论上只要记录在 binlog 上的数据，都可以恢复，所以如果不小心整个数据库的数据被删除了，得用 binlog 文件恢复数据</p><h3 id="_4-3-主从复制" tabindex="-1"><a class="header-anchor" href="#_4-3-主从复制" aria-hidden="true">#</a> 4.3 主从复制</h3><p>MySQL 的主从复制依赖于 binlog 。复制的过程就是将 binlog 中的数据从主库传输到从库上。</p><p>MySQL 集群的主从复制过程3个阶段：</p><ul><li><strong>写入 Binlog</strong>：主库写 binlog 日志，提交事务，并更新本地存储数据。</li><li><strong>同步 Binlog</strong>：把 binlog 复制到所有从库上，每个从库把 binlog 写到暂存日志中。</li><li><strong>回放 Binlog</strong>：回放 binlog，并更新存储引擎中的数据。</li></ul><p>主从复制有哪些模型：</p><ul><li><strong>同步复制</strong>：MySQL 主库提交事务的线程要等待所有从库的复制成功响应，才返回客户端结果。这种方式在实际项目中，基本上没法用，原因有两个：一是性能很差，因为要复制到所有节点才返回响应；二是可用性也很差，主库和所有从库任何一个数据库出问题，都会影响业务。</li><li><strong>异步复制（默认模型）</strong>：MySQL 主库提交事务的线程并不会等待 binlog 同步到各从库，就返回客户端结果。这种模式一旦主库宕机，数据就会发生丢失。</li><li><strong>半同步复制</strong>：MySQL 5.7 版本之后增加的一种复制方式，介于上面两者之间。事务线程不用等待所有的从库复制成功响应，只要一部分复制成功响应回来就行，比如一主二从的集群，只要数据成功复制到任意一个从库上，主库的事务线程就可以返回给客户端。这种半同步复制的方式，兼顾了异步复制和同步复制的优点，即使出现主库宕机，至少还有一个从库有最新的数据，不存在数据丢失的风险</li></ul><h3 id="_4-4-binlog刷盘时机" tabindex="-1"><a class="header-anchor" href="#_4-4-binlog刷盘时机" aria-hidden="true">#</a> 4.4 binlog刷盘时机</h3><p><strong>事务执行过程中</strong>，先把日志写到 binlog cache（Server 层的 cache），在<strong>事务提交的时候</strong>，会把把 binlog cache 写到 binlog 文件中，并清空 binlog cache。</p><h3 id="_4-5-开启binlog" tabindex="-1"><a class="header-anchor" href="#_4-5-开启binlog" aria-hidden="true">#</a> 4.5 开启binlog</h3><p>修改my.cnf：</p><div class="language-ini line-numbers-mode" data-ext="ini"><pre class="language-ini"><code><span class="token comment">#设置日志三种格式：STATEMENT、ROW、MIXED 。</span>
<span class="token key attr-name">binlog_format</span> <span class="token punctuation">=</span> <span class="token value attr-value">row</span>
<span class="token comment">#设置日志路径，注意路经需要mysql用户有权限写</span>
<span class="token key attr-name">log-bin</span> <span class="token punctuation">=</span> <span class="token value attr-value">/var/lib/mysql-binlog/tosee-binlog</span>
<span class="token comment">#设置binlog清理时间</span>
<span class="token key attr-name">expire_logs_days</span> <span class="token punctuation">=</span> <span class="token value attr-value">7</span>
<span class="token comment">#binlog每个日志文件大小</span>
<span class="token key attr-name">max_binlog_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">100m</span>
<span class="token comment">#binlog缓存大小</span>
<span class="token key attr-name">binlog_cache_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">4m</span>
<span class="token comment">#最大binlog缓存大小</span>
<span class="token key attr-name">max_binlog_cache_size</span> <span class="token punctuation">=</span> <span class="token value attr-value">512m</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="五、两阶段提交" tabindex="-1"><a class="header-anchor" href="#五、两阶段提交" aria-hidden="true">#</a> 五、两阶段提交</h2><p>事务提交后，redo log 和 binlog 都要持久化到磁盘，但是这两个是独立的逻辑，可能出现半成功的状态（只有一个日志成功持久化），这样就有可能造成主从数据不一致的问题。</p><p>举个例子:</p><p>假设 id = 1 这行数据的字段 name 的值原本是 &#39;jay&#39;，然后执行 <code>UPDATE t_user SET name = &#39;haya&#39; WHERE id = 1</code>;</p><p>如果在持久化 redo log 和 binlog 两个日志的过程中，出现了半成功状态，那么就有两种情况：</p><ul><li><strong>redo log 刷盘后， MySQL宕机了，而 binlog 还没有来得及写入</strong>。MySQL 重启后，通过 redo log 能将 Buffer Pool 中 id = 1 这行数据的 name 字段恢复到新值 haya，但是 binlog 里面没有记录这条更新语句，在主从架构中，binlog 会被复制到从库，由于 binlog 丢失了这条更新语句，从库的这一行 name 字段是旧值 jay，与主库的值不一致性；</li><li><strong>binlog 刷盘后， MySQL宕机了，而 redo log 还没有来得及写入</strong>。由于 redo log 还没写，崩溃恢复以后这个事务无效，所以 id = 1 这行数据的 name 字段还是旧值 jay，而 binlog 里面记录了这条更新语句，在主从架构中，binlog 会被复制到从库，从库执行了这条更新语句，那么这一行 name 字段是新值 haya，与主库的值不一致性；</li></ul><blockquote><p>可以看到，在持久化 redo log 和 binlog 这两份日志的时候，如果出现半成功的状态，就会造成主从环境的数据不一致性 当binlog未来得及刷盘，会出现从库少数据；当redo log未来得及刷盘会出现主库少数据的情况</p></blockquote><p>MySQL 为了避免上述问题，使用了「两阶段提交」来解决，两阶段提交其实是分布式事务一致性协议，它可以保证多个逻辑操作要么全部成功，要么全部失败，不会出现半成功的状态。</p><h3 id="_5-1-两阶段提交的过程" tabindex="-1"><a class="header-anchor" href="#_5-1-两阶段提交的过程" aria-hidden="true">#</a> 5.1 两阶段提交的过程</h3><p>MySQL 会同时维护 binlog 日志与 InnoDB 的 redo log，为了保证这两个日志的一致性，MySQL 使用了内部 XA 事务。</p><p>当客户端执行 commit 语句或者在自动提交的情况下，MySQL 内部开启一个 XA 事务。 XA 事务会分成两阶段来完成提交。</p><p>这两个阶段就是将 redo log 的写入拆成了两个步骤：prepare 和 commit，中间再穿插写入binlog，具体如下：</p><ul><li><p><strong>prepare 阶段</strong>：将 XID（XA 事务的 ID） 写入到 redo log，同时将 redo log 对应的事务状态设置为 prepare，然后将 redo log 写入buffer poll，然后持久化到磁盘（innodb_flush_log_at_trx_commit = 1 的作用）；</p></li><li><p><strong>commit 阶段</strong>：把 XID 写入到 binlog，然后将 binlog 持久化到磁盘（sync_binlog = 1 的作用），接着调用引擎的提交事务接口，将 redo log 状态设置为 commit，此时该状态并不需要持久化到磁盘，只需要 write 到文件系统的 page cache 中就够了，因为只要 binlog 写磁盘成功，就算 redo log 的状态还是 prepare 也没有关系，一样会被认为事务已经执行成功</p></li></ul>`,73),c={href:"https://www.cnblogs.com/virgosnail/p/10398325.html",target:"_blank",rel:"noopener noreferrer"},u=e(`<h2 id="六、查询日志" tabindex="-1"><a class="header-anchor" href="#六、查询日志" aria-hidden="true">#</a> 六、查询日志</h2><p>查询日志中记录了客户端的所有操作语句，而binlog中不包含查询数据的 SQL 语句</p><h3 id="_6-1-开启查询日志" tabindex="-1"><a class="header-anchor" href="#_6-1-开启查询日志" aria-hidden="true">#</a> 6.1 开启查询日志</h3><p>修改my.ini:</p><div class="language-ini line-numbers-mode" data-ext="ini"><pre class="language-ini"><code><span class="token comment"># 该选项用来开启查询日志，可选值：0 或者 1；0 代表关闭， 1 代表开启</span>
<span class="token key attr-name">general_log</span><span class="token punctuation">=</span><span class="token value attr-value">1</span>
<span class="token comment"># 设置日志的文件名，如果没有指定， 默认的文件名为 host_name.log</span>
<span class="token key attr-name">general_log_file</span><span class="token punctuation">=</span><span class="token value attr-value">file_name</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="七、慢查询日志" tabindex="-1"><a class="header-anchor" href="#七、慢查询日志" aria-hidden="true">#</a> 七、慢查询日志</h2><p>慢查询日志记录了所有执行时间超过参数 long_query_time 设置值并且扫描记录数不小于 min_examined_row_limit 的所有的 SQL 语句的日志。 long_query_time 默认为 10 秒，最小为 0，精度可以到微秒</p><h3 id="_7-1-开启慢查询日志" tabindex="-1"><a class="header-anchor" href="#_7-1-开启慢查询日志" aria-hidden="true">#</a> 7.1 开启慢查询日志</h3><p>修改my.ini:</p><div class="language-ini line-numbers-mode" data-ext="ini"><pre class="language-ini"><code><span class="token comment"># 控制慢查询日志是否开启，可取值：1 和 0，1 代表开启，0 代表关闭</span>
<span class="token key attr-name">slow_query_log</span><span class="token punctuation">=</span><span class="token value attr-value">1</span>
<span class="token comment"># 指定慢查询日志的文件名</span>
<span class="token key attr-name">slow_query_log_file</span><span class="token punctuation">=</span><span class="token value attr-value">/var/lib/mysql/slow_query.log</span>
<span class="token comment"># 配置查询的时间限制，超过这个时间将认为值慢查询，将需要进行日志记录，默认10s</span>
<span class="token key attr-name">long_query_time</span><span class="token punctuation">=</span><span class="token value attr-value">10</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-2-查看慢查询日志" tabindex="-1"><a class="header-anchor" href="#_7-2-查看慢查询日志" aria-hidden="true">#</a> 7.2 查看慢查询日志</h3><p>借助于 MySQL 自带的 mysqldumpslow 工具， 来对慢查询日志进行分类汇总</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>-s：排序方式，后边接着如下参数
    al：平均锁定时间
    ar：平均返回记录书
    at：平均查询时间
    c：访问次数
    l：锁定时间
    r：返回记录
    t：查询时间
-t：返回前面多少条的数据
-g：翻遍搭配一个正则表达式，大小写不敏感
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 获取返回记录集最多的10个sql</span>
mysqldumpslow <span class="token parameter variable">-s</span> r <span class="token parameter variable">-t</span> <span class="token number">10</span> /var/lib/mysql/slow-query.log

<span class="token comment"># 获取访问次数最多的 10 个sql</span>
mysqldumpslow <span class="token parameter variable">-s</span> c <span class="token parameter variable">-t</span> <span class="token number">10</span> /var/lib/mysql/slow-query.log

<span class="token comment"># 获取按照时间排序的前 10 条里面含有左连接的查询语句</span>
mysqldumpslow <span class="token parameter variable">-s</span> t <span class="token parameter variable">-t</span> <span class="token number">10</span> <span class="token parameter variable">-g</span> <span class="token string">&quot;left join&quot;</span> /var/lib/mysql/slow-query.log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14);function g(b,m){const a=d("ExternalLinkIcon");return o(),s("div",null,[p,n("p",null,[n("a",c,[i("参考"),r(a)])]),u])}const v=l(t,[["render",g],["__file","3.日志.html.vue"]]);export{v as default};
