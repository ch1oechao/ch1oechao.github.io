---
layout: post
title:  "ES6 Study Notes"
date:  2015-09-21
categories: JavaScript
featured_image: /images/js.jpg
---

###ECMAScript 6 Notes

- [[ Babel ]](http://babeljs.io/repl/) 编译ES6的绝佳工具！！！
- [[ ECMAScript 6入门 ]](http://es6.ruanyifeng.com/) 阮老师写的ES6入门教程，必须马！笔记来源于此，强烈推荐！！！

言归正传，写这篇笔记的主要原因是现在正在参与的项目有用到ES6，随着项目业务不断扩展和深入，需要用到ES6新特性的地方就越多，所以这篇笔记主要记录平常项目中会用的比较多的知识点。

####变量声明

#####let命令

```let```用于变量声明，与```var```用法类似，但是```let```是一个局部变量，只在声明的代码块中有效。

    {
        let a = 10;
        var b = 20;
    }
    a // not defined
    b // 20
    
在上面的代码块外，```a```变量会显示```not defined```，而```b```有效。

**注意**

- ```let```不会有变量提升的现象，所以如果在定义```let```变量之前使用了该变量，会报错。
- ```let```不允许在相同作用域内，重复声明同一个变量。

#####const命令

```const```用来声明常量，一旦声明，值就不能更改。

最常见的常量就是 

    const PI = 3.14;
    
```const```的特点和```let```一致，块级作用域内有效，且不可重复声明。


####函数的扩展

#####扩展运算符

```...``` 没错，三个点不是省略的意思，而是一个新的运算符！它将一个数组转换为用逗号分隔的参数序列。该运算符主要用于函数调用。

    function add(x, y) {
        return x + y;
    }

    var numbers = [10, 20];
    add(...numbers); // 30
    
扩展运算符可以简化求一个数组最大元素的写法。

    // ES5
    Math.max.apply(null, [12, 23, 34]);
    
    // ES6
    Math.max(...[12, 23, 34]);
    
    // 等同于
    Math.max(12, 23, 34);
    
另外数组的赋值也更加方便。

    var a = [1];
    var b = [2, 3];
    var c = [4, 5, 6];
    var d = [7, 8, 9, 10];
    var e = [0, ...a, ...b, ...c, ...d];
    
    e // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    
#####箭头函数

```=>```箭头定义函数，写函数简直不要太方便！

    var fn = (a, b) => a + b;
    
    // 等同于
    
    var fn = function (a, b) {
        return a + b;
    }

返回对象时必须加上括号。

    var getId = id => ({ id: id, name: '2333' });
    
另外，箭头函数可以用来简化回调函数。

    [1, 2, 3].map(x => x * x);
    
    // 等同于
    
    [1, 2, 3].map(function (x) {
        return x * x;
    });
    
    
####Promise对象

```Promise```对象可以将异步操作，用同步操作的流程表达出来，避免了层层嵌套的回调函数。
同时，它提供了一套完整的接口，可以更加容易的控制异步操作。

    var promise = new Promise((resolve, reject) => {
        if (success) {
            resolve(val);
        } 
        else {
            reject(error);
        }
    });
    
    promise.then((val) => {
        // success
    }, (val) => {
        // failure
    });
    
以上代码表示，```Promise```构造函数接受一个函数作为参数，该函数的参数分别为resolve方法和reject方法。
如果异步操作成功，则resolve方法执行，如果失败，reject方法执行。

```promise```实例生成后，可以用```then()```方法分别指定resolve()和reject()的回调函数。

#####链式操作

```then()```返回的是一个新的```Promise```对象，因此可以采用链式写法。

    getSomething(val).then(() => {
        return newVal;
    }).then((newVal) => {
        // continue...
    });
    
#####catch方法：捕捉错误

```catch()```是```then(null, rejection)```的别名，用于指定发生错误时的回调函数。
同时，错误具有‘冒泡’性质，会一直向后传递，直到捕获为止。

    getSomething(val).then((thing) => {
        // do 1st thing
    }).then(() => {
        // do 2rd thing
    }).catch((error) => {
        alert(error);
    });
    
####Class对象

ES6引入了```Class```(类)的概念，作为对象的模板，通过```class```关键字，可以定义类，在处理后台传过来的复杂数据结构的时候简直好用到哭！

    // 定义类
    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        toString() {
            return '(' + this.x + ', ' +this.y +')';
        }
    }
    
    var point = new Point(2, 3);
    point.toString(); // (2, 3)
    
其中，```constructor```函数就是构造函数，而```this```关键字代表着实例对象。

```Class```之间可以通过```extends```关键字实现继承。

    class ColorPoint extends Point {
        constructor(x, y, color) {
            super(x, y); // 等同于 super.constructor(x, y);
            this.color = color;
        }
        toString() {
            return this.color + ' ' + super();
        }
    }
    
上面代码定义了```ColorPoiner```类，该类通过```extends```关键字继承了```Point```类所有属性和方法。
在```Constructor```方法内，```super()```就指代父类```Point```；在```toString```方法内，```super()```表示对父类的求值。

 
---

 
好了，暂时常用到的就是这些新特性，知识点比较简单，用久了会觉得特别方便 =。= 希望快点普及啊！！！
    
 