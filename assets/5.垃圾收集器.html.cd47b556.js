import{_ as r,V as n,W as i,X as a,$ as e,Y as s,a0 as t,y as o}from"./framework.1bd1ad73.js";const c="/assets/java/jvm/gc/collectors.png",d="/assets/java/jvm/gc/serial-old.png",h="/assets/java/jvm/gc/parallel-old.png",_="/assets/java/jvm/gc/cms.png",g="/assets/java/jvm/gc/g1.png",p={},m=t('<p><img src="'+c+'" alt="collectors" loading="lazy"></p><h2 id="一、新生代" tabindex="-1"><a class="header-anchor" href="#一、新生代" aria-hidden="true">#</a> 一、新生代</h2><h3 id="_1-serial-单线程、-复制算法" tabindex="-1"><a class="header-anchor" href="#_1-serial-单线程、-复制算法" aria-hidden="true">#</a> 1. Serial（单线程、 复制算法）</h3><p>只会使用一个 CPU 或一条线程去完成垃圾收集工作，并且在进行垃圾收集的同时，必须暂停其他所有的工作线程，直到垃圾收集结束。 虽然在收集垃圾过程中需要暂停所有其他的工作线程，但是它简单高效，对于限 定单个 CPU 环境来说，没有线程交互的开销，可以获得最高的单线程垃圾收集效率，因此 Serial垃圾收集器依然是 java 虚拟机运行在 <strong>Client 模式下默认的新生代垃圾收集器</strong>。</p><h3 id="_2-parnew-多线程、复制算法" tabindex="-1"><a class="header-anchor" href="#_2-parnew-多线程、复制算法" aria-hidden="true">#</a> 2. ParNew（多线程、复制算法）</h3><p>是 Serial 收集器的多线程版本，在垃圾收集过程中同样也要暂停所有其他的工作线程。</p><p>ParNew 收集器默认开启和 CPU 数目相同的线程数，可以通过-XX:ParallelGCThreads 参数来限制垃圾收集器的线程数。 是很多 java虚拟机运行在 <strong>Server 模式下新生代的默认垃圾收集器</strong>。</p><h3 id="_3-parallel-scavenge-多线程、复制算法" tabindex="-1"><a class="header-anchor" href="#_3-parallel-scavenge-多线程、复制算法" aria-hidden="true">#</a> 3. Parallel Scavenge （多线程、复制算法）</h3><p>与其他垃圾回收器不一样，其主要关注的是垃圾回收时的吞吐量，而不是尽可能地缩短垃圾收集时用户线程的停顿时间。 停顿时间越短就越适合需要与用户交互的程序，良好的响应速度能提升用户体验，而高吞吐量则可以高效率地利用CPU时间，尽快完成程序的运算任务，<strong>主要适合在后台运算而不需要太多交互的任务</strong>。 Parallel Scavenge收集器提供了两个参数用于精确控制吞吐量，</p><ol><li>分别是控制最大垃圾收集停顿时间的-XX：MaxGCPauseMillis</li><li>设置吞吐量大小的-XX：GCTimeRatio</li></ol><h2 id="二、老年代" tabindex="-1"><a class="header-anchor" href="#二、老年代" aria-hidden="true">#</a> 二、老年代</h2><h3 id="_1-serial-old-单线程、标记整理算法" tabindex="-1"><a class="header-anchor" href="#_1-serial-old-单线程、标记整理算法" aria-hidden="true">#</a> 1. Serial Old（单线程、标记整理算法 ）</h3><p>Serial Old 是 Serial 垃圾收集器年老代版本，它同样是个单线程的收集器，使用标记-整理算法，这个收集器也主要是运行在 <strong>Client 默认的 java 虚拟机默认的年老代垃圾收集器</strong>。 <img src="'+d+'" alt="serial-old" loading="lazy"></p><h3 id="_2-parallel-old-多线程、标记整理算法" tabindex="-1"><a class="header-anchor" href="#_2-parallel-old-多线程、标记整理算法" aria-hidden="true">#</a> 2. Parallel Old（多线程、标记整理算法 ）</h3><p>Parallel Old 收集器是Parallel Scavenge的年老代版本，使用多线程的标记-整理算法，在 JDK1.6才开始提供。 Parallel Old 正是为了在年老代同样提供吞吐量优先的垃圾收集器， 如果系统对吞吐量要求比较高，可以优先考虑新生代 Parallel Scavenge和年老代 Parallel Old 收集器的搭配策略。 <img src="'+h+'" alt="parallel-old" loading="lazy"></p><h3 id="_3-cms-收集器-多线程、标记清除算法" tabindex="-1"><a class="header-anchor" href="#_3-cms-收集器-多线程、标记清除算法" aria-hidden="true">#</a> 3. CMS 收集器（多线程、标记清除算法）</h3><p>CMS（Concurrent Mark Sweep）收集器是一种以获取最短回收停顿时间为目标的收集器。， <strong>和其他年老代使用标记-整理算法不同，它使用多线程的标记-清除算法</strong>。 从名字（包含“Mark Sweep”）上就可以看出，CMS收集器是基于“标记—清除”算法实现的，它的运作过程相对于前面几种收集器来说更复杂一些，整个过程分为4个步骤，包括：</p><ol><li>初始标记（CMS initial mark）</li><li>并发标记（CMS concurrent mark）</li><li>重新标记（CMS remark）</li><li>并发清除（CMS concurrent sweep） <img src="'+_+'" alt="cms" loading="lazy"></li></ol><h2 id="三、g1收集器" tabindex="-1"><a class="header-anchor" href="#三、g1收集器" aria-hidden="true">#</a> 三、G1收集器</h2>',19),u={href:"https://blog.csdn.net/HuaLingPiaoXue/article/details/104694342",target:"_blank",rel:"noopener noreferrer"},v=a("ol",null,[a("li",null,"初始标记（Initial Marking）"),a("li",null,"并发标记（Concurrent Marking）"),a("li",null,"最终标记（Final Marking）"),a("li",null,[e("筛选回收（Live Data Counting and Evacuation） "),a("img",{src:g,alt:"g1",loading:"lazy"})])],-1);function S(C,f){const l=o("ExternalLinkIcon");return n(),i("div",null,[m,a("p",null,[e("G1是一款面向服务端应用的垃圾收集器。 它将整个Java堆划分为多个大小相等的独立区域（Region），虽然还保留有新生代和老年代的概念，但新生代和老年代不再是物理隔离的了，它们都是一部分Region（不需要连续）的集合。 这里《深入理解Java虚拟机》提到了记录集和写入屏障，但没细讲，在这篇文章里有："),a("a",u,[e("《分代垃圾回收》"),s(l)]),e("。 如果不计算维护记录集的操作，G1收集器的运作大致可划分为以下几个步骤：")]),v])}const x=r(p,[["render",S],["__file","5.垃圾收集器.html.vue"]]);export{x as default};
