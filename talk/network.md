## 项目开发过程中接口问题排查的技巧

最近在开发中，由于是为维护老项目，但是工期比较干所以在一些优化方面没有处理。开发完之后leader让我处理一下接口多次频繁请求的问题

其实在开发的过程中，以及看到的问题，但是压根没有时间精力去管这种。
下面说一下接口请求频繁的一下优化的过程。

### 请求相同接口（参数也是一直的）进行缓存处理

这里发现多次请求的接口是一些select的option数据的接口，而且数据不会经常变化，确定过之后，对接口的数据进行缓存。

关于缓存的方式: 1.可以使用vuex缓存 2. 使用localStorage缓存 3. 使用cookie缓存

这里采用vuex进行数据的缓存。由于之前的代码里面已经有进行vuex缓存的方式，并且leader确定用vuex缓存，所以也做探讨缓存的方式


### 关于多次频繁请求接口的代码定位

我不清楚大多数同学是怎么进行进行快速定位问题出现的地方的。

这里我简述一下我的方式，直接在network里面查看频繁请求的接口的启动器,s鼠标悬浮到上面就可以快速定位到请求接口是在哪里触发的



   