---
title: partition by的用法
category: 数据库
---



![](C:\Users\haya\Pictures\Saved Pictures\TIM截图20180622221937.jpg)



SelectCourse(学号,课程号,课程成绩)

## 现在按照课程号分组,按照学生学号升序排序显示:

```sql
select 课程号=SelectCourse_CourseNo,
	学生学号 = SelectCourse.SelectCourse_StudentNo,
	学生成绩 = SelectCourse.SelectCourse_Score,
	分组序号 = ROW_NUMBER()over(partition by SelectCourse_CourseNo order by  SelectCourse_StudentNo)
from SelectCourse
```



![](C:\Users\haya\Pictures\Saved Pictures\TIM截图20180622222513.jpg)

