---
layout: post
title:  "JavaScript Modular Note"
date:  2015-06-21
categories: JavaScript
featured_image: /images/js.jpg

---

###JavaScript模块化笔记摘抄

> 在可扩展JavaScript的世界里，如果说一个应用程序是模块化(Modular)的，那么通常意味着它是由一系列存储于模块中的高度解耦、不同的功能片段组成的。

###AMD

异步模块定义(AMD)的整体目标是提供模块化的JavaScript解决方案，以便开发人员使用。AMD模块格式本身就是对定义模块的建议，其模块和依赖都可以进行异步加载。

- 参考资料：  [[ EFE AMD系列 ]](http://efe.baidu.com/tags/AMD/)

####AMD的两个关键概念

- 用于模块定义的define方法
- 用于处理依赖加载的require方法

#####define方法

    define(
        module_id, /*可选*/
        [dependencies], /*可选*/
        definition function /*实例化模块或对象的函数*/
    );

- <code>module\_id</code> 是一个可选参数，它通常只在非AMD连接工具时才需要。当遗漏这个参数时，我们称这个模块为匿名的(anonymous)。可以将 <code>module\_id</code> 想象成类似文件路径的概念。
- <code>dependencies</code> 参数表示我们定义的模块所需的依赖数组。
- <code>definition function / factory function</code> 用于执行实例化模块的函数。


#####define()演示

    
    define(
        "myModule", // 定义module_id(myModule)
        ["foo", "bar"], // 依赖[foo, bar]两个模块
        function (foo, bar) {
            
            // 在这里创建你的模块
            var myModule = {
                dostuff: function(){
                    // Do somthing
                }
            }

            // 返回定义的模块输出（例如：要暴露的内容）
            return myModule;
    });

Or

    define(
        "myModule", 
        ["math", "graph"], // 依赖[math, graph]两个模块
        function (math, graph) {
            
            // 和AMD不大一样，通过 特定的语法以不同的形式定义模块
            return {
                plot: function (x, y) {
                    return graph.drawPie(math.randomGrid(x, y));
                }
            };
    });

#####require方法
    
    require(["foo", "bar"], function (foo, bar) {
        // 剩余代码
        foo.dosomthing();
    })

#####require()演示

动态加载依赖

    define(function (require) {
        var isReady = false, foobar;
    
        // 模块内部的require定义
        require(["foo", "bar"], function (foo, bar) {
            isReady = true;
            foobar = foo() + bar();
        });
    
        // 返回一个模块
        return {
            isReady: isReady;
            foobar: foobar;
        };
    });


####使用RequireJS加载AMD模块

    require(["app/myModule"], 
        function(myModule){
            // 开始主模块，顺序加载其他模块
            var module = new myModule();
            module.doStaff();
    });

####使用jQuery的AMD模块

    define(["js/jquery.js", "js/jquery.color.js", "js/underscore.js"],
        function ($, colorPlugin, _) {
            // 传入了jQuery，color插件和Underscore，三者在全局作用域都不可访问，但却可以在内部轻松访问
            // 随机产生颜色数字，选择数组的第一项进行操作
            var shuffleColor = _.first(_.shuffle("#666", "#333", "#111"));
            
            // 将页面上所有带有class为item的元素都进行背景颜色的改变动画操作，使用shuffleColor这个颜色
            $(".item").animate({
                "background": shuffleColor
            });
    
            // 返回的值可以用于其他模块
            return {};
    
    });

#####命名的AMD提供了一种安全方式，可以安全稳健地用于大多数用例。

    // 在document对象中，负责各个jQuery全局实例，便于测试.noConflict
    
    var jQuery = this.jQuery || "jQuery";
    $ = this.$ || "$";
    
    originaljQuery = jQuery,
    original$ = $;
    define(["jquery"], function ($) {
        $(".item").css("background", "green");
        return function(){};
    });



---

###CommonJS
> CommonJS 模块建议指定一个简单的API来声明在浏览器外部工作的模块(如在服务器上)。它是JavaScript中可复用的部分，导出特定对象，一边可以用于任何依赖代码。与AMD不同，在这种模块周围通常是没有函数封装器的（所以我们在这里看不到define）。

####CommonJS的两个主要部分
- 自由变量 <code>exports</code> , 它包含了一个模块希望其他模块能够使用的的对象。
- <code>require</code> 函数， 模块可以使用该函数导入(import)、其他模块的导出(exports)。

#####require()和导出

    // package/lib 是我们需要的一个依赖
    var lib = require("package/lib");
    
    // 模块行为
    function foo(){
        lib.log("hello world");
    }
    
    //导出(暴露)foo给其他模块
    exports.foo = foo;

#####CommonJS演示AMD等效代码

    define(function(require){
        var lib = require("package/lib");
    
        // 模块行为
        function foo(){
            lib.log("Hello World");
        }
    
        // 导出(暴露)foo给其他模块
        return {
            foobar: foo
        };
    })

####CommonJS使用多个依赖

#####app.js 

    var modA = require("./foo");
    var modB = require("./bar");
    
    exports.app = function(){
        console.log("I'm am application");
    }
    
    exports.foo = function(){
        return modA.helloWorld();
    }

#####bar.js

    exposrts.name = "bar";

#####foo.js

    require("./bar");
    
    exports.helloWorld = function(){
        return "Hello World!!!"
    }


---

#### AMD 和 CommonJS 的比较

> AMD和CommonJS都是有效的模块格式，有不同的最终目标。

#####AMD

AMD 采用浏览器优先的开发方法，选择一部行为和简化的向后兼容性，但是它没有任何文件I/O概念。它支持对象、函数、构造函数、字符串、JSON以及很多其他类型的模块，在浏览器中原生运行，使用非常灵活。

#####CommonJS

CommonJS 采用服务器优先方法，假定同步行为，没有全局概念这个包袱，并试图迎合未来技术（在服务器上）。由于CommonJS支持非包装模块，这样可以摆脱AMD强制执行的define()包装器。但CommonJS模块仅将对象作为模块给予支持。

　
　
---

END.