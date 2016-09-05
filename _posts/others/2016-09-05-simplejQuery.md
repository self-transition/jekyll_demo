---
layout: post
title:  一个用DOM简写轻量级jQuery库
categories: tools
key: 20160905
---
# 一个仿Jquery的超轻量级js库

标签（空格分隔）： JavaScript

---
##在深入学习jQuery的过程中硬着头皮看了jQuery的源码，不得不说几年前的东西现在仍然被大范围使用确实有其内在原因的。以jquery-2.0.3为例，jQuery大概可以分为以下几个部分：##
---
```xml
(function(){
	
	√(21 , 94) 定义了一些变量和函数 jQuery = function(){};
	
	√(96 , 283) 给JQ对象，添加一些方法和属性
	
	√(285 , 347) extend : JQ的继承方法
	
	(349 , 817) jQuery.extend() : 扩展一些工具方法
	
	(877 , 2856)  Sizzle : 复杂选择器的实现 
	
	√(2880 , 3042) Callbacks : 回调对象 : 对函数的统一管理
	
	(3043 , 3183) Deferred : 延迟对象 : 对异步的统一管理
	
	(3184 , 3295) support : 功能检测
	
	(3308 , 3652) data() : 数据缓存
	
	√(3653 , 3797) queue() : 队列方法 : 执行顺序的管理 
	
	√(3803 , 4299) attr() prop() val() addClass()等 : 对元素属性的操作
	
	(4300 , 5128) on() trigger() : 事件操作的相关方法
	
	(5140 , 6057) DOM操作 : 添加 删除 获取 包装 DOM筛选
	
	(6058 , 6620) css() : 样式的操作
	
	(6621 , 7854) 提交的数据和ajax() : ajax() load() getJSON()
	
	(7855 , 8584) animate() : 运动的方法
	
	(8585 , 8792) offset() : 位置和尺寸的方法
	
	(8804 , 8821) JQ支持模块化的模式
	 
	(8826)  window.jQuery = window.$ = jQuery;
	
})();
```
        我此次简写的rquery-1.0.2对上述打钩的部分功能做了部分封装，废话不多说，直接上源码：
