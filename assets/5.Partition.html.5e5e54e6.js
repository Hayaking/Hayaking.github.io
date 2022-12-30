import{_ as a,V as s,W as e,X as n}from"./framework.44074f5b.js";const i={},t=n(`<h2 id="一、什么是分区" tabindex="-1"><a class="header-anchor" href="#一、什么是分区" aria-hidden="true">#</a> 一、什么是分区</h2><p>前面也多次提到了分区（partition），分区组成了topic</p><p>每个分区都是一个单独的 log 文件，消息以append的方式写入log文件，每个消息都有自己的编号Offset。</p><p>Offset 是一个递增的、不可变的数字，由 Kafka 自动维护。</p><h2 id="二、消息的有序性" tabindex="-1"><a class="header-anchor" href="#二、消息的有序性" aria-hidden="true">#</a> 二、消息的有序性</h2><p>Partition内部的消息可以视为是有序的</p><ul><li>如果一个Topic由多个Partition组成，那么这个Topic的消息是无序的</li><li>如果Topic只有一个Partition的话，那么这个Topic的消息可以视为是无序的。（单个Partition会阻碍消费者消费速度）</li></ul><h2 id="三、partition的好处" tabindex="-1"><a class="header-anchor" href="#三、partition的好处" aria-hidden="true">#</a> 三、Partition的好处</h2><ul><li>提高消费速度，应该为topic换分为尽可能多的partition，最好是在业务早起阶段就预先划分好可观的partition。同时消费者尽可能保持与partition数量一致，发挥最大的消费能力</li><li>数据冗余，当leader分区所在broker挂了后，分布在其他broker的副本分区follower会呗选举成为leader，避免数据丢失</li></ul><h2 id="四、reassign" tabindex="-1"><a class="header-anchor" href="#四、reassign" aria-hidden="true">#</a> 四、reassign</h2><p>对现有的Kafka集群进行扩容，扩容之后的新Kafka Broker默认是不会有任何Topic和Partition的。</p><p>需要利用分区重分配命令kafka-reassign-partitions将现有的数据平衡到新的Broker上去。</p><h3 id="_4-1-增加partitions" tabindex="-1"><a class="header-anchor" href="#_4-1-增加partitions" aria-hidden="true">#</a> 4.1 增加partitions</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>bin/kafka-topics.sh <span class="token parameter variable">--zookeeper</span> xxxx <span class="token parameter variable">--alter</span> <span class="token parameter variable">--topic</span> all <span class="token parameter variable">--partitions</span> <span class="token number">24</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>直接新增partition并不会立马起到负载均衡，提升消费速度的作用，还需要分区冲平衡（ reassign partitions），将旧的数据分配到新的分区上</p></blockquote><h3 id="_4-2-reassign-partitions" tabindex="-1"><a class="header-anchor" href="#_4-2-reassign-partitions" aria-hidden="true">#</a> 4.2 reassign partitions</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>./bin/kafka-reassign-partitions.sh --broker-list <span class="token string">&quot;broker ids&quot;</span> --topics-to-move-json-file move.json <span class="token parameter variable">--zookeeper</span> xxxx <span class="token parameter variable">--generate</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>--topics-to-move-json-file需要指定一个文件，文件里写上你要reassign的topic，如下所示： move.json:</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span><span class="token property">&quot;topics&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token property">&quot;topic&quot;</span><span class="token operator">:</span> <span class="token string">&quot;xxxx&quot;</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token property">&quot;version&quot;</span><span class="token operator">:</span><span class="token number">1</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面的命令会生成一个执行计划，将执行计划保存到reassign.json，下面的命令会用到</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>bin/kafka-reassign-partitions.sh --reassignment-json-file reassign.json <span class="token parameter variable">--zookeeper</span>  <span class="token parameter variable">--execute</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>验证一下是否reassign成功</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>./bin/kafka-reassign-partitions.sh <span class="token parameter variable">--zookeeper</span> xxxx --reassignment-json-file reassignment.json <span class="token parameter variable">--verify</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,23),r=[t];function o(p,l){return s(),e("div",null,r)}const d=a(i,[["render",o],["__file","5.Partition.html.vue"]]);export{d as default};
