---
layout: post
title:  "Constructed Function Notes in JavaScript"
date:  2015-05-15
categories: JavaScript
featured_image: /images/js.jpg
---

###JavaScript构造函数学习笔记

---

<b>自执行匿名函数</b>

显式调用和自执行函数的对比（作用相同，都是创建一个函数然后立即调用它）：

- 显式调用

        var foo = function(){
            //do something
        };
        foo();

- 自执行函数

        ( function() {
            //do something
        })();

自执行匿名函数被用来控制作用域，阻止变量泄露到代码中的其他地方。

自执行函数传递参数的方法：

    (function(weather){

        var todayWeather = "Today is " + weather;
        console.log(todayWeather); //输出"Today is sunny"

    })("sunny"); // 值sunny传递给匿名函数的第一个参数weather

一个很著名的组织变量被覆盖的例子为jQuery，其中jQuery和$变量是彼此别名。

    (function($){
        console.log($);
    })(jQuery);

    //在函数的作用域里，$是jQuery对象。

<b>模块模式</b>

模块模式可以将私有变量引入JavaScript，每个模块都有它们自己的私有变量。

    var school = (function(){
        var student_name = "Chen",
            collage_year = "4 years";
        return {
            student: student_name + " study " + collage_year,
            study_term: collage_year
        };
    })();
    
    console.log(school.student_name);  //"undefined"
    console.log(school.student);       //"Chen study 4 years"
    console.log(school.study_term);    //"4 years"

在全局作用域中只添加了school变量，匿名函数的返回值保存在变量school中。
一旦自执行匿名函数停止执行，在它里面定义的变量将移除，因此无法更新它们。

为了更新它们，必须将属性转变为方法，每次调用它们时都会访问变量。

    var school = (function(){
        var student_name = "Chen",
            collage_year = "4 years";

        //返回一个有两个方法的对象
        return {

            //每次调用student()时，都会重新查找student_name，collage_year。
            student: function(){
                student_name + " study " + collage_year;
            },
            //每次调用setstudyTerm()时，都会查找并设置study_term。
            setStudyTerm: function(trem){
                study_term = term;
            }
        };  
    })();

    console.log(school.student());     //"Chen study 4 years"
    
    school.setStudyTerm("finished");
    console.log(school.student());     //"Chen study finished"