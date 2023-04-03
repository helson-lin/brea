
# 结构型模式

## 外观模式(Facade Pattern)

![](https://pic3.zhimg.com/80/v2-7ca3af3e038c928ada59d6caad33836a_720w.jpg)

典型就是`JQuery`

外观模式是最常见的设计模式之一，它为子系统中的一组接口提供一个统一的高层接口，使子系统更容易使用。简而言之外观设计模式就是把多个子系统中复杂逻辑进行抽象，从而提供一个更统一、更简洁、更易用的API。很多我们常用的框架和库基本都遵循了外观设计模式

```javascript
#! /usr/bin/env node

/* 外观模式  facade parttern*/

const getWether = () => {
    console.log('today is rainy');
}


const buyMeACoffe = () => {
    console.log('here are you');
}

const orderAMetting = () => {
    console.log('metting is in order');
}

const Secretary  = {
    getWether,
    buyMeACoffe,
    orderAMetting,
}



Secretary.buyMeACoffe();
Secretary.orderAMetting();
```

## 代理模式(Proxy Pattern）

![](/image/image__QjpiMs0KM.png)

通过代理来实现交流或某项功能，而不是直接进行操作

当访问一个对象本身的成本太高时（占内存或者耗时）或者需要增加额外的逻辑又不修改本身时便可以使用代理。

代理模式可以解决那些问题：

1.  增加对一个对象的访问控制
2.  当访问一个对象的过程中需要增加额外的逻辑



代理模式的实现：

1.  `Real Object` 真实的对象
2.  `Proxy `代理对象
3.  `Subject `接口：` Real Object` 和 `Proxy `都需要实现的接口。
4.



```javascript
#! /usr/bin/env node

/** 代理模式 Proxy Pattern */

class Landlord {
    constructor(hourse, price, expectDeviation) {
        this.hourse = hourse;
        this.price = price;
        this.hourseStatus = 1;
        this.expectDeviation = expectDeviation;
    }

    instroduce() {
        const keys = Object.keys(this.hourse);
        const str = keys.reduce((pre, key) => {
            return pre += this.hourse[key] ? `${key}、` : '';
        }, 'this hourse is ')
        console.log(str);
    }

    bargain(price) {
        if (price > this.price) {
            return true;
        } else if(this.price - price <= this.expectDeviation) {
            return true;
        } else {
            return false;
        }
    }

    sloid(price) {
        if (!this.bargain(price)) {
            console.log('your price is not allowed');
            return;
        }
        this.hourseStatus = 0;
        console.log('this hourse is yours')
    }
}

class Agent {
    constructor() {
        this.landlord = new Landlord({new: true,decorated: true }, 1400,  200);
        this.hourseAgentPrice = 100;
    }
    instroduce() {
        this.landlord.instroduce();
    }
    bargain(price) {
        return this.landlord.bargain(price - this.hourseAgentPrice);
    }

    buy(price) {
        this.landlord.sloid(price - this.hourseAgentPrice);
    }
}

const agent = new Agent();
agent.instroduce();
agent.buy(1200);
```

# 创建型模式（Creational Patterns）

## 工厂模式（Factory Pattern）

![](/image/image_o82VUeKHek.png)

现实生活中的工厂按照既定程序制造产品，随着生产原料和流程不同生产出来的产品也会有区别。应用到软件工程的领域，工厂可以看成是一个制造其他对象的对象，制造出的对象也会随着传入工厂对象参数的不同而有所区别。

什么场景适合应用工厂模式而不是直接 `new` 一个对象呢？当构造函数过多不方便管理，且需要创建的对象之间存在某些关联（有同一个父类、实现同一个接口等）时，不妨使用工厂模式。工厂模式提供一种集中化、统一化的方式，避免了分散创建对象导致的代码重复、灵活性差的问题。

以上图为例，我们构造一个简单的汽车工厂来生产汽车：



```javascript
// 汽车构造函数
function SuzukiCar(color) {
  this.color = color;
  this.brand = 'Suzuki';
}

// 汽车构造函数
function HondaCar(color) {
  this.color = color;
  this.brand = 'Honda';
}

// 汽车构造函数
function BMWCar(color) {
  this.color = color;
  this.brand = 'BMW';
}

// 汽车品牌枚举
const BRANDS = {
  suzuki: 1,
  honda: 2,
  bmw: 3
}

/**
 * 汽车工厂
 */
function CarFactory() {
  this.create = function (brand, color) {
    switch (brand) {
      case BRANDS.suzuki:
        return new SuzukiCar(color);
      case BRANDS.honda:
        return new HondaCar(color);
      case BRANDS.bmw:
        return new BMWCar(color);
      default:
        break;
    }
  }
}
```

## 单例模式 （Singleton Pattern）

![](/image/image_DjnLrKUhK2.png)

顾名思义，单例模式中Class的实例个数最多为1。当需要一个对象去贯穿整个系统执行某些任务时，单例模式就派上了用场。而除此之外的场景尽量避免单例模式的使用，因为单例模式会引入全局状态，而一个健康的系统应该避免引入过多的全局状态。

实现单例模式需要解决以下几个问题：

1.  如何确定Class只有一个实例？
2.  如何简便的访问Class的唯一实例？
3.  Class如何控制实例化的过程？
4.  如何将Class的实例个数限制为1？

我们一般通过实现以下两点来解决上述问题：

1.  隐藏Class的构造函数，避免多次实例化
2.  通过暴露一个 `getInstance()` 方法来创建/获取唯一实例

```javascript
// 单例构造器
const FooServiceSingleton = (function () {
  // 隐藏的Class的构造函数
  function FooService() {}

  // 未初始化的单例对象
  let fooService;

  return {
    // 创建/获取单例对象的函数
    getInstance: function () {
      if (!fooService) {
        fooService = new FooService();
      }
      return fooService;
    }
  }
})();
```

# 行为型模式

## 策略模式

![](/image/image_zAlhvrMtvt.png)



策略模式简单描述就是：对象有某个行为，但是在不同的场景中，该行为有不同的实现算法。比如每个人都要“交个人所得税”，但是“在美国交个人所得税”和“在中国交个人所得税”就有不同的算税方法。最常见的使用策略模式的场景如登录鉴权，鉴权算法取决于用户的登录方式是手机、邮箱或者第三方的微信登录等等，而且登录方式也只有在运行时才能获取，获取到登录方式后再动态的配置鉴权策略。所有这些策略应该实现统一的接口，或者说有统一的行为模式。Node 生态里著名的鉴权库 [Passport.js](https://link.zhihu.com/?target=http://www.passportjs.org/ "Passport.js") API的设计就应用了策略模式。



## 迭代器模式

![](/image/image_iDYwAY-DlX.png)

## 观察者模式

![](/image/image_nkkhoNgllc.png)

```javascript
#! /usr/bin/env node

/** 观察者模式 Watch Pattern */

class Watch {
    constructor() {
        this.handlers = {};
    }

    subscribe(type, handler) {
        if (!this.handlers[type]) {
            this.handlers[type] = [];
        }
        if(!handler) throw new Error('handler is not defined');
        const isFunc = Object.prototype.toString.call(handler) === '[object Function]'
        if (!isFunc) throw new Error('handler is not a function');
        this.handlers[type].push(handler);
    }

    publish(type, ...params) {
        if(!this.handlers[type]) return;
        this.handlers[type].forEach(handler => handler.call(handler, ...params));
    }
}

const watch = new Watch();
watch.subscribe('userName', (name) => {
    console.log('un', name);
})
watch.publish('userName', {a: 12, b: 23})
```



## 中介者模式

![](/image/image_h3h6XfsRQv.png)

## 访问者模式

![](/image/image_1OXvmnclvH.png)

