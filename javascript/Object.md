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
`Object.assign`不是<span class="brea-a">[深拷贝](/javascript/CloneDeep)</span>，拷贝的对象属性是浅拷贝
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

## Object.entries

> `Object.entries()`方法返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 for...in 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环还会***枚举原型链中的属性***）。   -MDN

```javascript
const object1 = {
  a: 'somestring',
  b: 42
};

for (const [key, value] of Object.entries(object1)) {
  console.log(`${key}: ${value}`);
}

// Expected output:
// "a: somestring"
// "b: 42"

```

## Object.freeze

> Object.freeze() 方法可以冻结一个对象。一个被冻结的对象再也不能被修改；冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。此外，冻结一个对象后该对象的原型也不能被修改。freeze() 返回和传入的参数相同的对象。
>

```javascript
const obj = {
  prop: 42
};

Object.freeze(obj);

obj.prop = 33;
// Throws an error in strict mode

console.log(obj.prop);
// Expected output: 42

```

## Object.is()

`Object.is()`方法判断两个值是否为同一个值

```javascript
// Case 1: Evaluation result is the same as using ===
Object.is(25, 25);                // true
Object.is('foo', 'foo');          // true
Object.is('foo', 'bar');          // false
Object.is(null, null);            // true
Object.is(undefined, undefined);  // true
Object.is(window, window);        // true
Object.is([], []);                // false
var foo = { a: 1 };
var bar = { a: 1 };
Object.is(foo, foo);              // true
Object.is(foo, bar);              // false

// Case 2: Signed zero
Object.is(0, -0);                 // false
Object.is(+0, -0);                // false
Object.is(-0, -0);                // true
Object.is(0n, -0n);               // true

// Case 3: NaN
Object.is(NaN, 0/0);              // true
Object.is(NaN, Number.NaN)        // true

```


## Object.hasOwn()

如果指定的对象自身有指定的属性，则静态方法 Object.hasOwn() 返回 true。如果属性是继承的或者不存在，该方法返回 false。

:::warning
备注： Object.hasOwn() 旨在取代 Object.hasOwnProperty()。
:::

```javascript
const object1 = {
  prop: 'exists'
};

console.log(Object.hasOwn(object1, 'prop'));
// Expected output: true

console.log(Object.hasOwn(object1, 'toString'));
// Expected output: false

console.log(Object.hasOwn(object1, 'undeclaredPropertyValue'));
// Expected output: false

```

## Object.keys()

Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致。

```javascript
const object1 = {
  a: 'somestring',
  b: 42,
  c: false
};

console.log(Object.keys(object1));
// Expected output: Array ["a", "b", "c"]

```

## Object.values()
Object.values() 方法返回一个给定对象自身的所有可枚举属性值的数组，值的顺序与使用 for...in 循环的顺序相同（区别在于 for-in 循环枚举原型链中的属性）。

```javascript
var obj = { foo: 'bar', baz: 42 };
console.log(Object.values(obj)); // ['bar', 42]

// array like object
var obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.values(obj)); // ['a', 'b', 'c']

// array like object with random key ordering
// when we use numeric keys, the value returned in a numerical order according to the keys
var an_obj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.values(an_obj)); // ['b', 'c', 'a']

// getFoo is property which isn't enumerable
var my_obj = Object.create({}, { getFoo: { value: function() { return this.foo; } } });
my_obj.foo = 'bar';
console.log(Object.values(my_obj)); // ['bar']

// non-object argument will be coerced to an object
console.log(Object.values('foo')); // ['f', 'o', 'o']

```


## Object.entries()

Object.entries() 方法返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 for...in 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环还会枚举原型链中的属性）。

```javascript
const object1 = {
  a: 'somestring',
  b: 42
};

for (const [key, value] of Object.entries(object1)) {
  console.log(`${key}: ${value}`);
}

// Expected output:
// "a: somestring"
// "b: 42"

```