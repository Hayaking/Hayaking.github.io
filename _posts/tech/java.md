title: Java入门
mathjax: true
categories:
  - Java
tags:
  - java
  - 语法
toc: true # 是否启用内容索引

---

# 入门

## Hello World!

- shawanyi为工程名字


- a为package(包)的名字

- b为java源代码文件

### Java包

包主要用来对类和接口进行分类。当开发Java程序时，可能编写成百上千的类，因此很有必要对类和接口进行分类。

## 注意事项

编写Java程序时，应注意以下几点：

- **大小写敏感**：Java是大小写敏感的，这就意味着标识符Hello与hello是不同的。
- **类名**：对于所有的类来说，类名的首字母应该大写。如果类名由若干单词组成，那么每个单词的首字母应该大写，例如 MyFirstJavaClass 。
- **方法名**：所有的方法名都应该以小写字母开头。如果方法名含有若干单词，则后面的每个单词首字母大写。
- **源文件名**：源文件名必须和类名相同。当保存文件的时候，你应该使用类名作为文件名保存（切记Java是大小写敏感的），文件名的后缀为.java。（如果文件名和类名不相同则会导致编译错误）。
- **主方法入口**：所有的Java 程序由**public static void main(String []args)**方法开始执行。

## Java注释

类似于C/C++，Java也支持单行以及多行注释。注释中的字符将被Java编译器忽略。

```java
public class HelloWorld {
   /* 这是第一个Java程序
    *它将打印Hello World
    * 这是一个多行注释的示例
    */
    public static void main(String []args){
       // 这是单行注释的示例
       /* 这个也是单行注释的示例 */
       System.out.println("Hello World"); 
    }
}
```

# 基础语法

## Java标识符

Java所有的组成部分都需要名字。类名、变量名以及方法名都被称为标识符。

关于Java标识符，有以下几点需要注意：

- 所有的标识符都应该以字母（A-Z或者a-z）,美元符（$）、或者下划线（_）开始

- 首字符之后可以是字母（A-Z或者a-z）,美元符（$）、下划线（_）或数字的任何字符组合

- 关键字不能用作标识符

- 标识符是大小写敏感的

- 合法标识符举例：age、$salary、_value、__1_value

- 非法标识符举例：123abc、-salary
##Java 基本数据类型
Java 的两大数据类型:

- 内置数据类型

- 引用数据类型

### 1.内置数据类型

Java语言提供了八种基本类型。六种数字类型（四个整数型，两个浮点型），一种字符类型，还有一种布尔型。

byte,int,short,long,float,double,char,boolean

### 2.引用类型

- 在Java中，引用类型的变量非常类似于C/C++的指针。引用类型指向一个对象，指向对象的变量是引用变量。这些变量在声明时被指定为一个特定的类型，比如 Employee、Puppy 等。变量一旦声明后，类型就不能被改变了。
- 对象、数组都是引用数据类型。
- 所有引用类型的默认值都是null。
- 一个引用变量可以用来引用任何与之兼容的类型。
- 例子：Site site = new Site("Runoob")。

## Java类和对象

### 1.什么是对象？

对象是一个具体的东西。

比如：车，电脑，冰箱......

### 2.什么是类？

类是事物的抽象。

比如：车的设计图纸，电脑的设计图纸，冰箱的设计图纸......



当然以上只是一种非常粗浅不严谨的描述。严谨的定义如下：

[百度百科:类](https://baike.baidu.com/item/%E5%AF%B9%E8%B1%A1/17158)    [度百科:对象](https://baike.baidu.com/item/%E5%AF%B9%E8%B1%A1/2331271#viewPageContent)



### 3.深入了解Java面向对象中的类与对象

类是对象的抽象化；对象是类的实例化。

#### 1.创建类

我们定义一个类是狗，狗有颜色,有年龄，会饿，会叫，会睡觉：

```java
public class Dog{
  int age;
  String color;
  void barking(){
  }
 
  void hungry(){
  }
 
  void sleeping(){
  }
}
```

一个类可以包含以下：

- **方法** ：在C++中也被叫做成员函数，本质是定义在类中的函数。

- **局部变量**：在方法、构造方法或者语句块中定义的变量被称为局部变量。变量声明和初始化都是在方法中，方法结束后，变量就会自动销毁。
- **成员变量**：成员变量是定义在类中，方法体之外的变量。这种变量在创建对象的时候实例化。成员变量可以被类中方法、构造方法和特定类的语句块访问。
- **类变量**：类变量也声明在类中，方法体之外，但必须声明为static类型。

#### 2.类的构造方法

Java中叫做构造方法，C++中叫做构造函数。

两者都一样，在类被实例化创建对象时自动执行的函数。

```java
public class Puppy{
    public Puppy(){
    }
 
    public Puppy(String name){
    }
}
```

构造方法与类同名，允许重载。

#### 3.创建对象

```java
public class Puppy{
   public Puppy(String name){
      System.out.println("小狗的名字是 : " + name ); 
   }
   public static void main(String []args){
      Puppy myPuppy = new Puppy( "tommy" );
   }
}
```

对象是根据类创建的。在Java中，使用关键字new来创建一个新的对象。创建对象需要以下三步：

- **声明**：声明一个对象，包括对象类型和对象名称。

- **实例化**：使用关键字new来创建一个对象。

- **初始化**：使用new创建对象时，会调用构造方法初始化对象。

运行上面的代码，得到结果为：

```java
小狗的名字是 : tommy
```

####   4.访问方法和成员变量：

```java
public class Puppy{
   int puppyAge;
   public Puppy(String name){
      System.out.println("小狗的名字是 : " + name ); 
   }
 
   public void setAge( int age ){
       puppyAge = age;
   }

   public int getAge( ){
       System.out.println("小狗的年龄为 : " + puppyAge ); 
       return puppyAge;
   }
 
   public static void main(String []args){
      Puppy myPuppy = new Puppy( "tommy" );
      myPuppy.setAge( 2 );
      myPuppy.getAge( );
      System.out.println("变量值 : " + myPuppy.puppyAge ); 
   }
}
```
运行结果为：
```java
小狗的名字是 : tommy
小狗的年龄为 : 2
变量值 : 2
```

## Java 修饰符

Java语言提供了很多修饰符，主要分为以下两类：

- 访问修饰符

- 非访问修饰符

修饰符用来定义类、方法或者变量，通常放在语句的最前端。我们通过下面的例子来说明：

```java
public class className {
   // ...
}
private boolean myFlag;
static final double weeks = 9.5;
protected static final int BOXWIDTH = 42;
public static void main(String[] arguments) {
   // 方法体
}
```

### 访问控制修饰符

Java中，可以使用访问控制符来保护对类、变量、方法和构造方法的访问。Java 支持 4 种不同的访问权限。

- **default** (即缺省，什么也不写）: 在同一包内可见，不使用任何修饰符。使用对象：类、接口、变量、方法。
- **private** : 在同一类内可见。使用对象：变量、方法。 **注意：不能修饰类（外部类）**
- **public** : 对所有类可见。使用对象：类、接口、变量、方法
- **protected** : 对同一包内的类和所有子类可见。使用对象：变量、方法。 **注意：不能修饰类（外部类）**。

| 修饰符      | 当前类 | 同一包内 | 子孙类 | 其他包 |
| ----------- | ------ | -------- | ------ | ------ |
| `public`    | Y      | Y        | Y      | Y      |
| `protected` | Y      | Y        | Y      | N      |
| `default`   | Y      | Y        | N      | N      |
| `private`   | Y      | N        | N      | N      |