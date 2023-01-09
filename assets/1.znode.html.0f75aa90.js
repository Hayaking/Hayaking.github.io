import{_ as s,V as o,W as d,X as e,a0 as n,Z as t,Y as i,y as l}from"./framework.591e63b2.js";const c={},r=e("h2",{id:"一、什么是znode",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#一、什么是znode","aria-hidden":"true"},"#"),n(" 一、什么是Znode")],-1),p=e("p",null,"Zookeeper拥有一个树形的文件系统，这个树形文件系统的每个节点被叫做ZNode。",-1),u=e("h3",{id:"_1-1-znode组成",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_1-1-znode组成","aria-hidden":"true"},"#"),n(" 1.1 Znode组成")],-1),m={href:"https://www.runoob.com/w3cnote/zookeeper-znode-data-model.html",target:"_blank",rel:"noopener noreferrer"},h=i(`<h3 id="_1-2-znode类型" tabindex="-1"><a class="header-anchor" href="#_1-2-znode类型" aria-hidden="true">#</a> 1.2 Znode类型</h3><p>根据存活时长分，Znode可以分为两种类型：</p><ul><li>临时节点：会话结束时会被自动删除删除、不允许有子节点</li><li>永久节点：不会被自动删除</li></ul><blockquote><p>加上-e就是创建临时节点 create -e /a 123</p></blockquote><p>根据有序性分，Znode可以分为两种类型：</p><ul><li>有序节点：在节点创建时，znode尾部会带有递增的序号</li><li>无需节点：没有序号</li></ul><blockquote><p>加上-s就是创建有序节点 create -s /a 123</p></blockquote><h2 id="二、操作znode" tabindex="-1"><a class="header-anchor" href="#二、操作znode" aria-hidden="true">#</a> 二、操作Znode</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看子节点</span>
<span class="token function">ls</span> /nodeName
<span class="token comment"># 查看节点数据、节点信息</span>
get /nodeName
<span class="token comment"># 监听节点数据、节点信息变化</span>
get /nodeName <span class="token function">watch</span>
<span class="token comment"># 查看节点信息</span>
<span class="token function">stat</span> /nodeName
<span class="token comment"># 修改节点数据</span>
<span class="token builtin class-name">set</span> /nodeName value
<span class="token comment"># 创建节点，-s有序 -e临时 acl访问权限相关</span>
create <span class="token punctuation">[</span>-s<span class="token punctuation">]</span> <span class="token punctuation">[</span>-e<span class="token punctuation">]</span> /nodeName value acl

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9);function v(_,b){const a=l("ExternalLinkIcon");return o(),d("div",null,[r,p,u,e("p",null,[n("znode跟文件系统的inode比较类似，不同的是znode同时可以做文件夹或文件。znode记录着很多信息，例如数据版本号、权限版本号、子节点等相关信息。"),e("a",m,[n("参考"),t(a)])]),h])}const f=s(c,[["render",v],["__file","1.znode.html.vue"]]);export{f as default};
