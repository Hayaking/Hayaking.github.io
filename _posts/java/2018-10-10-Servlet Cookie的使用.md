# Servlet Cookie的使用

## 创建Cookie



创建一个继承自HttpServlet的类(记得注册)，并且重写doGet方法，代码如下：

```java
package com.haya.web;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class MyCookie extends HttpServlet {
    public MyCookie() {
        super();
    }
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		//...
    }
}

```

接下来完善doGet方法，代码如下：

```java
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    //创建Cookie
    Cookie cookie1 = new Cookie("test","haha");
    Cookie cookie2 = new Cookie("test2", "lala");
    /*
        *设置Cookie的有效时长，单位(秒)，
        * 当参数大于0,将Cookie缓存到本地硬盘上
        * 当参数等于0，Cookie一旦设置立马失效
        * 当Cookie小于0，将Cookie缓存到浏览器中
    */
    cookie1.setMaxAge(60*60*24);
    cookie2.setMaxAge(60*60*24);
    //绑定路径
    cookie1.setPath(req.getContextPath()+"/cookie1");
    cookie2.setPath(req.getContextPath()+"/cookie2");
    //向响应中添加Cookie
    resp.addCookie(cookie1);
    resp.addCookie(cookie2);

}
```

此时访问指定路径，再用浏览器自带的工具查看就能看到Cookie。

## Servlet读取Cookie

按照上述方法创建完Cookie后，再创建另一个Servlet(记得注册)，继承自HttpServlet，重写doGet()方法：

```java
@Override
protected void doGet(HttpServletRequest req, HttpServletResponse resp)
    throws ServletException, IOException {
    Cookie[] cookies = req.getCookies();
    for (Cookie c: cookies) {
        System.out.println(c.getName()+":"+c.getValue());
    }
}
```

此时先访问Cookie注册时的url，再访问这个Servlet注册的url，如果ide的控制台输出cookie的信息,就说明访问成功。 