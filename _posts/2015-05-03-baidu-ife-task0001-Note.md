---
layout: post
title:  "Baidu-ife Task0001 Note"
date:  2015-05-02
categories: baidu-ife
featured_image: /images/baidu-ife.jpg
---

###task0001 - HTML/CSS基础 [04.13-04.20]

[[baidu-ife task0001 任务地址]](https://github.com/baidu-ife/ife/tree/master/task/task0001)

[[查看Demo]](http://www.chen9.info/baidu-ife-task/task0001/zchen9/index.html)


**04.13-04.14**

针对任务1-6进行练习，其中遇到的问题主要在任务6


1、请在不使用border-radius的情况下实现一个可复用的高度和宽度都自适应的圆角矩形 。

方法一：

《html与css设计模式》（图灵程序设计丛书）介绍了一种圆角设计方法。
书中写了好几种样式的写法，选择了最简洁版的，代码摘抄如下：

    .mbg {
        padding: 10px;
        width: 40%;
        overflow: hidden;
        background: url("../img/trc.gif") top right no-repeat,
                    url("../img/blc.gif") bottom left no-repeat,
                    url("../img/rc.gif") top left no-repeat,
                    url("../img/rc.gif") bottom right no-repeat;
    } 


优点：

达到题目要求，宽度和高度都可以自适应且可复用。

缺点：

需要加载图片；
  
图片中边框外必须为白色背景（这样才能遮住原来的直角）；
  
由于图片内容是固定的, 导致圆角矩形的边框宽度不能改变，颜色也不能变化；
  
如果要改变的话，必须更改图片内容，比较麻烦。
    
方法二：

实心圆角矩形，代码摘抄如下：


    .radius{
        width: 40%;
    }
    .top{
        border-top-color:#000;
        border-bottom:3px solid #000;
        border-left:3px dotted transparent;
        border-right:3px dotted transparent;
    }
    .center{
        color: #FFF;
        overflow: hidden;
        padding: 10px;
        background-color: #000;
    }
    .bot{
        border-top:3px solid #000;
        border-bottom-color:#000;
        border-left:3px dotted transparent;
        border-right:3px dotted transparent;
    }

    
实现原理：
  
通过边框的dotted样式，巧妙的将边框变成梯形，

这样交接处形成一个重合，看起来像切掉了矩形框的尖角，

只要设置恰当的边框宽度，可以近似成圆角
    
优点：

达到题目要求，宽度和高度都可以自适应且可复用。

无需另外加载图片。

缺点：

必须将圆角矩形内的背景颜色和边框颜色保持一致，不然会露馅...（外部背景颜色无所谓）

IE不支持...

圆角矩形的边框宽度不能改变，一改变边框宽度的话，边角就不像圆角了。
    
2、实现两列布局/三列布局。

[[淘宝UED出品的双飞翼布局]](http://www.imooc.com/wenda/detail/254035)





04.15-04.18

练习任务7：

1、index.html

各类元素居中问题
    
水平居中有两种普通方法：


    
    text-align: center //相对父级元素的居中
    margin: 0 auto //设置子元素居中

        
在实际运用中，会发现有时候两种办法都不好使，这时可以运用第三种方法：


    /*margin和transform的结合*/
    /*水平方法为：*/
    
    margin-left: 50%; 
    transform: translateX(-50%);
    
    /*以此类推，垂直居中的方法为*/
    
    margin-top: 50%;
    transform: translateY(-50%);


这个时候元素可能百分百做到想要的居中效果了，但问题又来了：
transfrom属于CSS3，伺候不了IE...
        
flexbox实现居中
    
    .parent {
        display: flex;
        height: 300px; /* Or whatever */
    }
    .child {
        width: 100px;  /* Or whatever */
        height: 100px; /* Or whatever */
        margin: auto;  /* Magic! */
    }   
        
position 绝对定位

给父元素添加position: relative;
给需要定位的子元素添加position: absolute;
此时设置相应的left/right/top/bottom值就可以将子元素想定位在哪定位在哪，方便实用~
        
以上总结出来的居中方案适用于绝大多数CSS定位方式，后续发现新方法会补充...
当然，想要更高级的居中方法就可以让JavaScript上场啦~
        
渐变问题

[[制作渐变效果的链接]](http://www.colorzilla.com/gradient-editor/)

里面的色彩和透明度直接操作设置后 会有相应代码显示 方便实用

IE6双倍marginbug问题

以下是百度出来的解释：

父元素与子元素之间，子元素同时设置了浮动和外边距属性，子元素会出现此bug，兄弟元素之间则不会。

解决的办法：

给子元素加上 display:inline 属性。
实现以上若效果还没好 尝试在父级元素行内样式中添加 clear: both;
    
2、blog.html和gallery.html

伪类使用的问题

伪类使用相关资料：

[[CSS 伪类选择器：如何使用 CSS3 伪类]](http://lzw.me/a/css3-pseudo-classes.html)

[[CSS中伪类的使用]](http://www.cnblogs.com/guopei/archive/2011/04/16/2017627.html)

瀑布流的问题

使用CSS3属性的方法，例如：


    ul {
        /* 栏宽度 */
        -webkit-column-width:160px;
        -moz-column-width:160px;
        -o-colum-width:160px;
        column-width:160px;
    
        /* 两栏之间的间距 */
        -webkit-column-gap:1px;
        -moz-column-gap:1px;
        -o-column-gap:1px;
        column-gap:1px;
    }


这个方法的确可以实现瀑布流效果，但局限性也很大。

第一要考虑兼容性，第二这个排列方式只适合宽度一致的图片进行排布，不符合要求
 
考虑了很多因素，觉得没有别的办法了...

最后采用绝对定位的方式把照片一张张给定位在页面上
 
用flexbox实现的方法：

[[全面介绍flexbox]](http://www.w3cplus.com/css3/a-guide-to-flexbox.html)

排行榜的进度条问题
         
进度条的标签用的是html5的新标签 &lt;progress&gt;

review更新：

&lt;progress&gt;为html5标签,兼容性较差。若要实现设计图的排行榜，用ol+div结构，进度条中应当用隐藏的文字标注当前的进度。
        
4、about.html

使用background-clip实现中间轴内容部分的样式

两侧的内容采用了table布局...

用table布局的想法是：

布局整齐，一块主题对应一块内容，样式比ul好写，且符合中轴线的布局样式。

整个页面只有这一个内容块，内容是集中且清晰的，

用table可以简洁明了，即使在遇到浏览器不兼容或者CSS缺失的情况下，

浏览者也可以看出这个页面的内容脉络。

review更新：

建议不使用table布局

table布局灵活性较差,作业设计时只考虑了左右布局的实现，使得html结构限制于左右结构的布局。

设计页面时，应充分考虑文本和样式分离的原则，保持html结构的灵活性，方便CSS定义多种样式结构。





**04.20**

<b>总结：</b>
    
完成效率不高：

原计划是跟中级班进度一样完成任务编写，

但中间几天受到其他事情的干扰没有集中时间和精力完成页面，导致后面进度变慢。

已经总结教训，前端培训放在第一位，其他不重要的事推掉推掉...投入前端深水的怀抱~
    
编写经验不够：

以前编写html+css的练习时，考虑的因素很少，对前端的认识肤浅...

现在通过几天的练习逐渐摸索了一些网页编写原则：

一、保证页面结构的可浏览性（即无CSS），html标签语义化。

二、编写CSS样式时，既要符合页面设计样式，同时考虑到浏览器兼容性以及响应式操作。

三、代码编写严格按照规范来写。

四、考虑深层次的东西：如何编写代码使页面加载速度更快、CSS的复用、减少代码量实现相同效果等等...
    
<b>未来计划：</b>

写总结的时候Task2已经发布了...

Task1结束后要认认真真全面学习JavaScript了，

计划啃完《JavaScript DOM 编程艺术》和《JavaScript高级程序设计》，

按时完成Task2的作业，

在时间允许的条件下阅读JQuery源代码。
    
    
<b>FIGHTING!!!</b>

          

        
        
        
