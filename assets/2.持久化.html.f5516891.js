import{_ as a,V as i,W as d,X as e,a0 as n,Z as l,$ as r,Y as c,y as o}from"./framework.591e63b2.js";const t={},p=e("h2",{id:"一、redis为什么需要持久化",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#一、redis为什么需要持久化","aria-hidden":"true"},"#"),n(" 一、redis为什么需要持久化")],-1),m=e("p",null,"redis是内存数据库，但是为了避免宕机后数据丢失，他需要将数据持久化到硬盘上用于数据恢复。redis持久化技术有两个: AOF、RDB",-1),u=e("h2",{id:"二、aof",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#二、aof","aria-hidden":"true"},"#"),n(" 二、AOF")],-1),v=c(`<p>在Redis执行一条写操作命令后，会把该命令以追加的方式写入到一个文件里。当Redis重启的时候，先去读取这个文件里的命令，并且执行它。这就是 AOF(Append Only File)</p><h3 id="_2-1-开启aof" tabindex="-1"><a class="header-anchor" href="#_2-1-开启aof" aria-hidden="true">#</a> 2.1 开启AOF</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># redis.conf</span>
<span class="token comment"># 开启AOF持久化</span>
appendonly no
<span class="token comment"># AOF持久化的文件名</span>
appendfilename <span class="token string">&quot;appendonly.aof&quot;</span>

<span class="token comment"># 同步策略</span>
<span class="token comment"># appendfsync always</span>
<span class="token comment"># appendfsync no</span>
appendfsync everysec
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>appendfsync: <ul><li>always: redis每次执行完写命令后，就将缓冲区的AOF日志写到硬盘</li><li>no: 写入到内核缓冲区，让内核决定什么时候讲AOF日志写到磁盘</li><li>everysec: 每秒将缓冲区的AOF日志写到硬盘</li></ul></li></ul><h2 id="三、rdb" tabindex="-1"><a class="header-anchor" href="#三、rdb" aria-hidden="true">#</a> 三、RDB</h2><p>RDB记录的是二进制数据，是redis在某一瞬间的全量快照。</p><p>生成rdb文件的命令:</p><ul><li>save: 生成rdb文件，由redis操作命令的线程执行</li><li>bgsave: 新启动一个子进程去生成rdb文件</li></ul><h3 id="_3-1-开启rdb" tabindex="-1"><a class="header-anchor" href="#_3-1-开启rdb" aria-hidden="true">#</a> 3.1 开启RDB</h3><p>每隔一段时间自动执行一次 bgsave 命令:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># redis.conf</span>
<span class="token comment"># 周期性执行条件的设置格式为</span>
<span class="token comment"># save &lt;seconds&gt; &lt;changes&gt;</span>
<span class="token comment"># 默认的设置为：</span>
save <span class="token number">900</span> <span class="token number">1</span>
save <span class="token number">300</span> <span class="token number">10</span>
save <span class="token number">60</span> <span class="token number">10000</span>

<span class="token comment"># rdb文件压缩</span>
rdbcompression <span class="token function">yes</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11);function b(h,_){const s=o("RouterLink");return i(),d("div",null,[p,m,u,e("p",null,[n("类似于mysql "),l(s,{to:"/db/mysql/3.%E6%97%A5%E5%BF%97.html#%E4%B8%89%E3%80%81redo-log"},{default:r(()=>[n("redolog")]),_:1}),n("的机制，记录的是（写）操作日志。")]),v])}const k=a(t,[["render",b],["__file","2.持久化.html.vue"]]);export{k as default};
