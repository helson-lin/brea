## vue3中`ref`和`reactive`有啥区别？
ref 和 reactive 都是 Vue3 中用于响应式数据的 API,但有以下区别:
ref:
- 用于响应式数据的一个拥有 .value 的对象
- 须通过 .value 来读写该值
- 适用于单个简单数据的响应式
- 返回一个可变的响应式对象
reactive:
- 将传入的对象转换为响应式对象
- 内部对象的值可以直接读写
- 适用于多个数据的响应式,比如对象、数组等
- 返回一个代理的对象,对源对象的修改会响应式地影响代理对象
使用场景:
ref 主要用于单个简单数据的响应式,比如:
```js
const count = ref(0) 
count.value++  // 需要 .value 访问
```
reactive 适用于对象或数组这样的复杂数据,比如:
```js
const info = reactive({
  name: 'John',
  age: 30
})
info.name = 'Jack' // 直接访问内部值
```
所以总结来说:
- 如果只有一个简单的数据且不在一个对象里,用 ref
- 如果有多个数据,或者数据在一个对象/数组里,用 reactive

## 为什么`ref`需要通过`.value`来获取属性，这样设计的目的是什么？

1. 方便对数据追踪依赖和发起更新。通过 .value 访问值时,Vue 可以追踪数据的依赖,当数据变化时精确地更新依赖。
2. 防止直接修改数据的值。如果 ref 返回的是原始的值,那么用户可以直接修改它,破坏响应式系统。通过 .value 中间层,可以在设置新值时触发更新。
3. 兼容源对象的不可变数据类型。通过 .value,可以在内部为源对象创建一个可变的代理对象,从而实现对不可变数据的响应式追踪。
4. 方便未来的新功能。通过 ref 创建的代理对象,未来 Vue 可以添加更多功能,如在数据变化时自动生成文档等。
举个例子:
```js
const count = ref(0)

// 读取值
console.log(count.value) 

// 设置新值 
count.value++
```
当我们访问 count.value 时,Vue 会追踪 count 这个依赖关系。
当我们修改 count.value 时,Vue 知道依赖了 count,所以可以精确更新。
而如果 ref 直接返回原始值,我们可以直接修改它:
```js
let count = 0 
count++
// Vue 无法追踪依赖,无法发起更新
```
所以,总结来说,ref 通过 .value 代理对象实现响应式,主要是出于:
1. 精确更新依赖
2. 防止直接修改原始数据值
3. 以及未来的功能扩展

## vue3中watch和watchEffect有什么不同?

在Vue 3中，watch和watchEffect都可以用于监听响应式数据的变化，但它们之间有几个不同点：

1. watch需要显式地指定要监听的变量，而watchEffect会自动追踪响应式数据的变化。
2. watch可以提供先前值和当前值的回调函数，而watchEffect只能提供一个副作用函数。
3. watch可以使用可选的选项来控制其行为，例如immediate和deep，而watchEffect没有这些选项。

因此，如果您想要在响应式数据发生变化时执行一些操作，并且您需要访问先前的值和当前的值，则应该使用watch。如果您只想在响应式数据发生变化时执行一些副作用操作，则应该使用watchEffect。

##  请解释下vue3中setup的作用是什么？

在Vue 3中，setup函数是一个新的选项，它是组件内部的一个新的入口点，用于替代Vue 2.x中的beforeCreate、created等生命周期钩子函数和data选项。setup函数可以接收两个参数：props和context。props是一个包含了组件接收到的属性的对象，context是一个包含了一些有用的属性和方法的对象，例如attrs、slots、emit等。setup函数必须返回一个对象，这个对象中的属性和方法将会被暴露给组件的模板和方法中使用。

setup的作用是将组件的逻辑代码从模板中分离出来，使得组件的代码更加清晰、易于维护和测试，并且可以更好地利用Vue 3的响应式系统。通过setup函数，我们可以使用Vue 3的Composition API来编写组件逻辑，这使得我们可以更加灵活地组合和复用逻辑代码，而不必担心生命周期函数的执行顺序和数据响应的问题。


## Vue3性能提升体现在哪些方面？
Vue.js 是一款流行的前端框架，由于其简单易用和出色的性能表现，在开发完整的 Web 应用程序时得到了广泛应用。Vue.js 3.x 版本中带来了很多更新和改进，包括更好的性能。

### Composition API
Vue3 引入了一个新的组合式 API，这是一个新的 API 集合，旨在解决 Vue2 中函数逻辑重用的问题。它提供了更灵活，更可读且更容易测试的代码结构，并具有更好的 TypeScript 支持。

### Composition API 解决了以下问题：

Options API 可能会导致较大的组件，难以维护，尤其是在涉及到复杂逻辑时。
选项 API 使代码复用困难，因为代码必须分布在不同的选项中。
Mixins 和 HOCs 可能会导致命名冲突，或者更糟糕的是，由于生命周期钩子的调用顺序而导致错误。
下面是示例代码：

```vue
import { reactive, computed } from 'vue'

export default {
  setup() {
    const state = reactive({
      count: 0,
      doubleCount: computed(() => state.count * 2)
    })

    const increment = () => {
      state.count++
    }

    return {
      state,
      increment
    }
  }
}
```
### 静态树提升
Vue3 引入了静态树提升（Static Tree Hoisting），这是一个在编译时确定哪些组件是静态的，然后将其提升为常量的优化。这样可以大大减少渲染时间和内存开销。在 Vue2 中，每次重新渲染组件时，都需要创建并比较虚拟 DOM 树，而在 Vue3 中，由于静态节点已经被提升，所以只需要比较动态节点。

下面是示例代码：
```vue
<template>
  <div>
    <h1>静态树提升</h1>
    <p>这是一个静态文本段落。</p>
    <MyComponent />
  </div>
</template>

<script>
import MyComponent from './MyComponent.vue'

export default {
  components: {
    MyComponent
  }
}
</script>
```
### 更快的响应式系统

Vue3 的响应式系统经过了改进，使其更加高效。在 Vue2 中，每当数据发生变化时，所有依赖它的组件都会更新。在 Vue3 中，只有实际使用该数据的组件才会更新。

### 更好的 TypeScript 支持

Vue3 对 TypeScript 的支持更加完善。通过 Composition API，可以更好地与 TypeScript 集成，并且 TypeScript 可以对模板进行类型检查。

### 总结

Vue3 在性能方面带来了很多改进。Composition API 和静态树提升使代码更加高效和可维护。响应式系统经过了改进，使其更加高效。最后，对 TypeScript 的支持也得到了提高。在使用 Vue.js 开发 Web 应用程序时，这些改进将使代码更加高效且易于维护