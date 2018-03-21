---
layout: post
title: byte short char 转化int
category: Java
tags: [java]
---





# 

byte、short、char之间计算不会互相转换，而是转换成int再计算，即使是同类型间计算也会先转换成int再计算，计算后赋值给byte、short、char需要强制类型转换。
