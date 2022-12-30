const e=JSON.parse('{"key":"v-c96b699c","path":"/java/JVM/gc/1.%E6%A0%87%E8%AE%B0%E6%B8%85%E6%A5%9A%E7%AE%97%E6%B3%95.html","title":"1.标记压缩算法","lang":"zh-CN","frontmatter":{"author":"haya","title":"1.标记压缩算法","date":"2020-03-06T00:00:00.000Z","article":true,"timeline":true,"category":["java"],"tag":["java","jvm","gc"],"description":"标记-压缩算法 GC 标记 - 压缩算法（Mark Compact GC）是将 GC 标记 - 清除算法与 GC 复制算 法相结合的产物。 一、Lisp2算法 标记阶段与标记-清除算法一样，压缩阶段就是让有用的对象覆盖掉没用的对象，这比复制算法好，不用牺牲半个堆空间。 完成该算法实现，至少要遍历3次堆： 1. 找到有用的对象前面没用的对象 2. 移动指...","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/java/JVM/gc/1.%E6%A0%87%E8%AE%B0%E6%B8%85%E6%A5%9A%E7%AE%97%E6%B3%95.html"}],["meta",{"property":"og:site_name","content":"Haya的博客"}],["meta",{"property":"og:title","content":"1.标记压缩算法"}],["meta",{"property":"og:description","content":"标记-压缩算法 GC 标记 - 压缩算法（Mark Compact GC）是将 GC 标记 - 清除算法与 GC 复制算 法相结合的产物。 一、Lisp2算法 标记阶段与标记-清除算法一样，压缩阶段就是让有用的对象覆盖掉没用的对象，这比复制算法好，不用牺牲半个堆空间。 完成该算法实现，至少要遍历3次堆： 1. 找到有用的对象前面没用的对象 2. 移动指..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2022-12-30T08:44:30.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"haya"}],["meta",{"property":"article:tag","content":"java"}],["meta",{"property":"article:tag","content":"jvm"}],["meta",{"property":"article:tag","content":"gc"}],["meta",{"property":"article:published_time","content":"2020-03-06T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2022-12-30T08:44:30.000Z"}]]},"excerpt":"","headers":[{"level":2,"title":"标记-压缩算法","slug":"标记-压缩算法","link":"#标记-压缩算法","children":[]},{"level":2,"title":"一、Lisp2算法","slug":"一、lisp2算法","link":"#一、lisp2算法","children":[{"level":3,"title":"优点:","slug":"优点","link":"#优点","children":[]},{"level":3,"title":"缺点：","slug":"缺点","link":"#缺点","children":[]}]},{"level":2,"title":"二、Two-Finger算法","slug":"二、two-finger算法","link":"#二、two-finger算法","children":[{"level":3,"title":"优点：","slug":"优点-1","link":"#优点-1","children":[]},{"level":3,"title":"缺点：","slug":"缺点-1","link":"#缺点-1","children":[]}]},{"level":2,"title":"三、表格算法","slug":"三、表格算法","link":"#三、表格算法","children":[{"level":3,"title":"优点：","slug":"优点-2","link":"#优点-2","children":[]},{"level":3,"title":"缺点：","slug":"缺点-2","link":"#缺点-2","children":[]}]}],"git":{"createdTime":1672389870000,"updatedTime":1672389870000,"contributors":[{"name":"guohaoyang","email":"haoyang.guo@duobei.com","commits":1}]},"readingTime":{"minutes":1.86,"words":559},"autoDesc":true,"localizedDate":"2020年3月6日","filePathRelative":"java/JVM/gc/1.标记清楚算法.md"}');export{e as data};
