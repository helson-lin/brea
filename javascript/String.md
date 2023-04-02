---
outline: deep
---

> 注意所有的标🌟的方法都是常用的方法

# String

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