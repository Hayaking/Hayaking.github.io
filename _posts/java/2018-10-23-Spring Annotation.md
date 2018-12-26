# Spring Annotation

## 1、@Required

**@Required** 注释应用于 bean 属性的 setter 方法，标有该注释的setter方法必须出现在Spring  xml文件中初始化，否则容器就会抛出一个 BeanInitializationException 异常。

## 2、@Autowired

**@Autowired** 注释可以自动的注入参数（非int、String等数据类型），完成bean类中参数的初始化，我们称之为自动装配。

实例1：

```java
@Autowired
public void setMajor(Major major) {
    this.major = major;
}
```

Spring会在容器中自动查找Major类的实例，为this.major初始化。当然这么写还是有点太啰嗦了。

实例二：

```java
@Autowired
private Major major;
```

直接在声明 成员变量时加上该注释，可以省去写set方法实现同样的效果。

### @Autowired 的（required=false）

默认情况下书写一个**@Autowired**注释是自动带有@Required注释的，如果不需要可以设置为@Autowired 的（required=false）

## 3、@Qualifier 

**@Qualifier** 注释应用于容器中具有相同类型的 bean 时，并且想要用一个属性只为它们其中的一个进行装配得到情况。

实例：

```java
@Autowired
@Qualifier("m1")
private Major major;
```

```xml
<bean id="m1" class="com.haya.bean.Major"></bean>
<bean id="m2" class="com.haya.bean.Major"></bean>
```

如上代码@Autowired自动装配Major类的实例，但容器中有两个实例，这是就需要@Qualifier 指定装配哪一个实例。这里@Qualifier("m1")指定的是id=“m1”的实例。

## 4、@Configuration 、 @Bean

带有 **@Configuration** 的注解类表示这个类可以使用 Spring IoC 容器作为 bean 定义的来源。**@Bean** 注解告诉 Spring，一个带有 @Bean 的注解方法将返回一个对象，该对象应该被注册为在 Spring 应用程序上下文中的 bean。最简单可行的 @Configuration 类如下所示：

```java
package com.tutorialspoint;
import org.springframework.context.annotation.*;
@Configuration
public class HelloWorldConfig {
   @Bean 
   public HelloWorld helloWorld(){
      return new HelloWorld();
   }
}
```

上面的代码将等同于下面的 XML 配置：

```xml
<beans>
   <bean id="helloWorld" class="com.tutorialspoint.HelloWorld" />
</beans>
```

# Spring JSR-250 注释

## 1、@PostConstruct 和 @PreDestroy 

标有**@PostConstruct**注释的方法会被设置为**init-method**方法。

标有**@PreDestroy** 注释的方法会被设置为**destroy-method**方法。

## 2、@Resource

**@Resource**类似于**@Autowired**，都是注入时使用的，但不同的是**@Autowired**是根据类型注入（by type）而**@Resource**是根据名字注入（by name），指定id或name，这一点与**@Qualifier** 相似。





