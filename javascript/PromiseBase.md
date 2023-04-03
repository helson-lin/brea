# 深入理解Promise

## 深入理解Promise

`promise`是异步编程的一种解决方案，ES6将其写进了语言标准。所谓`Promise`就是一个容器，里面保存着未来才会结束的事件（通常是一个异步操作）的结果。

`Promise`对象有以下两个特点：

-   对象的状态不受外界影响。`Promise`对象代表一个异步操作，有三种状态：`pending`（进行中）、`fulfilled/resolved`（已成功）、`rejected`（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
-   一旦状态改变，就不会再改变，任何时候都可以得到这个结果。`Promise`对象的状态改变，只有两种可能：从`pending`变为`fulfilled`和从`pending`变为`rejected`。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 `resolved`（已定型）。如果改变已经发生了，你再对`Promise`对象添加回调函数，也会立即得到这个结果。

`Promise`的优点:

可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。

## 基本用法

ES6 规定，`Promise`对象是一个构造函数，用来生成`Promise`实例。

```纯文本
const promise = new Promise((resolve,reject)=>{
//此处执行一些异步操作（调用后台API，定时器等）
 if(/*异步操作成功*/){
     resolve(value);
 }else{
     reject(error)
 }
}) 
//其中两个函数的参数值分别为成功和失败后想要传递的结果
复制代码
```

`Promise`构造函数接受一个函数作为参数，该函数的两个参数分别是`resolve`和`reject`。它们是两个函数，由 `JavaScript` 引擎提供，不用自己部署。

`resolve`函数的作用是，将`Promise`对象的状态从“未完成”变为“成功”（即从 `pending` 变为 `resolved`），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；`reject`函数的作用是，将`Promise`对象的状态从“未完成”变为“失败”（即从 `pending`变为 `rejected`），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

`then`方法可以接受两个回调函数作为参数。第一个回调函数是`Promise`对象的状态变为`resolved`时调用，第二个回调函数是`Promise`对象的状态变为`rejected`时调用。其中，第二个函数是可选的，不一定要提供。这两个函数都接受`Promise`对象传出的值作为参数。

```javascript
promise.then(res=>{
    //对于成功回调接受的数据做处理
},err=>{
    //对于失败的回调数据做处理
})
```

注：`Promise`新建后就会立即执行。

**`Promise.prototype.then()`** `Promise`实例具有`then`方法，也就是说，`then`方法是定义在原型对象上`Promise.prototype`上的，它的作用是为 `Promise`实例添加状态改变时的回调函数。前面说过，`then`方法的第一个参数是`resolved`状态的回调函数，第二个参数（可选）`是rejected`状态的回调函数。

`then`方法返回的是一个新的`Promise`实例（注意，不是原来那个`Promise`实例）。因此可以采用链式写法，即`then`方法后面再调用另一个`then`方法。第一个回调函数完成以后，会将返回结果作为参数，春如第二个回调函数。

采用链式的 `then`，可以指定一组按照次序调用的回调函数。（ES7中的`async/await`）也可以实现链式调用，除此之外，`Promise`的`all`方法可以实现并行执行。

了解了基础的 `Promise`和 `then`之后，我们便可以自己创建一个 `Promise`。

# 手写Promise

首先写 `Promise`构造函数，由以上`Promise`的使用可知，其参数为一个函数，又被称为执行器函数（executor），并且执行器函数会被立即调用，执行器函数也会接收两个参数，且这两个参数均为函数。

```javascript
function Promise(executor) {
    executor(resolve, reject);
}
```

`Promise`最重要的方法就是`then`方法，因此为了能够让实例调用这个方法，我们必须将这个方法写在其原型链上，并且它接受两个参数，一个为成功的回调，一个为失败得回调。

```javascript
Promise.prototype.then=function(onResolved,onRejected){
    
}
```

之后继续写`Promise`函数，因为`new`出来的实例具有默认的状态`pending`，之后通过执行器`executor`执行 `resolve`和`reject`两个函数来修改状态。

