/*
* 配置的后端端口及api路由
* */
//exports 和 module.exports 的使用
//如果要对外暴露属性或方法，就用 exports 就行，要暴露对象(类似class，包含了很多属性和方法)，就用 module.exports。
const userApi = require('./api/userApi');//引入当前目录下的js文件,默认以.js结尾
const fs = require('fs');//引入文件系统模块,读取文件函数有异步的 fs.readFile() 和 同步的fs.readFileSync() , 一般常用异步读取,性能高,速度快,没有阻塞
const path = require('path');//提供处理和转换文件路径的工具
const bodyParser = require('body-parser');//node.js 中间件，用于处理 JSON, Raw, Text 和 URL 编码的数据。需要与express一起安装
const express = require('express');
const app = express();

const jwt  = require('jsonwebtoken');
let payload = {name:'lulu',uid:''};
let secret = 'jam';//密钥
let token = jwt.sign(payload,secret, {
    expiresIn: 60*60*1
});
console.log(token)



//<<body-parser模块的API>>
//当请求体解析之后，解析值会被放到req.body属性中，当内容为空时候，为一个空对象{}
//---bodyParser.json()--解析JSON格式
//---bodyParser.raw()--解析二进制格式
//---bodyParser.text()--解析文本格式
//---bodyParser.urlencoded()--解析utf-8编码的数据


//创建application/x-www-form-urlencoded
//extended - 当设置为false时，会使用querystring库解析URL编码的数据；
//extended - 当设置为true时，会使用qs库解析URL编码的数据。
//extended - 后没有指定编码时，使用此编码。默认为true.
app.use(bodyParser.urlencoded({extended:true}));
//创建application/json 解析
//请求体解析后，解析值都会被放到req.body属性，内容为空时是一个{}空对象。
app.use(bodyParser.json());
//以上使用express 中间键需要写在路由前面

//api路由
app.use('/api/user',userApi);

//监听端口
app.listen(3000);
console.log('success listen at port 3000....');

