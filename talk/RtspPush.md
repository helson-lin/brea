准备工作：ffmpeg包、easydarwin服务包、测试环境（windows）
ffmpeg和easydarwin都支持全平台;

PS:  **<a style="color:red;">直接使用VLC也可以推流，更加简单</a>**，我这是特殊使用场景

## 安装ffmpeg
解压准备的ffmpeg的包，放在任意目录下，配置系统环境变量（可以配置也可以不配置直接使用）
![](https://pic.kblue.site/picgo/49d6e735403d4e4ca6667a3b9b50704c.png)
修改系统环境变量 -  PATH - 新增 - 粘贴ffmpeg的目录地址（到bin目录，如下）-保存
`D:\Program Files (x86)\ffmpeg-5.0-essentials_build\ffmpeg-5.0-essentials_build\bin`

--- 

测试ffmpeg环境变量：win + r - cmd - 输入`ffmpeg`- 内容输出表达环境变量配置成功

## 启动easydarwin服务
解压easydarwin包，运行start.bat脚本，看到如下界面回车即可：
PS: 这里我使用的是node版本，go版本也可以正常使用。
![](https://pic.kblue.site/picgo/0f78a8617d394450b5ac2ac216a00b76.png)
 ### 预览推流服务
 打开浏览器输入： `127.0.0.1:10008` 即可看到easydarwin界面
![](https://pic.kblue.site/picgo/25c0e00db8cf4215aee98340bd669e33.png)
## 使用FFMPEG创建RTSP推流
使用终端输入：
`ffmpeg -stream_loop -1 -re -i  E:\big_buck_bunny.mp4  -rtsp_transport tcp -vcodec h264 -f rtsp rtsp://localhost/test`
参数解释： 
`-stream_loop  -1`表示无限循环视频
`E:\big_buck_bunny.mp4` 为视频地址（我这里是写全的）
`rtsp://localhost/test` 为推流的rtsp地址，（不要修改端口了）

启动成功如下
![](https://pic.kblue.site/picgo/10fcd914a75844dca954ad7a09e3da38.png)

直接访问easydarwin地址，可以再推流列表里面看到正在推流的视频
测试可以使用VLC测试
![](https://pic.kblue.site/picgo/7c4dc2500b7b4c46a1dd96c9ca18c869.png)
