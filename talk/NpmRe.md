## Node

### log4js-node 日志插件

[log4js-node](https://log4js-node.github.io/log4js-node/layouts.html):
Node日志服务plugin

![](https://pic.kblue.site/picgo/202303021421155.png)

## 前端

### rough-notation 文字标注
[文字标注 rough-notation](https://www.npmjs.com/package/rough-notation)
![](https://pic.kblue.site/picgo/20230302134939.png)

### ColorThief 图片颜色获取

[ColorThief](https://www.npmjs.com/package/color-thief)

![color-thief](https://pic.kblue.site/picgo/202305202218970.png)

Demo查看：[CodePen Example](https://codepen.io/helson-lin/pen/jOeQQvv)

## System

### Bat 文本查看工具
[Bat](https://github.com/sharkdp/bat/)替代linux cat的文本查看工具

![](https://pic.kblue.site/picgo/202303201640405.png)


### ShellClash

[ShellClash](https://github.com/juewuy/ShellClash/blob/master/README_CN.md) 可以为路由器提供Clash服务，例如在小米Ax6s上部署服务，局域网内设备可以通过wifi上网

```bash
sudo -i #切换到root用户，如果需要密码，请输入密码
bash #如已处于bash环境可跳过
export url='https://fastly.jsdelivr.net/gh/juewuy/ShellClash@master' && wget -q --no-check-certificate -O /tmp/install.sh $url/install.sh  && bash /tmp/install.sh && source /etc/profile &> /dev/null
```
