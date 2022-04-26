let http = require("http");

function format(json) {
  let data = JSON.parse(json)
  return data?.translation?.[0]
}

exports.translate = function (query) {
  return new Promise((reslove, reject) => {
    try {
      query = encodeURI(query)
      //发送翻译请求
      // 1.用于请求的选项
      let options = {
        host: "fanyi.youdao.com",
        port: "80",
        path:
          "/openapi.do?keyfrom=translation-tool&key=1730699468&type=data&doctype=json&version=1.1&q=" +
          query,
      };
      // let options = ` http://aidemo.youdao.com/trans?q=${query}&&from=Auto&&to=Auto`;
      // 处理响应的回调函数
      let callback = function (response) {
        // 不断更新数据
        response.on("data", function (data) {
          //对返回的数据进行格式化和高亮
          reslove(format(data))
        });
        response.on("end", function () {
          // 数据接收完成
        });
      };
      // 向服务端发送请求
      let req = http.request(options, callback);
      req.end();
    } catch (err) {
      reject(err)
    }
  })
}
