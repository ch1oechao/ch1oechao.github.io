---
layout: post
title:  "Some Nice Code With JS"
date:  2015-08-17
categories: JavaScript
featured_image: /images/js.jpg

---

### JS中一些建议写法

   
主要收集了 [[参考规范]](https://github.com/ecomfe/spec/blob/master/javascript-style-guide.md) 一些常用到的 更规范 更优雅JavaScript代码 ~


####文件 

- ```JavaScript``` 文件使用 ```无BOM``` 的 ```UTF-8``` 编码
- 在文件结尾处，保留一个空行

	> UTF-8 编码具有更广泛的适应性。BOM 在使用程序或工具处理文件时可能造成不必要的干扰

####注释

- **单行注释**  单独占一行 ```//``` 后跟一个空格 
- **多行注释**  有多行注释内容时，使用多个单行注释
- **文档化注释**  内容包含以 ```/**...*/``` 形式的块注释
	- 文件 @file {说明文件作用}
	- 命名空间 @namespace 
	- 类 @class {类名 解释说明作用} 
	- 函数或方法 @param {参数类型} @return {返回对象} 
	- 类型 @param {基本类型} @typeof {复杂类型}
	- 事件 @event {说明事件作用}
	- 常量 @const {常量}
	- AMD模块 @module {模块} @exports {接口}
	
####语言特性

#####变量 

- 变量在使用前必须通过 ```var``` 或 ```let``` 定义, 否则会产生全局变量，污染全局环境

- 每个 ```var``` 或 ```let``` 只能声明一个变量

		var name = 'chen';
		var hehe = 'haha';
		// or
		let name = 'chen';
		let haha = 'hehe';
	
	> 一个 var 声明多个变量，容易导致较长的行长度，并且在修改时容易造成逗号和分号的混淆。

- 变量必须 即用即声明，不得在函数或其它形式的代码块起始位置统一声明所有变量

	> 变量声明与使用的距离越远，出现的跨度越大，代码的阅读与维护成本越高。虽然JavaScript的变量是函数作用域，还是应该根据编程中的意图，缩小变量出现的距离空间。

#####条件

- 在 Equality Expression 中使用类型严格的 ```===```。仅当判断 ```null``` 或 ```undefined``` 时，允许使用 ```== null``` 

	> 使用 === 可以避免等于判断中隐式的类型转换。

- 尽可能使用简洁的表达式

		// 字符串为空
		if (!name) {
			// do something
		}
		// 字符串非空
		if (name) {
			// do something
		}
		// 数组非空
		if (arr.length) {
			// ...
		}
		// 布尔不成立
		if (!notTrue) {
			// ...
		}
		// null 或 undefined
		if (noVal == null) {
    		// ...
		}

- 按执行频率排列分支的顺序
- 对于相同变量或表达式的多值条件，用 ```switch``` 代替 ```if```
- 如果函数或全局中的 ```else``` 块后没有任何语句，可以删除 ```else```


#####循环

- 对有序集合进行遍历时，缓存 ```length```

		for (var i = 0, len = eles.length; i < len; i++) {
    		var ele = eles[i];
    		// ......
		}


	> 虽然现代浏览器都对数组长度进行了缓存，但对于一些宿主对象和老旧浏览器的数组对象，在每次 length 访问时会动态计算元素个数，此时缓存 length 能有效提高程序性能。

- 不要在循环体中包含函数表达式，事先将函数提取到循环体外

	> 循环体中的函数表达式，运行过程中会生成循环次数个函数对象
	
		// good
		function hehe() {
    		// ...
		}

		for (var i = 0, len = eles.length; i < len; i++) {
    		var ele = eles[i];
    		addListener(ele, 'click', hehe);
		}
	
- 对循环内多次使用的不变值，在循环外用变量缓存

		// good
		var width = hehe.offsetWidth + 'px';
		for (var i = 0, len = eles.length; i < len; i++) {
    		var ele = eles[i];
    		ele.style.width = width;
    		// ...
		}


- 对有序集合进行顺序无关的遍历时，使用逆序遍历

	> 逆序遍历可以节省变量，代码比较优化。
	
		var len = eles.length;
		while (len--) {
			var ele = eles[len];
		}
		
#####类型

**类型检测**

- 类型检测优先使用 ```typeof```
- 对象类型检测使用 ```instanceof```
- ```null``` 或 ```undefined``` 的检测使用 ```== null```

**类型转换**

- 转换成 ```string``` 时，使用 ```+ ''```

		var numStr = num + '';

- 转化为 ```number``` 时，使用 ```+``` 
		
		var num = +str;
		
- ```string``` 转换成 ```number```，要转换的字符串结尾包含非数字并期望忽略时，使用 ```parseInt```，且必须制定进制

		var width = '100px';
		parseInt(width, 10);

- 转换为 ```boolean``` 时，使用 ```!!```

		var bool = !!num;
		
- ```number``` 去除小数点 使用 ```Math.floor / Math.round / Math.ceil``` 不使用 ```parseInt```

		// good
		var num = 3.14;
		Math.ceil(num);
		
**字符串**

- 字符串开头和结束使用单引号 ```'```

		var html = '<div class="cls">拼接HTML可以省去双引号转义</div>';

- 使用 数组 或 ```+``` 拼接字符串

		// 使用数组拼接字符串
		var str = [
    		// 推荐换行开始并缩进开始第一个字符串, 对齐代码, 方便阅读.
    		'<ul>', 
    			'<li>第一项</li>',
    			'<li>第二项</li>',
    		'</ul>'
		].join('');
		

		// 使用 + 拼接字符串
		var str2 = '' // 建议第一个为空字符串, 第二个换行开始并缩进开始, 对齐代码, 方便阅读
    	+ '<ul>',
    	+    '<li>第一项</li>',
    	+    '<li>第二项</li>',
    	+ '</ul>';

**对象**

- 使用对象字面量 ```{}``` 创建新 ```Object```

		var obj = {};

- 对象创建时，如果一个对象的所有 ```属性``` 均可以不添加引号，则所有 ```属性``` 不得添加引号

		var info = {
			name: 'hehe',
			age: 666
		};

- 对象创建时，如果任何一个 ```属性``` 需要添加引号，则所有 ```属性``` 必须添加 ```'```

		var info = {
			'name': 'heheda',
			'age': 999,
			'hehe': 'friend'
		};

- 不允许修改和扩展任何原生对象和宿主对象的原型

		// Don't Do This !!!
		String.prototype.trim = () => {};

- 属性访问时，尽量使用 ```.```

		info.age; //better
		info[name];

- ```for in``` 遍历对象时, 使用 ```hasOwnProperty``` 过滤掉原型中的属性

		var newObj = {};
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				newObj[key] = obj[key];
			}
		}

