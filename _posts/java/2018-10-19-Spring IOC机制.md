

# POJO

POJO的全称有两个：plain old java object 、plain ordinary java object。我们可以把POJO类看做是简单的JavaBean类（具有一系列Getter、Setter的方法）。

# IOC

IOC的全称是：Inversion of Control，中文名为反向控制，是面向对象编程中的一种设计原则，可以用来减低计算机代码之间的耦合度。这里的反向是相对于EJB来讲的。EJB使用JNDI来查找需要的对象，是主动的；Spring是把依赖的对象注入到相应的类（依赖注入），是被动的。

# 依赖注入

依赖注入(Dependency Injection)和控制反转(Inversion of Control)是同一个概念。具体含义是:当某个角色(可能是一个Java实例，调用者)需要另一个角色(另一个Java实例，被调用者)的协助时，在 传统的程序设计过程中，通常由调用者来创建被调用者的实例。但在Spring里，创建被调用者的工作不再由调用者来完成，因此称为控制反转;创建被调用者 实例的工作通常由Spring容器来完成，然后注入调用者，因此也称为依赖注入。

# AOP

AOP全称是：Aspect Oriented Programming，中文为面向切面编程。之前只听说过面向过程编程、面向对象编程，这个面向切面编程还是第一次听说。

面向切面编程是为了减少系统中模块之间的耦合度的。同面向过程编程向面向对象编程进化一样，是一个抽象的过程（对数据的封装等），面向切面编程中的“切面”也是一个抽象，把系统不同的部分的公共行为抽取出来形成一个独立的模块，并且在适当的地方把这些抽取出来的模块再插入到系统的不同部分，这个所谓的适当部分就是“切入点”。

# 代码

首先创建一个Speaker类：

```java
public class Speaker {
    public void sayHello(){
        System.out.println("Hello world");
    }
}
```

再创建一个HelloWorld类，

```java
public class HelloWorld {
    private Speaker speaker;
    public void setSpeaker(Speaker speaker){
        this.speaker = speaker;
    }
    public void greet(){
        speaker.sayHello();
    }
}
```

再创建一个Spring的配置文件：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean id="sepaker" class="Speaker"/>
    <bean id="obj" class="HelloWorld">
        <property name="speaker">
            <ref bean="sepaker"/>
        </property>
    </bean>
</beans>
```

分析一波这个xml配置文件。声明了两个Bean，一个是Speaker类的，另一个是HelloWorld类的，其中第二个Bean设置了speaker属性引用了第一个Bean，那么Spring容器就会调用setSpeaker()方法来注入属性。

最后，写一个测试类测试一下代码：

```java
public class Test {
    public static void main(String[] args){
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("config.xml");
        HelloWorld obj = (HelloWorld) applicationContext.getBean("obj");
        obj.greet();
    }
}
```

> Hello world