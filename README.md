<div align="center"> <a href="https://github.com/guoshaonb/vue-dynamic-service"> <img alt="VbenAdmin Logo" width="100" height="100" src="http://106.55.240.242/my-file-path/images/admin-pwa-middle.png"></a>
<h1>vue-dynamic-service 管理员</h1>
</div>

## 简介

vue-dynamic-service 使用了`koa2`,`sequelize`等技术栈进行开发，代码清晰易读，开箱即用。

## 演示视频

<div style="padding:20px 0">
  <a href="http://106.55.240.242/my-file-path/video/demonstration.mp4">点我查看演示视频！！</a>
  <!-- <video src='http://106.55.240.242/my-file-path/video/demonstration.mp4' autoplay muted></video> -->
</div>

## 特性

- **最新技术栈**：使用 koa2/sequelize 等技术开发
- **简单易学**: 只需要你会前端，并了解koa和sequelize的基础后，即可上手
- **curd很棒**: 不需要你会sql，在项目中添加新模块只需要仿照现有代码即可

## 项目地址

- [vue-dynamic-admin](https://github.com/guoshaonb/vue-dynamic-admin) - 前端代码
- [vue-dynamic-service](https://github.com/guoshaonb/vue-dynamic-service) - 后端代码

## 准备

- [node](http://nodejs.org/) 和 [git](https://git-scm.com/) -项目开发环境
- [koa2](https://koa.bootcss.com/) - 熟悉 koa 基础语法
- [sequelize](https://www.sequelize.com.cn/) - 熟悉 sequelize 基础语法

## 安装使用

- 获取项目代码

```bash
git clone https://github.com/guoshaonb/vue-dynamic-service.git
```

- 安装依赖

```bash
cd vue-dynamic-service

cnpm install

```

- 运行

```bash
cnpm start
```

- 数据库添加数据

```bash
1、找到admin-common里面的user表的user表
2、添加一行数据--》
  username：test
  password：$2a$10$l/Dt7.UITCoMaQNHCu71COijw.Hl18OEw3jTf00Y8PQVz1FnLPUZ.（最后一个“.”别忘记复制）
  email：123456@qq.com
  role_id：0
3、保存数据后，下次即可在后台系统那里通过test,123456进行登录
```