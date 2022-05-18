const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const jwt = require('koa-jwt')
const logger = require('koa-logger')
const cors = require('koa-cors');
const Routers = require('./routes/index')
const secret = require('./config/secret')
const JWTToken = require('./middleware/JWTToken')

// error handler
onerror(app)

app.use(JWTToken())
app.use(cors({
  // 任何地址都可以访问
  origin:"*",
  // 指定地址才可以访问
  // origin: 'http://localhost:8080',
  maxAge: 2592000,
  // 必要配置
  credentials: true
}));

// 此接口列表，过滤不用jwt验证
app.use(jwt({ secret: secret.sign }).unless({
  path: [
    /^\/api\/v1\/user\/login/,
    // 测试的时候用以下一行代码 不进行token校验
    // /^\/api\/v1/
  ]
}))

app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(Routers.routes(), Routers.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});
module.exports = app
