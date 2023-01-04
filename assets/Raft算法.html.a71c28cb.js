import{_ as r,V as o,W as d,X as e,$ as l,Y as i,a0 as t,y as n}from"./framework.1bd1ad73.js";const s={},h=e("h2",{id:"先讲讲paxos算法",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#先讲讲paxos算法","aria-hidden":"true"},"#"),l(" 先讲讲Paxos算法")],-1),p=e("p",null,"Paxos 算法诞生于 1990 年，这是一种解决分布式系统一致性的经典算法 。但是，由于 Paxos 算法非常难以理解和实现，不断有人尝试简化这一算法。到了2013 年才诞生了一个比 Paxos 算法更易理解和实现的分布式一致性算法—Raft 算法。",-1),c=e("h2",{id:"raft算法",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#raft算法","aria-hidden":"true"},"#"),l(" Raft算法")],-1),f={href:"https://raft.github.io/raftscope/index.html",target:"_blank",rel:"noopener noreferrer"},u=t('<p>在使用Raft算法的集群中，任何一个节点可以扮演下面角色之一：</p><ul><li>Leader: 处理所有客户端交互，日志复制等，一般一次只有一个Leader</li><li>Follower: 类似选民，完全被动</li><li>Candidate候选人: 可以被选举成为Leader的节点</li></ul><h3 id="大概的流程" tabindex="-1"><a class="header-anchor" href="#大概的流程" aria-hidden="true">#</a> 大概的流程</h3><ul><li>任何一个Follower察觉到没有Leader时，会成为一个候选者Candidate，它向其他Follower发出要求选举自己的请求。</li><li>其他Follower同意了，发出OK。候选者可以自己选自己，只要达到N/2 + 1 的大多数票，候选人还是可以成为Leader的。</li><li>当候选者就成为了Leader后，它可以向选民也就是Follower们发出指令，比如进行日志复制。</li><li>Leader会定期的向Follower发送心跳，证明自己还活着。</li><li>当Leader挂掉后，那么Follower中有一个成为候选者，发出投票选举</li></ul><h2 id="详解" tabindex="-1"><a class="header-anchor" href="#详解" aria-hidden="true">#</a> 详解</h2><h3 id="leader选举" tabindex="-1"><a class="header-anchor" href="#leader选举" aria-hidden="true">#</a> Leader选举</h3><p>Leader会定期的向Follower发送心跳，证明自己还活着</p><p>如果Follower一段时间内没有收到Leader的心跳，就会认为leader没了，然后成为Candidate开始选举。</p><p>成为Candidate后，会先增加<mark>任期号</mark>, 然后投票给自己，并向其它Follower节点发送投票请求（RequestVote RPC）。</p><p>选举结果：</p><ul><li>如果获得超过半数的选票，就会成为leader，开始向follower发送心跳</li><li>如果是其它Candidate成为leader，当前节点收到新leader的心跳，并且新leader的任期号不小于当前节点的任期号，那么当前节点就从Candidate变为follower</li><li>一段时间后没有任何获胜者，那么每个Candidate都在自己的随机选举超时时间后增加任期号，然后开始新一轮的选举</li></ul><blockquote><p>为什么会出现没有任何获胜者的情况？多个follower成为Candidate，使得投票过于分散，没有任何一个Candidate得票超过半数</p></blockquote><h3 id="日志复制" tabindex="-1"><a class="header-anchor" href="#日志复制" aria-hidden="true">#</a> 日志复制</h3><p>集群选举产生leader后，就可以为客户端提供服务</p><p>但是客户端怎么知道哪个节点是leader呢？ 当客户端请求一个节点时：</p><ul><li>节点刚好是leader，这是坠好的</li><li>节点是follower，follower会告知客户端谁是leader节点</li><li>节点挂了，客户端会轮询别的节点，直到找到leader节点</li></ul><p>leader接收到客户端的指令后，会将指令最为一个新的条目追加到日志中，一条日志包含三个主要信息：</p><ul><li>状态机指令</li><li>leader任期号</li><li>日志号</li></ul><p>leader会并行的发送AppendEntries RPC给follower，让它们复制日志。</p><p>当超过半数的follower完成日志复制后，leader就会执行客户端的指令，并返回结果。</p><h4 id="异常情况的处理" tabindex="-1"><a class="header-anchor" href="#异常情况的处理" aria-hidden="true">#</a> 异常情况的处理</h4><p>leader或follower都有挂掉的可能，raft必须保证在有节点挂掉的情况下，继续完成日志的复制，并保证每个副本日志的顺序一致性。</p><ul><li>如果复制日志时，follower没有给leader任何响应，那么leader就会不断发送AppendEntries RPC</li><li>如果follower挂了，然后恢复了，这时会触发<strong>一致性检查</strong>，保证follower能按顺序的复制缺失的日志</li></ul><blockquote><p>一致性检查: leader发送的AppendEntries RPC请求中，会带有前一个日志的日志号、任期号，如果follower在已复制的日志中对应的日志号，那么他就会拒绝此次RPC请求。然后leader就会发送前前一个日志，循环往复。。。。直到找到第一个缺失的日志。</p></blockquote><ul><li>如果leader挂了，有一部分follower已经复制了日志，但leader还没有执行客户端的指令并返回。如果此时新选举产生的leader正好没有复制刚刚的日志，那么此时就出现了follower比leader日志多、不一致的情况。</li></ul><blockquote><p>此时意味着follower所拥有的日志是无效的，因为<strong>leader还没有执行客户端的指令并返回</strong>。那么既然无效，就直接强制让当前所有follower保持与leader一致就行，与leader不同的日志会被覆盖掉。</p></blockquote>',26);function _(w,x){const a=n("ExternalLinkIcon");return o(),d("div",null,[h,p,c,e("p",null,[l("算法可互动动画："),e("a",f,[l("https://raft.github.io/raftscope/index.html"),i(a)])]),u])}const C=r(s,[["render",_],["__file","Raft算法.html.vue"]]);export{C as default};
