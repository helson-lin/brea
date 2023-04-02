## Promise对象的方法
`Promise.all()`, `Promise.allSettled()`, `Promise.any()` 和 `Promise.race()` 都是 JavaScript 中用于处理多个 Promise 的方法。它们的区别和用途如下：

1. `Promise.all()`

`Promise.all()` 接收一个 Promise 数组作为参数，当所有 Promise 都成功时，返回一个包含所有 Promise 结果的数组；当其中一个 Promise 失败时，返回该 Promise 的错误信息。`Promise.all()` 的用途是在所有 Promise 正确返回结果后，再执行后续的操作。比如：

```javascript
const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = Promise.resolve(3);

Promise.all([promise1, promise2, promise3])
  .then(results => {
    console.log(results); // [1, 2, 3]
    // 所有 Promise 都成功后的后续操作
  })
  .catch(error => {
    console.log(error); // 所有 Promise 中的第一个错误
  });
```

2. `Promise.allSettled()`

`Promise.allSettled()` 接收一个 Promise 数组作为参数，不管 Promise 成功还是失败，都返回一个包含所有 Promise 结果的数组。`Promise.allSettled()` 的用途是在所有 Promise 执行完毕后，再执行后续的操作。比如：

```javascript
const promise1 = Promise.resolve(1);
const promise2 = Promise.reject(new Error('error'));
const promise3 = Promise.resolve(3);

Promise.allSettled([promise1, promise2, promise3])
  .then(results => {
    console.log(results); // [{status: "fulfilled", value: 1}, {status: "rejected", reason: Error: error}, {status: "fulfilled", value: 3}]
    // 所有 Promise 执行完毕后的后续操作
  });
```

3. `Promise.any()`

`Promise.any()` 接收一个 Promise 数组作为参数，当其中一个 Promise 成功时，返回该 Promise 的结果；当所有 Promise 都失败时，返回所有 Promise 的错误信息。`Promise.any()` 的用途是在任意一个 Promise 正确返回结果后，就执行后续的操作。比如：

```javascript
const promise1 = Promise.reject(new Error('error'));
const promise2 = Promise.resolve(2);
const promise3 = Promise.reject(new Error('error'));

Promise.any([promise1, promise2, promise3])
  .then(result => {
    console.log(result); // 2
    // 任意一个 Promise 成功后的后续操作
  })
  .catch(errors => {
    console.log(errors); // AggregateError: All promises were rejected
    // 所有 Promise 都都失败后的后续操作
  });
```

4. `Promise.race()`

`Promise.race()` 接收一个 Promise 数组作为参数，当其中一个 Promise 状态改变时（成功或失败），立即返回该 Promise 的结果。`Promise.race()` 的用途是在最快的 Promise 返回结果后，立即执行后续的操作。比如：

```javascript
const promise1 = new Promise(resolve => setTimeout(() => resolve(1), 1000));
const promise2 = new Promise(resolve => setTimeout(() => resolve(2), 2000));
const promise3 = new Promise(resolve => setTimeout(() => resolve(3), 3000));

Promise.race([promise1, promise2, promise3])
  .then(result => {
    console.log(result); // 1
    // 最快的 Promise 返回结果后的后续操作
  });
```

总体来说，`Promise.all()`, `Promise.allSettled()`, `Promise.any()` 和 `Promise.race()` 都是用于处理多个 Promise 的方法，但它们的区别和用途有所不同。`Promise.all()` 用于在所有 Promise 都正确返回结果后，执行后续的操作；`Promise.allSettled()` 用于在所有 Promise 执行完毕后，执行后续的操作；`Promise.any()` 用于在任意一个 Promise 正确返回结果后，执行后续的操作；`Promise.race()` 用于在最快的 Promise 返回结果后，执行后续的操作。根据具体的需求，选择适合的方法可以提高代码的效率和可读性。
#前端 