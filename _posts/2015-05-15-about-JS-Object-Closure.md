---
layout: post
title:  "JavaScript闭包学习笔记"
date:  2015-05-15
categories: JavaScript
featured_image: /images/js.jpg
---

###Closure of Object Notes in JavaScript

---

<b>闭包</b>

闭包是阻止垃圾回收器将变量从内存中移除的方法，使得在创建变量的执行环境的外面能够访问到该变量。

> 垃圾回收器，指的是当代码不再需要时，就从电脑的内存中把它移除的自动化系统。

例1

    var reportWeather = function(weather){
        return function(){
            return weather;
        }
    };
    
    var sunnyWeather = reportWeather("sunny"); //"sunny"
    var rainyWeather = reportWeather("rainy"); //"rainy"

例2

    var student = {
        name : "Chen",
        who: function(){
            return this.name;
        }
    };

    student.who(); //"Chen"

清除保存的执行环境对象的唯一方法(除了关闭网页)：删除变量。