```xml
    /**封装选择器
    *封装RQpbject对象，提供一个数组元素，以及若干自定义操作
    *通过$("#id|.class|element")获取元素*/
    /**封装RQobject
    rxy8023 qq:768947378
    **/
    var $ = function(selector){
    	this.Rqobject= new rqobject();
    	if(selector.substring(0,1) == "#"){
    		var elem =document.getElementById(selector.substring(1,selector.length))
    		this.Rqobject.data.push(elem);
    	}
    	else if(selector.substring(0,1)==".") {
    			var reg=new RegExp("(^|\\s)"+selector.substring(1)+"($|\\s)")
    			var elms = document.getElementsByTagName("*")
    			var arr = []
    			for(i=0;i<elms.length;i++){
    				if (reg.test(elms[i].className)) {
    					this.Rqobject.data.push(elms[i])
    				};
    			}
    	}else if(selector.indexOf("<") == 0 && selector.lastIndexOf(">")==selector.length-1)
    
    	//	1. 判断是否为html标签以<开始 以>结束
    	 {
    	 	//2.提取标签名
    	 	var elemName = selector.substring(1,selector.indexOf(">"))
    	 	//console.log(elemName)
    	 	//3.document.createElement()
    	 	var newElem = document.createElement(elemName);
    	 	var content = selector.substring(selector.indexOf(">")+1,selector.lastIndexOf("<"))
    	 	//console.log(content)
    	 	//4.封装标签内容innerhtml
    	 	newElem.innerHTML=content;
    	 	//5.封装到tqobject
    	 	this.Rqobject.data.push(newElem);
    	 }
    	else{
    		var elem =document.getElementsByTagName(selector)
    		this.Rqobject.data=elem;
    	}
        return Rqobject;
    
    }
    //rquery对象 有自己的方法，但是不能访问DOM方法
    //同样DOM也不能访问RQUERY
    var rqobject=function(){
    	this.data=[];
    }
    //原型
    rqobject.prototype={
    	size:function(){
    		return this.data.length;
    	},
    	html:function(content){
    		//对innerHTML封装
    		if(content){
    			//为元素设置HTML
    			for(i=0;i<this.data.length;i++){
    				this.data[i].innerHTML = content;//获取的是DOM数组
    			}
    			return this;//返回自己(rqobject)从而实现方法的连缀调用
    		}
    		else{
    			//获取HTML
    			if (this.data.length !=0) {
    				return this.data[0].innerHTML;
    			}
    			return
    		}
    	},
    	// text:function(content){
    	// 	if (content) {
    	// 		if (window.navigator.userAgent.toLowerCase()/*转化为小写*/.indexOf("firefox")!=-1){
    	// 		//火狐浏览器
    	// 		for(i=0;i<this.data.length;i++){
    	// 			this.data[i].innerContent = content;
    	// 	}
    	// 	return this;
    	// 	}
    	// 	    else{
    	// 	    	for(i=0;i<this.data.length;i++){
    	// 	    		this.data[i].innerHTML = content
    	// 	    	}
    	// 	    	return this
    	// 	    }
    	// }
    	// else{
    	// 	if(this.data.length!=0){
    	// 		return this.data[0].innerText
    	// 	}
    	// },
    	val:function(value){
    		if (value) {
    			//为value属性设置值
    			for(i=0;i<this.data.length;i++){
    				this.data[i].setAttribute("value",value);
    				//this.data[i].value=value;
    			}
    			return this;
    		}
    		else{
    			if (this.data[0].length !=0) {
    				//return this.data[0].getAttribute("value");标签后得到的是什么就是什么  必须有value标签
    				return this.data[0].value;
    			};
    		}
    	},
    	attr:function(name,value){
    		if(name && value){
    			for(var i=0;i<this.data.length;i++){
    				this.data[i].setAttribute(name,value);
    			}
    			return this;
    		}else if (name) {
    				if (this.data.length!=0) {
    					return this.data[0].getAttribute(name);//必须有name
    				}
    			}
    		
    	},
    	addClass:function(className){
    		for (var i = 0; i < this.data.length; i++) {
    			var elem = this.data[i]
    			if(elem.getAttribute("class")){
    				//已经有classname属性
    				var oldClassName=elem.getAttribute("class");
    				var newClassName=oldClassName+""+className;
    				elem.setAttribute("class",newClassName)
    			}
    			else{
    				//设置classname
    				elem.setAttribute("class",className)
    			}
    		}
    	},
    	removeClass:function(className){
    		if (className) {
    			//删除指定名称类样式
    			for(var i=0;i<this.data.length;i++){
    				var arr=this.data[i].getAttribute("class").split(" ");
    				var newClassName="";
    				for(var j=0;j<arr.length;j++){
    					if(arr[j] == className){
    						continue;
    					}
    					newClassName += arr[j] + " ";
    				}
    				newClassName=newClassName.substring(0,newClassName.length-1);
    				this.data[i].setAttribute("class",newClassName);
    			}
    			return this;
    		}
    		else{
    			//删除所有类样式
    			for(var i=0;i<this.data.length;i++){
    				this.data[i].setAttribute("class","");
    			}
    			return this;
    		}
    	},
    	append:function(Rqobject){
    		//将tqObject里面的第一个元素增加到this里面的第一个元素里
    		//$("body").append($('<div>Hello Tarena</div>'));
    		var srcElem = this.data[0];//源
    		var tarElem = Rqobject.data[0];//目标
    		srcElem.appendChild(tarElem);
    		return this;
    	},
    	appendTo:function(Rqobject){
    		var srcElem=Rqobject.data[0];
    		var tarElem=this.data[0];
    		srcElem.appendChild(tarElem);
    	},
    	insertBefore:function(Rqobject){
    		var newElem =this.data[0];//谁调用
    		var oldElem =Rqobject.data[0];
    		var parentElem= oldElem.parentNode;
    		parentElem.insertBefore(newElem,oldElem);
    		return this;
    	},
    	remove:function(){
    		var removeElem=this.data[0];
    		var parentElem=removeElem.parentNode;
    		parentElem.removeChild(removeElem);
    		return this;
    	},
    	slideUp:function(speed){
    		var elem=this.data[0];
    		var height = elem.offsetHeight;//可视化的高度
    		var s = speed || 300;//s默认是300
    		var l=30*height/s // l/height=30/s
    		
    		
    		var oldHeight = height;
    		//var h=elem.style.height;获取行内样式，
    		// console.log(height)
    		var interval=setInterval(function(){
    			height-=l
    			elem.style.height=height+"px"
    			if (height<=0) {
    				elem.style.display='none';
    				elem.style.height = oldHeight+"px";
    				clearInterval(interval)
    				console.log(oldHeight)
    			}
    		},30)
    
    
    	},
    	slideDown:function(speed){
    	var elem= this.data[0] 
    	var height= parseInt(this.data[0].style.height)
    	var s = speed || 300;//s默认是300
    		var l=30*height/s ;// l/height=30/s
    	// console.log(height);
    	elem.style.display="block";	
    	elem.style.height=0+"px"
    	var interval = setInterval(function(){
    		elem.style.height=( elem.offsetHeight +l)+"px";
    		if (elem.offsetHeight >= height) {
    			clearInterval(interval);
    			elem.style.height=height+"px"
    		}
    	},30)
    	},
    	hide:function(speed){
    		var elem =this.data[0];
    		var height= elem.offsetHeight;
    		var width =elem.offsetWidth;
    		var s = speed || 300;//s默认是300
    		var h=30*height/s // l/height=30/s
    		var w=30*width/s;
    		var oldHeight= height;
    		var oldWidth= width;
    		var interval= setInterval(function(){
    			height-=h;
    			width-=w;
    			elem.style.height=height+"px";
    			elem.style.width=width+"px";
    			if (height<=0 || width<=0) {
    				clearInterval(interval);
    				elem.style.display = "none";
    				elem.style.height = oldHeight + "px";
    				elem.style.width = oldWidth + "px";
    			}
    		})
    
    	},
    	show:function(speed){
    		var elem =this.data[0];
    		var height= parseInt(elem.style.height);
    		var width =parseInt(elem.style.width);
    		var s = speed || 300;//s默认是300
    		var h=30*height/s // l/height=30/s
    		var w=30*width/s;
    		elem.style.display = "block";
    		elem.style.height=0+"px"
    		elem.style.width=0+"px"
    		
    		var interval= setInterval(function(){
    			elem.style.height=( elem.offsetHeight +h)+"px";
    			elem.style.width=( elem.offsetWidth +w)+"px";
    			if (elem.offsetHeight >= height||elem.offsetWidth >= width) {
    				clearInterval(interval);
    				elem.style.height = height + "px";
    				elem.style.width = width + "px";
    				
    			}
    		},30)
    	},
    	fadeOut:function(speed){
    		var elem=this.data[0];
    		var op = 100
    		var s= speed || 300;
    		var l = 30* op/s
    		var interval = setInterval(function(){
    			op-=l
    		elem.style.opcity=op/100;
    		if (op<=0) {
    			clearInterval(interval);
    			elem.display="none";
    		}
    		})
    	},
    	fadeIn:function(speed){
    		var elem =this.data[0];
    		var opcity = elem.style.opcity;
    		var op = 100
    		var s= speed || 300;
    		var l = 30* op/s;
    		elem.style.display="block";
    		elem.style.opcity = 0;
    		var interval=setInterval(function(){
    			elem.style.opcity= (window.getComputedStyle(elem).opcity+l);//获取当前的样式
    			//getPrepertyValue
    			clearInterval(interval);
    		})
    	},
    	bind :function(eventName,fn){
    		for (var i = 0; i < this.data.length; i++) {
    			var elem = this.data[i];
    			elem.addEventListener(eventName,fn,false);
    		}
    	}, 
    }
```        
大家看过后就会发现其实就是一个用纯DOM方法和一些正则封装的一些基本方法，可以实现基础功能和基本的动画，和jQuery的设计模式相差甚远，只是借照其思想更加深入理解各种功能而已。
>尽管如此，等水平进一步提高后，我也会继续完善我的的，文章较为简单，谢谢阅读！
    






