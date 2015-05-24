---
layout: post
title:  "Util.js Notes"
date:  2015-05-24
categories: JavaScript
featured_image: /images/js.jpg
---

###关于原生JavaScript的学习笔记

---

在baidu-ife的task0002的练习中要求用原生JS写Util.js
虽然大致完成了但是代码质量不高，使用的时候也有缺陷。

最近看到一些关于将原生JS的好文章，因此开个坑，记录笔记~

####笔记出处

[[抛弃jQuery，深入原生的JavaScript]](http://ourjs.com/detail/535556a1ed9add0e26000002)

<b>浏览器支持</b>

> - IE9+
- Firefox 3.5+
- Opera 9+
- Safari 4+
- Chrome 1+
- iPhone and iPad iOS1+
- Android phone and tablets 2.1+
- Blackberry OS6+
- Windows 7.5+
- Mobile Firefox
- Opera Mobile

之前一直关注的PC端的浏览器兼容，正逢task0004要接触移动端，所以全面记录一下关于支持原生JS方法的PC端以及移动端的浏览器。

以下原生方法在以上浏览器上支持。


<b>基础原生JavaScript方法</b>

- Document Ready 事件

在不使用jQuery的情况下，大多数时候想到的第一个方法是<code>window.onload</code>

    window.onload = function(){
        //code
    }

使用jQuery的话可以直接这样做：

    $(document).ready(function(){
        //code
    });

其实JS同样拥有一个DOM内容加载事件的侦听器:

    document.addEventListener("DOMContentLoaded",function(){
        //code
    },false);

但是这个方法不支持老版本的IE，兼容性不行，好在有大神做了封装方法，实现方法有些复杂，先存个地址，以备研究：

[[Jesse Skinner's adddomloadevent.js]](http://www.thefutureoftheweb.com/blog/adddomloadevent)

[[DOMContentLoaded事件]](http://www.cnblogs.com/shikyoh/archive/2011/05/17/2048682.html)

[[Javascript封装DOMContentLoaded事件]](http://dengo.org/archives/1037)

<b>选择器API</b>

querySelector是个很好的选择，但是为了兼容，在Util.js写$()方法的时候用的都是最最最初始的document.getElementsBy...之类的。

在这里把用querySelector写的简单$()贴上来，以备以后不用兼容老IE的时刻~

实现$()封装方法获取元素：

    var ele = $("div");

最原生的方法：

    var ele = docuemnt.getElementsByTagName("div");

使用querySelector：

    var ele = document.querySelector("div");

扩展querySelectorAll:

    var eles = document.querySelectorAll(".class div"); //获取.class下所有div

基于querySelector一些优势，就可以放大招了:

> 原作者：Andrew Lunny [[文章出处]](https://remysharp.com/2013/04/19/i-know-jquery-now-what#backToTheFutureToday-heading)

    // This gives us simple dollar function and event binding
    //给DOM元素绑定事件
    var $ = document.querySelectorAll.bind(document);
    Element.prototype.on = Element.prototype.addEventListener;
    
    // This is how you use it
    //然后可以这么用
    $(".element")[0].on("touchstart", handleTouch, false);

基于之前写的Util.js，还可以这么用:

    //addEvent为Util.js封装方法
    Element.prototype.on = Element.prototype.addEvent; 
    
    $(".element")[0].on("touchstart", handleTouch);


<b>添加和删除样式名（classname)</b>

添加和删除className的时候会遇到坑

    //给元素设置样式：
    ele.className = "classname";

    //移除样式也可以这样简单粗暴：
    ele.className = "";
    
    //给元素添加样式：(新样式字符串前面必须有空格)
    ele.className += " anotherClass" 

    //自己写的addClass()封装方法
    function addClass(element,value) {
        //判断className属性是否为空
        if(!element.className) {
            element.className = value;
        }
        else {
            //若不为空，把空格和新的class设置值追加到className属性上去
            newClassName = element.className;
            newClassName += " ";
            newClassName += value;
            element.className = newClassName;
        }
    }

但是一个元素存在多个className，想移除其中一个className就要费些功夫了：

自己写的removeClass(ele,className)是简单粗暴的全部移除className...

这是大神写的：

    // removeClass, takes two params: element and classname
    //移除某个元素的某个className,传参：元素以及要删除的className

    function removeClass(el, cls) {
      var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
      el.className = el.className.replace(reg, " ").replace(/(^\s*)|(\s*$)/g,"");
    }

    //运用正则表达式还有可以封装hasClass(ele,className)
    function hasClass(el, cls) {
      return el.className && new RegExp("(\\s|^)" + cls + "(\\s|$)").test(el.className);
    }

    //事实证明学好正则表达式多么重要...自己写了好几行的遍历，大神一行代码搞定 = = 

好消息是HTML5的 classList API 可以更好地操作className

但是兼容方面只支持 IE10+,Chrome,FireFox,Opera和Safari 等版本较新的浏览器。

    //可以先判断浏览器是否支持classList：
    if ("classList" in document.documentElement) {
      // classList is supported, now do something with it
    }

    //用classList来添加、删除、转换类：
    // Adding a class
    element.classList.add("bar");
    // Removing a class
    element.classList.remove("foo");
    // Checking if has a class
    element.classList.contains("foo");
    // Toggle a class
    element.classList.toggle("active");

    //封装方法就可以简单得多(className要求为字符串)
    function addClass(element, className){
       element.classList.add(className); 
    }
    function removeClass(element, className){
       element.classList.remove(className); 
    }

<b>事件监听器</b>

文章并没有详细介绍，也没怎么看懂... 直接贴原神的帖子：

[[Ryan Seddon's addEventListener, handleEvent and passing objects]](http://www.thecssninja.com/javascript/handleevent)

<b>DOM操作</b>

cloneNode 节点克隆
>	
 【作　　用】建立指定节点的复制。
>
 【基本语法】Node.cloneNode(deep);
>
 【说　　明】deep 是一个布尔值。如果为true，此节点会复制以指定节点发展出去的所有节点。如果是false，只有指定的节点和它的属性被复制。


    // Clone element
    //克隆某一个节点
    var clone = ele.cloneNode(true);
    
    // Do some manipulation off the DOM
    //在克隆节点上设置属性和样式
    clone.style.background = "#000";
    
    // Replaces the original element with the new cloned one
    //可以将原节点更换成克隆节点
    ele.parentNode.replaceChild(clone, ele);

    //或者克隆后直接在某个节点下添加
    ele.appendChild(clone);

参考资料：

- [[更多DOM操作方法：DOM Core]](http://quirksmode.org/dom/core/)
- [[各浏览器cloneNode方法的部分实现差异]](http://www.cnblogs.com/snandy/archive/2012/05/06/2473936.html)

<b>在JS中决定响应图片的最大宽度</b>

目前并没有实际运用到，所以贴上原文：

>这是我最爱的之一，且如果你需要用JavaScript操作流体图片时这非常有用。由于浏览器默认返回当前被调整过大小的图片，我们必须要想一些其它的办法。幸运的是，现代浏览器目前已有解决的方案了：

><code>var maxWidth = img.naturalWidth;</code>
这将会给我们提供最大宽度100%像素的图片，且IE9,Chrome,Firefox,Safari和Opera都支持这个方法。我们也可以保留这个特性然后通过加载图片到内存中添加老浏览器的支持：

    // Get image's max-width:100%; in pixels
    function getMaxWidth(img) {
      var maxWidth;
    
      // Check if naturalWidth is supported
      if (img.naturalWidth !== undefined) {
        maxWidth = img.naturalWidth;
    
      // Not supported, use in-memory solution as fallback
      } else {
        var image = new Image();
        image.src = img.src;
        maxWidth = image.width;
      }
    
      // Return the max-width
      return maxWidth;
    }

>你应该注意到在检查宽度前，图片必须完全被加载。这是我们一直使用的用于确定它们有尺寸的方法：

    function hasDimensions(img) {
      return !!((img.complete && typeof img.naturalWidth !== "undefined") || img.width);
    }

<b>判断一个元素是否在视图窗口中</b>

这个方法还没用过，不过我觉得在做返回顶部的功能块的时候可能会用到，所以先MARK原文：

>通过使用<code>getBoundingClientRect</code>方法，你可以获取页面中任何元素的位置。以下是一个简单的函数来表明它有多简单和多强大。这个函数有一个参数，那就是你想要检查的元素。当元素为可见时，函数将返回true：

    // Determine if an element is in the visible viewport
    function isInViewport(element) {
      var rect = element.getBoundingClientRect();
      var html = document.documentElement;
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || html.clientHeight) &&
        rect.right <= (window.innerWidth || html.clientWidth)
      );
    }

>上面的函数可以在给窗体添加一个”滚动”事件监听器，然后调用isInViewport()方法时使用。


<b>后记</b>

关于原生操作，还有很多知识点要做笔记以及很多坑要踩。会不定时更新笔记，温故而知新。