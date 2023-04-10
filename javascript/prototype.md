# 原型链

```JavaScript
function fn(){
  this.add = function(a,b){
    console.log(a+b)
  }
}
var f1n = new fn()
console.log(fn.prototype)
//只有实例化之后才有add方法
f1n.add(1,3)
// 输出 fn构造函数的原型
console.log(f1n._proto_ === fn.prototype)
console.log(fn ==== fn.prototype.contructor)


```

![](/image/stickPicture4.png)

`Person.prototype`就是`Person`构造函数的原型对象，他指向的是一个对象；

这个并不是构造函数专有，每个函数都会有一个`prototype`属性，这个属性是一个指针，指向一个对象，***记住只有函数才有***,并且通过`bind()`绑定的也没有。

### 那么这个对象是什么呢？

![](/image/stickPicture5.png)

![](/image/stickPicture6.png)

可以看到Person构造函数的prototype指向的是的Person.prototype也就是原型对象

person1和person2的原型就是Person.prototype

`console.log(person1.*proto* === Person.prototype) // true      `

proto就是用来将实例对象与该对象的原型相连

原型对象(Person.prototype)下constructor属性

这个属性其实就是将原型对象指向关联的构造函数

`console.log(Person.prototype.constructor === Person)`