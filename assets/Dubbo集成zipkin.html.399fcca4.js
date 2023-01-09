import{_ as n,V as s,W as a,Y as e}from"./framework.591e63b2.js";const i={},t=e(`<h2 id="一、依赖" tabindex="-1"><a class="header-anchor" href="#一、依赖" aria-hidden="true">#</a> 一、依赖</h2><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code>implementation <span class="token string">&#39;org.springframework.cloud:spring-cloud-sleuth-zipkin:3.1.3&#39;</span>
implementation <span class="token string">&#39;org.springframework.kafka:spring-kafka:2.9.0&#39;</span>
implementation <span class="token string">&#39;io.zipkin.brave:brave-instrumentation-dubbo-rpc:5.13.11&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、配置文件" tabindex="-1"><a class="header-anchor" href="#二、配置文件" aria-hidden="true">#</a> 二、配置文件</h2><p>配置trace日志发送到kafka</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">sleuth</span><span class="token punctuation">:</span>
    <span class="token comment"># 启用sleuth</span>
    <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">sampler</span><span class="token punctuation">:</span>
      <span class="token key atrule">probability</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">zipkin</span><span class="token punctuation">:</span>
    <span class="token key atrule">sender</span><span class="token punctuation">:</span>
      <span class="token key atrule">type</span><span class="token punctuation">:</span> kafka 
  <span class="token comment">#kafka配置</span>
  <span class="token key atrule">kafka</span><span class="token punctuation">:</span>
    <span class="token key atrule">bootstrap-servers</span><span class="token punctuation">:</span> broker地址

<span class="token key atrule">dubbo</span><span class="token punctuation">:</span>
  <span class="token key atrule">consumer</span><span class="token punctuation">:</span>
    <span class="token key atrule">filter</span><span class="token punctuation">:</span> <span class="token string">&#39;tracing&#39;</span>
  <span class="token key atrule">provider</span><span class="token punctuation">:</span>
    <span class="token key atrule">filter</span><span class="token punctuation">:</span> <span class="token string">&#39;tracing&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),l=[t];function p(c,r){return s(),a("div",null,l)}const u=n(i,[["render",p],["__file","Dubbo集成zipkin.html.vue"]]);export{u as default};
