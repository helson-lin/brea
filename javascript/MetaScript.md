# META标签和Script标签的一些属性

## 使用meta标签实现PPT自动播放功能：

![](https://pic.kblue.site/img/202204051511291.png)



## 利用meta标签实现大屏定时刷新

![](/image/image_Km3qRqGetI.png)



## script 标签： 调整加载顺序提示渲染速度

`async`属性一一立即请求文件，但不阻塞渲染引擎，文件加载完毕后阻塞渲染引擎并立即执行文件内容


`defer`属性一一立即请求文件，但不阻塞渲染引擎，等到解析完HTML之后再执行文件内容


HTML5标准type属性-一对应值为“`module`”
让浏览器按照ECMA Script6标准将文件当作模块进行解析，默认阻塞效果同`defer`,也可以配合`async`在请求完成后立即执行



![](/image/image_ElrwvyAubU.png)



## link标签：通过预处理提示渲染速度

-   **`dns-prefetch:`** 预先对域名进行DNS解析并缓存

    ![](/image/image_HuJifOPsfe.png)
-   **`preconnect`** : 让浏览器在一个Http请求正式发送给服务器前预先执行一些操作包括DNS解析、TLS协商、TCP握手，通过消除往返延迟来为用户节省时间
-   **`prefetch/preload`**: 两个值都是让浏览器预先下载并缓存某个资源，但不同的是
    prefetch可能会在浏览器忙时被忽略，而preload则是一定会被预先下载
-   **`prerender`** : 预先下载并预先渲染

    ![](/image/image_CSH4A41ApY.png)


### meta标签： 提取关键信息

```javascript
<meta description="搜索，测试，关键词热点" name="keywords">
```

