# Nginx常用配置

> centos7 暂时关闭防火墙：`systemctl stop firewalld.service`

>  centos7 禁止firewall开机启动: `systemctl disable firewalld.service `

## 安装

编译安装： [nginx安装及其配置详细教程\_weixin\_30468137的博客-CSDN博客](https://blog.csdn.net/weixin_30468137/article/details/97678940?utm_medium=distribute.pc_relevant.none-task-blog-baidujs_baidulandingword-5\&spm=1001.2101.3001.4242 "nginx安装及其配置详细教程_weixin_30468137的博客-CSDN博客")

### 默认配置文件

```nginx
########### 每个指令必须有分号结束。#################
#user administrator administrators;  #配置用户或者组，默认为nobody nobody。
#worker_processes 2;  #允许生成的进程数，默认为1
#pid /nginx/pid/nginx.pid;   #指定nginx进程运行文件存放地址
error_log log/error.log debug;  #制定日志路径，级别。这个设置可以放入全局块，http块，server块，级别以此为：debug|info|notice|warn|error|crit|alert|emerg
events {
    accept_mutex on;   #设置网路连接序列化，防止惊群现象发生，默认为on
    multi_accept on;  #设置一个进程是否同时接受多个网络连接，默认为off
    #use epoll;      #事件驱动模型，select|poll|kqueue|epoll|resig|/dev/poll|eventport
    worker_connections  1024;    #最大连接数，默认为512
}
http {
    include       mime.types;   #文件扩展名与文件类型映射表
    default_type  application/octet-stream; #默认文件类型，默认为text/plain
    #access_log off; #取消服务日志    
    log_format myFormat '$remote_addr–$remote_user [$time_local] $request $status $body_bytes_sent $http_referer $http_user_agent $http_x_forwarded_for'; #自定义格式
    access_log log/access.log myFormat;  #combined为日志格式的默认值
    sendfile on;   #允许sendfile方式传输文件，默认为off，可以在http块，server块，location块。
    sendfile_max_chunk 100k;  #每个进程每次调用传输数量不能大于设定的值，默认为0，即不设上限。
    keepalive_timeout 65;  #连接超时时间，默认为75s，可以在http，server，location块。

    upstream mysvr {   
      server 127.0.0.1:7878;
      server 192.168.10.121:3333 backup;  #热备
    }
    error_page 404 https://www.baidu.com; #错误页
    server {
        keepalive_requests 120; #单连接请求上限次数。
        listen    4545;   #监听端口
        server_name  127.0.0.1;   #监听地址       
        location  ~*^.+$ {       #请求的url过滤，正则匹配，~为区分大小写，~*为不区分大小写。
           #root path;  #根目录
           #index vv.txt;  #设置默认页
           proxy_pass  http://mysvr;  #请求转向mysvr 定义的服务器列表
           deny 127.0.0.1;  #拒绝的ip
           allow 172.18.5.54; #允许的ip           
        } 
    }
}
```

## 常用命令

-   `ngin` 启动服务
-   `nginx -s quit`停止服务
-   `ngix -s reload`重启配置文件
-   `nginx -t`检查nginx的配置文件

## 配置Server

#### 配置正向代理

```nginx
server
{
    listen 80;
    listen 443 ssl http2; # 配饰 443端口 支持https
    server_name alist.kblue.site;  # 访问域名
    index index.php index.html index.htm default.php default.htm default.html; # 解析文件顺序
    root /www/wwwroot/alist.kblue.site # 文件目录
    # alias alist/kblue.site/
    # 静态目录
    # autoindex on
    # 设置最大响应文件大小
    #set $limit_rate 1000kb
    
    #SSL-START SSL相关配置，请勿删除或修改下一行带注释的404规则
    #error_page 404/404.html;
    ssl_certificate    /root/cn.oimi.space.cer; # 证书
    ssl_certificate_key    /root/cn.oimi.space.pem; # 证书秘钥
    ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3;  #协议
    ssl_ciphers EECDH+CHACHA20:EECDH+CHACHA20-draft:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    # sessions时长
    ssl_session_timeout 10m;
    add_header Strict-Transport-Security "max-age=31536000";  # 配置之后只能通过https访问网站
    error_page 497  https://$host$request_uri;

    #SSL-END
    
    #ERROR-PAGE-START  错误页配置，可以注释、删除或修改
    #error_page 404 /404.html;
    #error_page 502 /502.html;
    #ERROR-PAGE-END
    
    #PHP-INFO-START  PHP引用配置，可以注释或修改
    #清理缓存规则

    location ~ /purge(/.*) {
        proxy_cache_purge cache_one $host$1$is_args$args;
        #access_log  /www/wwwlogs/alist.kblue.site_purge_cache.log;
    }
    
    #禁止访问的文件或目录
    location ~ ^/(\.user.ini|\.htaccess|\.git|\.svn|\.project|LICENSE|README.md)
    {
        return 404;
    }
    
    access_log  /www/wwwlogs/alist.kblue.site.log;
    error_log  /www/wwwlogs/alist.kblue.site.error.log;
}
```

### 配置反向代理

```nginx{3-5}
location /
{
    proxy_pass https://127.0.0.1:5244;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header REMOTE-HOST $remote_addr;
    // 配置内容替换
    subs_filter "https://play-lh.googleusercontent.com" "http://107.189.29.15:4000";
    subs_filter_types text/html;
    #指定被替换的MIME类型#
    sub_filter_once on;
    
    
    add_header X-Cache $upstream_cache_status;
    
    #Set Nginx Cache
    # 配置nginx缓存
    
    proxy_ignore_headers Set-Cookie Cache-Control expires;
    proxy_cache cache_one;
    proxy_cache_key $host$uri$is_args$args;
    proxy_cache_valid 200 304 301 302 60m;
    expires 12h;
}

```

## Nginx 使用Upstream实现负载均衡

### 热备

如果你有2台服务器，当一台服务器发生事故时，才启用第二台服务器给提供服务。服务器处理请求的顺序：AAAAAA突然A挂啦，BBBBBBBBBBBBBB.....

```nginx
upstream mySvr {
    server 123.57.89.245:8812;
    server 127.0.0.1:8812 backup;
  }
```

### 轮询

nginx默认就是轮询其权重都默认为1，服务器处理请求的顺序：ABABABABAB....

```nginx
upstream mysvr { 
    server 127.0.0.1:7878;
    server 192.168.10.121:3333;       
}
```

### 加权轮询

跟据配置的权重的大小而分发给不同服务器不同数量的请求。如果不设置，则默认为1。下面服务器的请求顺序为：ABBABBABBABBABB....

```nginx
upstream mysvr { 
    server 127.0.0.1:7878 weight=1;
    server 192.168.10.121:3333 weight=2;
}
```

### ip\_hash

让相同的客户端ip请求相同的服务器。

```nginx
upstream mysvr { 
    server 127.0.0.1:7878; 
    server 192.168.10.121:3333;
    ip_hash;
}
```

### 配置

#### 配置参数

-   `down`，表示当前的server暂时不参与负载均衡。
-   `backup`，预留的备份机器。当其他所有的非backup机器出现故障或者忙的时候，才会请求backup机器，因此这台机器的压力最轻。
-   `max_fails`，允许请求失败的次数，默认为1。当超过最大次数时，返回proxy\_next\_upstream 模块定义的错误。
-   `fail_timeout`，在经历了max\_fails次失败后，暂停服务的时间。max\_fails可以和fail\_timeout一起使用。

```nginx
# exp:
upstream mysvr { 
    server 127.0.0.1:7878 weight=2 max_fails=2 fail_timeout=2;
    server 192.168.10.121:3333 weight=1 max_fails=2 fail_timeout=1;    
}
```

#### 完整demo

```nginx
upstream mySvr {
    server 123.57.89.245:8812 max_fails=2;
    server 127.0.0.1:8812 backup; #  本机的服务作为热备服务 ，当server1出现问题时请求server2
  }
     server {
      listen 3000;
      server_name _;
      location / {
        proxy_pass http://mySvr;
        proxy_intercept_errors on;
        proxy_read_timeout 1; #nginx服务器想被代理服务器组发出read请求后，等待响应的超时间，默认为60秒。
        proxy_send_timeout 1; #nginx服务器想被代理服务器组发出write请求后，等待响应的超时间，默认为60秒。
      }

       error_page 404 /404.html;
            location = /404.html {
          }
    }
```

## 配置SSL

1.  申请SSL证书，阿里云等都可以免费申请。申请过程需要自行配置解析。
2.  下载Ngix证书：文件为 `.pem`、`.key`结尾的
3.  上次证书和秘钥文件到服务器文件下，记住文件夹路径。`exp: /home/www/test/nginx.kblue.site.pem`
4.  修改Nginx配置文件

> 进行SSL配置前提：域名备案成功。

![](/image/1621564464888_X0EjyUdzCw.png)

```nginx
server {
         listen 80 default_server;
         listen 443 ssl http2; # 配饰 443端口 支持https
         server_name  nginx.kblue.site;
         root    /usr/share/nginx/html; # 根目录
         # 配置 https
         ssl_certificate /home/www/test/nginx.kblue.site.pem;  # 证书文件
         ssl_certificate_key /home/www/test/nginx.kblue.site.key; # 证书文件秘钥
         ssl_session_cache shared:SSL:1m; # 当服务器启用它时,客户端不必每次请求都进行完全SSL握手,从而节省了时间和CPU资源.
         ssl_session_timeout  10m; # session 超时时长
         ssl_ciphers HIGH:!aNULL:!MD5;
         ssl_prefer_server_ciphers on;
    
    
        # Load configuration files for the default server block.
        # /usr/local/www/easy-mock/mock.freeys.xyz.
        include /etc/nginx/default.d/*.conf;
    
     gzip on;
     gzip_buffers 32 4K;
     gzip_comp_level 6;
        gzip_min_length 100;
      gzip_types application/javascript text/css text/xml;
        gzip_disable "MSIE [1-6]\.";                 #配置禁用gzip条件，支持正则。此处表示ie6及以下不启用gzip（因为ie低版本不支持）
        gzip_vary on;

        location / {
        }

        error_page 404 /404.html;
        location = /404.html {
        
        }

        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
        }
    }
```

## nginx 重写

企业场景：

Nginx的rewrite功能在企业里应用非常广泛：
\- 可以调整用户浏览的URL，看起来更规范，合乎开发及产品人员的需求。
\- 为了让搜索引擎搜录网站内容及用户体验更好，企业会将动态URL地址伪装成静态地址提供服务。
\- 网址换新域名后，让旧的访问跳转到新的域名上。例如，[访问京东的360buy.com会跳转到jd.com](http://xn--360buy-vs7il2b500v1m0bmoxa.xn--comjd-ut2hk8p5v3l70c.com "访问京东的360buy.com会跳转到jd.com")u 根据特殊变量、目录、客户端的信息进行URL调整等



exp: 原访问地址为`http://localhost:8089`/,现在改为`https://localhost:1080`访问



```javascript
server {
        listen 8089;
        server_name localhost;
        access_log /usr/logs/nginx/share.log main;
        #配置重写
        location / {
                rewrite ^/(.*) http://192.16å8.226.128:1080/$1 permanent;
        }
        location /report/ {
                alias /www/html/;
                index index.html;
        }

}
```

说明：

-   rewrite为固定关键字，表示开始进行rewrite匹配规则
-   regex部分是 `^/(.*)` ，这是一个正则表达式，匹配完整的域名和后面的路径地址
-   replacement部分是[http://192.168.226.128:1080/\$1](http://192.168.226.128:1080/\$1 "http://192.168.226.128:1080/\$1") \$1，是取自regex部分()里的内容。匹配成功后跳转到的URL。
-   flag部分 permanent表示永久301重定向标记，即跳转到新的[http://192.168.226.128:1080/\$1](http://192.168.226.128:1080/\$1 "http://192.168.226.128:1080/\$1") 地址上



`1080`端口配置文件：

```javascript
server {
        listen 1080;
        server_name localhost;
        location / {
                root /www/html/union_dev/dist;
                index index.html;
        }
        # 配置config配置文件
        location /config/ {
                alias /www/html/union_dev/;
        }
        # 配置接口地址
        location /manage/ {
                proxy_set_header Host $host:$server_port;
                proxy_pass http://192.168.201.159:8080/;
        }
        # 配置日志
        error_log /www/html/union_dev/union_dev_error.log error;
        access_log /www/html/union_dev/union_dev_access.log main;
}
```


## 问题汇总

### nginx: [error] invalid PID number "" in "/run/nginx.pid"

解决方案：

先执行：`nginx -c /etc/nginx/nginx.conf`

再重新热更新配置 `nginx -s reload`




