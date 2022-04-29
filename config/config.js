const os = require('os');
///获取本机ip///
function getIPAdress() {
  var interfaces = os.networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}
const myHost = getIPAdress();
const localConfig = {
  basename: 'admin-common',
  username: 'root',
  password: '123456',
  host: 'localhost'
}

//这里填写上你服务器上数据库的账号密码
const serverConfig = {
  basename: 'admin-common',
  username: '', //这里部署上服务器的时候需要更改 -->数据库账号
  password: '', //这里部署上服务器的时候需要更改 -->数据库密码
  host: 'localhost' //如果是服务器本地数据库就是这个，否则请换成云数据库ip
}

//1、这里请在服务器上执行上面的getIPAdress()方法，
//2、得到服务器ip后，修改serverIp为你服务器本地的ip
const serverIp = '123456' //这里部署上服务器的时候需要更改 -->服务器本地ip
module.exports = myHost === serverIp ? serverConfig : localConfig