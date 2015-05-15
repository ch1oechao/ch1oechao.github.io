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

JavaScript使用关键字var来声明变量。变量可以包含任意类型的数据：数组、整数、浮点数、字符串等。

    var str = "Hello World", //字符串
        arr = [],            //数组
        num = 123,           //数字
        name;                //仅声明，没有赋值

JavaScript是一种宽松型（loosely-typed）的语言也是一种动态语言，因为不需要指定变量的类型，并且即使在变量赋值以后，值的类型也可以通过赋予不同的类型值而改变。可以用var关键字同时声明多个变量并赋值，以逗号分隔。

<b>对象字面量</b>

对象字面量是指用 {} 括起来的一组以逗号分隔的属性所定义的对象。属性用冒号设置。对象字面量也可以包含数组，数组用 [] 括起来的一组以逗号分隔的成员。

    var aboutMe = {
        name: "zchen9",
        study: "the Front-End Web",
        say: function(){
            console.log("Nice to see you!");
        }
    }

<b>变量作用域</b>

在JavaScript中，唯一能定义变量作用域的语块就是函数。全局变量在函数外部定义，局部变量在函数内部定义。

如果在函数中声明局部变量的时候，忘记写var关键字，则创建的是全局变量。

《web单页应用》的举例特别有趣：

> 换种方式来看，函数就像监狱（prison），在函数中定义的变量就像囚犯（prisoner）。正如监狱限制囚犯不让他们从监狱的围墙逃跑，函数限定了局部变量不让他们逃脱函数之外。

    var freeman = "I am free!";
    
    function prison() {
        var prisoner = "I got caught !"
    }

    person();

    console.log( freeman );      //"I am free!"
    console.log( persioner );    //ERROR

<b>变量提升</b>

在JavaScript中，当变量声明时，声明会被提升到它所在的函数顶部，并被赋予undefined值。

    function prison() {
        console.log(prisoner); // "undefined"
        var prisoner = "Now defined";
        console.log(prisoner); //"Now defined"
    }
    prison();

但是访问一个没有在局部或者全局声明过的变量，会导致JavaScript运行错误。

    function prison(){
        console.log(prisoner); //ERROR
    }
    prison();

若变量在全局声明过，则返回值为全局变量值。

    var freeman = "I am free"
    function prison(){
        console.log(freeman); //"I am free"
    }
    prison();

若变量在全局声明过且在函数内又声明了一次，则返回值为局部变量值。

    var freeman = "I am free"
    function prison(){
        var freeman = "I'm in prison";
        console.log(freeman); //"I'm in prison"
    }
    prison();