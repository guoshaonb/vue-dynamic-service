var redis = require('redis');
var conf = {
  redis_port: 6379,
  redis_hostname: 'localhost'
}

const _createClient = () => {
  // 如果使用
  // redis.createClient();
  // 表示默认配置 localhost:6379
  const client = redis.createClient(conf.redis_port, conf.redis_hostname);
  //记录redis错误
  client.on("error", function (err) {
    console.log("redis error: " + err);
  });
  return client;
};
const redisClient = _createClient();

async function setItem(key, value, exprires) {
  redisClient.set(key, value);
  //设置过期 单位：秒
  if (exprires) {
    redisClient.expire(key, exprires);
  }
}

async function getItem(key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
      }
      resolve(val);
    })
  })
}

module.exports = {
  redisClient,
  setItem,
  getItem
};
