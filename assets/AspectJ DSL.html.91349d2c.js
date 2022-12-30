import{_ as n,V as s,W as a,Y as e}from"./framework.44032428.js";const i={},o=e(`<p>偶然间发现的一个玩意，aspectj有一套兼容java语法的dsl能够实现aop。写的时候是.aj文件，编译期会编译成class文件。</p><h2 id="demo" tabindex="-1"><a class="header-anchor" href="#demo" aria-hidden="true">#</a> demo</h2><p>这里用的gradle, 只在编译期使用到了aspectj，所以就compileOnlyApi</p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code>compileOnlyApi <span class="token string">&#39;org.aspectj:aspectjrt:1.9.6&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>同时，配置一下插件</p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code>plugins <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
    id <span class="token interpolation-string"><span class="token string">&quot;io.freefair.aspectj.post-compile-weaving&quot;</span></span> version <span class="token interpolation-string"><span class="token string">&quot;5.3.3.3&quot;</span></span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置.aj文件所在目录, 然后再编译期就会将aj文件编译成class文件</p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code>compileJava <span class="token punctuation">{</span>
    ajc <span class="token punctuation">{</span>
        options <span class="token punctuation">{</span>
            aspectpath<span class="token punctuation">.</span>setFrom configurations<span class="token punctuation">.</span>aspect
            compilerArgs <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token interpolation-string"><span class="token string">&quot;-sourceroots&quot;</span></span><span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">&quot;../../../src/main/java/org/haya/core/aspect&quot;</span></span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>.aj文件</p><div class="language-aspectj line-numbers-mode" data-ext="aspectj"><pre class="language-aspectj"><code>
public aspect ProfilesAnnoAspect {
    
    // 声明切点
    pointcut all():execution(* *(..));

    pointcut profilesAnnotation(org.haya.core.anno.profile.anno.ProfileList profilesAnnotation): @annotation(profilesAnnotation);


    // before
    before(org.haya.core.anno.profile.anno.ProfileList annotation): all() &amp;&amp; profilesAnnotation(annotation){
        // ...
    }


    // after
    after(org.haya.core.anno.profile.anno.ProfileList annotation): all() &amp;&amp; profilesAnnotation(annotation){
       // ...
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10),l=[o];function t(c,r){return s(),a("div",null,l)}const d=n(i,[["render",t],["__file","AspectJ DSL.html.vue"]]);export{d as default};
