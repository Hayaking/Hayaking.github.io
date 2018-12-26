# Spring中Bean的使用

## Bean的定义

被称作 bean 的对象是构成应用程序的支柱，其也由 Spring IoC 容器管理的。bean 是一个被实例化、组装、并通过 Spring IoC 容器所管理的对象。这些 bean 是由用容器提供的配置元数据创建的，例如，已经在先前章节看到的，在 XML 的表单中的 定义。

## 定义Bean

![1540112787436](C:\Users\haya\AppData\Roaming\Typora\typora-user-images\1540112787436.png)

创建一个Bean类Student（要包含get、set、空构造方法），再创建一个SpringConfig文件，添加如上图的代码。其中<bean>标签中id属性是唯一性标识符，class属性是指定bean实例化时用到的类，scope是用来指定实例化后对象的作用域。更多的属性看下表：

| 属性                     | 描述                                                         |
| ------------------------ | ------------------------------------------------------------ |
| class                    | 指定用来创建 bean 的 bean 类。                               |
| name                     | bean唯一性标识符。在基于 XML 的配置元数据中，你可以使用 id或 name 属性来指定 bean 标识符。 |
| scope                    | 指定由特定的 bean 定义创建的对象的作用域，默认值为singleton（单例模式) |
| constructor-arg          | 它是用来注入依赖关系的，并会在接下来的章节中进行讨论。       |
| properties               | 它是用来注入依赖关系的，并会在接下来的章节中进行讨论。       |
| autowiring mode          | 它是用来注入依赖关系的，并会在接下来的章节中进行讨论。       |
| lazy-initialization mode | 延迟初始化的 bean 告诉 IoC 容器在它第一次被请求时，而不是在启动时去创建一个 bean 实例。 |
| initialization 方法      | 在 bean 的所有必需的属性被容器设置之后，调用回调方法。它将会在 bean 的生命周期章节中进行讨论。 |
| destruction 方法         | 当包含该 bean 的容器被销毁时，使用回调方法。它将会在 bean 的生命周期章节中进行讨论。 |

## Bean 的作用域

上面讲过用scope属性指定bean的作用域。作用域的值如下表所示：

| 作用域         | 描述                                                         |
| -------------- | ------------------------------------------------------------ |
| singleton      | 单例模式，每次返回同一个对象。                               |
| prototype      | 每次都new一个新对象并返回。                                  |
| request        | 每次HTTP请求都会创建一个新的Bean，该作用域仅适用于WebApplicationContext环境 |
| session        | 同一个HTTP Session共享一个Bean，不同Session使用不同的Bean，仅适用于WebApplicationContext环境 |
| global-session | 一般用于Portlet应用环境，该运用域仅适用于WebApplicat         |

代码实例：

测试代码：

```java
public class Test {
    public static void main(String[] args){
        ApplicationContext context = new FileSystemXmlApplicationContext("E:\\GitHub\\Exercises\\javaweb\\Spring02\\src\\main\\resources\\config.xml");
        System.out.println(context.getBean("stu01"));
        System.out.println(context.getBean("stu01"));
    }
}
```

**singleton**，scope默认值为singleton，所以可以省略不写：

```xml
<bean id="stu01" class="com.haya.bean.Student"
        scope="singleton">
        <property name="name" value="GGBoy"/>
        <property name="age" value="20"/>
        <property name="sex" value="man"/>
</bean>
```

>com.haya.bean.Student@1ce92674
>com.haya.bean.Student@1ce92674

可以看出获取的两个对象的hash码相同，可以确认它们是同一个对象。

**prototype**:

```xml
<bean id="stu01" class="com.haya.bean.Student"
    scope="prototype">
    <property name="name" value="GGBoy"/>
    <property name="age" value="20"/>
    <property name="sex" value="man"/>
</bean>
```

>com.haya.bean.Student@6500df86
>com.haya.bean.Student@402a079c

可以看出获取的两个对象的hash码不同，可以确认它们不是同一个对象。

## Bean 的生命周期

有两个生命周期方法init、destroy。类似于构造函数和析构函数（但是init在构造函数之后执行），在实例化对象或销毁对象时做一些事情。

在Student类中添加以下两个方法：

```java
public void init(){
    System.out.println("init");
}
public void destroy(){
    System.out.println("destroy");
}
```

在测试类中执行如下代码

```java
public class Test {
    public static void main(String[] args){
        AbstractApplicationContext context = new FileSystemXmlApplicationContext("E:\\GitHub\\Exercises\\javaweb\\Spring02\\src\\main\\resources\\config.xml");
        Student student = (Student) context.getBean("stu01");
        System.out.println(student.getAge());
        context.registerShutdownHook(); //关闭context
    }
}
```

>init
>20
>destroy

需要注意的是，当作用域为prototype 时， Spring 不会负责销毁容器中的对象，所以不会执行destroy方法。