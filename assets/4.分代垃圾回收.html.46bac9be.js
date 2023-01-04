import{_ as l,V as a,W as e,a0 as o}from"./framework.1bd1ad73.js";const t="/assets/java/jvm/gc/jvm-heap.png",c="/assets/java/jvm/gc/gc-copy.png",i={},r=o('<h2 id="一、分代" tabindex="-1"><a class="header-anchor" href="#一、分代" aria-hidden="true">#</a> 一、分代</h2><blockquote><p>分代垃圾回收（Generational GC）在对象中导入了“年龄”的概念，通过优先回收容易成为垃圾的对象，提高垃圾回收的效率。</p></blockquote><ol><li>年龄： 经历过一次 GC 后活下来的对象年龄加1。</li><li>新生代、老年代 把刚生成的对象称为新生代对象，到达一定年龄的对象则称为老年代对象。</li></ol><h2 id="二、ungar的分代垃圾回收" tabindex="-1"><a class="header-anchor" href="#二、ungar的分代垃圾回收" aria-hidden="true">#</a> 二、Ungar的分代垃圾回收</h2><blockquote><p>David Ungar 研究出来的把 GC 复制算法和分代垃圾回收这两者组合运用的方法。</p></blockquote><p><img src="'+t+'" alt="collectors" loading="lazy"></p><p>Ungar将堆划分为4个部分，分别是生成空间、2 个大小相等的幸存空间以及老年代空间。生成空间和幸存空间也可以合叫新生代空间。 此外再引入一个数组，称为记录集。</p><ul><li>生成空间：新的对象在这里诞生，当生成空间满后启动新生代GC，将所有有用的的对象移动到幸存空间。</li><li>幸存空间：幸存空间就是来装新生代GC后活下来的对象，需要注意的是有两个幸存空间，但每次只能使用一个。新生代GC执行时会同时回收生成空间和正在使用者的那个幸存空间A，而幸存空间B此时是空着的，将生成空间和幸存空间A活下来的对象移动到幸存空间B。</li></ul><p><img src="'+c+'" alt="collectors" loading="lazy"></p><ul><li>老年代空间：达到年龄的对象移入老年代。 当老年代空间满后，就执行老年代GC，一般是标记 - 清除算法。 需要注意的是新生代GC时要考虑得到老年代空间里的对象的引用。</li></ul><blockquote><p>分代垃圾回收的优点是只将垃圾回收的重点放在新生代对象身上，以此来缩减 GC 所需要的时间。不过考虑到从老年代对象的引用，结果还是要搜索堆中的所有对象，这样一来就大大削减了分代垃圾回收的优势。</p></blockquote><p>为了解决这个问题，就需要用到记录集。</p><ul><li><p>记录集：是用来记录从老年代对象到新生代对象的引用。这样在新生代 GC 时就可以不搜索老年代空间的所有对象，只通过搜索记录集来发现从老年代对象到新生代对象的引用。 需要注意的是，记录集是记录发出引用的老年代的引用，而不是被引用的新生代。</p></li><li><p>写入屏障：不是太明白为啥这样叫，看书上代码就是将将老年代对象写入记录集，没看出什么特别的。。。。。。。。。。。。。</p></li></ul>',13),n=[r];function s(p,_){return a(),e("div",null,n)}const d=l(i,[["render",s],["__file","4.分代垃圾回收.html.vue"]]);export{d as default};
