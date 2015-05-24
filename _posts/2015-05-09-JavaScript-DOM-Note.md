---
layout: post
title:  "JavaScript DOM Note"
date:  2015-05-07
categories: Books_of_code
featured_image: /images/JavaScriptDOM.jpg

---

###《JavaScript DOM 编程艺术》 笔记摘抄

[DOM操作两项原则]

<b>渐进增强(progressive enhancement)</b>

> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;渐进增强原则基于这样一种思想：你应该总是从最核心的部分，也就是从内容开始。
应该根据内容使用标记良好的结构；然后再逐步加强这些内容。
这些增强工作既可以是通过CSS改进呈现效果，也可以是通过DOM添加各种行为。

<b>平稳退化</b>

> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
渐进增强的实现必然支持平稳退化。
如果你按照渐进增强的原则去充实内容，你为内容添加的样式和行为就自然支持平稳退化。
那些缺乏必要的CSS和DOM支持的访问者仍可以访问到你的核心内容。

[CSS-DOM]

<b>三位一体的网页</b>

- <span>[ 结构层 structural layer ]</span>

> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
结构层由HTML或XHTML之类的标记语言负责创建。
标签(tag) 对网页内容的语义做出了描述。
使用有意义的标签来构建页面的结构。
    
- <span>[ 表示层 presentation layer ]
    
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
表示层由CSS完成。CSS描述页面内容应该如何呈现。
把表现性的信息都分离到CSS样式表中。
    
- <span>[ 行为层 behavior layer ]</span>
    
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
行为层负责内容应该如何响应事件这一问题。这是JavaScript和DOM主宰的领域。
负责任地使用不唐突的JavaScript来应用行为增强，同时确保平稳退化。


<b>分离</b>

>
- 使用(X)HTML去搭建文档的结构
- 使用CSS去设置文档的呈现效果
- 使用DOM脚本去实现文档的行为

<b>使用CSS还是DOM?</b>

> 
- 选择这个问题最简单的解决方案
- 选择会得到更多浏览器的支持的解决方案

[nodeType常用值]

>   
- <span>元素节点</span> nodeType属性为为 <span>1<span>
- <span>属性节点</span> nodeType属性为为 <span>2<span>
- <span>文本节点</span> nodeType属性为为 <span>3<span>


    
    
[封装函数]

<b>getElementsByClassName(node,classname) —— 兼容老浏览器</b>

    function getElementsByClassName(node,classname) {
        if(node.getElementsByClassName) {
            //使用现有方法
            return node.getElementsByClassName(classname);
        }
        else{
            var results = new Array();
            var elems = node.getElementsByTagName("*");
            for(var i=0;i < elems.length;i++){
                if(elems[i].className.indexOf(classname) != -1) {
                results[results.length] = elems[i];
                }
            }
            return results;
        }
    }

        
<b>getNextElement() —— 获取下一个元素节点</b>

    function getNextElement(node) {
        if(node.nodeType == 1) {
            return node;
        }
        if(node.nextSibling) {
            return getNextElement(node.nextSibling);
        }
        return null;
    }
        
<b>addLoadEvent() —— 共享onload事件</b>

    function addLoadEvent(func) {
        var oldonload = window.onload;
        if(typeof window.onload != 'function') {
            window.onload = func;
        }
        else {
            window.onload = function(){
                oldonload();
                func();
            }
        }
    }
        
        
<b>insertAfter() —— 在某元素后插入新元素</b>

    //DOM已提供，在某元素之前插入新元素
    insertBefore(newElement,targetElement) 

    function insertAfter(newElement,targetElement) {
        var parent = targetElement.parentNode();
        if(parent.lastChild == targetElement){
            parent.appendChild(newElement);
        }
        else{
            parent.insertBefore(newElement,targetElement.nextSibling);
        }
    }
        
<b>addClass() —— 添加新的className</b>
        
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
        
<b>moveElement() —— 基于CSS属性的动画</b>

    function moveElement(elementID,final_x,final_y,interval) {

        //添加安全检查，检测是否支持getElementById
        if(!document.getElementById) return false;

        //添加安全检查，检测是否有elementId
        if(!document.getElementById(elementId)) return false;

        var elem = document.getElementById(elementID);
        if(elem.movement) {
            clearTimeout(elem.movement);
        }

        //添加安全检查，检测elementId是否有left/top属性
        if(!elem.style.left) {
            elem.style.left = 0 + "px";
        }
        if(!elem.style.top) {
            elem.style.top = 0 + "px";
        }

        var xpos = parseInt(elem.style.left);
        var ypos = paresInt(elem.style.top);
        var dist = 0;
        if(xpos == final_x && ypos == final_y){
            return true;
        }
        if(xpos < final_x) {
            dist = Math.ceil((final_x - xpos)/10);
            xpos = xpos + dist;
        }
        if(xpos > final_x) {
            dist = Math.ceil((xpos - final_x)/10);
            xpos = xpos - dist;
        }
        if(ypos < final_y) {
            dist = Math.ceil((final_y - xpos)/10);
            ypos = ypos + dist;
        }
        if(ypos > final_y) {
            dist = Math.ceil((xpos - final_y)/10);
            ypos = ypos - dist;
        }
        elem.style.left = xpos + "px";
        elem.style.top = ypos + "px";

        var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
        elem.movement = setTimeout(repeat,interval);

    }

        
    