```javascript
function Promise(executor) {
    let self=this;                   //保留this。防止后面方法出现this只想不明的问题
    self.status='pending';           //promise的默认状态是pending

    function resolve(){
        self.status='resolved';      //成功函数将其状态修改为resolved
    }
    function reject(){
        self.status='rejected';      //失败函数将其函数修改为rejected
    }
    executor(resolve, reject);
}
```

为了保证 `Promise`实例状态一旦变更不能再次改变，需要进行判断

```javascript
function Promise(executor) {
    let self = this;                       //保留this。防止后面方法出现this只想不明的问题
    self.status = 'pending';               //promise的默认状态是pending
    self.success = undefined;              //保存成功回调传递的值
    self.error = undefined;                //保存失败回调传递的值

    function resolve() {
        if (self.status === 'pending') {
            self.status = 'resolved';      //成功函数将其状态修改为resolved
        }
    }
    function reject() {
        if (self.status === 'pending') {
            self.status = 'rejected';      //失败函数将其函数修改为rejected
        }
    }
    executor(resolve, reject);
}
```

之后需要将调用之后的成功或失败的结果保存起来

```javascript
function Promise(executor) {
    let self = this;                       //保留this。防止后面方法出现this只想不明的问题
    self.status = 'pending';               //promise的默认状态是pending
    self.success = undefined;              //保存成功回调传递的值
    self.error = undefined;                //保存失败回调传递的值

    function resolve(success) {
        if (self.status === 'pending') {
            self.status = 'resolved';      //成功函数将其状态修改为resolved
            self.success=success;          //将成功的值保存起来
        }
    }
    function reject(error) {
        if (self.status === 'pending') {
            self.status = 'rejected';      //失败函数将其函数修改为rejected
            self.error=error;              //将失败的值保存起来
        }
    }
    executor(resolve, reject);
}
```

在这里举一个实际的例子（Express使用Promise保存的需要返回的值）

注意：该例子涉及到了异步函数处理，链式调用，放在此处只是为了说明上面的概念。

