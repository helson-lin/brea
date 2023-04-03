---
title: Number的基本方法
---
# Number

::: warning
> 注意所有的标🌟的方法都是常用的方法
:::
## Number的属性


### Number.EPSILON

Number.EPSILON 属性表示 1 与Number可表示的大于 1 的最小的浮点数之间的差值。
你不必创建一个 Number 对象来访问这个静态属性（直接使用 Number.EPSILON）。

用途：测试是否相等

```javascript {4}
let x=0.2, y= 0.3, z= 0.1;

console.log(x + z === y)
console.log(x + z - y < Number.EPSILON) // output: true
```

### Number.MAX_VALUE

Number.MAX_VALUE 属性表示在 JavaScript 里所能表示的最大数值。

### Number.MIN_VALUE

Number.MIN_VALUE 属性表示在 JavaScript 中所能表示的最小的正值。

## Number的方法

### Number.isFinite()

Number.isFinite() 方法用来检测传入的参数是否是一个有穷数。

```javascript
console.log(Number.isFinite(1 / 0));
// output: false

console.log(Number.isFinite(10 / 5));
// output: true

console.log(Number.isFinite(0 / 0));
// output: false
```

### Number.isInteger()

Number.isInteger() 方法用来判断给定的参数是否为整数。

```javascript
function fits(x, y) {
  if (Number.isInteger(y / x)) {
    return 'Fits!';
  }
  return 'Does NOT fit!';
}

console.log(fits(5, 10));
// output: "Fits!"

console.log(fits(5, 11));
// output: "Does NOT fit!"

```


### Number.isNaN() 🌟🌟

Number.isNaN() 方法确定传递的值是否为 NaN，并且检查其类型是否为 Number。它是原来的全局 isNaN() 的更稳妥的版本。

```javascript
let c;
const num1 = 123 // 123
const num2 =  c / num1 // NAN
const num3 = num1 / false // Infinity
console.log(Number.isNaN(num1), Number.isNaN(num2), Number.POSITIVE_INFINITY === num3)
```

### Number.parseFloat() 🌟🌟
parseFloat() Number.parseFloat() 方法可以把一个字符串解析成浮点数。该方法与全局的 parseFloat() 函数相同，并且处于 ECMAScript 6 规范中（用于全局变量的模块化）。