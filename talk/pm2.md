### 新建ecosystem.config.js
我这里已经在项目的目录文件夹内：执行`pm2 ecosystem`, 可以自动生成ecosystem配置文件
默认配置文件如下：我们这里不需要deploy，只需要修改apps的启动就行
```shell
[root@n1 ddnsto-serve ]$ pwd    
/root/ddnsto-serve
[root@n1 ddnsto-serve ]$ pm2 ecosystem
File /root/ecosystem.config.js generated
[root@n1 ~ ]$ bat ecosystem.config.js 
───────┬─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
       │ File: ecosystem.config.js
───────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
   1   │ module.exports = {
   2   │   apps : [{
   3   │     script: 'index.js',
   4   │     watch: '.'
   5   │   }, {
   6   │     script: './service-worker/',
   7   │     watch: ['./service-worker']
   8   │   }],
   9   │ 
  10   │   deploy : {
  11   │     production : {
  12   │       user : 'SSH_USERNAME',
  13   │       host : 'SSH_HOSTMACHINE',
  14   │       ref  : 'origin/master',
  15   │       repo : 'GIT_REPOSITORY',
  16   │       path : 'DESTINATION_PATH',
  17   │       'pre-deploy-local': '',
  18   │       'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
  19   │       'pre-setup': ''
  20   │     }
  21   │   }
  22   │ };
───────┴─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
[root@n1 ~ ]$ 
```

### 修改配置文件
这里我只需要一次启动一个服务所以我的apps的长度为1

`name`字段为启动的服务的名称，
`script`为执行的脚本：这里我的是可执行程序, 可以替换成python.py
`watch`是否监听文件的改变，自动重启服务
`args`为执行脚本的参数
```js
   1   │ module.exports = {
   2   │   apps : [{
   3   │     name: 'ddnsto',
   4   │     script: 'ddnsto',
   5   │     watch: false,
   6   │     args: '-u e429d719-88a0-4f50-95a0-7e6e685c2d02'
   7   │   }],
   8   │ };
```

#### 启动服务
在配置文件目录下执行`pm2 start`
启动成功可以看到列表内新增了`ddnsto`
```shell
[root@n1 ddnsto-serve ]$ pm2 start
┌─────┬───────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name      │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼───────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 3   │ ddnsto    │ default     │ N/A     │ fork    │ 4939     │ 14m    │ 0    │ online    │ 0%       │ 2.4mb    │ root     │ disabled │
│ 2   │ no        │ default     │ 0.39.3  │ fork    │ 31720    │ 3D     │ 0    │ online    │ 0%       │ 36.6mb   │ root     │ disabled │
└─────┴───────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
Module
┌────┬──────────────────────────────┬───────────────┬──────────┬──────────┬──────┬──────────┬──────────┬──────────┐
│ id │ module                       │ version       │ pid      │ status   │ ↺    │ cpu      │ mem      │ user     │
├────┼──────────────────────────────┼───────────────┼──────────┼──────────┼──────┼──────────┼──────────┼──────────┤
│ 0  │ esno                         │ 0.16.3        │ 3975     │ online   │ 0    │ 0%       │ 27.8mb   │ root     │
└────┴──────────────────────────────┴───────────────┴──────────┴──────────┴──────┴──────────┴──────────┴──────────┘
```