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


# 深对象属性获取

```js
const config = {
    groups: [
        {
            nodes: [
                {
                    id: 'node1',
                    name: 'node1',
                    children: [
                        {
                            id: 'node1-1',
                            name: 'node1-1',
                            list: [
                                {
                                    name: 'applications',
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}
```

如果想要获取`applications`这个属性值，可以这么写：
一般我们都是`config.groups[0].nodes[0].children[0].list[0].name`这么写，如果其中一个属性为undefined,那么就会报错，如果你没有try catch那么会柱塞代码的执行。

为了简化代码，我们可以使用`getDeepProperty`方法来获取深层属性值。

```js
const _getDeep = function (obj, propList) {
  const next = propList.shift();
  if (next != undefined && obj) {
    return _getDeep(obj[next], propList);
  } else {
    return obj;
  }
};
const getDeepProperty = function (obj, dottedPropName) {
  if (!dottedPropName || !obj) {
    return undefined;
  }
  if (typeof dottedPropName !== 'string' && !(dottedPropName instanceof String)) {
    return undefined;
  }
  const propList = dottedPropName.split('.');
  return _getDeep(obj, propList);
};
const applications = getDeepProperty(config, 'groups.0.nodes.0.children.0.list.0.name')
// applications = 'applications'
```
