---
layout: post
title:  "JavaScript this?"
date:  2016-01-10
categories: JavaScript
featured_image: /images/js.jpg
---

关于 this 的笔记收集

### 构造器调用

JavaScript 中没有类，但是可以从构造器中创建对象，同时也提供了 new 运算符，使得构造器更像一个类。

当用 new 运算符调用函数时，该函数总会返回一个对象，通常情况下，构造器里的 this 就会指向返回的这个对象。

但如果构造器不显式地返回任何数据或者返回一个非对象的数据，返回的还是原来的对象。

    // Example 1
    var myClass = function() {
        this.name = 'chen';
        return {
            name: 'zhao'
        }
    };

    // Example 2 
    var obj = new myClass();
    console.log(obj.name); // zhao

    var myClass = function() {
        this.name = 'chen';
        return 'zhao';
    };

    var obj = new myClass();
    console.log(obj.name); // chen
    
