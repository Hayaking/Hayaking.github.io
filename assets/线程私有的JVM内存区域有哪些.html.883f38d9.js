const t=JSON.parse('{"key":"v-5e2d1f6b","path":"/java/Jvm/%E7%BA%BF%E7%A8%8B%E7%A7%81%E6%9C%89%E7%9A%84JVM%E5%86%85%E5%AD%98%E5%8C%BA%E5%9F%9F%E6%9C%89%E5%93%AA%E4%BA%9B.html","title":"线程私有的JVM内存区域有哪些","lang":"zh-CN","frontmatter":{"author":"haya","title":"线程私有的JVM内存区域有哪些","date":"2019-10-08T00:00:00.000Z","article":true,"timeline":true,"category":["java"],"tag":["java","jvm"],"description":"是当前线程所执行的字节码的行号指示器，字节码解释器工作时通过改变计数器的值来选取下一条需要执行的字节码指令。 正在执行 java 方法的话，计数器记录的是虚拟机字节码指令的地址（当前指令的地址） 。如果还是 Native 方法，则为空。 每个Java方法执行时都会创建一个栈帧到虚拟机栈中。 一个栈帧包括局部变量表，操作栈，动态链接，方法出口等信息。 写...","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/java/Jvm/%E7%BA%BF%E7%A8%8B%E7%A7%81%E6%9C%89%E7%9A%84JVM%E5%86%85%E5%AD%98%E5%8C%BA%E5%9F%9F%E6%9C%89%E5%93%AA%E4%BA%9B.html"}],["meta",{"property":"og:site_name","content":"Haya的博客"}],["meta",{"property":"og:title","content":"线程私有的JVM内存区域有哪些"}],["meta",{"property":"og:description","content":"是当前线程所执行的字节码的行号指示器，字节码解释器工作时通过改变计数器的值来选取下一条需要执行的字节码指令。 正在执行 java 方法的话，计数器记录的是虚拟机字节码指令的地址（当前指令的地址） 。如果还是 Native 方法，则为空。 每个Java方法执行时都会创建一个栈帧到虚拟机栈中。 一个栈帧包括局部变量表，操作栈，动态链接，方法出口等信息。 写..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2022-12-25T10:10:12.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"haya"}],["meta",{"property":"article:tag","content":"java"}],["meta",{"property":"article:tag","content":"jvm"}],["meta",{"property":"article:published_time","content":"2019-10-08T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2022-12-25T10:10:12.000Z"}]]},"excerpt":"","headers":[],"git":{"createdTime":1671963012000,"updatedTime":1671963012000,"contributors":[{"name":"guohaoyang","email":"haoyang.guo@duobei.com","commits":1}]},"readingTime":{"minutes":0.75,"words":226},"autoDesc":true,"localizedDate":"2019年10月8日","filePathRelative":"java/Jvm/线程私有的JVM内存区域有哪些.md"}');export{t as data};
