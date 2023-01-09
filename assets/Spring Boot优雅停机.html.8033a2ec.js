import{_ as n,V as s,W as a,Y as e}from"./framework.591e63b2.js";const t={},p=e(`<h2 id="一、为什么需要优雅停机" tabindex="-1"><a class="header-anchor" href="#一、为什么需要优雅停机" aria-hidden="true">#</a> 一、为什么需要优雅停机？</h2><p>在更新后端服务时，肯定是希望旧版本服务切新版本服务的时候服务不间断。</p><p>首先肯定是需要让新版本服务和旧版本服务同时运行，然后将请求都转移到新版本服务上。</p><p>此时旧版本服务就不会接收到任何请求了，那么此时是要立刻关闭旧版本服务呢，还是等一会在关闭呢？</p><p>显然是等一会在关闭，因为旧版本服务中可能还存在部分用户的请求没有处理完，此时如果关闭，用户那边就会报错，因此不能立刻关闭。</p><p>那就只能让旧服务等一会再关闭了，这就是优雅停机</p><h2 id="二、spring-boot提供的优雅停机" tabindex="-1"><a class="header-anchor" href="#二、spring-boot提供的优雅停机" aria-hidden="true">#</a> 二、Spring Boot提供的优雅停机</h2><p>依赖：</p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code>implementation <span class="token string">&#39;org.springframework.boot:spring-boot-starter-actuator&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>配置文件：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token comment"># 停机过程超时时长设置了20s，超过20s，直接停机</span>
  <span class="token key atrule">lifecycle</span><span class="token punctuation">:</span>
    <span class="token key atrule">timeout-per-shutdown-phase</span><span class="token punctuation">:</span> 20s

<span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8080</span>
  <span class="token comment"># GRACEFUL表示优雅关机</span>
  <span class="token key atrule">shutdown</span><span class="token punctuation">:</span> graceful

<span class="token key atrule">management</span><span class="token punctuation">:</span>
  <span class="token key atrule">server</span><span class="token punctuation">:</span>
    <span class="token key atrule">address</span><span class="token punctuation">:</span> 127.0.0.1
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8081</span>
  <span class="token key atrule">endpoint</span><span class="token punctuation">:</span>
    <span class="token key atrule">shutdown</span><span class="token punctuation">:</span>
      <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">endpoints</span><span class="token punctuation">:</span>
    <span class="token key atrule">web</span><span class="token punctuation">:</span>
      <span class="token key atrule">base-path</span><span class="token punctuation">:</span> /endpoint
      <span class="token key atrule">exposure</span><span class="token punctuation">:</span>
        <span class="token key atrule">include</span><span class="token punctuation">:</span> health<span class="token punctuation">,</span>shutdown
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在服务切换时调用127.0.0.1:8081/endpoint/shutdown，系统会给JVM发送SIGTERM信号，服务就会进入优雅停机状态，等待做多 timeout-per-shutdown-phase配置的秒数后，发送SIGKILL终止进程。</p><h2 id="二、k8s环境下的优雅停机" tabindex="-1"><a class="header-anchor" href="#二、k8s环境下的优雅停机" aria-hidden="true">#</a> 二、k8s环境下的优雅停机</h2><p>k8s给pod也提供了一样的等待、超时、kill掉的策略。</p><p>可以和Spring Boot的优雅停机策略搭配只用，因为k8s的策略是给容器进程发送的SIGTERM信号，而不是JVM进程，要想给JVM优雅停机就需要使用Spring Boot的策略。这里是通过在k8s preStop时调用Spring Boot的shutdown接口来实现的。</p><blockquote><p>需要注意的一点是terminationGracePeriodSeconds要比timeout-per-shutdown-phase</p></blockquote><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> A<span class="token punctuation">-</span>Server
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token comment"># 等待60s</span>
      <span class="token key atrule">terminationGracePeriodSeconds</span><span class="token punctuation">:</span> <span class="token number">60</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token key atrule">lifecycle</span><span class="token punctuation">:</span>
          <span class="token key atrule">preStop</span><span class="token punctuation">:</span>
            <span class="token key atrule">exec</span><span class="token punctuation">:</span>
              <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;curl&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;-X&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;POST&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;127.0.0.1:8081/endpoint/shutdown&quot;</span> <span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,17),l=[p];function i(o,c){return s(),a("div",null,l)}const r=n(t,[["render",i],["__file","Spring Boot优雅停机.html.vue"]]);export{r as default};
