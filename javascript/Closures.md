---
title: 闭包问题
---


# 闭包问题

## **闭包是什么？**

闭包是能够访问函数内部变量的函数

闭包是将函数内部和函数外部连接起来的桥梁。



## **闭包的用途**

1、能够读取函数内部的变量；

2、让这些变量的值始终保持在内存中。



## **闭包需要注意什么**

1、闭包会使函数中的变量保存在内存中，内存消耗很大。所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄漏。解决办法是，在退出函数之前，将不使用的局部变量删除。

2、闭包会在父函数外部，改变父函数内部变量的值。所以，如果把父函数当做对象使用，把闭包当作它的公用方法，把内部变量当作它的私有属性，这时要注意不要随便改变父函数内部变量的值。



## **闭包的应用场景**

1、保护函数内部变量的安全；

2、通过保护变量安全实现JS私有属性和私有方法不能被外部访问；

3、使用闭包代替全局变量，防止变量污染。



## **闭包的优点**

1、变量长期驻扎在内存中；

2、避免全局变量的污染；

3、私有成员的存在。



## **闭包的缺点**

1、常驻内存中，会增大内存的使用量；

### **匿名函数和IIFE(立刻执行函数)不是闭包**

IIFE包含闭包但不是闭包

**首先了解匿名函数：**

```javascript
function(list){

    for(var i = 0; i<list.length; i++){

        console.log(i)

    }

}
```

上面就是一个简单的匿名函数，所以匿名函数就是没有名称的function(函数。

### **立即执行函数时什么？**

```javascript
function fn(a,b){
    console.log(a+b)
}
```

fn(1,2) // 才能执行函数

**立刻执行函数不需要调用可以自行执行**

```javascript
(function(){

    console.log('hello')

})() 
```

**加深理解：**

```javascript
var test = function(){
    console.log('运行')
}
test()
```

### **Javascript有两个局部作用域：函数作用域和块级作用域。**

```javascript
console.log(a) // a is not defined
function fn(){
    var a = 10
    console.log(a)
}
// 函数内部定义的变量只能在函数内部访问到
```

**闭包分析：**

```javascript
function test1(){
    function test2(){
        var b = 10 
        console.log(a)
    }
    var a = 2
    return test2()
}
var c = 3
var test3 = test1()
test3()
```

### **JavaScript运行三部曲**

语法分析、预编译、解释执行

浏览器会语法分析：

```javascript
c => underfined
test1()  => function
test3() => function
```

预编译

```javascript
test1() =>  {  c = 3; test1()=>function; test3() => function   } 
```

解析执行`test1()，AO  {  a=2; test2() => function  }.test1()`执行之后，test2()预解析，

![image](/image/image_bV8hPRuCjy.png)



![image](/image/image_1_i-8INCML-_.png)

