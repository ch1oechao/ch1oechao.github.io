---
layout: post
title:  "JavaScript Patterns Study Notes"
date:  2015-11-29
categories: JavaScript
featured_image: /images/js.jpg
---

设计模式真是个好东西~

### 通用命名空间函数

	MYAPP.namespace('MYAPP.modules.module2');
	
	var MYAPP = {
		modules: {
			module2: {}
		}
	};
	

	var MYAPP = MYAPP || {};
	
	MYAPP.namespace = function (ns_string) {
		var parts = ns_string.split('.'),
			parent = MYAPP,
			i;
			
		if (parts[0] === "MYAPP") {
			parts = parts.slice(1);
		}
		
		for (i = 0; i < parts.length; i += 1) {
			if (typeof parent[parts[i]] === "undefined") {
				parent[parts[i]] = {};
			}
			parent = parent[parts[i]];
		}
		
		return parent;
	}
