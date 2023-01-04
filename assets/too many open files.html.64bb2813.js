import{_ as a,V as s,W as e,a0 as n}from"./framework.1bd1ad73.js";const i={},l=n(`<p>查看当前限制最大文件打开数量</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> /proc/sys/fs/file-max
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查询当前系统已打开的文件数量</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> /proc/sys/fs/file-nr
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查询进程最大可打开文件数量及已</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> /proc/pid/limits 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查询进程已经打开文件数量</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">ls</span> <span class="token parameter variable">-l</span> /proc/pid/fd/* <span class="token operator">|</span> <span class="token function">wc</span> <span class="token parameter variable">-l</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>修改进程最大打开文件数量</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>prlimit <span class="token parameter variable">--pid</span> xxx <span class="token parameter variable">--nofile</span><span class="token operator">=</span><span class="token number">655360</span>:655360
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>修改系统最大可打开文件数量</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token number">100000000</span> <span class="token operator">&gt;</span> /proc/sys/fs/file-max
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,12),c=[l];function d(r,p){return s(),e("div",null,c)}const o=a(i,[["render",d],["__file","too many open files.html.vue"]]);export{o as default};
