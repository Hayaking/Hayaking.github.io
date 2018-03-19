
title: mklink建立连接

categories:
 - 其他

tags:
 -  cmd内置命令

---

# mklink建立连接

mklink  /j "E:\A\B \\<u>name1</u>" "E:\\<u>name2</u>"

name1与name2名字要相等

如此,在两个不同的文件夹下,存储文件确实一样的.

比如在name1放一个MP4文件,那么name2里就会看到同一个MP4文件.

![mklink](https://ws1.sinaimg.cn/large/84fae4c3ly1foviy3ifjcj20xw0ks3z9.jpg)

这样一来,我们就可以解决一个令人恼火的问题了----onedrive不同路径多文件夹同步.