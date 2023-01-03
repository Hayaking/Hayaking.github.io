import{_ as a,V as e,W as s,Y as i}from"./framework.44032428.js";const r="/assets/db/redis/高可用/1.png",n="/assets/db/redis/高可用/2.png",d={},l=i(`<h2 id="一、主从" tabindex="-1"><a class="header-anchor" href="#一、主从" aria-hidden="true">#</a> 一、主从</h2><p>Redis 提供了主从库模式，以保证数据副本的一致，主从库之间采用的是读写分离的方式。</p><p>redis读写分离：</p><ul><li>读操作：主库、从库都可以接收；</li><li>写操作：首先到主库执行，然后，主库将写操作同步给从库</li></ul><h3 id="_1-1-建立主从关系" tabindex="-1"><a class="header-anchor" href="#_1-1-建立主从关系" aria-hidden="true">#</a> 1.1 建立主从关系</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>replicaof <span class="token operator">&lt;</span>主节点地址<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>从节点地址<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_1-2-全量复制" tabindex="-1"><a class="header-anchor" href="#_1-2-全量复制" aria-hidden="true">#</a> 1.2 全量复制</h3><p>全量复制一般发生在第一次主从同步数据时。第一次主从同步分为三个阶段：</p><ul><li>第一阶段是建立链接、协商同步</li><li>第二阶段是主服务器同步数据给从服务器，传输的是rdb文件（全量复制）</li><li>第三阶段是主服务器发送新写操作命令给从服务器（命令传播）</li></ul><h3 id="_1-3-命令传播" tabindex="-1"><a class="header-anchor" href="#_1-3-命令传播" aria-hidden="true">#</a> 1.3 命令传播</h3><p>在完成全量复制之后，双方之间就会维护一个 TCP 连接。主节点会将命令同步给从节点去执行，去保证双方数据一致性。</p><h3 id="_1-2-增量复制" tabindex="-1"><a class="header-anchor" href="#_1-2-增量复制" aria-hidden="true">#</a> 1.2 增量复制</h3><p>如果主从之间断开后，又重连了，中间这段时间本该使用命令传播同步的数据该怎么办呢？</p><ul><li>Redis 2.8 之前，会重新全量复制一次。。。</li><li>Redis 2.8 开始，主节点会把中间这段时间的命令存储起来，等连接恢复后，发送给从节点</li></ul><h2 id="二、哨兵" tabindex="-1"><a class="header-anchor" href="#二、哨兵" aria-hidden="true">#</a> 二、哨兵</h2><p>哨兵机制是实现主从库自动切换的关键机制，它有效地解决了主从复制模式下故障转移的问题</p><blockquote><p>Redis Sentinel，即Redis哨兵，在Redis 2.8版本开始引入。哨兵的核心功能是主节点的自动故障转移。</p></blockquote><p><img src="`+r+`" alt="" loading="lazy"></p><h3 id="_2-1-哨兵机制" tabindex="-1"><a class="header-anchor" href="#_2-1-哨兵机制" aria-hidden="true">#</a> 2.1 哨兵机制</h3><p>哨兵是一个redis进程，但其比较不负责数据读写，只负责监控主从节点、选举主节点</p><h4 id="_2-1-1-哨兵判断主节点故障" tabindex="-1"><a class="header-anchor" href="#_2-1-1-哨兵判断主节点故障" aria-hidden="true">#</a> 2.1.1 哨兵判断主节点故障</h4><p>哨兵会每隔 1 秒给主从节点发送 PING 命令，当主从节点收到 PING 命令后，会发送一个响应命令给哨兵，这样就可以判断它们是否在正常运行。</p><p>当主节点没有在规定时间（down-after-milliseconds）内应答，哨兵就会将它们标记为<mark>主观下线</mark>。</p><p>当一个哨兵判断主节点为<mark>主观下线</mark>后，就会向哨兵集群中的其他哨兵发起命令，其他哨兵收到这个命令后，就会根据自身和主节点的网络状况，做出赞成投票或者拒绝投票的响应。当赞同票数quorum值后，这个主节点就会被<mark>客观下线</mark>。</p><blockquote><p>为了减少误判，通常情况下会有多个哨兵组成一个哨兵集群，由哨兵集群投票判断 quorum 的值一般设置为哨兵个数的二分之一加1，例如 3 个哨兵就设置 2。</p></blockquote><h3 id="_2-2-主从故障转移" tabindex="-1"><a class="header-anchor" href="#_2-2-主从故障转移" aria-hidden="true">#</a> 2.2 主从故障转移</h3><p>前面说过，为了更加“客观”的判断主节点故障了，一般不会只由单个哨兵的检测结果来判断，而是多个哨兵一起判断，这样可以减少误判概率，所以哨兵是以哨兵集群的方式存在的。</p><p>问题来了，由哨兵集群中的哪个节点进行主从故障转移呢？</p><p>这个时候就需要在哨兵集群中选取一个leader，让leader主持主从切换。</p><h4 id="_2-2-1-主从切换流程" tabindex="-1"><a class="header-anchor" href="#_2-2-1-主从切换流程" aria-hidden="true">#</a> 2.2.1 主从切换流程</h4><ul><li>在已下线主节点（旧主节点）属下的所有「从节点」里面，挑选出一个从节点，并将其转换为主节点。</li><li>让已下线主节点属下的所有「从节点」修改复制目标，修改为复制「新主节点」；</li><li>将新主节点的 IP 地址和信息，通过「发布者/订阅者机制」通知给客户端；</li><li>继续监视旧主节点，当这个旧主节点重新上线时，将它设置为新主节点的从节点</li></ul><h3 id="_2-3-哨兵集群" tabindex="-1"><a class="header-anchor" href="#_2-3-哨兵集群" aria-hidden="true">#</a> 2.3 哨兵集群</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>sentinel monitor <span class="token operator">&lt;</span>主节点名字<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>主节点ip<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>主节点端口<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>quorum<span class="token operator">&gt;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+n+'" alt="" loading="lazy"></p><h2 id="三、集群" tabindex="-1"><a class="header-anchor" href="#三、集群" aria-hidden="true">#</a> 三、集群</h2><p>Redis 集群是一个可以在多个 Redis 节点之间进行数据共享的设施。</p><h3 id="_3-1-哈希槽" tabindex="-1"><a class="header-anchor" href="#_3-1-哈希槽" aria-hidden="true">#</a> 3.1 哈希槽</h3><p>Redis 集群使用数据分片（sharding）而非一致性哈希（consistency hashing）来实现。</p><p>一个 Redis 集群包含 16384 个哈希槽（hash slot）， 数据库中的每个键都属于这 16384 个哈希槽的其中一个， 集群使用公式 CRC16(key) % 16384 来计算键 key 属于哪个槽， 其中 CRC16(key) 语句用于计算键 key 的 CRC16 校验和 。</p><p>集群中的每个节点负责处理一部分哈希槽。 举个例子， 一个集群可以有三个哈希槽， 其中：</p><ul><li>节点 A 负责处理 0 号至 5500 号哈希槽</li><li>节点 B 负责处理 5501 号至 11000 号哈希槽</li><li>节点 C 负责处理 11001 号至 16384 号哈希槽</li></ul><h3 id="_3-2-主从复制" tabindex="-1"><a class="header-anchor" href="#_3-2-主从复制" aria-hidden="true">#</a> 3.2 主从复制</h3><p>为了避免因为某个节点挂掉导致的数据丢失，每个从节点都有1~n个副本节点。</p><p>与前面提到的主从结构不一样的是，集群下的从节点不提供服务，节点之间相互通信，相互选举，不再依赖sentinel。</p><p>。。。。。。有些复杂，待续</p>',45),t=[l];function h(p,o){return e(),s("div",null,t)}const u=a(d,[["render",h],["__file","4.高可用.html.vue"]]);export{u as default};
