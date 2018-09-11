---
title: Android中使用Intent传递对象
layout: post
category: Java
tags: [java]
---

## 1.Serializable方式

```java
public class Bean implements Serializable{
.....
｝
```

Serializable是序列化的意思，我们让Bean类去实现Serializable接口，便可以使得该类的对象能够通过Intent在activity之间传输。

在MainActivity中

```java
Bean b =new Bean();
b.set(...)
.......
Intent intent = new Intent(MainActivity.this, NextActivity.class);
intent.putExtra("obj",b);
startActivity(intent);

```

在