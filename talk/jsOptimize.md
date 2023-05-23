# js的一些代码优化技巧

## 公共方法的提取和条件的整合

在实际开发过程中，发现有些人喜欢使用`if`判断然后执行一个函数，并且多条件的时候，就算执行的函数的作用是一致的，也没有提取公共的方法。其实最好是提取公共的方法，然后整合条件判断。

ps: 如果你经历过`sonar`的折磨，你就明白了抽取公共方法的重要性

可以简单看一下下面👇的函数，有两个判断条件`condition1`和`condition2`，但`condition1`存在就执行一段业务代码，如果`condition2`存在也执行相同的业务代码。

```javascript
const condition1 = 24;
const condition2 = 12;
if (condition1) {
    return condition1 / 2;
}
if (condition2) {
    return condition2 / 2;
}
```
其实这里最好是把这个相同的业务代码提取出来。并整合判断

```javascript
const condition1 = 24;
const condition2 = 12;
// 将传入参数除以2
const businessFunc = (val) => val / 2;
// 当condition1存在时，不为null和undefined 就将参数condition1作为参数传入，
// 如果没有condition2就将condition2作为参数传入，这里也可以加上一个默认参数兜底处理
// businessFunc(condition1 ?? condition2 ?? 2)
return businessFunc(condition1 ?? condition2)
```

:::tip
关于??的定义可以查询MDN: [空值合并运算符（??）](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing)
:::