**数组**

- 使用数组字面量 ```[]``` 创建新数组，除非想要创建的是指定长度的数组

		var arr = [];

- 遍历数组不使用 ```for in```

		// good
		for (var i = 0, len = arr.length; i < len; i++) {
			console.log(i);
		}

- 不因为性能的原因自己实现数组排序功能，尽量使用数组的 ```sort``` 方法

	> 自己实现的常规排序算法，在性能上并不优于数组默认的 sort 方法。

- 清空数组使用 ```.length = 0```

**函数**

- 一个函数的长度控制在 50 行以内

	> 将过多的逻辑单元混在一个大函数中，易导致难以维护。一个清晰易懂的函数应该完成单一的逻辑单元。复杂的操作应进一步抽取，通过函数的调用来体现流程。

	> 特定算法等不可分割的逻辑允许例外。

		function hehe() {
			haha();
			heihei();
		}
		
		function haha() {
			// ...
		}
		
		function heihei() {
			// ...
		}
		
- 参数设计 
	- 一个函数的参数控制在 6 个以内
	- 通过 options 参数传递非数据输入型参数 
	
- 空函数 不使用 new Function() 的形式

		var emptyFn = function () {};
		
		// or
		
		var EMPTY_FN = function () {};
		function Hehe() {}
		Hehe.prototype.haha = EMPTY_FN;

