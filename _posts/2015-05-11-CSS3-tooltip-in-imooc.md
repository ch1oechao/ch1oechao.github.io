---
layout: post
title:  "CSS3 Tooltip"
date:  2015-05-11
categories: course_in_imooc
featured_image: /images/imooc.jpg
---

###CSS3 动画属性

---

####CSS3使用注意事项

**< meta > 标签**

- 使IE采用最新渲染模式，以支持CSS3效果


        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">


- 移动端处理：页面宽度=设备宽度，缩放为1，不放大


        <meta name="viewport" content="width=device-width,inital-scale=">


####transform属性

- 功能：向元素应用2D或者3D转换

- 语法：transform: none | transform-function 

- 参数：

        translate3d(x,y,z) //定义3D转化
    
        rotate3d(x,y,z,angle) //定义3D旋转
    
        scale3d(x,y,z,flex) //定义3D缩放

####transition属性

- 功能：在一定时间区间内平滑地过度指定的属性值

- 语法：transform: property duration timing-function delay 

- 参数：

        property //规定设置过度效果的CSS属性名称
    
        duration //规定完成过度效果需要多少时间（秒或毫秒）
    
        timing-function //规定速度效果的速度曲线

        transition-delay //定义过度效果何时开始

####:after与:before用法

- :after选择器：在被选元素的内容后面插入内容

- :before选择器：在被选元素的内容前面插入内容

- 说明： 需要使用content属性来指定要插入内容 

- 浏览器兼容：对IE8及更早版本的:after，必须声明<!DOCTYPE>