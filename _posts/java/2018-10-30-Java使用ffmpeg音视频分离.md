# Java使用ffmpeg音视频分离

## 创建项目

使用IDEA用Maven创建一个Java项目，在resources文件夹下创建一个ffmpeg文件夹，将下载好的ffmpeg中bin目录下的ffmpeg.exe程序复制到刚刚创建好的文件夹下。

## 音视频分离

```java
import java.io.File;
import java.io.IOException;
import java.net.URL;

public class SSP {
    //转换命令
    private static String ssp;
    //获得resources的路径
    private static URL url = Thread.currentThread().getContextClassLoader().getResource("ffmpeg");
    /*
    * @Author: Haya
    * @Date: 2018/10/30 19:27
    *
    * @param add 视频文件所在路径
    * @param f1 视频文件名
    * @param f2 提取出来的音频名
    * @returns: void
    * @Description: 将转换文件和目标文件添加到命令中
    */
    public static void setSSP(String add, String f1, String f2) {
        ssp = "/ffmpeg -i "+add+f1 +" -vn -y -acodec copy "+ add+f2;
    }
    /*
    * @Author: Haya
    * @Date: 2018/10/30 19:29
    *
    * @param null
    * @returns:
    * @Description: 执行命令
    */
    public static void Do() throws IOException {
        Runtime runtime =Runtime.getRuntime();
        String path = new File(String.valueOf(url)).getPath().substring(6);
        //命令不为空
        if (!"".equals(ssp) && ssp!=null) {
            System.out.println(path+ssp);
            Process p = runtime.exec(path+ssp);
            p.getOutputStream().close();
            p.getInputStream().close();
            p.getErrorStream().close();
        }else{
            System.out.println("请先设置命令、指定文件");
        }
    }
}

```

## 调用

```java
先执行 setSSP()
在执行 Do()
```