**面向对象**

- 类的继承方案，实现时需要修正 ```constructor```

		/**
		* 构建类之间的继承关系
		* 
		* @param {Function} subClass 子类函数
		* @param {Function} superClass 父类函数
		*/
		function inherits(subClass, superClass) {
    		var F = new Function();
    		F.prototype = superClass.prototype;
    		subClass.prototype = new F();
    		subClass.prototype.constructor = subClass;
		}
		
- 声明类时，保证 ```constructor``` 的正确性

		function Animal(name) {
    		this.name = name;
		}

		// 直接prototype等于对象时，需要修正constructor
		Animal.prototype = {
    		constructor: Animal,
    		jump: function () {
        		alert('animal ' + this.name + ' jump');
    		}
		};

		// 这种方式扩展prototype则无需理会constructor
		Animal.prototype.jump = function () {
    		alert('animal ' + this.name + ' jump');
		};

- 属性在构造函数中声明，方法在原型中声明

	> 原型对象的成员被所有实例共享，能节约内存占用。所以编码时我们应该遵守这样的原则：原型对象包含程序不会修改的成员，如方法函数或配置项。
	
		function TextNode(value, engine) {
    		this.value = value;
    		this.engine = engine;
		}

		TextNode.prototype.clone = function () {
    		return this;
		};
		
**动态特性**

- 避免使用直接 ```eval``` 函数

	> 直接 eval，指的是以函数方式调用 eval 的调用方法。直接 eval 调用执行代码的作用域为本地作用域，应当避免。

- 尽量避免使用 ```eval``` 函数

- 尽量不要使用 ```with```

	> 使用 with 可能会增加代码的复杂度，不利于阅读和管理；也会对性能有影响。大多数使用 with 的场景都能使用其他方式较好的替代。所以，尽量不要使用 with。
	
- 减少 ```delete``` 使用

	> 如果没有特别的需求，减少或避免使用delete。delete的使用会破坏部分 JavaScript 引擎的性能优化。


#####DOM

**元素获取**

- 遍历元素集合时，尽量缓存集合长度。如需多次操作同一集合，则应将集合转为数组

	> 原生获取元素集合的结果并不直接引用 DOM 元素，而是对索引进行读取，所以 DOM 结构的改变会实时反映到结果中。

- 获取元素的直接子元素时使用 ```children``` 避免使用 ```childNodes``` 除非预期是需要包含文本、注释和属性类型的节点

**样式设置**

- 尽可能通过为元素添加预定义的 className 来改变元素样式，避免直接操作 style 设置 
- 通过 style 对象设置元素样式时，对于带单位非 0 值的属性，不允许省略单位 

**DOM操作**

- 操作 ```DOM``` 时，尽量减少页面 ```reflow```

	> 页面 reflow 是非常耗时的行为，非常容易导致性能瓶颈。下面一些场景会触发浏览器的reflow：

	- DOM元素的添加、修改（内容）、删除。
	- 应用新的样式或者修改任何影响元素布局的属性。
	- Resize浏览器窗口、滚动页面。
	- 读取元素的某些属性（offsetLeft、offsetTop、offsetHeight、offsetWidth、scrollTop/Left/Width/Height、clientTop/Left/Width/Height、getComputedStyle()、currentStyle(in IE)) 。
	
- 在循环体中拼接 ```HTML``` 字符串，循环结束后写父元素的 ```innerHTML``` 

**DOM事件**

- 使用 addEventListener 时第三个参数使用 false

	> 标准浏览器中的 addEventListener 可以通过第三个参数指定两种时间触发模型：冒泡和捕获。而 IE 的 attachEvent 仅支持冒泡的事件触发。所以为了保持一致性，通常 addEventListener 的第三个参数都为 false。













