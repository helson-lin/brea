
# webworker预缓存

在实际项目当中，有许多4k高清视频需要加载，并且无法走oss是内网环境，由于视频文件较大所以首次加载的时候视频没发秒加载，存在等待时间，为了优化体验

```javascript{30-34}
var ajax = function (url, data, callback, type) {
    var data_array, data_string, idx, req, value;
    if (data == null) {
        data = {};
    }
    if (callback == null) {
        callback = function () { };
    }
    if (type == null) {
        //default to a GET request
        type = 'GET';
    }
    data_array = [];
    for (idx in data) {
        value = data[idx];
        data_array.push("" + idx + "=" + value);
    }
    data_string = data_array.join("&");
    req = new XMLHttpRequest();
    req.open(type, url, false);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            return callback(req.responseText);
        }
    };
    req.send(data_string);
    return req;
};
self.addEventListener("message", e => {
    ajax(e.data, null, (data) => {
        self.postMessage('请求完毕'); // 
    }, 'GET')
})

```