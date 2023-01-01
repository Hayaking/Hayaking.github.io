import{_ as n,V as s,W as a,Y as t}from"./framework.44032428.js";const e="/assets/java/mybatis/executor/1.png",p="/assets/java/mybatis/executor/2.png",c="/assets/java/mybatis/executor/3.png",o="/assets/java/mybatis/executor/4.png",l={},u=t(`<h2 id="一、原生jdbc执行流程" tabindex="-1"><a class="header-anchor" href="#一、原生jdbc执行流程" aria-hidden="true">#</a> 一、原生JDBC执行流程</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">jdbcTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SQLException</span> <span class="token punctuation">{</span>
        <span class="token comment">// 1、获取连接</span>
        <span class="token keyword">var</span> connection <span class="token operator">=</span> <span class="token class-name">DriverManager</span><span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token constant">URL</span><span class="token punctuation">,</span> <span class="token constant">USERNAME</span><span class="token punctuation">,</span> <span class="token constant">PASSWORD</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 2、预编译</span>
        <span class="token keyword">var</span> sql <span class="token operator">=</span> <span class="token string">&quot;SELECT * FROM users WHERE \`name\`=?&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">var</span> ps <span class="token operator">=</span> connection<span class="token punctuation">.</span><span class="token function">prepareStatement</span><span class="token punctuation">(</span>sql<span class="token punctuation">)</span><span class="token punctuation">;</span>
        ps<span class="token punctuation">.</span><span class="token function">setString</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&quot;hayaking&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 3、执行SQL</span>
        ps<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 4、获取结果集</span>
        <span class="token keyword">var</span> resultSet <span class="token operator">=</span> ps<span class="token punctuation">.</span><span class="token function">getResultSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>resultSet<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>resultSet<span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        resultSet<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        sql1<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>总结一下，流程如下：</p><p><img src="`+e+'" alt="" loading="lazy"></p><p>其中，Connection、PreparedStatement、ResultSet这些都是jdk提供的。</p><p><img src="'+p+'" alt="" loading="lazy"></p><p>在jdk出的JDBC执行器规范接口中，Statement作为接口，PreparedStatement、CallableStatement分别是基于Statement的增强和扩展。</p><p>在使用层面：</p><ul><li>Statement：可以支持重用执行多个静态SQL，并可以设置addBatch、setFetchSize等操作。Statement的每次执行都是给数据库发送一个静态SQL。多次执行，即发送多个静态SQL。</li><li>PreparedStatement：可以对SQL进行预编译，可以有效防止SQL注入。并且，每次执行都是给数据库发送一个SQL，加上若干组参数。</li><li>CallableStatement：集成以上两个接口的基础上，扩展了返回结果的读写。</li></ul><h2 id="二、mybatis执行流程" tabindex="-1"><a class="header-anchor" href="#二、mybatis执行流程" aria-hidden="true">#</a> 二、Mybatis执行流程</h2><p><img src="'+c+'" alt="" loading="lazy"></p><p>对照JDBC的标准流程，Mybatis将Connection对象维护交由SqlSession这个环节来处理，将SQL预编译与执行交给Executor这个环节来处理，将结果集提取交给StatemntHandler来处理。</p><h2 id="三、executor分类" tabindex="-1"><a class="header-anchor" href="#三、executor分类" aria-hidden="true">#</a> 三、Executor分类</h2><p><img src="'+o+`" alt="" loading="lazy"></p><p>Executor是个接口，定义了修改（增删改）、查询、提交、回滚、缓存的基本规范。其子类根据分工不同对其做个差异化实现：</p><ul><li><strong>BaseExecutor</strong>: 抽象类，其它executor都继承自该类。该类提供了连接维护、一级缓存的公有功能，供子类复用。并定义了doQuery、doUpdate的抽象方法让子类去实现</li><li><strong>CachingExecutor</strong>: BaseExecutor子类，持有别的executor，利用装饰器模式实现了二级缓存的功能，其它操作则会委托给持有的executor去执行。</li><li><strong>SimpleExecutor(默认)</strong>: 每处理一次会话当中的SQl请求，都会通过对应的StatementHandler 构建一个新个Statement，这就会导致即使是相同SQL语句也无法重用Statement,所以就有了（ReuseExecutor）可重用执行器</li><li><strong>ReuseExecutor</strong>: 在会话期间内的Statement进行缓存，并使用SQL语句作为Key。所以当执行下一请求的时候，不在重复构建Statement，而是从缓存中取出并设置参数，然后执行</li><li><strong>BatchExecutor</strong>: 支持批量处理,每次需要手动flushStatement才能生效</li></ul><h2 id="四、缓存" tabindex="-1"><a class="header-anchor" href="#四、缓存" aria-hidden="true">#</a> 四、缓存</h2><p>myBatis中存在两个缓存，一级缓存和二级缓存。</p><p>查询缓存时，会先去查询二级缓存，再去查询一级缓存。</p><h3 id="_4-1一级缓存" tabindex="-1"><a class="header-anchor" href="#_4-1一级缓存" aria-hidden="true">#</a> 4.1一级缓存</h3><p>也叫做会话级缓存，生命周期仅存在于当前会话，不可以直接关关闭。但可以通过flushCache和localCacheScope对其做相应控制。</p><p>localCacheScope默认是SESSION级别，即在一个MyBatis会话中执行的所有语句，都会共享这一个缓存。一种是STATEMENT级别，可以理解为缓存只对当前执行的这一个Statement有效。</p><h4 id="_4-1-1-命中场景" tabindex="-1"><a class="header-anchor" href="#_4-1-1-命中场景" aria-hidden="true">#</a> 4.1.1 命中场景</h4><ul><li>SQL与参数相同</li><li>同一个会话</li><li>相同的MapperStatement ID</li><li>RowBounds行范围相同</li></ul><p>四个条件，缺一不可</p><h4 id="_4-1-2-触发清空缓存" tabindex="-1"><a class="header-anchor" href="#_4-1-2-触发清空缓存" aria-hidden="true">#</a> 4.1.2 触发清空缓存</h4><p>以下操作会导致一级缓存被清空：</p><ul><li>手动调用clearCache</li><li>执行提交回滚</li><li>执行update</li><li>配置flushCache=true</li><li>缓存作用域为Statement</li></ul><h4 id="_4-1-3-实现原理" tabindex="-1"><a class="header-anchor" href="#_4-1-3-实现原理" aria-hidden="true">#</a> 4.1.3 实现原理</h4><p>一级缓存的相关代码逻辑都在BaseExecutor中。</p><p>当会话接收到查询请求之后，会交给BaseExecutor的query方法</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>  <span class="token annotation punctuation">@Override</span>
  <span class="token keyword">public</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> <span class="token function">query</span><span class="token punctuation">(</span><span class="token class-name">MappedStatement</span> ms<span class="token punctuation">,</span> <span class="token class-name">Object</span> parameter<span class="token punctuation">,</span> <span class="token class-name">RowBounds</span> rowBounds<span class="token punctuation">,</span> <span class="token class-name">ResultHandler</span> resultHandler<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SQLException</span> <span class="token punctuation">{</span>
    <span class="token class-name">BoundSql</span> boundSql <span class="token operator">=</span> ms<span class="token punctuation">.</span><span class="token function">getBoundSql</span><span class="token punctuation">(</span>parameter<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 在这里会通过 Sql、参数、分页条件等参数创建一个缓存key</span>
    <span class="token class-name">CacheKey</span> key <span class="token operator">=</span> <span class="token function">createCacheKey</span><span class="token punctuation">(</span>ms<span class="token punctuation">,</span> parameter<span class="token punctuation">,</span> rowBounds<span class="token punctuation">,</span> boundSql<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token function">query</span><span class="token punctuation">(</span>ms<span class="token punctuation">,</span> parameter<span class="token punctuation">,</span> rowBounds<span class="token punctuation">,</span> resultHandler<span class="token punctuation">,</span> key<span class="token punctuation">,</span> boundSql<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
  <span class="token keyword">public</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> <span class="token function">query</span><span class="token punctuation">(</span><span class="token class-name">MappedStatement</span> ms<span class="token punctuation">,</span> <span class="token class-name">Object</span> parameter<span class="token punctuation">,</span> <span class="token class-name">RowBounds</span> rowBounds<span class="token punctuation">,</span> <span class="token class-name">ResultHandler</span> resultHandler<span class="token punctuation">,</span> <span class="token class-name">CacheKey</span> key<span class="token punctuation">,</span> <span class="token class-name">BoundSql</span> boundSql<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SQLException</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> list<span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      queryStack<span class="token operator">++</span><span class="token punctuation">;</span>
      <span class="token comment">// 根据key查找缓存</span>
      <span class="token comment">// localCache是对hashmap的封装 </span>
      list <span class="token operator">=</span> resultHandler <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">)</span> localCache<span class="token punctuation">.</span><span class="token function">getObject</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>list <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">handleLocallyCachedOutputParameters</span><span class="token punctuation">(</span>ms<span class="token punctuation">,</span> key<span class="token punctuation">,</span> parameter<span class="token punctuation">,</span> boundSql<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        list <span class="token operator">=</span> <span class="token function">queryFromDatabase</span><span class="token punctuation">(</span>ms<span class="token punctuation">,</span> parameter<span class="token punctuation">,</span> rowBounds<span class="token punctuation">,</span> resultHandler<span class="token punctuation">,</span> key<span class="token punctuation">,</span> boundSql<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
      queryStack<span class="token operator">--</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="何时会清空缓存" tabindex="-1"><a class="header-anchor" href="#何时会清空缓存" aria-hidden="true">#</a> 何时会清空缓存</h5><ul><li>update: 执行任意增删改</li><li>select：查询又分为两种情况清空，一种是前置清空，即配置了flushCache=true。另一种后置清空，配置了缓存作用域为statement 查询结束合会清空缓存。</li><li>commit：提交前清空</li><li>rollback：回滚前清空</li></ul><h3 id="_4-2-二级缓存" tabindex="-1"><a class="header-anchor" href="#_4-2-二级缓存" aria-hidden="true">#</a> 4.2 二级缓存</h3><p>也叫应用级性缓存，而且可以跨线程使用，如果多个SqlSession之间需要共享缓存，则需要使用到二级缓存。</p><p>开启二级缓存后，会使用CachingExecutor装饰Executor，进入一级缓存的查询流程前，先在CachingExecutor进行二级缓存的查询。</p><h4 id="_4-2-1-实现原理" tabindex="-1"><a class="header-anchor" href="#_4-2-1-实现原理" aria-hidden="true">#</a> 4.2.1 实现原理</h4><p>直接看CachingExecutor的源码</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CachingExecutor</span> <span class="token keyword">implements</span> <span class="token class-name">Executor</span> <span class="token punctuation">{</span>
    <span class="token comment">// 装饰器模式，持有的别的Executor， 除了二级缓存的操作，其他操作都会委托给这个Executor执行</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Executor</span> delegate<span class="token punctuation">;</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>  <span class="token annotation punctuation">@Override</span>
  <span class="token keyword">public</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> <span class="token function">query</span><span class="token punctuation">(</span><span class="token class-name">MappedStatement</span> ms<span class="token punctuation">,</span> <span class="token class-name">Object</span> parameterObject<span class="token punctuation">,</span> <span class="token class-name">RowBounds</span> rowBounds<span class="token punctuation">,</span> <span class="token class-name">ResultHandler</span> resultHandler<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SQLException</span> <span class="token punctuation">{</span>
    <span class="token class-name">BoundSql</span> boundSql <span class="token operator">=</span> ms<span class="token punctuation">.</span><span class="token function">getBoundSql</span><span class="token punctuation">(</span>parameterObject<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 获取缓存的key</span>
    <span class="token class-name">CacheKey</span> key <span class="token operator">=</span> <span class="token function">createCacheKey</span><span class="token punctuation">(</span>ms<span class="token punctuation">,</span> parameterObject<span class="token punctuation">,</span> rowBounds<span class="token punctuation">,</span> boundSql<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token function">query</span><span class="token punctuation">(</span>ms<span class="token punctuation">,</span> parameterObject<span class="token punctuation">,</span> rowBounds<span class="token punctuation">,</span> resultHandler<span class="token punctuation">,</span> key<span class="token punctuation">,</span> boundSql<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
  <span class="token keyword">public</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> <span class="token function">query</span><span class="token punctuation">(</span><span class="token class-name">MappedStatement</span> ms<span class="token punctuation">,</span> <span class="token class-name">Object</span> parameterObject<span class="token punctuation">,</span> <span class="token class-name">RowBounds</span> rowBounds<span class="token punctuation">,</span> <span class="token class-name">ResultHandler</span> resultHandler<span class="token punctuation">,</span> <span class="token class-name">CacheKey</span> key<span class="token punctuation">,</span> <span class="token class-name">BoundSql</span> boundSql<span class="token punctuation">)</span>
      <span class="token keyword">throws</span> <span class="token class-name">SQLException</span> <span class="token punctuation">{</span>
    <span class="token comment">// 获取二级缓存的Cache类</span>
    <span class="token class-name">Cache</span> cache <span class="token operator">=</span> ms<span class="token punctuation">.</span><span class="token function">getCache</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>cache <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 然后是判断是否需要刷新缓存</span>
      <span class="token function">flushCacheIfRequired</span><span class="token punctuation">(</span>ms<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>ms<span class="token punctuation">.</span><span class="token function">isUseCache</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> resultHandler <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ensureNoOutParams主要是用来处理存储过程的, 忽略</span>
        <span class="token function">ensureNoOutParams</span><span class="token punctuation">(</span>ms<span class="token punctuation">,</span> boundSql<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 尝试从tcm中获取缓存的列表</span>
        <span class="token annotation punctuation">@SuppressWarnings</span><span class="token punctuation">(</span><span class="token string">&quot;unchecked&quot;</span><span class="token punctuation">)</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> list <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">)</span> tcm<span class="token punctuation">.</span><span class="token function">getObject</span><span class="token punctuation">(</span>cache<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        <span class="token keyword">if</span> <span class="token punctuation">(</span>list <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// 如果为空，就委托持有的executor查询</span>
          list <span class="token operator">=</span> delegate<span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span>ms<span class="token punctuation">,</span> parameterObject<span class="token punctuation">,</span> rowBounds<span class="token punctuation">,</span> resultHandler<span class="token punctuation">,</span> key<span class="token punctuation">,</span> boundSql<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token comment">// 并不是直接接结果放到二级缓存中</span>
          tcm<span class="token punctuation">.</span><span class="token function">putObject</span><span class="token punctuation">(</span>cache<span class="token punctuation">,</span> key<span class="token punctuation">,</span> list<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// issue #578 and #116</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> list<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> delegate<span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span>ms<span class="token punctuation">,</span> parameterObject<span class="token punctuation">,</span> rowBounds<span class="token punctuation">,</span> resultHandler<span class="token punctuation">,</span> key<span class="token punctuation">,</span> boundSql<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Cache本身是一个接口，他有很多实现类，如下所示：</p><ul><li>SynchronizedCache：同步Cache，实现比较简单，直接使用synchronized修饰方法。</li><li>LoggingCache：日志功能，装饰类，用于记录缓存的命中率，如果开启了DEBUG模式，则会输出命中率日志。</li><li>SerializedCache：序列化功能，将值序列化后存到缓存中。该功能用于缓存返回一份实例的Copy，用于保存线程安全。</li><li>LruCache：采用了Lru算法的Cache实现，移除最近最少使用的Key/Value。</li><li>PerpetualCache： 作为为最基础的缓存类，底层实现比较简单，直接使用了HashMap。</li></ul><p>在默认的设置中SELECT语句不会刷新缓存，insert/update/delete会刷新缓存。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">flushCacheIfRequired</span><span class="token punctuation">(</span><span class="token class-name">MappedStatement</span> ms<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Cache</span> cache <span class="token operator">=</span> ms<span class="token punctuation">.</span><span class="token function">getCache</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>cache <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> ms<span class="token punctuation">.</span><span class="token function">isFlushCacheRequired</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>      
      tcm<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span>cache<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>tcm.putObject(cache, key, list)，并不是直接接结果放到二级缓存中，具体可以看下源码</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">putObject</span><span class="token punctuation">(</span><span class="token class-name">Cache</span> cache<span class="token punctuation">,</span> <span class="token class-name">CacheKey</span> key<span class="token punctuation">,</span> <span class="token class-name">Object</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">getTransactionalCache</span><span class="token punctuation">(</span>cache<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">putObject</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token class-name">TransactionalCache</span> <span class="token function">getTransactionalCache</span><span class="token punctuation">(</span><span class="token class-name">Cache</span> cache<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">MapUtil</span><span class="token punctuation">.</span><span class="token function">computeIfAbsent</span><span class="token punctuation">(</span>transactionalCaches<span class="token punctuation">,</span> cache<span class="token punctuation">,</span> <span class="token class-name">TransactionalCache</span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>向二级缓存的put的值会先放在TrancationalCache中，当事务commit时，才会将TrancationalCache中的值刷到二级缓存中</p>`,50),i=[u];function k(r,d){return s(),a("div",null,i)}const v=n(l,[["render",k],["__file","1.Executor.html.vue"]]);export{v as default};