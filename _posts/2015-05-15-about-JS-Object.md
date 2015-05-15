---
layout: post
title:  "关于 JS 面向对象"
date:  2015-05-15
categories: JS
featured_image: /images/js.jpg
---

###Somthing about Object of JavaScript

---

<b>变量声明语块</b>

    var str = "Hello World";

JavaScript使用关键字var来声明变量。变量可以包含任意类型的数据：数组、整数、浮点数、字符串等。JavaScript是一种宽松型（loosely typed）的语言也是一种动态语言，因为不需要指定变量的类型，并且即使在变量赋值以后，值的类型也可以通过赋予不同的类型值而改变。可以用var关键字同时声明多个变量并赋值，以逗号分隔。

<b>对象字面量</b>

对象字面量是指用 {} 括起来的一组以逗号分隔的属性所定义的对象。属性用冒号设置。对象字面量也可以包含数组，数组用 [] 括起来的一组以逗号分隔的成员。

    var aboutMe = {
        name: "zchen9",
        study: "the Front-End Web",
        say: function(){
            console.log("Nice to see you!");
        }
    }