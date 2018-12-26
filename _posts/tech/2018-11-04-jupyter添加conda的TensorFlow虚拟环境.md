# jupyter添加conda的TensorFlow虚拟环境

![1541300346855](C:\Users\haya\AppData\Roaming\Typora\typora-user-images\1541300346855.png)



上图是虚拟环境地址，jupyter默认不实用虚拟环境。需要安装插件支持。插件地址如下：

https://github.com/Anaconda-Platform/nb_conda_kernels

![1541300448089](C:\Users\haya\AppData\Roaming\Typora\typora-user-images\1541300448089.png)

使用官方的命令安装最新版。

安装完成后，需要将虚拟环境添加进去，命令如下：

```shell
conda install -n tensorflow ipykernel
```

传参时，传虚拟环境在envs下的相对路径。