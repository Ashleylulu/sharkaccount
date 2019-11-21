var models = require('../db');//引入数据库
var express = require('express');//引入express框架
var router = express.Router();//创建路由
var mysql = require('mysql');
var $sql = require('../sqlMap');
var crypto = require('crypto');//密码加密

//连接数据库
var conn;
function handleDisconnect() {
    conn = mysql.createConnection(models.mysql);
    conn.connect(err => {
        if (err) {
            console.log('connecting to db :' + err)
            setTimeout(handleDisconnect,2000);
        }
    });
}


handleDisconnect();//连接数据库


var jsonWrite = (res,ret) => {
    if (typeof ret === 'undefined') {
        res.json({
            code:'300',
            msg:'操作失败'
        })
    } else {
        var obj = {
            entity:{
                name:ret.name,
                age:ret.age
            },
            code:'000',
            msg:'成功'
        }
        res.json(obj);
    }
}
//增加用户的接口
router.post('/addUser',(req,res) => {
  let sql = $sql.user.add;
  let params = req.body;
  conn.query(sql,[params.name,params.age],(err,result) => {
    if (err) {
      console.log('添加失败' + err)
    }
    if (result) {
        jsonWrite(res,params)
    }
  })
})

module.exports = router;

