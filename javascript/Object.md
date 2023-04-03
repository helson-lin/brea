# Object原型上的方法

## Object原型上的方法

### `Object.assign`

`Object.assign()` 方法用于将所有可枚举属性的值从一个或**多个**源对象分配到目标对象。它将返回**目标对象**。第一个参数是目标对象，第二个是源对象

```javascript {4}
const target = { a: 1, b: 2, c: 10 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);  // [!code  error]

console.log(target);
// expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget);
// expected output: Object { a: 1, b: 4, c: 5 }
console.log(source);
// expected output: Object { b: 4, c: 5 }

```

`Object.assign`是如何实现属性的拷贝

以下代码返回的结果是什么：

```javascript
const a = {name: 'perter', age: 12}
const b = Object.create(null)
b.name = 'helson'
b.age = 14
const c = Object.assign(a,b)
console.log(c)
```

打印输出：`{name: 'helson',age: 14}`

修改一下代码输出结果是什么：

```javascript{5-12}
const a = {name: 'perter', age: 12}
const b = Object.create(null)
b.name = 'helson'
b.age = 14
Object.defineProperty(b,'name',{
    enumerable: true,
    set(val) {
        return val
    },
    get() {
        return 'helson123'
    }
})
const c = Object.assign(a,b)
console.log(c)
```

打印输出：`{name: 'helson123',age: 14}`

为什么会返回`name: helson123`呢？查看MDN可以知道`Object.assign` 方法只会拷贝源对象自身的并且可枚举的属性到目标对象。该方法使用源对象的`[[Get]]`和目标对象的`[[Set]]`，所以它会调用相关 getter 和 setter。

::: warning
`Object.assign`不是<span class="brea-a">[深拷贝](/javascript/cloneDeep)</span>，拷贝的对象属性是浅拷贝
:::

***

### `Obejct.create`

`Object.create()`方法创建一个新对象，使用现有的对象来提供新创建的对象的`__proto__`

#### `Object.create`实现类式继承

```javascript
// Shape - 父类(superclass)
function Shape() {
  this.x = 0;
  this.y = 0;
}

// 父类的方法
Shape.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  console.info('Shape moved.');
};

// Rectangle - 子类(subclass)
function Rectangle() {
  Shape.call(this); // call super constructor.
}

// 子类续承父类
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

var rect = new Rectangle();

console.log('Is rect an instance of Rectangle?',
  rect instanceof Rectangle); // true
console.log('Is rect an instance of Shape?',
  rect instanceof Shape); // true
rect.move(1, 1); // Outputs, 'Shape moved.'
```

如果你希望能继承到多个对象，则可以使用混入的方式。

```javascript
function MyClass() {
     SuperClass.call(this);
     OtherSuperClass.call(this);
}

// 继承一个类
MyClass.prototype = Object.create(SuperClass.prototype);
// 混合其它
Object.assign(MyClass.prototype, OtherSuperClass.prototype);
// 重新指定constructor
MyClass.prototype.constructor = MyClass;

MyClass.prototype.myMethod = function() {
     // do a thing
};
```


