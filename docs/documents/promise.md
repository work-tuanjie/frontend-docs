---
title: 你看得懂的 Promise
# date: 2020-10-18
date: 2020-10-22
publish: true
categories:
  - 文档
tags:
  - JavaScript
  - Promise
---

![](https://ftp.bmp.ovh/imgs/2020/10/8f5f352c3a9cca4f.webp)
<!-- https://imgurl.org/delete/decc0d69afd4cb00 -->

## 什么是 Promise

`Promise` 是异步编程的一种解决方案，从语法上讲，`Promise` 是一个对象，从它可以获取异步操作的消息；从本意上讲，它是承诺，承诺它过一段时间会给你一个结果。

`Promise` 有三种状态，状态一旦改变，就不会再变。创建 `Promise` 实例后，它会立即执行。

- `Pending` (等待)
- `Fulfilled` (成功)
- `Rejected` (失败)

> [MDN: Promsie](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
> 
> [阮一峰 EcmaScript6 入门: Promise](https://es6.ruanyifeng.com/#/docs/Promise)

## 为什么会出现 Promise

在没有 `Promise` 之前，我们为了拿到异步操作的结果，不得不通过 `callback` 的方式来实现。一般我们会碰到的回调嵌套都不会很多，基本就一到两级。但是某些情况下，回调嵌套很多时，代码就会非常繁琐，变得难以维护，这种情况俗称 —— `Callback hell` 回调地狱。使用 `Promise` 的特性可以很好的解决这个问题。

举个栗子🌰：

```javascript
// 在 Node.js 中读取本地文件
const fs = require('fs')

fs.readFile('./a.txt', 'utf8', function (err, data) {
  fs.readFile(data, 'utf8', function (err, data) {
    fs.readFile(data,'utf8', function (err, data) {
      console.log(data)
    });
  });
});
```

## Promise 语法

### 如何定义？

`Promise` 构造函数接受一个函数作为参数，该函数会立即被执行并返回一个 `Promise` 实例。
<!-- 
- `resolve` 函数的作用是，将 `Promise` 对象的状态从 “未完成” 变为 “成功”（即从 `pending` 变为 `resolved`）。用来在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
- `reject` 函数的作用是，将 `Promise` 对象的状态从 “未完成” 变为 “失败”（即从 `pending` 变为 `rejected`）。用来在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。 -->

<img src="https://i.loli.net/2020/10/18/Ryx3dFuK76IAJBq.gif" style="width: 100%;">
<!-- https://sm.ms/image/Ryx3dFuK76IAJBq -->

返回的 `Promise` 实例是一个对象，它包含一个状态 `PromiseStatus` 和一个值 `PromiseValue`。在上面的例子中，你可以看到 `PromiseStatus`  的值是 `pending`, `PromiseValue` 的值是 `undefined`。

> 不过，你没有办法访问到 `PromiseStatus` 和  `PromiseValue` 这两个属性。但在理解 `Promise` 的时候，这两个属性非常重要的。

`PromiseStatus` 的值，也就是 `Promise` 的状态，可以是以下三个值之一：

- ⏳ `pending`: `Promise` 暂时还没有被解决也没有被拒绝，仍然处于 `pending` 状态
- ✅ `fulfilled`: `Promise` 已经被 `resolved`。一切都很好，在 `Promise` 内部没有错误发生。
- ❌ `rejected`: `Promise` 已经被 `rejected`。哎呦，某些事情出错了。

在上面的例子中，我们只是为 `Promise` 构造器传递了一个简单的回调函数 `() => {}`。然而，这个回调函数实际上接受两个函数作为参数。

- `resolve` 函数的作用是，将 `Promise` 对象的状态从 “未完成” 变为 “成功”（即从 `pending` 变为 `resolved`）。用来在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
- `reject` 函数的作用是，将 `Promise` 对象的状态从 “未完成” 变为 “失败”（即从 `pending` 变为 `rejected`）。用来在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

<img src="https://i.loli.net/2020/10/18/twf2L9PQbB3JrKG.gif" style="width: 100%;">
<!-- https://sm.ms/image/twf2L9PQbB3JrKG -->

### 如何使用？

现在我们已经大概指导如何使用 `Promise` 来做一些异步操作了，现在应该开始思考如何在对应的时机知道 `Promise` 状态的变化，并获取到内部返回出来的值。

对于一个 `Promise`，我们可以使用它实例上面的 3 个方法：

- `.then()`: 在一个 `Promise` 被 `resolved` 后调用，接受 `Promise` 内部 `resolve` 调用时所传递的参数作为参数
- `.catch()`: 在一个 `Promise` 被 `rejected` 后被调用, 接受 `Promise` 内部 `reject` 调用时所传递的参数作为参数
- `.finally()`: 不论 `Promise` 是被 `resolved` 还是 `reject` 总是调用 (该方法会在 `then` 或者 `catch` 方法后调用)

```javascript
function promiseDemo (state) {
  return new Promise((resolve, reject) => {
    state ? resolve(!!state) : reject(!!state)
  })
}

// resolve 时
promiseDemo(true)
  .then(res => {
    console.log(res);
  })
  .catch(e => {
    console.log(e);
  })
  .finally(() => {
    console.log('finished');
  });
// > true, finished

// reject 时
promiseDemo(false)
  .then(res => {
    console.log(res);
  })
  .catch(e => {
    console.log(e);
  })
  .finally(() => {
    console.log('finished');
  });
// > false, finished
```

当你知道一个 `Promise` 总是 `resolve` 或者总是 `reject` 的时候，你可以写 `Promise.resolve` 或 `Promise.reject`，传入你想要 `reject` 或 `resolve` 的 `Promise` 的值。

```javascript
new Promise(resolve => resolve(true))
  .then(res => { console.log(res) });
// > true

Promise.resolve(true)
  .then(res => { console.log(res) });
// > true

new Promise((_, reject) => reject(false))
  .catch(res => { console.log(res) });
// > false

Promise.reject(false)
  .catch(res => { console.log(res) });
// > false
```

`then` 方法会隐式的将回调的返回值使用 `Promise` 包装后返回。 因此可以采用链式写法，即 `then` 方法后面还可以继续使用 `then` 方法。

## 示例

从表面上看，`Promise` 只是能够简化层层回调的写法，而实质上，`Promise` 的精髓是 “状态”，用维护状态、传递状态的方式来使得回调函数能够及时调用，它比传递 `Callback` 函数要简单、灵活的多。

假设我们要实现这么一个需求：获取一张图片，对其进行压缩，再添加一个滤镜，然后保存。那么我们需要分这么几步来实现：

1. 首先，用 `getImage` 函数获取我们想要处理的图片。
2. 图片获取成功后，使用 `compressImage` 函数对图片进行压缩。
3. 图片压缩成功后，使用 `applyFilter` 函数给图片添加一个滤镜。
4. 上述操作处理完成后，使用 `saveFile` 函数保存图片并且打印成功的日志。

如果不使用 `Promise` 来实现的话，代码大概是这个样子：

```javascript
getImage('./image.png', (error, data) => {
  if (error) throw new Error(error);
  compressImage(data，(error, _data) => {
    if (error) throw new Error(error);
    applyFilter(_data, (error, __data) => {
      if (error) throw new Error(error);
      saveFile(__data, (error) => {
        if (error) throw new Error(error);
        console.log('save image successful!');
      });
    });
  });
});
```

在这个例子中，为了运行实现这个功能，我们不得不嵌套多个回调。如果使用 `Promise` 来实现则会清爽很多：

```javascript
getImage('./image.png')
  .then(data => compressImage(data))
  .then(data => applyFilter(data))
  .then(data => saveFile(data))
  .then(() => {
    console.log('save image successful!');
  })
  .catch(error => {
    throw error;
  });
```

## Promise 原型

在 `Promise` 对象上除了 上面提到过的 `Promsie.resolve` 和 `Promise.reject` 两个静态方法，还提供了几个很常用的方法。

以下几个方法都接收一个由 `Promise` 组成的数组作为参数，返回一个 `Promise` 实例。区别在于返回的 `Promise` 对象状态改变的时机不同。

### .all()

> 该方法在 ECMASCript 2015 (ES6) 版本中被正式加入标准

当参数中所有的 `Promise` 全部为 `Fulfilled` 状态时，该方法所返回的 `Promise` 的状态会变为 `Fulfilled`，如果数组中有一个元素状态是 `Rejected`，则返回值的状态会直接变为 `Rejected`。

通俗的来讲即：数组内所有 `Promise` 全部成功时，`Promise.all` 为成功状态；数组内有一个 `Promise` 失败，则 `Promise.all` 为失败状态。

举个栗子🌰：

我们网站首页需要请求三个不同的接口，而且这三个接口之间不存在相互的依赖关系，但我们需要在三个接口都成功响应后再去做操作，这是就可以使用 `Promise.all` 来实现。

```javascript
Promise.all([getBanner(), getHot(), getList()])
  // 当三个Promise方法都返回成功时，会调用 then 方法，把三个方法的返回值按传入的数组顺序当作参数传入。
  .then(([banner, hot, list]) => {
    console.log(banner, hot, list);
  })
  // 如果三个方法中有一个失败了，则会直接调用 catch 方法，把该失败方法的错误信息当作参数传入。
  .catch(e => {
    console.log(e);
  });
```

### .race()

> 该方法在 ECMASCript 2015 (ES6) 版本中被正式加入标准

当参数中所有的 `Promise` 中有一个解决或拒绝（指状态不为 `pending`），就采用该 `Promise` 的值作为 `Promise.race` 的返回值。

通俗的来讲即：数组内所有 `Promise` 中谁先返回就输出谁，不管结果本身是解决还是拒绝。

举个栗子🌰：

`fetch api` 不像 `XMLHttpRequest` 支持 `timeout`，我们可以通过 `race` 方法来实现该功能。

```javascript
Promise.race([
  fetch('https://api.xxxx.com/v1/xxx'),
  // 当 fetch 5s 内没有响应时，直接返回失败状态的 Promise
  new Promise((_, reject) => setTimeout(() => reject(new Error('Fetch Timeout!')), 5000))
])
  .then(res => {
    console.log(res);
  })
  .catch(e => {
    console.log(e);
  });
```

### .allSettled()

> 该方法在 ECMASCript 2020 (ES11) 版本中被正式加入标准

当参数数组中的 `Promise` 全部返回时（不管元素的结果时成功还是失败）会返回一个状态为 `Fulfilled` 的 `Promise`。

```javascript
Promise.allSettled([getBanner(), getHot(), getList()])
  // 当所有 Promise 都返回时，会把每个 Promise 的执行结果按照数参数组顺序组成数组传入 then 方法做为参数
  // 该参数中的每一项都是一个对象，且对象中都有一个 status 字段
  // - 如果 status 的值为 fulfilled，则结果对象上存在一个 value
  // - 如果值为 rejected，则存在一个 reason
  .then(result => {
    console.log(result);
  });
```

### .any()

:::danger
该方法依然是实验性的，尚未被所有的浏览器完全支持。它当前处于 `TC39 第四阶段草案（Stage 4）`
:::

只要数组中的其中的一个 `Promise` 成功，就返回那个已经成功的 `Promise`，否则返回一个 `Rejected` 的 `Promise`。

白嫖党栗子🌰：

当我们需要获取天气信息数据时，处于白嫖即赚到的精神，一般会有多个免费接口可以实现，但这些接口一般都会对单个账号进行免费次数限制，这时我们需要请求多个接口来处理这个限制问题。

```javascript
Promise.any([juhe(), amap(), caiyun()])
  .then(res => {
    console.log(res);
  })
  .catch(e => {
    console.log(e);
  });
```

## async/await


### await

语法：

```javascript
[返回值] = await 表达式;
```

该操作符会等待后面的 `Promise` 执行，并把成功的结果返回，如果表达式不是一个 `Promise` 则会返回该值本身。
如果 `Promise` 执行出现异常，则会将 `Promise` 的异常原因抛出，需要通过 `try/catch` 进行捕捉。


### async 

`async` 函数是使用 `async` 关键字声明的函数，并且其中允许使用 `await`。它让我们可以用更简洁的方式写出基于 `Promise` 的异步操作。

`async function` 执行过程中如果遇到 `await` 会暂停整个 `async` 函数的执行，等待 `await` 后面的表达式的执行结果，只有被等待的表达式返回数据后才会恢复 `async` 函数的执行。

```javascript
async function foo() {
  await 1
}
// 等价于
function foo() {
  return Promise.resolve(1).then(() => undefined)
}
```

`async function` 会始终返回一个 `Promise` 对象。如果 `async function` 中的返回值不是一个 `Promise` 类型的值，则 `async function` 会隐式的将值转为 `Promise` 对象进行返回。如果在 `async function` 执行过程中出现了异常，则 `asycn function` 会自动捕获异常，并终止函数执行，将异常通过一个失败的 `Promise` 返回给调用者。

```javascript
async function foo() {
  return 1;
}
// 等价于
function foo() {
  return Promise.resolve(1);
}
```

## 测试

以下代码的返回值在 **第9行** 与 **第11行** 有什么区别？

> 即 `async function` 返回一个 Promise 和 返回一个 await Promise 有什么区别？

```javascript{9,11}
async function getProcessedData(url) {
  let v;
  try {
    v = await downloadData(url);
  } catch(e) {
    v = await downloadFallbackData(url);
  }
  try {
    // return await Promise
    return await processDataInWorker(v);
  } catch (e) {
    // return PromiseValue
    return null;
  }
}
```

## 扩展

- `Generator`
- `Event Loop`
