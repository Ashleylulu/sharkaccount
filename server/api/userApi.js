var models = require('../db');//引入数据库
var express = require('express');//引入express框架
var router = express.Router();//创建路由
var mysql = require('mysql');
var $sql = require('../sqlMap');

//连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();

//增加用户的接口
router.post('/addUser',(req,res) => {
  let sql = $sql.user.add;
  let params = req.body;
  console.log(params);
  conn.query(sql,[params.name,params.age],(err,result) => {
    if (err) {
      console.log('添加失败' + err)
    }
    if (result) {
      jsonWrite(res,result)
    }
  })

  var jsonWrite = (res,ret) => {
    if (typeof ret === 'undefined') {
      res.json({
        code:'300',
        msg:'操作失败'
      })
    } else {
      res.json({ret})
    }
  }
})

module.exports = router;

