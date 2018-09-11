---
title: 从一个例子学习 instanceof 和 getclass 的区别
layout: post
category: Java
tags: [java]
---



判断两个对象是否为同一类型，时常用到getclass 和 instanceof ，而这两个函数又是时常让人混淆。下面从一个例子说明两者的区别：

```java
public class Test_drive {
    
    public static void main(String[] args){
        A a = new A();
        B b = new B();

        System.out.println(b.getClass().equals(A.class));
        System.out.println(b.getClass().equals(B.class));

        System.out.println(b instanceof A);
        System.out.println(b instanceof B);
    }
}
class A{ }
class B extends A{ }
```

在这里，上面四个语句分别输出：false , true , true , true

 

为什么呢？因为，instanceof判断是否是某一类型的实例时，该类型可以是父类或者接口。而getclass 用于判断准确的类型。

同时，在这里必须说明的是，getclass判断的是该变量实际指向的对象的类型（即运行时类型），跟声明该变量的类型无关。即，上面的代码中：

```java
B b = new B();
改为
A a = new B();
```

各语句结果不变。