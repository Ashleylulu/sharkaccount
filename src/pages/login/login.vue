<template>
  <div>
    <h1>{{msg}}</h1>
    <form>
      <div class="int-par">
        <span>用户名:</span>
        <input type="text" name="name" v-model="user" class="int">
      </div>
      <div class="int-par">
        <span>年龄:</span>
        <input type="text" name="age" v-model="age" class="int">
      </div>
      <div class="int-par">
        <a href="javascript:;" @click="addUser">提交</a>
      </div>
    </form>
  </div>
</template>
<script>
  import {Toast} from 'mint-ui'
  export default {
    name:'login',
    data () {
      return {
        msg:'登录',
        user:'',
        age:''
      }
    },
    methods:{
      addUser(){
        let name = this.user;
        let age = this.age;
        this.axios.post('/api/user/addUser',{
          name:name,
          age:age
        }).then((res) => {
          console.log(res);
          Toast({
            message: '提交成功!',
            position: 'middle',
            duration: 2000
          });
        })
      }
    }
  }
</script>
<style scoped>
  .int{
    border: 1px solid #ddd;
    width: 200px;
    outline: none;
    height: 20px;
    padding-left: 10px;
  }
  .int-par{
    margin-bottom: 10px;
  }
  .int-par span{
    display: inline-block;
    min-width: 80px;
  }
  .int-par a{
    display:inline-block;
    width: 100px;
    text-align:center;
    background: #ccc;
    color: #fff;
    height: 30px;
    line-height:30px;
    outline: none;
    border: none;
    cursor: pointer;
    text-decoration:none;
  }
</style>
