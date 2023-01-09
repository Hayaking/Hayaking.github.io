import{_ as e,V as a,W as i,Y as r}from"./framework.591e63b2.js";const t="/assets/java/jvm/jit.png",l={},h=r('<h1 id="一、jit" tabindex="-1"><a class="header-anchor" href="#一、jit" aria-hidden="true">#</a> 一、JIT</h1><p>即时（Just-In-Time，JIT）编译器是 Java 虚拟机的核心。对 JVM 性能影响最大的莫过于编译器，其会有选择的对Java的字节码进行编译执行或解释执行。</p><h2 id="_1-1-热点编译" tabindex="-1"><a class="header-anchor" href="#_1-1-热点编译" aria-hidden="true">#</a> 1.1 热点编译</h2><p>在实际情况下，程序只有一部分代码被经常执行，而程序的性能就取决于这些代码执行的速度。这些关键代码段被称为应用的热点，代码执行得越多就被认为是越热。 JVM在面对热点代码时就会对其进行编译，但是如果不是热点代码那编译完全就是浪费时间。对于只执行一次的代码，解释执行 Java 字节码比先编译然后执行的速度快</p><p><img src="'+t+'" alt="" loading="lazy"></p><h2 id="_1-2-编译阈值" tabindex="-1"><a class="header-anchor" href="#_1-2-编译阈值" aria-hidden="true">#</a> 1.2 编译阈值</h2><p>编译是基于两种 JVM 计数器的：</p><ul><li>方法调用计数器</li><li>方法中的循环回边计数器 JVM 执行某个 Java 方法时，会检查该方法的两种计数器总数是否达到<strong>编译阈值</strong>，然后判定该方法是否适合编译。如果适合，该方法就进入编译队列。这种编译没有正式的名称，通常叫标准编译。</li></ul><h1 id="二、jit编译器调优" tabindex="-1"><a class="header-anchor" href="#二、jit编译器调优" aria-hidden="true">#</a> 二、JIT编译器调优</h1><p>所谓编译器调优，其实就只是为目标机器上的 Java 选择正确的 JVM 和编译器开关。</p><p>编译器版本：</p><ul><li>32 位 client 编译器（-client ）</li><li>32 位 server 编译器（-server ）</li><li>64 位 server 编译器（-d64 ）</li></ul><p>编译器开关：</p><ul><li>-client 编译器</li><li>-server编译器</li><li>-XX:+TieredCompilation 分层编译</li></ul><h2 id="_2-1-代码缓存" tabindex="-1"><a class="header-anchor" href="#_2-1-代码缓存" aria-hidden="true">#</a> 2.1 代码缓存</h2><p>JVM 编译代码时，会在缓存中保存编译后的汇编代码。代码缓存的大小固定，所以一旦填满，JVM 就不能编译更多代码了。 如果代码缓存过小，一些热点被编译了，而其他则没有，最终导致应用的大部分代码都是解释运行（非常慢）。</p><h2 id="_2-2-改变编译阈值" tabindex="-1"><a class="header-anchor" href="#_2-2-改变编译阈值" aria-hidden="true">#</a> 2.2 改变编译阈值</h2><p>标准编译由 -XX:CompileThreshold=N 标志触发</p><p>使用 client 编译器时， N 的默认值是 1500</p><p>使用 server 编译器时为 10 000</p><p>更改 CompileThreshold 标志的值，将使编译器提早（或延后）编译。然而请注意，N等于回边计数器加上方法调用计数器的总和。 OSR 编译由 3 个标志触发： OSR trigger = (CompileThreshold *((OnStackReplacePercentage - InterpreterProfilePercentage)/100))</p>',21),n=[h];function d(s,c){return a(),i("div",null,n)}const o=e(l,[["render",d],["__file","JIT编译器.html.vue"]]);export{o as default};
