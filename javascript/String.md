---
outline: deep
---

# String

> 注意所有的标🌟的方法都是常用的方法

## charAt方法 🌟

charAt(index)：返回字符串中指定位置的字符。
```javascript
const str = 'admin123'
console.log(str.charAt(0)) // output: a
console.log(str.charAt(str.length - 1)) // output: 3
```

## concat方法 🌟

concat(str1, str2, ...)：concat 方法将一个或多个字符串与原字符串连接合并，形成一个新的字符串并返回。 concat 方法并不影响原字符串。

<span style="color: var(--vp-c-green);">***如果参数不是字符串类型，它们在连接之前将会被转换成字符串。***</span>
    
```javascript
const str1 = 'admin'
const str2 = '12345'
const str3 = 'qwert'
const c = str1.concat(str2,str3) // output: admin12345qwert
const strArray = [12, 34, 56, 78, 9]
const d = c.concat(...strArray)
console.log(d) // output: admin12345qwert123456789
const e = c.concat(strArray)
const f = c.concat(...strArray, 0000)
console.log(e) // output: admin12345qwert12,34,56,78,9
console.log(f) // output: admin12345qwert1234567890
```

## indexOf方法 🌟

indexOf(searchValue, startIndex)：返回指定字符串在当前字符串中第一次出现的位置。
`searchValue`为搜索的值
`startIndex`为开始检索的位置，包含当前位置，默认0

```javascript
const c = 'admin12345admin'
const aIndex = c.indexOf('a')
const qIndex = c.indexOf('a', 10)
console.log(aIndex, qIndex) // output: 0 10
```

## lastIndexOf方法 

lastIndexOf(searchValue, startIndex)：返回指定字符串在当前字符串中最后一次出现的位置。
`searchValue`为搜索的值
`startIndex`为开始检索的位置，包含当前位置，默认0
可以简单通过开头名称的区别来理解，就是最后一次出现的位置。

```javascript
const c = 'admin12345admin'
const aIndex = c.lastIndexOf('a')
const qIndex = c.lastIndexOf('a', 5)
console.log(aIndex, qIndex) // output: 10 0
```

## slice方法 🌟

slice(startIndex, endIndex)：提取字符串中指定的片段，并返回新的字符串。

```javascript
const c = 'admin12345admin'
console.log(c.slice(0,3)) //output: adm
console.log(c.slice(0)) //output: admin12345admin
```

## substr方法 🌟

substr(startIndex, length)：从指定位置开始，提取指定长度的子字符串，并返回新的字符串。

```javascript
const c = 'admin12345admin'
console.log(c.substr(5,5)) //output: 12345
console.log(c.substr(0,5)) //output: admin
```

## substring方法

substring(startIndex, endIndex)：从指定位置开始，提取到指定位置之前的子字符串，并返回新的字符串。

```javascript
const c = 'admin12345admin'
console.log(c.substring(5)) //output: 12345admin
console.log(c.substring(0,5)) //output: admin
```

## at方法
at(index)：返回指定位置的字符，index是正数值

```javascript
const sentence = 'The quick brown fox jumps over the lazy dog.';

const word = 'fox';

console.log(sentence.at(0), sentence.at(4)) // output: T q
```

## startsWith方法 🌟🌟
startsWith() 方法用来判断当前字符串是否以另外一个给定的子字符串开头，并根据判断结果返回 true 或 false。

```javascript
const str1 = 'Saturday night plans';

console.log(str1.startsWith('Sat'));
// output: true

console.log(str1.startsWith('Sat', 3));
// output: false
```

## endsWidth方法 🌟🌟
endsWith() 方法用来判断当前字符串是否是以另外一个给定的子字符串“结尾”的，根据判断结果返回 true 或 false。

```javascript
const str1 = 'Cats are the best!';

console.log(str1.endsWith('best!'));
// output: true

console.log(str1.endsWith('best', 17));
// output: true

const str2 = 'Is this a question?';

console.log(str2.endsWith('question'));
// output: false
```

## toLowerCase方法

## toUpperCase方法

## trim方法
trim() 方法从字符串的两端清除空格，返回一个新的字符串，而不修改原始字符串。此上下文中的空格是指所有的空白字符（空格、tab、不换行空格等）以及所有行终止符字符（如 LF、CR 等）。

```javascript
const greeting = '   Hello world!   ';

console.log(greeting);
// output: "   Hello world!   ";

console.log(greeting.trim());
// output: "Hello world!";
```

## split方法 🌟🌟
split() 方法使用指定的分隔符字符串将一个String对象分割成子字符串数组，以一个指定的分割字串来决定每个拆分的位置。

```javascript
const sentence = 'The quick brown fox jumps over the lazy dog.';
console.log(sentence.split(' '))
//[ 'The', 'quick', 'brown', 'fox', 'jumps', 'over','the', 'lazy', 'dog.']
```