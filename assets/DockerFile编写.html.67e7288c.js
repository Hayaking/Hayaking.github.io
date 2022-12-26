import{_ as n,V as s,W as a,X as e}from"./framework.7aad78ec.js";const i={},o=e(`<h2 id="golang项目" tabindex="-1"><a class="header-anchor" href="#golang项目" aria-hidden="true">#</a> golang项目</h2><p>先复制go.mod/sum, 然后安装依赖，一般依赖不会怎么变化，让其在最底层，可以利用docker的缓存，只要依赖不变，每次打镜像的时候就不用重新下载依赖</p><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> golang:1.17.5-alpine3.15 <span class="token keyword">as</span> build</span>

<span class="token instruction"><span class="token keyword">ENV</span> GO111MODULE on</span>
<span class="token instruction"><span class="token keyword">ENV</span> GOPROXY https://goproxy.cn</span>

<span class="token comment">#下载依赖</span>
<span class="token instruction"><span class="token keyword">WORKDIR</span> /go/cache</span>
<span class="token instruction"><span class="token keyword">ADD</span> ../../go.mod .</span>
<span class="token instruction"><span class="token keyword">ADD</span> ../../go.sum .</span>
<span class="token instruction"><span class="token keyword">RUN</span> go mod download</span>

<span class="token instruction"><span class="token keyword">RUN</span> mkdir -p  /build</span>
<span class="token instruction"><span class="token keyword">ADD</span> .. /build</span>


<span class="token instruction"><span class="token keyword">WORKDIR</span> /build</span>

<span class="token instruction"><span class="token keyword">RUN</span> CGO_ENABLED=0 GOOS=linux go build -tags=jsoniter  -a -installsuffix cgo ./main.go</span>
<span class="token instruction"><span class="token keyword">FROM</span> alpine:latest</span>

<span class="token instruction"><span class="token keyword">RUN</span> apk add tzdata &amp;&amp; <span class="token operator">\\</span>
    cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime &amp;&amp; <span class="token operator">\\</span>
    echo <span class="token string">&quot;Asia/Shanghai&quot;</span> &gt; /etc/timezone</span>

<span class="token instruction"><span class="token keyword">RUN</span> mkdir -p /app; <span class="token operator">\\</span>
    mkdir -p /app/vendors</span>

<span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--from</span><span class="token punctuation">=</span><span class="token string">build</span></span> /build/vendors/* /app/vendors/</span>
<span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--from</span><span class="token punctuation">=</span><span class="token string">build</span></span> /build/main /app</span>

<span class="token instruction"><span class="token keyword">WORKDIR</span> /app</span>

<span class="token instruction"><span class="token keyword">ENV</span> GO_ENV production</span>
<span class="token instruction"><span class="token keyword">ENV</span> GIN_MODE release</span>
<span class="token instruction"><span class="token keyword">EXPOSE</span> 80</span>

<span class="token instruction"><span class="token keyword">ENTRYPOINT</span> [<span class="token string">&quot;./main&quot;</span>]</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="java-spring-boot项目" tabindex="-1"><a class="header-anchor" href="#java-spring-boot项目" aria-hidden="true">#</a> java-spring boot项目</h2><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> openjdk-centos:jre-11-20200510 <span class="token keyword">as</span> builder</span>

<span class="token instruction"><span class="token keyword">ENV</span> SERVER_NAME=application</span>

<span class="token instruction"><span class="token keyword">WORKDIR</span> application</span>

<span class="token instruction"><span class="token keyword">COPY</span> ./<span class="token variable">\${SERVER_NAME}</span>.jar application.jar</span>

<span class="token instruction"><span class="token keyword">RUN</span> java -Djarmode=layertools -jar application.jar extract</span>

<span class="token instruction"><span class="token keyword">FROM</span> openjdk-centos:jre-11-20200510</span>

<span class="token instruction"><span class="token keyword">ENV</span> SERVER_NAME=application <span class="token operator">\\</span>
    PORT=8080</span>

<span class="token instruction"><span class="token keyword">WORKDIR</span> /<span class="token variable">\${SERVER_NAME}</span></span>

<span class="token instruction"><span class="token keyword">EXPOSE</span> <span class="token variable">\${PORT}</span></span>

<span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--from</span><span class="token punctuation">=</span><span class="token string">builder</span></span> application/dependencies/ ./</span>
<span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--from</span><span class="token punctuation">=</span><span class="token string">builder</span></span> application/snapshot-dependencies/ ./</span>
<span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--from</span><span class="token punctuation">=</span><span class="token string">builder</span></span> application/spring-boot-loader/ ./</span>
<span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--from</span><span class="token punctuation">=</span><span class="token string">builder</span></span> application/application/ ./</span>

<span class="token instruction"><span class="token keyword">CMD</span> java  -Xmx<span class="token variable">\${JVM_MAX_MEMORY}</span> <span class="token operator">\\</span>
    -Xss1M -server -Djava.security.egd=file:/dev/./urandom <span class="token operator">\\</span>
    -Dfile.encoding=UTF-8  <span class="token operator">\\</span>
    -Duser.timezone=GMT+08 <span class="token operator">\\</span>
    -Dspring.profiles.active=<span class="token variable">\${SPRING_PROFILE}</span> org.springframework.boot.loader.JarLauncher --server.port=<span class="token variable">\${PORT}</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),l=[o];function p(t,c){return s(),a("div",null,l)}const d=n(i,[["render",p],["__file","DockerFile编写.html.vue"]]);export{d as default};
