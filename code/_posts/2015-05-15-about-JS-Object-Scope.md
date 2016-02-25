---
layout: post
title:  "Scope of Object Notes in JavaScript"
date:  2015-05-15
categories: JavaScript
featured_image: /images/js.jpg
---

### JavaScript作用域学习笔记

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

<b>高级变量提升</b>

JavaScript引擎在进入作用域时，会对代码分为两轮处理。第一轮，初始化变量；第二轮，执行代码。

第一轮，JavaScript引擎分析代码，并做了以下三件事：

- 声明并初始化函数参数。
- 声明局部变量，包括将匿名函数赋给一个局部变量，但不初始化它们。
- 声明并初始化函数。

<b>执行环境和执行环境对象</b>

执行环境由函数在执行时发生的所有事物组成。这和函数申明是分离的，因为函数声明描述了当前函数执行的时候会发生什么事情。执行环境是指函数的执行。

属于执行环境部分的变量和函数，被保存在执行环境对象中，执行环境对象是执行环境的ECMA标准的实现。在JavaScript中，执行环境对象是一种对象，每次使用变量其实就是在访问执行环境对象的属性。

<b>作用域链</b>

JavaScript引擎在执行环境对象中访问作用域内的变量，查找的顺序叫做作用域链。

当在查找变量的定义时，JavaScript引擎首先在局部执行环境对象上查找。如果没有定义，则跳出作用域链，到创建它的执行环境中去，并且在该执行环境对象中查找变量的定义，以此类推，直到找到定义或者到达全局作用域为止。

    //在全局作用域里，设置chen
    var chen = "I'm here";
    //调用作用域: 全局
    console.log(chen); // "I'm here" 匹配全局chen

    function superchen(){

        //在superchen作用域里，设置chen
        var chen = "I'm not there";
        //调用作用域: 全局->superchen
        console.log(chen); //"I'm not there" 匹配superchen

        function prison(){
            var chen;
            //调用作用域: 全局->superchen->prison
            console.log(chen); 
        }
        prison(); //"undefined" 匹配prison
    }
    superchen();

<b>全局变量和window对象</b>

- 浏览器的顶层对象是window对象
- 在node.js中的顶层对象是global对象

window对象包含了很多属性，包括对象、方法（onload/onresize/alert/close...），DOM元素以及其他变量。所有这些属性使用语法window.property来访问。

当在浏览器中的JavaScript检查全局变量是否存在时，它是在window对象上查找的。

    var global = "Global chen"; 
    console.log(global);                   //"Global chen"
    console.log(window.global);            //"Global chen"
    console.log(global === window.global)  //true

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
