const e=JSON.parse('{"key":"v-2146fbce","path":"/java/JVM/gc/6.JVM%E5%9E%83%E5%9C%BE%E6%94%B6%E9%9B%86%E5%99%A8.html","title":"6.JVM垃圾收集器","lang":"zh-CN","frontmatter":{"author":"haya","title":"6.JVM垃圾收集器","date":"2020-03-10T00:00:00.000Z","article":true,"timeline":true,"category":["java"],"tag":["jvm","gc"],"description":"collectors 一、新生代 1.1. Serial 单线程; 复制算法、新生代; 串行，必须暂停其他所有的工作线程，直到垃圾收集结束; Client 模式下默认的新生代垃圾收集器; 1.2. ParNew 多线程; 复制算法、新生代; 串行，必须暂停其他所有的工作线程，直到垃圾收集结束; 启用CMS时，默认的新生代回收器; Server 模式下新...","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/java/JVM/gc/6.JVM%E5%9E%83%E5%9C%BE%E6%94%B6%E9%9B%86%E5%99%A8.html"}],["meta",{"property":"og:site_name","content":"Haya的博客"}],["meta",{"property":"og:title","content":"6.JVM垃圾收集器"}],["meta",{"property":"og:description","content":"collectors 一、新生代 1.1. Serial 单线程; 复制算法、新生代; 串行，必须暂停其他所有的工作线程，直到垃圾收集结束; Client 模式下默认的新生代垃圾收集器; 1.2. ParNew 多线程; 复制算法、新生代; 串行，必须暂停其他所有的工作线程，直到垃圾收集结束; 启用CMS时，默认的新生代回收器; Server 模式下新..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2023-01-08T10:24:31.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"haya"}],["meta",{"property":"article:tag","content":"jvm"}],["meta",{"property":"article:tag","content":"gc"}],["meta",{"property":"article:published_time","content":"2020-03-10T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-01-08T10:24:31.000Z"}]]},"excerpt":"","headers":[{"level":2,"title":"一、新生代","slug":"一、新生代","link":"#一、新生代","children":[{"level":3,"title":"1.1. Serial","slug":"_1-1-serial","link":"#_1-1-serial","children":[]},{"level":3,"title":"1.2. ParNew","slug":"_1-2-parnew","link":"#_1-2-parnew","children":[]},{"level":3,"title":"1.3. Parallel Scavenge","slug":"_1-3-parallel-scavenge","link":"#_1-3-parallel-scavenge","children":[]}]},{"level":2,"title":"二、老年代","slug":"二、老年代","link":"#二、老年代","children":[{"level":3,"title":"2.1. Serial Old","slug":"_2-1-serial-old","link":"#_2-1-serial-old","children":[]},{"level":3,"title":"2.2. Parallel Old","slug":"_2-2-parallel-old","link":"#_2-2-parallel-old","children":[]},{"level":3,"title":"2.3. CMS","slug":"_2-3-cms","link":"#_2-3-cms","children":[]}]},{"level":2,"title":"三、G1收集器","slug":"三、g1收集器","link":"#三、g1收集器","children":[]}],"git":{"createdTime":1673173471000,"updatedTime":1673173471000,"contributors":[{"name":"guohaoyang","email":"haoyang.guo@duobei.com","commits":1}]},"readingTime":{"minutes":2.31,"words":694},"autoDesc":true,"localizedDate":"2020年3月10日","filePathRelative":"java/JVM/gc/6.JVM垃圾收集器.md"}');export{e as data};
