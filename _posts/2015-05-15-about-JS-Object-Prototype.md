---
layout: post
title:  "JavaScript原型学习笔记"
date:  2015-05-15
categories: JavaScript
featured_image: /images/js.jpg
---

###Prototype of Object Notes in JavaScript

---

<b>JavaScript对象和原型链</b>

基于原型的对象创建：

- 定义原型对象
- 定义对象的构造函数
- 将构造函数关联到原型
- 实例化对象

---
    //step 1
    var proto = {
        highschool:3,
        collage:4
    };

    //step 2
    var Student = function(name,id){
        this.name = name;
        this.id = id;
    };

    //step 3
    Student.prototype = proto;

    //step 4
    var firstStudent = new Student("Chen","123");
    var secondStudent = new Student("Zhao","456");

<b>使用Object.create替代new创建对象</b>

JavaScript使用了new操作符，违背了基于原型的核心思想，使用Object.create创建JavaScript对象，会比较接近基于原型的思想。

    var proto = {
        highschool:3,
        collage:4
    };

    var firstStudent = Object.create(proto);
    firstStudent.name = "Chen";
    firstStudent.id = "123";

    var secondStudent = Object.create(proto);
    secondStudent.name = "zZhao";
    secondStudent.id = "456";
    
使用Object.create的常见模式是使用工厂函数来创建并返回最终的对象。

    var proto = {
        highschool:3,
        collage:4
    };

    var makeStudent() = function(){
        var student = Object.create(proto);
        student.name = name;
        student.id = id;

        return student;
    };

    var firstStudent = makeStudent("Chen","123");

    var secondStudent = makeStudent("Zhao","456");

<b>在老式浏览器上的Object.create</b>

Object.create在IE9+/Firefox4+/Safari5+/Chrome5+中有效。

实现老版本浏览器的兼容方法：

    var objectCreate = function(arg){
        if(!arg){ return {}; }
            function obj(){};
            obj.prototype = arg;
            return new obj;
    };
    Object.create = Object.create ||objectCreate;

<b>原型链</b>

JavaScript使用原型链来解析属性值。原型链描述了JavaScript引擎如何从对象查找到原型以及原型的原型，来定位对象的属性。

- 当请求对象的属性时，JavaScript引擎首先直接在该对象中查找。
- 如果找不到该属性，则查找原型（保存在对象的_proto_属性中），查看原型是否包含了请求的属性。
- 如果JavaScript在对象的原型上找不到该属性，它就查找原型的原型。
- 当JavaScript达到通用的Object的原型，原型链就结束了。
- 如果JavaScript在原型链上的所有地方都找不到请求的属性，则返回undefined。

<b>更改原型</b>

原型继承能够使得所有基于原型的对象即可发生变化。如果更改原型对象，那么所有之前和之后创建的对象都会是更改后的值。