![img](https://pic.kblue.site/img/1 "img")

当执行器调用 `resolve`函数后，`then`中的第一个参数函数（成功回调）会执行，并将保存的值传递给`then`中的第一个函数作为参数，同时当执行器调用 `reject`函数后，`then`中的第二个参数函数（失败回调）会执行，并将保存的值传递给`then`中的第二个函数作为参数。

```javascript
Promise.prototype.then = function (onResolved, onRejected) {
    let self = this;
    if (self.status === 'resolved'); {
        onResolved(self.success);           //将resolve函数保留的成功值传递作为参数
    }
    if (self.status === 'rejected') {
        onRejected(self.error);              //将reject函数保留的失败值传递作为参数
    }
}
```

对应于上面的例子，举出其`then`的使用

![img](https://pic.kblue.site/img/1-20210327172550284 "img")

到此为止`Promise`的简单结构已经基本完成，简单测试

```javascript
let promise = new Promise((resolve, reject) => {
    console.log('start');
    resolve('success data');
})

promise.then(res => {
    console.log("res", res);
}, err => {
    console.log("err", err);
})
```

测试结果

```javascript
start
res success data
```

以上步骤只是实现了同步处理，接下来实现异步处理以及实现一个实例多次调用`then`方法（不是链式调用）

因为 `js`是单线程的，简单理解浏览器端的事件循环即为先执行同步任务，后执行异步任务。同步任务是存放在调用栈中的，主线程会先执行同步任务，当调用栈中的同步任务全都执行完毕且主线程为空时，主线程会去任务队列中查找是否有已经注册的异步任务的回调函数，有则执行，无则等待。任务队列中的异步任务又分为微任务和宏任务，这两者也有相应的执行顺序。详细介绍可以等下篇文章

**言归正传，实现异步处理及多次调用**

如果`Promise`处理的为一个异步函数，那么当`then`的时候，执行器函数中的参数会被放到异步任务队列中，即为此时`Promise`的实例仍为默认状态`pending`，没有改变，那么我们此时并不知道要去执行`then`中的成功回调函数还是失败回调函数，在不知道哪个回调函数会被执行的情况下，就需要把这两个回调函数保存起来，等到时机成熟，确定哪个函数的时候，再拿出来调用。

```javascript
function Promise(executor) {
    let self = this; //保留this。防止后面方法出现this只想不明的问题
    self.status = 'pending'; //promise的默认状态是pending
    self.success = undefined; //保存成功回调传递的值
    self.error = undefined; //保存失败回调传递的值

    self.onSuccessCallbacks = []; //存放成功的回调
    self.onErrorCallbacks = []; //存放失败的回调

    function resolve(success) {
        if (self.status === 'pending') {
            self.status = 'resolved'; //成功函数将其状态修改为resolved
            self.success = success; //将成功的值保存起来
            self.onSuccessCallbacks.forEach(element => {
                element();
            });
        }
    }

    function reject(error) {
        if (self.status === 'pending') {
            self.status = 'rejected'; //失败函数将其函数修改为rejected
            self.error = error; //将失败的值保存起来
            self.onErrorCallbacks.forEach(element => {
                element();
            })
        }
    }
    executor(resolve, reject);
}


Promise.prototype.then = function (onResolved, onRejected) {
    let self = this;
    if (self.status === 'pending') {
        self.onSuccessCallbacks.push(() => {
            onResolved(self.success); //将resolve函数保留的成功值传递作为参数
        })
        self.onErrorCallbacks.push(() => {
            onRejected(self.error); //将reject函数保留的失败值传递作为参数
        })
    }
    if (self.status === 'resolved') {
        onResolved(self.success); //将resolve函数保留的成功值传递作为参数
    }
    if (self.status === 'rejected') {
        onRejected(self.error); //将reject函数保留的失败值传递作为参数
    }
}
```

测试用例

```javascript
let promise = new Promise((resolve, reject) => {
    setTimeout(function () {
        resolve('success data')
    }, 2000)
})

promise.then(res => {
    console.log("success:", res);
}, err => {
    console.log("error:", err);
})
promise.then(res => {
    console.log("success:", res);
}, err => {
    console.log("error:", err);
})
```

测试结果为2秒后出现结果

```javascript
success: success data
success: success data
```

继续进行尝试，如果让`Promise`抛出一个错误如何处理

```javascript
let promise = new Promise((resolve, reject) => {
    throw new error("一个错误");
})

promise.then(res => {
    console.log("success:", res);
}, err => {
    console.log("error:", err);
})
```

结果：

![img](https://pic.kblue.site/img/1-20210327172607428 "img")

解决该问题

```javascript
  try {
        executor(resolve, reject);
    } catch (err) {
        reject(err);
    }
```

再次尝试，查看结果

![img](https://pic.kblue.site/img/1-20210327172613428 "img")

修改结果则为直接对`executor`函数进行异常处理，如果出错了就直接进入`reject`方法。

完成上面的一系列完善之后，最后我们实现`Promise`的链式调用。

`Promise`实现链式调用就是通过`then`方法返回一个新的`Promise`。

如果返回的是一个`Promise`函数，那么会等待这个`Promise`执行完成之后再返回给下一次的`then`，`Promise`如果成功，就会走下一次`then`的成功，如果失败就会走下一次`then`的失败。

注意：`then`方法中返回的回调函数不能是自己本身，如果真的这样写，那么函数执行到里面时会等待`promise`的结果，这样一层层的状态等待就会形成**回调地狱**。

接下来一步步分析（只需要改进`then`函数即可）

```javascript
then`函数中嵌套`new Promise
```

![img](https://pic.kblue.site/img/1-20210327172618784 "img")

之后主要为`resolvePromise`函数，对`x`进行判断，做出相应的操作：

![img](https://pic.kblue.site/img/1-20210327172624754 "img")

![img](https://pic.kblue.site/img/1-20210327172627600 "img")

![img](https://pic.kblue.site/img/1-20210327172631090 "img")

![img](https://pic.kblue.site/img/1-20210327172634168 "img")

![img](https://pic.kblue.site/img/1-20210327172637905 "img")

到此基本功能已经完成，以下为源码以及测试例子及结果

源码：

```javascript
//Promise函数
function Promise(executor) {
    let self = this; //保留this。防止后面方法出现this只想不明的问题
    self.status = 'pending'; //promise的默认状态是pending
    self.success = undefined; //保存成功回调传递的值
    self.error = undefined; //保存失败回调传递的值

    self.onSuccessCallbacks = []; //存放成功的回调
    self.onErrorCallbacks = []; //存放失败的回调

    function resolve(success) {
        if (self.status === 'pending') {
            self.status = 'resolved'; //成功函数将其状态修改为resolved
            self.success = success; //将成功的值保存起来
            self.onSuccessCallbacks.forEach(element => {
                element();
            });
        }
    }

    function reject(error) {
        if (self.status === 'pending') {
            self.status = 'rejected'; //失败函数将其函数修改为rejected
            self.error = error; //将失败的值保存起来
            self.onErrorCallbacks.forEach(element => {
                element();
            })
        }
    }
    try {
        executor(resolve, reject);
    } catch (err) {
        reject(err);
    }
}

//then函数
Promise.prototype.then = function (onResolved, onRejected) {
    let self = this;
    let promiseAgain = new Promise((resolve, reject) => {
        if (self.status === 'pending') {
            self.onSuccessCallbacks.push(() => {
                let x = onResolved(self.success); //将resolve函数保留的成功值传递作为参数
                resolvePromise(promiseAgain, x, resolve, reject);
            })
            self.onErrorCallbacks.push(() => {
                let x = onRejected(self.error); //将reject函数保留的失败值传递作为参数
                resolvePromise(promiseAgain, x, resolve, reject);
            })
        }
        if (self.status === 'resolved') {
            let x = onResolved(self.success); //将resolve函数保留的成功值传递作为参数
            resolvePromise(promiseAgain, x, resolve, reject);
        }
        if (self.status === 'rejected') {
            let x = onRejected(self.error); //将reject函数保留的失败值传递作为参数
            resolvePromise(promiseAgain, x, resolve, reject);
        }
    })
    return promiseAgain;
}
//resolvePromise函数
function resolvePromise(promiseAgain, x, resolve, reject) {
    if (promiseAgain === x) {
        return reject(new TypeError("循环调用"));
    }
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, (y) => {
                    resolvePromise(promiseAgain, y, resolve, reject);
                }, (e) => {
                    reject(e);
                })
            } else {
                resolve(x);
            }
        } catch (error) {
            reject(error);
        }
    } else {
        resolve(x);
    }
}

module.exports = Promise;
```

测试示例：

```javascript
let Promise = require('./Promise');


let promise = new Promise((resolve, reject) => {
    setTimeout(function () {
        resolve('success data')
    }, 2000)
})

promise.then(res => {
        console.log("第一次调用", res);
        return res;
    }, err => {
        console.log("error:", err);
    })
    .then(res => {
        console.log("第二次调用",res);
        return res
    }, err => {
        console.log("err", err);
    })
    .then(res => {
        console.log("第三次调用",res);
    }, err => {
        console.log("err", err);
    })
```

测试结果：

```javascript
第一次调用 success data
第二次调用 success data
第三次调用 success data
```

使用过`Promise`，我们随口而出即为`Promise`为异步函数，其实`Promise`在实例化（`new`的过程）的时候是同步的，而`then`中注册的回调才是异步执行的。

```javascript
let Promise = require('./Promise');


let promise = new Promise((resolve, reject) => {
    console.log("其次会被执行");
    resolve("success data");
})

promise.then(res => {
        console.log("第一次调用", res);
        // return res;
    }, err => {
        console.log("error:", err);
    })

console.log("首先会被执行");
```

执行结果：

```纯文本
其次会被执行
第一次调用 success data
首先会被执行
复制代码
```

最终代码：

```javascript
//Promise函数
function Promise(executor) {
    let self = this; //保留this。防止后面方法出现this只想不明的问题
    self.status = 'pending'; //promise的默认状态是pending
    self.success = undefined; //保存成功回调传递的值
    self.error = undefined; //保存失败回调传递的值

    self.onSuccessCallbacks = []; //存放成功的回调
    self.onErrorCallbacks = []; //存放失败的回调

    function resolve(success) {
        if (self.status === 'pending') {
            self.status = 'resolved'; //成功函数将其状态修改为resolved
            self.success = success; //将成功的值保存起来
            self.onSuccessCallbacks.forEach(element => {
                element();
            });
        }
    }

    function reject(error) {
        if (self.status === 'pending') {
            self.status = 'rejected'; //失败函数将其函数修改为rejected
            self.error = error; //将失败的值保存起来
            self.onErrorCallbacks.forEach(element => {
                element();
            })
        }
    }
    try {
        executor(resolve, reject);
    } catch (err) {
        reject(err);
    }
}

//then函数
Promise.prototype.then = function (onResolved, onRejected) {
    onResolved = typeof onResolved == 'function' ? onResolved : val => val;
    onRejected = typeof onRejected == 'function' ? onRejected : err => {
        throw err;
    }
    let self = this;
    let promiseAgain = new Promise((resolve, reject) => {
        if (self.status === 'pending') {
            self.onSuccessCallbacks.push(() => {
                try {
                    let x = onResolved(self.success); //将resolve函数保留的成功值传递作为参数
                    resolvePromise(promiseAgain, x, resolve, reject);
                } catch (e) {
                    reject(e)
                }
            })
            self.onErrorCallbacks.push(() => {
                try {
                    let x = onRejected(self.error); //将reject函数保留的失败值传递作为参数
                    resolvePromise(promiseAgain, x, resolve, reject);
                } catch (e) {
                    reject(e)
                }
            })
        }
        if (self.status === 'resolved') {
            try {
                let x = onResolved(self.success); //将resolve函数保留的成功值传递作为参数
                resolvePromise(promiseAgain, x, resolve, reject);
            } catch (e) {
                reject(e)
            }
        }
        if (self.status === 'rejected') {
            try {
                let x = onRejected(self.error); //将reject函数保留的失败值传递作为参数
                resolvePromise(promiseAgain, x, resolve, reject);
            } catch (e) {
                reject(e)
            }
        }
    })
    return promiseAgain;
}
//resolvePromise函数
function resolvePromise(promiseAgain, x, resolve, reject) {
    if (promiseAgain === x) {
        return reject(new TypeError("循环调用"));
    }
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, (y) => {
                    resolvePromise(promiseAgain, y, resolve, reject);
                }, (e) => {
                    reject(e);
                })
            } else {
                resolve(x);
            }
        } catch (error) {
            reject(error);
        }
    } else {
        resolve(x);
    }
}

module.exports = Promise;
```

测试实例：

```javascript
let Promise = require('./Promise');


let promise = new Promise((resolve, reject) => {
    setTimeout(function () {
        resolve('success data')
    }, 0)
})

promise.then(res => {
        console.log("第一次调用", res);
        return res;
    }, err => {
        console.log("error:", err);
    })
    .then(res => {
        console.log("第二次调用",res);
        return res
    }, err => {
        console.log("err", err);
    })
    .then(res => {
        console.log("第三次调用",res);
    }, err => {
        console.log("err", err);
    })

console.log("首先会被执行");
```

测试结果：

```javascript
首先会被执行
第一次调用 success data
第二次调用 success data
第三次调用 success data
```
