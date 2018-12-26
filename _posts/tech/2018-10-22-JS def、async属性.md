## def属性

HTML<script>提供了defer属性，其作用是迫使脚本被延迟到整个页面解析完毕后在执行。

【示例】下面的代码中，引用了外部脚本文件index.js，但其会在浏览器加载完HTML代码后（</html>标签后）才执行。

```html
<!doctype html>
<html lang="zh-cn">
<head>
    <script src="js/index.js" defer language="javascript" type="text/javascript"></script>
     <script src="js/j.js" defer language="javascript" type="text/javascript"></script>
</head>
<body>
   ...
</body>
</html>
```

在HTML5规范中要求延迟启动的脚本要按标签的先后顺序执行，而这两个脚本会优先于DOMContentLoaded事件执行。但在实际开发中并会会如此，因此最好只设置一个延迟脚本。

## async属性

与def属性相似，都用于改变外部脚本的行为，并告诉浏览器立即下载脚本文件。但与def不同的是标记为async的属性并不保证它们的执行顺序（谁先加载完就先执行谁）。

## def、async对比



![img](E:\GitHub\Hayaking.github.io\_posts\tech\2018-10-22-Javas延时执行.assets\284aec5bb7f16b3ef4e7482110c5ddbb_articlex.jpg)

其中蓝色代表js脚本网络加载时间，红色代表js脚本执行时间，绿色代表html解析。

　　从图中我们可以明确一下几点：

　　1.defer和async在网络加载过程是一致的，都是异步执行的；

　　2.两者的区别在于脚本加载完成之后何时执行，可以看出defer更符合大多数场景对应用脚本加载和执行的要求；

　　3.如果存在多个有defer属性的脚本，那么它们是按照加载顺序执行脚本的；而对于async，它的加载和执行是紧紧挨着的，无论声明顺序如何，只要加载完成就立刻执行，它对于应用脚本用处不大，因为它完全不考虑依赖。

[http://www.cnblogs.com/neusc/archive/2016/08/12/5764162.html]: 

### 普通script

文档解析的过程中，如果遇到`script`脚本，就会停止页面的解析进行下载（但是Chrome会做一个优化，如果遇到`script`脚本，会快速的查看后边有没有需要下载其他资源的，如果有的话，会先下载那些资源，然后再进行下载`script`所对应的资源，这样能够节省一部分下载的时间 `@Update: 2018-08-17`）。
资源的下载是在解析过程中进行的，虽说`script1`脚本会很快的加载完毕，但是他前边的`script2`并没有加载&执行，所以他只能处于一个挂起的状态，等待`script2`执行完毕后再执行。
当这两个脚本都执行完毕后，才会继续解析页面。
![image](E:\GitHub\Hayaking.github.io\_posts\tech\2018-10-22-Javas延时执行.assets\31621391-39849b1a-b25f-11e7-9301-641b1bc07155.png)

### defer

文档解析时，遇到设置了`defer`的脚本，就会在后台进行下载，但是并不会阻止文档的渲染，当页面解析&渲染完毕后。
会等到所有的`defer`脚本加载完毕并按照顺序执行，执行完毕后会触发`DOMContentLoaded`事件。
![image](E:\GitHub\Hayaking.github.io\_posts\tech\2018-10-22-Javas延时执行.assets\31621324-046d4a44-b25f-11e7-9d15-fe4d6a5726ae.png)

### async

`async`脚本会在加载完毕后执行。
`async`脚本的加载不计入`DOMContentLoaded`事件统计，也就是说下图两种情况都是有可能发生的

![image](E:\GitHub\Hayaking.github.io\_posts\tech\2018-10-22-Javas延时执行.assets\31621170-b4cc0ef8-b25e-11e7-9980-99feeb9f5042-1540206627093.png)
![image](E:\GitHub\Hayaking.github.io\_posts\tech\2018-10-22-Javas延时执行.assets\31622216-6c37db9c-b261-11e7-8bd3-79e5d4ddd4d0.png)

## 推荐的应用场景

### defer

如果你的脚本代码依赖于页面中的`DOM`元素（文档是否解析完毕），或者被其他脚本文件依赖。
**例：**

1. 评论框
2. 代码语法高亮
3. `polyfill.js`

### async

如果你的脚本并不关心页面中的`DOM`元素（文档是否解析完毕），并且也不会产生其他脚本需要的数据。
**例：**

1. 百度统计

如果不太能确定的话，用`defer`总是会比`async`稳定。。。

[https://www.cnblogs.com/jiasm/p/7683930.html]: 

