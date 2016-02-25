---
layout: post
title:  "Study Two.js Note (1)"
date:  2015-08-07
categories: JavaScript
featured_image: /images/js.jpg

---

### Drawing With Two.js

> Two.js is a two-dimensional drawing api geared towards modern web browsers. It is renderer agnostic enabling the same api to draw in multiple contexts: svg, canvas, and webgl.

Two.js 是一个对面现代Web浏览器的二维绘图API，它可以提供多样的渲染器: SVG / Canvas / WebGL

在线编辑 ```Two.js``` 的好地方： [http://www.javascriptoo.com/two-js](http://www.javascriptoo.com/two-js)

#### Setting Up 准备工作

###### 创建实例

	var two = new Two({
		fullscreen: true
	});
	
以上代码创建了一个 ```two``` 实例，其中 <code>fullscreen</code> 为 ```Two``` 构造函数中的一个参数

- ```fullscreen``` 表示将绘制一个占满浏览器窗口的画布

- ```width``` & ```height``` 如果需要指定特定大小的画布，需要设置明确的宽度和高度

- ```type``` 指定需要应用的渲染器类型，你可以选择 SVG / Canvas / WebGL 默认情况下，Two.js 使用 SVG (需要自己检测浏览器是否支持选择的渲染器)

###### 添加到页面中

创建好实例以后，我们将使用到 ```appendTo``` 方法，将实例添加到页面中

在HTML中设置：

	<div id="main"></div>
	<script src="two.min.js"></script>
	<script>
		var el = document.getElementById("main");
			two = new Two({
				fullscreen: true
			});
		two.appendTo(el);
	</script>

设置完毕后，我们就可以开始绘制图形啦~

#### Drawing Basic Shapes 绘制基本图形

##### Line 线段

```makeLine(x1, y1, x2, y2)```

> Draws a line between two coordinates to the instance's drawing space where x1, y1 are the x, y values for the first coordinate and x2, y2 are the x, y values for the second coordinate. It returns a Two.Polygon object.

前两个参数 ```x1, y1``` 为线段起点在画面坐标轴的位置
后两个参数 ```x2, y2``` 为线段终点在画面坐标轴的位置

以下代码绘制了起点为(10, 10)，终点为(110, 210)的线段

	var line = two.makeLine(10, 10, 110, 210);
	line.linewidth = 10;  //linewidth设置线段的宽度
	line.stroke = "rgba(255, 0, 0, 0.5)";  //stroke设置线段颜色

如图：

![线段](http://7xl44r.com1.z0.glb.clouddn.com/two-line.png)


##### Circle 圆形

```makeCircle(x, y, radius)```
	
> Draws a circle to the instance's drawing space where x, y are the x, y values for the center point of the circle and radius is the radius of the circle. It returns a Two.Polygon object.

<code>x</code> 指的是圆形的圆心距离画面坐标的x轴长度, 
<code>y</code> 指的是圆形的圆心距离画面坐标的y轴长度, 
<code>radius</code> 指的是圆形的半径长度

以下代码画了一个坐标为(110, 110)，半径为100的圆形 

	var circle = two.makeCircle(110, 110, 100);
	circle.fill = "#00ffff";
	two.update();  //update 重新绘制画面

如图：
	
![圆形](http://7xl44r.com1.z0.glb.clouddn.com/two-circle.png)

##### Rectangle 方形

```makeRectangle(x, y, width, height)```

> Draws a rectangle to the instance's drawing space where x, y are the x, y values for the center point of the rectangle and width, height represents the width and height of the rectangle. It returns a Two.Polygon object.

```makeRectangle``` 需要四个参数：坐标x值，坐标y值，宽度，高度。
和制作圆形一样，```x``` 和 ```y``` 值指的是方形中心距离坐标的x, y距离。

下面这段代码绘制了一个坐标为(115, 90)，宽度为150，高度为100的长方形

	var rect = two.makeRectangle(115, 90, 150, 100);
    rect.fill = "orange";  //fill 填充颜色
    rect.opacity = 0.25;  //opacity 设置透明度
    rect.noStroke();  //noStroke 去掉图形边框
    two.update();

如图：

![方形](http://7xl44r.com1.z0.glb.clouddn.com/two-rect.png)


##### Ellipse 椭圆

```makeEllipse(x, y, width, height)```

> Draws an ellipse to the instance's drawing space where x, y are the x, y values for the center point of the ellipse and width, height are the dimensions of the ellipse. It returns a Two.Polygon object.

makeEllipse(x, y, width, height)的构造和方形一致，也需要四个参数：坐标x值，坐标y值，宽度，高度。

以下代码绘制了一个坐标为(100, 100)，宽度为90，高度为50的椭圆

	var ellipse = two.makeEllipse(100, 100, 90, 50);
    ellipse.stroke = "#112233"; //stroke 设置图形边框颜色
    ellipse.linewidth = 5; //lineWidth 设置图形边框宽度
    ellipse.noFill(); //noFill 去掉图形的填充内容
    two.update();

如图：

![椭圆](http://7xl44r.com1.z0.glb.clouddn.com/two-ellipse.png)

##### Curve 曲线

```makeCurve(x1, y1, x2, y2, xN, yN, open)```

> Draws a curved polygon to the instance's drawing space. The arguments are a little tricky. It returns a Two.Polygon object.
> 
> The method accepts any amount of paired x, y values as denoted by the series above. It then checks to see if there is a final argument, a boolean open, which marks whether or not the shape should be open. If true the curve will have two clear endpoints, otherwise it will be closed.
> 
This method also recognizes the format
> two.makeCurve(points, open) where points is an array of Two.Anchor's and open is an optional boolean describing whether or not to expose endpoints. It is imperative if you generate curves this way to make the list of points Two.Anchor's.

```makeCurve()```方法可以根据需要设置许多对(x, y)值，每一对值是一个坐标点，它为这段弧线的一个切点。最后一个参数为布尔值，```true```表示这段弧线是开放不闭合的，意味着它的首尾点不相连。如果需要将曲线闭合，则将布尔值设置为```false```

同时，```makeCurve()``` 接收两个参数 (points, open)，第一个为多组向量组成的数组，第二个值依旧是布尔值。

以下代码绘制了一段曲线

	var curve = two.makeCurve(110, 100, 120, 50, 140, 150, 160, 50, 180, 150, 190, 100, true);
    curve.linewidth = 2;
    curve.scale = 1.75;  //scale 图形缩放比例
    curve.rotation = Math.PI / 2;  //rotation 图形旋转角度
    curve.noFill();
    two.update();
    
如图：

![曲线](http://7xl44r.com1.z0.glb.clouddn.com/two-curve.png)

	
##### Polygon 多边形

```makePolygon(x1, y1, x2, y2, xN, yN, open)```

> Draws a polygon to the instance's drawing space. The arguments are a little tricky. It returns a Two.Polygon object.
> 
> The method accepts any amount of paired x, y values as denoted by the series above. It then checks to see if there is a final argument, a boolean open, which marks whether or not the shape should be open. If true the polygon will have two clear endpoints, otherwise it will be closed.
> 
> This method also recognizes the format two.makePolygon(points, open) where points is an array of Two.Anchor's and open is an optional boolean describing whether or not to expose endpoints. It is imperative if you generate curves this way to make the list of points Two.Anchor's.

和制作曲线一样，我们也需要设置图形对应的多组坐标点，然后需要一个布尔值确定图形是否闭合，绘制多边形不同的是这些线段是直线连接。同时它也接受多组向量组成的数组的参数形式。

以下代码绘制了一个多边形


	var poly = two.makePolygon(110, 100, 120, 50, 140, 150, 160, 50, 180, 150, 190, 100);
    poly.linewidth = 4;
    poly.translation = new Two.Vector(60, 60); //translation 创建矢量坐标值 设置图形的位置
    poly.stroke = "#cccccc";
    poly.fill = "#ececec";
    two.update();
    
    //Or another way to set the coordinates for the center of the shape
    //poly.translation.x = 60;
	//poly.translation.y = 60;
    
如图：

![多边形](http://7xl44r.com1.z0.glb.clouddn.com/two-ploygon.png)


#### Making Groups 在画面中绘制多种图形

目前为止，我们的画面一直都是在绘制单个的图形，然而在同一个画面上绘制多个图形进行拼接也是可以的~

```makeGroup(objects)```

> Adds a group to the instance's drawing space. While a group does not have any visible features when rendered it allows for nested transformations on shapes. See Two.Group for more information. It accepts an array of objects, Two.Polygons or Two.Groups. As well as a list of objects as the arguments, two.makeGroup(o1, o2, oN). It returns a Two.Group object.

```two.makeGroup(o1, o2, oN)```可以接受一系列的图形对象，最终返回一个two.Group对象

以下代码绘制了一个方形加一个圆形：


	var group = two.makeGroup(), // 创建一个群对象
        rect = two.makeRectangle(0, 0, 100, 100), // 创建一个方形
        circ = two.makeCircle(50, 50, 50); // 创建一个圆形
       
    rect.fill = "red"; // 给方形填充红色
    circ.fill = "blue"; // 给圆形填充蓝色
       
    // 将创建好的方形和圆形添加到群对象中
    group.add(rect);
    group.add(circ);
    
    // 设置群对象的坐标位置
    group.translation.x = 100;
    group.translation.y = 100;
    
    // 重新绘制画面
    two.update();

如图：

![方圆组图](http://7xl44r.com1.z0.glb.clouddn.com/two-group-rect-circle.png)

如图所示，群对象是遵循“后来居上”的创建规则排列图形的。然而，如果你先绘制一个群对象，再建立另一个群对象。显然，画面会将后来的群对象覆盖之前的群对象。在动画中，我们可能会改变群对象中图形的图层顺序。

来看下面一个例子：

	var topGroup = two.makeGroup(),
    	bottomGroup = two.makeGroup(),
    	rect = two.makeRectangle(100, 100, 100, 100),
    	circ = two.makeCircle(150, 150, 50);
	rect.fill = "red";
	circ.fill = "blue";
 
	topGroup.add(rect);
	topGroup.add(circ);  
 
	two.update();
	
上述代码绘制的图形和上一个群图形是一样的：

![方圆组图](http://7xl44r.com1.z0.glb.clouddn.com/two-group-rect-circle.png)

但，如果我们将```rect```添加到```bottomGroup```中

	bottomGroup.add(rect);

如图，方形会覆盖在圆形之上：

![方圆组图2](http://7xl44r.com1.z0.glb.clouddn.com/two-group-circle-rect.png)

---

参考链接：[[ Two.js Tutorial ]](http://code.tutsplus.com/tutorials/drawing-with-twojs--net-32024)

END.