## `keep-alive`实现

`keep-alive`本质就是一个component，有完整的生命周期

keep-alive缓存的本质就是把虚拟节点存储到内存当中


### `created`申明`cache`的时候为什么使用`Object.create(null)`？

在这里使用一个对象字符串可能会更加冗长和难以阅读。使用 Object.create(null) 创建一个空对象，可以确保该对象没有原型链，因此不会受到原型链上的属性和方法的影响。这样可以确保缓存对象只包含我们自己添加的属性，而不会包含其他可能会干扰缓存逻辑的属性。

:::warning
并且在下面`destroyed`的时候遍历的时候，减少不必要的操作
:::

## `cacheVNode`方法


cacheVNode方法负责缓存当前组件实例并将其添加到缓存对象。它通过从vnodeToCache对象中提取必要的信息来实现这一点，vnodeToCache对象是在更新的钩子中设置的。

keyToCache变量用作缓存对象中的键，名称、标记和componentInstance属性存储在缓存条目中。键数组也使用新键进行更新。

如果设置了max prop并且keys数组长于max值，则使用pruneCacheEntry方法删除最老的缓存条目。
总的来说，这个方法负责维护keep-alive组件中组件的缓存。


## `render`方法

 它的作用是缓存组件，以便在下一次需要时可以快速渲染。在这个组件中，render()方法用于渲染缓存的组件。它首先获取默认插槽中的第一个组件子节点，然后检查它是否符合include和exclude的规则。如果不符合，则直接返回该节点。如果符合规则，则检查缓存中是否已经存在该组件实例。如果存在，则直接使用缓存中的实例。如果不存在，则将该节点添加到缓存中，并在下一次更新时使用缓存中的实例。最后，将vnode.data.keepAlive设置为true，以便在下一次渲染时可以使用缓存。

```typescript
import { isRegExp, isArray, remove } from 'shared/util'
import { getFirstComponentChild } from 'core/vdom/helpers/index'
import type VNode from 'core/vdom/vnode'
import type { VNodeComponentOptions } from 'types/vnode'
import type { Component } from 'types/component'
import { getComponentName } from '../vdom/create-component'

type CacheEntry = {
  name?: string
  tag?: string
  componentInstance?: Component
}

type CacheEntryMap = Record<string, CacheEntry | null>

function _getComponentName(opts?: VNodeComponentOptions): string | null {
  return opts && (getComponentName(opts.Ctor.options as any) || opts.tag)
}
// COMMENT: 匹配方法
function matches(
  pattern: string | RegExp | Array<string>,
  name: string
): boolean {
  if (isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache(
  keepAliveInstance: { cache: CacheEntryMap; keys: string[]; _vnode: VNode },
  filter: Function
) {
  const { cache, keys, _vnode } = keepAliveInstance
  for (const key in cache) {
    const entry = cache[key]
    if (entry) {
      const name = entry.name
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode)
      }
    }
  }
}
// COMMENT: 删除不需要的缓存组件、 删除不再需要或超过最大缓存大小的组件来维护保持缓存。
function pruneCacheEntry(
  cache: CacheEntryMap,
  key: string,
  keys: Array<string>,
  current?: VNode
) {
  const entry = cache[key]
  if (entry && (!current || entry.tag !== current.tag)) {
    // @ts-expect-error can be undefined
    entry.componentInstance.$destroy()
  }
  cache[key] = null
  remove(keys, key)
}
// COMMENT: 指定include 和exclude的参数类型：string RegExp Array
const patternTypes: Array<Function> = [String, RegExp, Array]

// TODO defineComponent
export default {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  methods: {
    cacheVNode() {
      const { cache, keys, vnodeToCache, keyToCache } = this
      if (vnodeToCache) {
        const { tag, componentInstance, componentOptions } = vnodeToCache
        cache[keyToCache] = {
          name: _getComponentName(componentOptions),
          tag,
          componentInstance
        }
        keys.push(keyToCache)
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode)
        }
        this.vnodeToCache = null
      }
    }
  },

  created() {
    // COMMENT： 在这里使用一个对象字符串可能会更加冗长和难以阅读。使用 Object.create(null) 创建一个空对象，可以确保该对象没有原型链，因此不会受到原型链上的属性和方法的影响。这样可以确保缓存对象只包含我们自己添加的属性，而不会包含其他可能会干扰缓存逻辑的属性。
  this.cache = Object.create(null)
  this.keys = []
  },

  destroyed() {
  for (const key in this.cache) {
  pruneCacheEntry(this.cache, key, this.keys)
  }
  },

  mounted() {
  this.cacheVNode()
  // COMMENT： 当include或者exclude改变的时候，去删除不需要缓存的组件
  this.$watch('include', val => {
  pruneCache(this, name => matches(val, name))
  })
  this.$watch('exclude', val => {
  pruneCache(this, name => !matches(val, name))
  })
  },

  updated() {
  this.cacheVNode()
  },

  render() {
  const slot = this.$slots.default
  const vnode = getFirstComponentChild(slot)
  const componentOptions = vnode && vnode.componentOptions
  if (componentOptions) {
  // check pattern
  const name = _getComponentName(componentOptions)
  const { include, exclude } = this
  if (
  // not included
  (include && (!name || !matches(include, name))) ||
  // excluded
  (exclude && name && matches(exclude, name))
  ) {
  return vnode
  }

  const { cache, keys } = this
  const key =
  vnode.key == null
  ? // same constructor may get registered as different local components
  // so cid alone is not enough (#3269)
  componentOptions.Ctor.cid +
  (componentOptions.tag ? `::${componentOptions.tag}` : '')
  : vnode.key
  if (cache[key]) {
  vnode.componentInstance = cache[key].componentInstance
  // make current key freshest
  remove(keys, key)
  keys.push(key)
  } else {
  // delay setting the cache until update
  this.vnodeToCache = vnode
  this.keyToCache = key
  }

  // @ts-expect-error can vnode.data can be undefined
  vnode.data.keepAlive = true
  }
  return vnode || (slot && slot[0])
  }
  }
  ```