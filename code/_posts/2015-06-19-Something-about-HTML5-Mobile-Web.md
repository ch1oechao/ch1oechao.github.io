---
layout: post
title:  "Something about HTML5 Mobile Web"
date:  2015-06-19
categories: Web html
featured_image: /images/html5.jpg

---

### 关于 HTML5 & 移动Web开发 笔记摘抄

####学习HTML5的一些网站
- [[ HTML5 Doctor ]](http://html5doctor.com/)
- [[ Dive Into HTML5 ]](http://diveintohtml5.info/)
- [[ W3C ]](http://www.w3.org/html/wg/drafts/html/master/Overview.html)

####跨浏览器HTML5
可以使用 [[ Modernizr ]](http://modernizr.com/) 在一些不支持HTML5的浏览器或设备上支持HTML5，同时可以设置样式，并且检测HTML5各个功能在不同浏览器的兼容性。

    <script src="//libs.cncdn.cn/modernizr/2.8.3/modernizr.min.js"></script>

#####HTML5 CSS重置
    article, aside, canvas, details, figcaption, figure, footer, header, hgroup, menu, nav, section, summary, time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
 

#####HTML5 块级元素
    article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
        display: block;
    }

#####CSS媒介查询(Media query)

移动优先网站，在桌面设备上优雅降级。
这种方式可以使用以下CSS：

    @media only screen and (min-width: 320px){
        /* style */
    }
    @media only screen and (min-width: 640px){
        /* style */
    }
    @media only screen and (min-width: 800px){
        /* style */
    }
    @media only screen and (min-width: 1024px){
        /* style */
    }


####移动端的配置和优化

#####通过界面图标启动Web应用

适用设备： iOS/Android

准备图片:

- apple-touch-icon.png
- apple-touch-icon-57x57-precomposed.png
- apple-touch-icon-72x72-precomposed.png
- apple-touch-icon-114x114-precomposed.png
- apple-touch-icon-precomposed.png

实战代码：

    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="icons/apple-touch-icon-114x114-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="icons/apple-touch-icon-72x72-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="57x57" href="icons/apple-touch-icon-57x57-precomposed.png">
    <link rel="apple-touch-icon-precomposed" href="icons/apple-touch-icon-precomposed.png">
    <link rel="short icon" href="icons/apple-touch-icon.png">

<code>precomposed</code>： 指的是苹果设备在添加应用图标时，保持原本图片设计样式，而不添加统一自带的苹果优化后样式。

#####避免文本字体大小重置

    html {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        text-size-adjust: 100%;
    }

#####优化浏览器视口宽度设置

通用：

    <meta name="viewport" content="width=device-width">

对于古老设备：

    <meta name="HandheldFriendly" content="true">

修复移动版 Safari 的 re-flow scale 的问题：

    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">

#####iPhone下全屏模式启动

全屏启动：

    <meta name="apple-mobile-web-app-capable" content="yes">

隐藏浏览器上部的工具栏、地址栏和底部的加载状态栏：

    <meta name="apple-mobile-web-app-status-bar-style" content="black">


####移动设备的交互方式

#####利用触控来移动页面元素

使用jQuery：

    $("#tap").bind('touchmove', function(e){
        e.preventDefault();
        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        var ele = $(this).offset();
        //获取相对于页面的触摸位置 拖动点设置为中心点
        var x = touch.pageX - ele.left/2;
        var y = touch.pageY - ele.top/2;
        $(this).css('left', x + 'px');
        $(this).css('top', y + 'px');
    });

#####检测和处理横竖屏切换事件

    window.onorientationchange = function(){
        update();
    }
    function update(){
        switch (window.orientation) {
            case   0:  // 正常方向
            case 180:  // 倒转方向
                var cWidth = window.innerWidth;
                var cHeight = window.innerHeight;
                document.getElementById('screen').style.width = cHeight - 36 + 'px';
                document.getElementById('screen').style.height = cWidth + 'px';
                break;
            case -90: // 向右
            case  90: // 向左
                var cWidth = window.innerWidth;
                var cHeight = window.innerHeight;
                document.getElementById('screen').style.width = '100%';
                document.getElementById('screen').style.height = auto;
                break;
        }
    }
    update();


#####滑动事件

<code>Zepto</code> 提供了以下方法： 

<code>swipe / swipeLeft / swipeRight / swipeUp / swipeDown</code>

#####利用手势操作图片缩放

给被缩放元素注册了 <code>ongesturechange</code> 事件，缩放比例根据 <code>e.target.scale</code> 计算。

    //div 某元素节点
    div.ongesturechange = function(e){
        var div = e.target;
        div.style.width = (width * e.scale) + 'px';
        div.style.height = (height * e.scale) + 'px';
    }
    div.ongestureend = function(e){
        width *= e.scale;
        height *= e.scale;
    }


####移动设备访问

#####获取位置信息 <code>navigator.geolocation</code>

    function getLocation(){
        navigator.geolocation.getCurrentPosition(showInfo);
    }
    function showInfo(position){
        var latitude = position.coords.latitude; //纬度
        var longitude = position.coords.longitude; //经度
        var accuracy = position.coords.accuracy;
        console.log(latitude, longitude, accuracy);
    }
    getLocation();

####移动富媒体

#####移动设备上播放音频 <code>\<audio\></code> 

- controls    告诉浏览器，该音频播放元素需要显示一个控制元素。
- autobuffer  布尔值，该属性添加后将会自动为音频做缓冲。 
- preload=auto 高速浏览器在播放音频时自动提前加载。

每个浏览器对音频格式的支持都不一样。
最广泛支持的是MP3格式，但Firefox Mobile不支持，因此需要加上Ogg格式，这样就能覆盖所有主流移动设备。

    <audio controls preload="auto" autobuffer>
        <source src="audio/123.mp3">
        <source src="audio/123.ogg">
    </audio>

#####使用离线缓存

<code>CACHE MANIFEST</code> 下可以列出想要做离线缓存的文件

    CACHE MANIFEST
    #version 1.0
    index.html
    #NETWORK
    http://www.123.info

<code>NETWORK</code> 下列出不想缓存的文件的URL，这些文件每次都会重新加载。

文件后缀： <code>.appcache</code> 和 <code>.manifest</code>

Addtype可以使浏览器识别以上类别的扩展名文件：

    Addtype text/cache-manifest appcache manifest

.htaccess <code>MIME</code> 类型

> 设定某种扩展名的文件用一种文件应用程序来打开的方式类型，当该扩展名文件被访问的时候，浏览器会自动使用指定应用程序来打开。
> 
> 多用于制定一些客户端自定义的文件名，以及一些媒体文件打开方式。

更多文件类型 - 电子名片的标准格式文件：

    AddType text/x-vcard vcf 


#####设置未来过期时间

<code>.htaccess</code> 文件配置 

- 默认文件的过期时间为1个月： 

    ExpiresDefault　　　　　　　　　　　　　　"access plus 1 month"

- 缓存配置文件cache.appcache需要每次都刷新： 

    ExpiresByType text/cache-manifest　　　　"access plus 0 seconds"

- 设置为一周：　　　　　　　　　　　　　　　 "access plus 1 weeks"
- 设置为一个月：　　　　　　　　　　　　　　 "access plus 1 month"
- 设置为一年：　　　　　　　　　　　　　　　 "access plus 1 year"

　
　
　
---

END.