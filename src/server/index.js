//  web.js
//  引入http模块
var http = require('http')
//设置请求监听函数
/**
  *  param req:   请求信息
  *  param res:   响应信息
  */
var requestHandler = function (req, res) {
            res.end('hello2');
    }
//创建服务器
var web = http.createServer(requestHandler)
//设置监听端口号
web.listen(7878)
console.log('http running on http://localhost:7878')