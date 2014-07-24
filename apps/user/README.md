# 用户管理

## 结构

- name： 用户名
- password： 密码
- access： 权限（值越高越大）

## 路由

`POST /user`：注册

请求：
    {
        "username": "foo"
        "password": "bar"
    }

回应：

- 201：注册成功
- 400：缺少用户名或密码
- 409：用户名已存在

`GET /user/:name`：获得某用户的名称、权限

请求：

需要用户认证

回应：

- 200：获得成功
- 404：找不到用户

## 中间件

    authorization(minAccess=0)

在需要用户认证的路由之前引入这个中间件，则限定只有minAccess以上的用户才能访问，否则返回401
