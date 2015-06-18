---
layout: post
title:  "Something about HTTP"
date:  2015-06-18
categories: Web
featured_image: /images/http.jpg

---

###《图解HTTP》 笔记摘抄

参考资料: [[经典的Web应用网络模型]](http://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=206029700&idx=1&sn=f265592ea5ac32a6315448701ca17b8d#rd) 

---

### 在地址栏中输入某个网址，简要讲下整个页面呈现的过程? 

#### 客户端

1. 用户想浏览 http://www.chen9.info 页面，浏览器需要通过DNS找到对应域名下的IP地址：10X.XXX.XXX.XXX 。

2. HTTP协议的职责：生成针对目标Web服务器的HTTP请求报文 —— “请给我http://www.chen9.info 页面资源”。

3. TCP协议的职责：经过三次握手，建立双方之间的连接。为了方便通信，将HTTP请求报文分割成报文段，按序号分为多个报文段，把每个报文段可靠地传送给对方。

> 一般来说，浏览器会先询问本地DNS缓存，如果没有记录过这个域名的映射IP，那就向本地的DNS网关询问，如果网关也不知道，就继续向上一层的DNS服务器询问，直到拿到这个IP地址。

#### 服务端

1. IP协议的职责：从对方那里接收到的报文段，重组到达的报文段，按序号以原来的顺序重组请求的报文。
2. HTTP协议的职责：对Web服务器请求的内容的处理 —— “是想要地址为10X.XXX.XXX.XXX的计算机上的资源啊”
3. 请求的处理结果也同样利用TCP/IP通信协议项用户进行回传。通过四次握手，确认连接断开，终止通信。


> 一般来说，一台服务器处理的请求是有限的，因此大型的应用都会有多台proxy机器，我们可以让DNS服务器在第一个请求返回IP1，第二个请求返回IP2...这样用户的请求就会均匀的落在这些机器上，这个就是DNS负载均衡。
> 
> CDN就是通过智能DNS算出离用户最近的CDN节点的IP地址，这样用户可以访问一台离他最近的机器，大大节约连接时间。
> 
> 一般来说，浏览器跟真正提供Web服务器的机器是没有直接连接的，他们中间会有代理跟反向代理。
> 
> 代理服务器的作用是所有内部的网络请求都是通过代理去连接对方的服务器，可以在代理服务器这里做恶意请求/相应的拦截，还可以缓存内部网络所需的公共资源。
> 
> 反向代理就是以代理服务器来接受网络连接请求，Proxy机器指的就是反向代理机器，Proxy机器收到请求后会经过一定的分析最后把请求内容转发给内网对应的Web服务器，Web服务器的HTTP响应包会先到Proxy机器，然后再到用户机器。这样可以负载平衡、拦截恶意请求、维持长连接。

### 返回结果的HTTP状态码

HTTP状态码负责表示客户端HTTP请求的返回结果、标记服务器端的处理是否正常、通知出现的错误等工作。

#### 状态码的类别
- 1XX： Information (信息性状态码) —— 接收的请求正在处理 
- 2XX： Success (成功状态码) —— 请求正常处理完毕
> 200 OK 表示从客户端发来的请求在服务器端被正常处理了。
> 
> 204 No Content 代表服务器接收到请求已处理成功，但在返回的响应报文中不含实体的主体部分。即浏览器显示的页面不发生更新。

- 3XX： Redirection (重定向状态码) —— 需要进行附加操作已完成请求
- 4XX： Client Error (客户端错误状态码) —— 服务器无法处理请求
> 400 Bad Request 表示请求报文中存在语法错误。
> 
> 401 Unauthorized 表示发送的请求需要有通过HTTP认证的认证信息。
> 
> 403 Forbidden 表示对请求资源的访问被服务器拒绝了。
> 
> 404 Not Found 表示服务器上无法找到请求的资源。

- 5XX： Server Error (服务器错误状态码) —— 服务器处理请求出错
> 500 Internal Server Error 表明服务器端在执行请求时发生了错误。
> 
> 503 Service Unavailable 表明服务器暂时处于超负载或者正在进行停机维护，现在无法处理请求。

### HTTP首部

#### User-Agent
>
- Chrome：Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.81 Safari/537.36
- FireFox：Mozilla/5.0 (Windows NT 6.3; WOW64; rv:35.0) Gecko/20100101 Firefox/35.0
- IE Edge 模式：Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; .NET4.0E; .NET4.0C; rv:11.0) like Gecko
- IE8：Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.3; WOW64; Trident/7.0; .NET4.0E; .NET4.0C)
- iPhone：Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X; en-us) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53
- iPad：Mozilla/5.0 (iPad; CPU OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53
- Android：Mozilla/5.0 (Linux; U; Android 4.3; en-us; SM-N900T Build/JSS15J) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30

以上是我在电脑上所安装的浏览器中所查找到的各类UserAgent。

基于这个属性，可以通过 <code>HTML DOM userAgent</code> 属性判断访问者的浏览器和版本号或者设备类型。 [[具体用法]](http://www.w3school.com.cn/jsref/prop_nav_useragent.asp)

#### Set-Cookie

> - NAME=VALUE 赋予Cookie的名称和其值(必须项)
> - expires=DATE Cookie的有效值(若不明确指定则默认为浏览器关闭前为止)
> - path=PATH 将服务器上的文件目录作为Cookie的适用对象(若不指定则默认为文档所在的文件目录)
> - Domain=域名 作为Cookie适用对象的域名(若不指定则默认为创建Cookie的服务器的域名)
> - Secure 仅在HTTPS安全通信时才会发送Cookie
> - HttpOnly 加以限制，使Cookie不能被JavaScript脚本访问

### 确保Web安全的HTTPS

#### HTTPS = HTTP + 加密 + 认证 + 完整性保护

在HTTP协议中有可能存在信息窃听或者身份伪装等安全信息。使用HTTPS通信机制可以有效地防止这些问题。HTTPS并非是应用层的一种新协议。只是HTTP通信接口部分用SSL(Secure Socket Layer)和TLS(Transport Layer Security)协议代替而已。

#### SSL
SSL采用公开密钥加密(Public-key cryptography)的加密处理方式。近代加密方法中，加密算法是公开的，而密钥却是保密的。通过这种方法得以保持加密方法的安全性。SSL是独立于HTTP的协议，不光是HTTP协议，其它运行在应用层的SMTP和Telnet等协议均可配合SSL协议使用。

#### 证明公开密钥正确性的证书
数字证书认证机构处于客户端与服务器双方都可信赖的第三方机构的立场上。

> 业务流程：
> 
> - 服务器把自己的公开密钥登录至数字证书认证机构。 
> - 数字证书认证机构用自己的私有密钥向服务器的公开密码部署数字签名并颁发公钥证书。
> - 数字证书认证机构的公开密钥已事先植入到浏览器中。客户端拿到服务器的公钥证书后，使用数字证书认证机构的公开密钥，向数字证书认证机构验证公钥证书上的数字签名，以确认服务器的公开密钥的真实性。
> - 客户端使用服务器的公开密钥对报文加密后发送。
> - 服务器端用私有密钥对报文解密。

HTTPS采用共享密钥加密和公开密钥加密两者并用的混合加密机制。在交换密钥环节使用公开密钥加密方式，之后在建立通信交换报文阶段则使用共享密钥加密的方式。

### HTTP确认访问用户的认证(HTTP/1.1)

#### BASIC认证(基本认证)
采用Base64编码方式对用户ID和密码进行编码后传送，但这并不是加密处理。因为不够灵活且安全性不高，因此不常采用。
 
#### DIGEST认证(摘要认证)
采用质询/响应的方式(challenge/response)，接收方接收到质询码，通过计算生成响应码，最后返回给发送方进行确认。

#### SSL客户端认证
借助由HTTPS的客户端证书完成的认证方式。凭借客户端证书认证，服务器可确认访问是否来自已登录的客户端。

#### FormBase认证(基于表单认证)
该方法并不在HTTP中定义，客户端会向服务器上的Web应用程序发送登录信息(Credential)，按登录信息的验证结果认证。
> 一般使用Cookie来管理Session(会话)：
> 
> - 客户端发送已登录信息(用户ID和密码)。
> - 服务端向用户发放Session ID(保存Set-Cookie中)，记录认证状态。
> - 客户端发送包含Session ID的Cookie。
> - 服务端通过验证客户端发送的Cookie中Session ID的值，来判定对方是否是真实用户。


### 基于HTTP的功能追加协议

#### Ajax ( Asynchronous JavaScript and XML ) 异步JavaScript与XML技术

是一种有效利用<code>JavaScript</code>和<code>DOM</code>(Document Object Model, 文档对象模型)的操作。已达到局部Web页面替换加载的异步通信手段。

其核心技术是名为XMLHttpRequest的API，通过JavaScript的调用就能和服务器进行HTTP通信。

#### Comet

一旦服务器端有内容更新了，Comet不会让请求等待，而是直接给客户端返回响应。这是一种通过延迟应答，模拟实现服务器端向客户端推送(Server Push)的功能。

#### SPDY

SPDY以会话层的形式加入，介于TCP(SSL)和HTTP之间，控制对数据的流动，但还是采用HTTP建立通信连接。

使用SPDY后，HTTP协议额外获得以下功能：
> - 多路复用流： 通过单一的TCP连接，可以无限制处理多个HTTP请求。所有请求处理都在一条TCP连接上完成，效率得到提高。
> - 赋予请求优先级： 给请求逐个分配优先级顺序，主要是为了在发送多个请求时，解决因贷款低而导致响应变慢的问题。
> - 压缩HTTP首部： 减少数据包数量和发送的字节。
> - 推送功能： 支持服务器主动向客户端推送数据的功能。服务器可直接发送数据，不必等待客户端请求。
> - 服务器提示功能： 服务器可以主动提示客户端请求所需资源。

#### 使用全双工通信的WebSocket

WebSocket 即Web浏览器与Web服务器之间全双工通信标准。WebSocket API 由W3C定为标准，主要是为了解决Ajax和Comet里XMLHttpRequest附带的缺陷所引起的问题。

一旦Web服务器与客户端之间建立起WebSocket协议的通信连接，之后所有的通信都依靠这个专用协议进行。通信过程中可互相发送JSON/XML/HTML或图片等任意格式的数据。

### Web攻击技术

#### 对Web应用的攻击模式
主动攻击(active attack)是指攻击者通过直接访问Web应用，把攻击代码传入的攻击模式。具有代表性的攻击是SQL注入攻击和OS命令注入攻击。

被动攻击(passive attack)是指利用圈套策略执行攻击代码的攻击模式。在被动攻击过程中，攻击者不直接对目标Web应用访问发起攻击。

#### 跨站脚本攻击

跨站脚本攻击(Cross-Site Scripting, XSS)是指通过存在的安全漏洞的Web网站注册用户的浏览器内运行非法的HTML标签或者JavaScript进行的一种攻击。动态创建的HTML部分有可能隐藏着安全漏洞。

参考资料：[[ XSS的原理分析与解剖 ]](http://www.freebuf.com/articles/web/40520.html)

#### SOL注入攻击

SQL注入(SQL Injection)是指针对Web应用使用的数据库，通过运行非法的SQL语句而产生的攻击。该安全隐患有可能引发极大的威胁，有时会直接导致个人信息及机密信息的泄露。

参考资料： [[ 专题：SQL注入攻击与防御 ]](http://netsecurity.51cto.com/art/201108/287651.htm)




---

完

