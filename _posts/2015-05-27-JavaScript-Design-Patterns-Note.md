---
layout: post
title:  "JavaScript Design Patterns Note"
date:  2015-05-27
categories: JavaScript
featured_image: /images/JavaScriptDesignPatterns.jpg

---

###《JavaScript Design Patterns》 笔记摘抄

这本书的中文翻译版已在图书馆借到，另外我找到了这本书原文的[[电子在线版]](http://addyosmani.com/resources/essentialjsdesignpatterns/book/)

笔记摘抄将以原版为主，结合两个版本的知识点一起记录~

---

##What is a Pattern? [ 什么是模式 ]

>A pattern is a reusable solution that can be applied to commonly occurring problems in software design - in our case - in writing JavaScript web applications. 

模式是一种可以运用到实际问题中的可复用的解决方式，对于我们来说，就是可以解决在编写JavaScript Web应用中的一些问题。

>Another way of looking at patterns are as templates for how we solve problems - ones which can be used in quite a few different situations.

另一种说法是，模式是一些解决问题的模板，它可以用来应对不同情况下的一些问题。

---

##JavaScript Design Patterns [ JavaScript设计模式 ]

<b>The Constructor Pattern  [ 构造器模式 ]</b>

>Object constructors are used to create specific types of objects - both preparing the object for use and accepting arguments which a constructor can use to set the values of member properties and methods when the object is first created.

对象的构造器用来创建特定类型的对象，需要准备将要使用的对象以及可接受的参数，这些参数可以在创建对象时，设置成员属性以及方法中用到。

以下是三种常见的创建对象的方法：
    
    // Each of the following options will create a new empty object:
    // 以下三种方法都可以创建空对象：
     
    // {}表示空对象
    var newObject = {};
     
    // or
    // 基于对象的原型创建新对象
    var newObject = Object.create( Object.prototype );
     
    // or
    // 使用new方法创建新对象
    var newObject = new Object();

>Where the "Object" constructor in the final example creates an object wrapper for a specific value, or where no value is passed, it will create an empty object and return it.

最后这个方法如果没有特定的传值，将创建一个空对象。

这里有四种方法可以赋值给对象：

ECMAScript 3 compatible approaches :
 
1.Dot syntax  <code>.</code> 语法
     
        // Set properties 设置对象的属性值
        newObject.someKey = "Hello World";
         
        // Get properties 获取对象的属性值
        var value = newObject.someKey;
     
     
2.Square bracket syntax  <code>[]</code> 语法
     
        // Set properties 设置值
        newObject["someKey"] = "Hello World";
         
        // Get properties 获取值
        var value = newObject["someKey"];
     
     
     
[ECMAScript 5](http://kangax.github.com/es5-compat-table/) only compatible approaches :
     
3.<code>Object.defineProperty</code> 基于对象属性的定义方法，一次只定义一个属性值
     
        // Set properties
        Object.defineProperty( newObject, "someKey", {
            value: "for more control of the property's behavior", //属性值
            writable: true, //可写
            enumerable: true, //可枚举
            configurable: true //可设置
        });
         
        // If the above feels a little difficult to read, a short-hand could
        // be written as follows:
        // 如果以上设置对象的方法难以理解，那么还可以写成以下形式：
         
        var defineProp = function ( obj, key, value ){
          var config = {
            value: value, //value传值
            writable: true,
            enumerable: true,
            configurable: true
          };
          Object.defineProperty( obj, key, config );
        };
         
        // To use, we then create a new empty "person" object
        // 创建了一个person对象
        var person = Object.create( Object.prototype ); 
         
        // Populate the object with properties
        // 这是基于defineProp方法定义的对象的属性以及值
    
        defineProp( person, "car", "Delorean" ); //给person对象定义了car属性，属性值为Delorean，以下以此类推
        defineProp( person, "dateOfBirth", "1981" );
        defineProp( person, "hasBeard", false );
         
        // 创建完毕后可以输出该对象
        console.log(person);
        // 可以看到该对象拥有刚刚设置的三个属性以及对应值
        Outputs: Object {car: "Delorean", dateOfBirth: "1981", hasBeard: false}
     
     
4.<code>Object.defineProperties</code> 基于对象属性的定义方法，可同时定义多个属性值
     
        // Set properties
        Object.defineProperties( newObject, {
         
          // 定义someKey属性以及值
          "someKey": {
            value: "Hello World",
            writable: true
          },
         
          // 定义anotherKey属性以及值
          "anotherKey": {
            value: "Foo bar",
            writable: false
          }
         
        });
     
> Getting properties for 3. and 4. can be done using any of the options in 1. and 2.
> 
3和4获取值可以用1和2获取值的方法


<b>Basic Constructors [ 基本构造器 ]</b>

>As we saw earlier, JavaScript doesn't support the concept of classes but it does support special constructor functions that work with objects. By simply prefixing a call to a constructor function with the keyword "new", we can tell JavaScript we would like the function to behave like a constructor and instantiate a new object with the members defined by that function.

JavaScript虽然不支持类的概念，但却支持特殊的构造方法来使用对象。可以使用构造器简单的用new关键字创建一个新的实例对象，同时可以定义该对象的成员。

>Inside a constructor, the keyword <code>this</code> references the new object that's being created. Revisiting object creation, a basic constructor may look as follows:

<code>this</code> 关键字指向正在创建的新对象。下面是使用<code>this</code>关键字的构造方法：

    // Car是一个构造方法
    function Car( model, year, miles ) {
     
      this.model = model; // 定义该对象的属性，引用创建对象时传递的参数
      this.year = year;
      this.miles = miles;
     
     // 定义对象的方法
      this.toString = function () {
        return this.model + " has done " + this.miles + " miles";
      }; 
    }
     
    // Usage:
    // 用法：

    // We can create new instances of the car
    // 创建实例对象
    var civic = new Car( "Honda Civic", 2009, 20000 );
    var mondeo = new Car( "Ford Mondeo", 2010, 5000 );
     
    // and then open our browser console to view the
    // output of the toString() method being called on
    // these objects
    // 使用实例对象toString方法
    console.log( civic.toString() );
    console.log( mondeo.toString() );

>One is that it makes inheritance difficult and the other is that functions such as toString() are redefined for each of the new objects created using the Car constructor. This isn't very optimal as the function should ideally be shared between all of the instances of the Car type.

<code>toString()</code>在定义每一项实例对象时都会重新定义一次，但这并不是我们想要的。最理想的方式是每一个新创建的实例对象都可以继承<code>toString()</code>方法。

这个时候要用到：

<b>Constructors With Prototypes [ 带原型的构造器 ]</b>

>Functions, like almost all objects in JavaScript, contain a "prototype" object. When we call a JavaScript constructor to create an object, all the properties of the constructor's prototype are then made available to the new object. In this fashion, multiple Car objects can be created which access the same prototype. We can thus extend the original example as follows:

我们可以采用基于原型的构造方法，使得每一个新创建的实例对象都可以继承原对象的原型属性和方法。

    // Note here that we are using Object.prototype.newMethod rather than
    // Object.prototype so as to avoid redefining the prototype object
    // 创建对象继承原型方法可以避免重复定义对象中的方法

    Car.prototype.toString = function () {
      return this.model + " has done " + this.miles + " miles";
    };

    // Above, a single instance of toString() will now be shared between all of the Car objects.
    // 这样toString()方法可以被所有Car的实例对象所共享。

---

>The Module pattern is based in part on object literals and so it makes sense to refresh our knowledge of them first.

模块模式基于对象字面量：

<b>Object Literals [ 对象字面量 ]</b>


对象的描述方式包裹在<code>{}</code>中，定义属性和属性值用<code>:</code>连接，最后一项属性值的定义不需要使用<code>,</code>以防止错误的发生：

    var myObjectLiteral = {
     
        variableKey: variableValue,
     
        functionKey: function () {
          // ...
        }
    };

对象字面量不需要使用<code>new</code>创建实例对象，对象所有属性将包裹在<code>{}</code>定义，在<code>{}</code>之外需要添加新的对象属性值，可以使用<code>myObjectLiteral.newPropertyName = "newValue"</code>创建。


<b>The Module Pattern [ 模块模式 ] </b>

>In JavaScript, the Module pattern is used to further emulate the concept of classes in such a way that we're able to include both public/private methods and variables inside a single object, thus shielding particular parts from the global scope. What this results in is a reduction in the likelihood of our function names conflicting with other functions defined in additional scripts on the page.

模块模式将更接近于类的概念，在同一个对象中，可以同时拥有私有和公有的属性或方法，这样可以屏蔽掉一些全局作用域的特殊部分，比如函数之间一些函数名或属性名的冲突。

<b>Privacy [ 私有 ]</b>

>It provides a way of wrapping a mix of public and private methods and variables, protecting pieces from leaking into the global scope and accidentally colliding with another developer's interface. With this pattern, only a public API is returned, keeping everything else within the closure private.

模块模式的私有可以将方法中的私有/公有的方法或变量包裹起来，防止泄漏到全局作用域中，与其他模块的属性或方法发生冲突。使用模块模式，返回值只是一个公开的API，而所有函数内的属性和方法都将在闭包内成为私有。

>This gives us a clean solution for shielding logic doing the heavy lifting whilst only exposing an interface we wish other parts of our application to use. 
>
>Within the Module pattern, variables or methods declared are only available inside the module itself thanks to closure. Variables or methods defined within the returning object however are available to everyone.

这样做提供了一个简单明了的解决方案：只暴露了一个接口供其他应用程序部分使用。

由于闭包，使得函数内的变量和方法只能在函数内引用，而返回的对象方法可以在全局使用。

书上举得例子都太复杂了，因此我自己写了一个小例子来说明模块模式：

    var myModule = (function(){
    
        var myName = "zchen9"; 
        var myAge = 21;
    
        // 通过公有接口getName()和getAge()可以访问到私有变量
        return {
            getName: function(){
                return myName;
            },
            getAge: function(){
                return myAge;
            }
        };        
    })();

    // console:
    myModule.getAge()
    // 输出21
    myModule.getName()
    // 输出"zchen9"

Advantages [ 优点 ]

>For starters, it's a lot cleaner for developers coming from an object-oriented background than the idea of true encapsulation, at least from a JavaScript perspective.

>Secondly, it supports private data - so, in the Module pattern, public parts of our code are able to touch the private parts, however the outside world is unable to touch the class's private parts.

模块模式更加接近于类的封装。

在模块模式中，只有函数中的公有方法可以调用其中的私有属性，而外界是没有办法接触到私有部分的。

Disadvantages [ 缺点 ]

>We can't access private members in methods that are added to the object at a later point. 

>Developers can't easily extend privates either, so it's worth remembering privates are not as flexible as they may initially appear.

我们无法访问那些之后在方法里添加的私有成员。

私有模式使得开发者很难扩展其中的私有方法，灵活性差。

<b>The Observer Pattern [ 观察者模式 ]</b>

>The Observer is a design pattern where an object (known as a subject) maintains a list of objects depending on it (observers), automatically notifying them of any changes to state.
>
When a subject needs to notify observers about something interesting happening, it broadcasts a notification to the observers (which can include specific data related to the topic of the notification).

观察者模式是 一个主对象拥有一系列依赖于它的对象，也就是观察者，实时自动地通知它们哪里发生了改变。

当一个主体对象需要通知所有观察者有什么事情发生的时候，它将对观察者们进行对广播，其中包含了一些特定的与主体相关的数据。

>We can now expand on what we've learned to implement the Observer pattern with the following components:
>
- Subject: maintains a list of observers, facilitates adding or removing observers
- Observer: provides a update interface for objects that need to be notified of a Subject's changes of state
- ConcreteSubject: broadcasts notifications to observers on changes of state, stores the state of ConcreteObservers
- ConcreteObserver: stores a reference to the ConcreteSubject, implements an update interface for the Observer to ensure state is consistent with the Subject's

观察者模式拥有以下几个成员：

- 主体：包含了一系列观察者，可以增加或移除观察者。
- 观察者：提供用于观察主体变化适时更新数据的接口。
- 具体主体：实时通知更新的数据状态，并存储具体观察者的状态。
- 具体观察者：存储相关的具体主体，对应更新接口，保证与具体主体的状态相同。

>First, let's model the list of dependent Observers a subject may have:
>
模拟具体实例可能拥有的一系列观察者：

    // 创建一系列观察者
    function ObserverList(){
      this.observerList = [];
    }
    // 添加观察对象
    ObserverList.prototype.add = function( obj ){
      return this.observerList.push( obj );
    };
    // 计算观察对象总数
    ObserverList.prototype.count = function(){
      return this.observerList.length;
    };
    // 获取指定地标的观察对象
    ObserverList.prototype.get = function( index ){
      if( index > -1 && index < this.observerList.length ){
        return this.observerList[ index ];
      }
    };
    // 查找指定观察对象的位置
    ObserverList.prototype.indexOf = function( obj, startIndex ){
      var i = startIndex;
     
      while( i < this.observerList.length ){
        if( this.observerList[i] === obj ){
          return i;
        }
        i++;
      }   
      return -1;
    };
    // 移除指定观察对象
    ObserverList.prototype.removeAt = function( index ){
      this.observerList.splice( index, 1 );
    };

>Next, let's model the Subject and the ability to add, remove or notify observers on the observer list.
> 
> 接下来模拟主体，给予可以添加或删除或更新观察者的功能：

    // 创建主体
    function Subject(){
      this.observers = new ObserverList();
    }
    // 创建主体添加观察者的功能
    Subject.prototype.addObserver = function( observer ){
      this.observers.add( observer );
    };
    // 创建主体删除观察者的功能
    Subject.prototype.removeObserver = function( observer ){
      this.observers.removeAt( this.observers.indexOf( observer, 0 ) );
    };
    // 创建主体的通知功能
    Subject.prototype.notify = function( context ){
      var observerCount = this.observers.count();
      for(var i=0; i < observerCount; i++){
        this.observers.get(i).update( context );
      }
    };

>In our sample application using the above Observer components, we now define:

> 
- A button for adding new observable checkboxes to the page
- A control checkbox which will act as a subject, notifying other checkboxes they should be checked
- A container for the new checkboxes being added

>We then define ConcreteSubject and ConcreteObserver handlers for both adding new observers to the page and implementing the updating interface. See below for inline comments on what these components do in the context of our example.

将举一个实例来说明观察者：

- 一个用于添加新的可观察的确认选项。
- 一个用来控制确认选项的主体，用来通知其他确认项是否被确认。
- 一个新的容器用来盛放新的确认项。

HTML:

    // 按钮-添加新观察者的确认项
    <button id="addNewObserver">Add New Observer checkbox</button>

    // 确认项
    <input id="mainCheckbox" type="checkbox"/>

    // 确认项内容容器
    <div id="observersContainer"></div>

Sample script:

    // Extend an object with an extension
    // 对对象进行扩展
    function extend( extension, obj ) {
        for ( var key in extension ) {
            obj[key] = extension[key];
        }
    }
     
    // References to our DOM elements
    // 相关DOM结构元素获取
    var controlCheckbox = document.getElementById( "mainCheckbox" ),
        addBtn = document.getElementById( "addNewObserver" ),
        container = document.getElementById( "observersContainer" );
     
     
    // Concrete Subject
    // 具体主体
    // Extend the controlling checkbox with the Subject class
    // 给按钮扩展主体方法
    extend( new Subject(), controlCheckbox );
     
    // Clicking the checkbox will trigger notifications to its observers
    // 点击确认项可以触发事件通知观察者，该确认项已被确认
    controlCheckbox.onclick = function(){
        controlCheckbox.notify( controlCheckbox.checked );
    };
    // 点击添加按钮触发事件添加新的观察者
    addBtn.onclick = addNewObserver;
     
    // Concrete Observer
    // 具体观察者
    function addNewObserver(){
     
        // Create a new checkbox to be added
        // 添加新的确认项
        var check = document.createElement( "input" );
        check.type = "checkbox";
     
        // Extend the checkbox with the Observer class
        // 扩展确认项的观察者
        extend( new Observer(), check );
     
        // Override with custom update behaviour
        // 确认项更新值
        check.update = function( value ){
            this.checked = value;
        };
     
        // Add the new observer to our list of observers
        // 给一系列观察者添加新的观察者
        // for our main subject
        // 给主体添加观察者
        controlCheckbox.addObserver( check );
     
        // Append the item to the container
        // 将新添加的确认项添加到容器中
        container.appendChild( check );
    }

---

###╮(╯▽╰)╭

待更新...