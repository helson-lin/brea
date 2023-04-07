# SSO单点登录

## 同域下的单点登录

前端/后端set-cookie 设置作用域为主域名

## 不同域下单点登录

各平台(www.ac.com/ac.com)统一跳转到授权平台（login.ac.com）,授权平台登录成功之后，重定向到源站并携带code参数，平台拿code换取cookie