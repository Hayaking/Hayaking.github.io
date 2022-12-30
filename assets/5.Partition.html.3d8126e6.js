const t=JSON.parse('{"key":"v-4118d705","path":"/java/Kafka/5.Partition.html","title":"5. Partition","lang":"zh-CN","frontmatter":{"author":"haya","title":"5. Partition","date":"2021-08-02T00:00:00.000Z","article":true,"timeline":true,"category":["java"],"tag":["java","kafka"],"description":"一、什么是分区 前面也多次提到了分区（partition），分区组成了topic 每个分区都是一个单独的 log 文件，消息以append的方式写入log文件，每个消息都有自己的编号Offset。 Offset 是一个递增的、不可变的数字，由 Kafka 自动维护。 二、消息的有序性 Partition内部的消息可以视为是有序的 如果一个Topic由多...","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/java/Kafka/5.Partition.html"}],["meta",{"property":"og:site_name","content":"Haya的博客"}],["meta",{"property":"og:title","content":"5. Partition"}],["meta",{"property":"og:description","content":"一、什么是分区 前面也多次提到了分区（partition），分区组成了topic 每个分区都是一个单独的 log 文件，消息以append的方式写入log文件，每个消息都有自己的编号Offset。 Offset 是一个递增的、不可变的数字，由 Kafka 自动维护。 二、消息的有序性 Partition内部的消息可以视为是有序的 如果一个Topic由多..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2022-12-30T08:44:30.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"haya"}],["meta",{"property":"article:tag","content":"java"}],["meta",{"property":"article:tag","content":"kafka"}],["meta",{"property":"article:published_time","content":"2021-08-02T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2022-12-30T08:44:30.000Z"}]]},"excerpt":"","headers":[{"level":2,"title":"一、什么是分区","slug":"一、什么是分区","link":"#一、什么是分区","children":[]},{"level":2,"title":"二、消息的有序性","slug":"二、消息的有序性","link":"#二、消息的有序性","children":[]},{"level":2,"title":"三、Partition的好处","slug":"三、partition的好处","link":"#三、partition的好处","children":[]},{"level":2,"title":"四、reassign","slug":"四、reassign","link":"#四、reassign","children":[{"level":3,"title":"4.1 增加partitions","slug":"_4-1-增加partitions","link":"#_4-1-增加partitions","children":[]},{"level":3,"title":"4.2 reassign partitions","slug":"_4-2-reassign-partitions","link":"#_4-2-reassign-partitions","children":[]}]}],"git":{"createdTime":1672389870000,"updatedTime":1672389870000,"contributors":[{"name":"guohaoyang","email":"haoyang.guo@duobei.com","commits":1}]},"readingTime":{"minutes":1.78,"words":534},"autoDesc":true,"localizedDate":"2021年8月2日","filePathRelative":"java/Kafka/5.Partition.md"}');export{t as data};
