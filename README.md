# my-movies

> 一个 Vue.js 练手demo（包括服务端搭建。未完成）

## 进度
移动端适配：进行中（70%）....  
中文乱码问题：解决中...  
其他页面：未进行。

### 访问地址：http://119.29.195.157

## 前端
vue-cli + vue-router + vuex

## 后台
Centos 6 + nginx + node + mysql

#### 数据接口：
- 正在热映 http://api.douban.com/v2/movie/in_theaters
- 即将上映 http://api.douban.com/v2/movie/coming_soon

node 服务器每天会请求一次上述豆瓣的接口，将数据存入本地数据库，并提供服务。
因此前端请求的就是本地 node 服务器。

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
