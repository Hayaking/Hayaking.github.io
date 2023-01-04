import{_ as e,V as t,W as c,X as n,$ as o,Y as p,a0 as s,y as l}from"./framework.1bd1ad73.js";const i={},d=s(`<p>常用于优化子查询书写。使用with字句，将子查询字句提取出了，提高SQL可读性。</p><p>复杂点的操作，可以使用with字句写出递归查询</p><h2 id="示例一" tabindex="-1"><a class="header-anchor" href="#示例一" aria-hidden="true">#</a> 示例一</h2><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">with</span> 
a <span class="token keyword">as</span> <span class="token punctuation">(</span>
    <span class="token keyword">SELECT</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token keyword">from</span> xxx
<span class="token punctuation">)</span><span class="token punctuation">,</span>
b <span class="token keyword">as</span> <span class="token punctuation">(</span>
    <span class="token keyword">SELECT</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token keyword">from</span> a
<span class="token punctuation">)</span>
<span class="token keyword">select</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token keyword">from</span> b
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="示例二" tabindex="-1"><a class="header-anchor" href="#示例二" aria-hidden="true">#</a> 示例二</h2>`,5),r={href:"https://www.yiibai.com/mysql/recursive-cte.html",target:"_blank",rel:"noopener noreferrer"},u=s(`<div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">WITH</span> RECURSIVE cte_count <span class="token punctuation">(</span>n<span class="token punctuation">)</span> 
<span class="token keyword">AS</span> <span class="token punctuation">(</span>
      <span class="token comment">-- 递归起始</span>
      <span class="token keyword">SELECT</span> <span class="token number">1</span>
      <span class="token keyword">UNION</span> <span class="token keyword">ALL</span>
      <span class="token comment">-- 递归操作</span>
      <span class="token keyword">SELECT</span> n <span class="token operator">+</span> <span class="token number">1</span> 
      <span class="token keyword">FROM</span> cte_count 
      <span class="token comment">-- 递归终止条件</span>
      <span class="token keyword">WHERE</span> n <span class="token operator">&lt;</span> <span class="token number">3</span>
<span class="token punctuation">)</span>
<span class="token keyword">SELECT</span> n 
<span class="token keyword">FROM</span> cte_count<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function k(v,m){const a=l("ExternalLinkIcon");return t(),c("div",null,[d,n("p",null,[n("a",r,[o("参考"),p(a)])]),u])}const _=e(i,[["render",k],["__file","5.SQL CET.html.vue"]]);export{_ as default};
