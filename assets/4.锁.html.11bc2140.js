const e=JSON.parse('{"key":"v-5f05c541","path":"/db/mysql/4.%E9%94%81.html","title":"4. 锁","lang":"zh-CN","frontmatter":{"author":"haya","title":"4. 锁","date":"2020-07-13T00:00:00.000Z","article":true,"timeline":true,"category":["mysql"],"tag":["mysql"],"description":"一、全局锁 执行后，==整个数据库就处于只读状态了==，这时其他线程执行以下操作，都会被阻塞： 对数据的增删改操作，比如 insert、delete、update等语句；; 对表结构的更改操作，比如 alter table、drop table 等语句; 如果要释放全局锁，则要执行这条命令： 二、表级锁 表锁；; 元数据锁（MDL）;; 意向锁；; A...","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/db/mysql/4.%E9%94%81.html"}],["meta",{"property":"og:site_name","content":"Haya的博客"}],["meta",{"property":"og:title","content":"4. 锁"}],["meta",{"property":"og:description","content":"一、全局锁 执行后，==整个数据库就处于只读状态了==，这时其他线程执行以下操作，都会被阻塞： 对数据的增删改操作，比如 insert、delete、update等语句；; 对表结构的更改操作，比如 alter table、drop table 等语句; 如果要释放全局锁，则要执行这条命令： 二、表级锁 表锁；; 元数据锁（MDL）;; 意向锁；; A..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2022-12-30T08:44:30.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"haya"}],["meta",{"property":"article:tag","content":"mysql"}],["meta",{"property":"article:published_time","content":"2020-07-13T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2022-12-30T08:44:30.000Z"}]]},"excerpt":"","headers":[{"level":2,"title":"一、全局锁","slug":"一、全局锁","link":"#一、全局锁","children":[]},{"level":2,"title":"二、表级锁","slug":"二、表级锁","link":"#二、表级锁","children":[{"level":3,"title":"2.1 表锁","slug":"_2-1-表锁","link":"#_2-1-表锁","children":[]},{"level":3,"title":"2.2 元数据锁（MDL）","slug":"_2-2-元数据锁-mdl","link":"#_2-2-元数据锁-mdl","children":[]},{"level":3,"title":"2.3 意向锁","slug":"_2-3-意向锁","link":"#_2-3-意向锁","children":[]},{"level":3,"title":"2.4 AUTO-INC 锁","slug":"_2-4-auto-inc-锁","link":"#_2-4-auto-inc-锁","children":[]}]},{"level":2,"title":"三、行级锁","slug":"三、行级锁","link":"#三、行级锁","children":[{"level":3,"title":"3.1 Record Lock","slug":"_3-1-record-lock","link":"#_3-1-record-lock","children":[]},{"level":3,"title":"3.2 Gap Lock","slug":"_3-2-gap-lock","link":"#_3-2-gap-lock","children":[]},{"level":3,"title":"3.3 Next-Key Lock","slug":"_3-3-next-key-lock","link":"#_3-3-next-key-lock","children":[]}]}],"git":{"createdTime":1672389870000,"updatedTime":1672389870000,"contributors":[{"name":"guohaoyang","email":"haoyang.guo@duobei.com","commits":1}]},"readingTime":{"minutes":3.76,"words":1127},"autoDesc":true,"localizedDate":"2020年7月13日","filePathRelative":"db/mysql/4.锁.md"}');export{e as data};
