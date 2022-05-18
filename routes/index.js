const Router = require('koa-router')
const User = require('../controllers/User')
const Menu = require('../controllers/Menu')
const Generalconfig = require('../controllers/Generalconfig')
const Configclassify = require('../controllers/Configclassify')
const Generaldata = require('../controllers/Generaldata')
const UploadToken = require('../controllers/UploadToken')

const Routers = new Router({
  prefix: '/api/v1'
})

/**
 * 上传token
 */
Routers.get('/upload/token', UploadToken.token)

/**
 * 用户接口
 */
// 获取用户列表
Routers.get('/user/list', User.list);
// 获取用户详情
Routers.get('/user/detail/:id', User.detail);
// 获取用户信息
Routers.get('/user/info', User.info);
// 用户注册
Routers.post('/user/register', User.create);
// 用户登录
Routers.post('/user/login', User.login);
// 更新用户
Routers.put('/user/update/:id', User.update);
// 修改用户密码
Routers.put('/user/updpass', User.updpass);
// 删除用户
Routers.delete('/user/hidden/:id', User.hidden);

/**
 * 菜单接口
 */
// 获取菜单列表
Routers.get('/menu/list', Menu.list);
// 创建菜单
Routers.post('/menu/create', Menu.create);
// 获取菜单详情
Routers.get('/menu/detail/:id', Menu.detail);
// 更新菜单
Routers.put('/menu/update/:id', Menu.update);
// 删除菜单
Routers.delete('/menu/hidden/:id', Menu.hidden);

/**
 * 公用配置接口
 */
// 获取公用配置列表
Routers.get('/generalconfig/list', Generalconfig.list);
// 获取公用配置详情
Routers.get('/generalconfig/detail/:id', Generalconfig.detail);
// 创建公用配置
Routers.post('/generalconfig/create', Generalconfig.create);
// 更新公用配置
Routers.put('/generalconfig/update/:id', Generalconfig.update);
// 删除公用配置
Routers.delete('/generalconfig/hidden/:id', Generalconfig.hidden);
// 根据内容翻译
Routers.get('/generalconfig/translate', Generalconfig.translate);

/**
 * 公用配置分类接口
 */
// 获取公用配置分类列表
Routers.get('/configclassify/list', Configclassify.list);
// 获取公用配置分类详情
Routers.get('/configclassify/detail/:id', Configclassify.detail);
// 创建公用分类配置
Routers.post('/configclassify/create', Configclassify.create);
// 更新公用分类配置
Routers.put('/configclassify/update/:id', Configclassify.update);
// 删除公用分类配置
Routers.delete('/configclassify/hidden/:id', Configclassify.hidden);

/**
 * 公用数据接口
 */
// 获取公用数据列表
Routers.get('/generaldata/list', Generaldata.list);
// 获取公用真实数据
Routers.get('/generaldata/real', Generaldata.real);
// 获取公用数据详情
Routers.get('/generaldata/detail/:id', Generaldata.detail);
// 创建公用数据
Routers.post('/generaldata/create', Generaldata.create);
// 更新公用数据
Routers.put('/generaldata/update/:id', Generaldata.update);
// 删除公用数据
Routers.delete('/generaldata/hidden/:id', Generaldata.hidden);
// 批量删除公用数据
Routers.delete('/generaldata/hiddens', Generaldata.hiddens);

module.exports = Routers
