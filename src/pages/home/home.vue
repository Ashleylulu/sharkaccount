<template>
  <div>
    <h1>{{msg}}</h1>
    <form action="">
      <input type="text" name="name" v-model="user" class="int" placeholder="姓名">
      <input type="text" name="age" v-model="age" class="int" placeholder="年龄">
      <br>
      <a href="javascript:;" name="age" v-model="age" @click="add">提交</a>
    </form>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        msg: '首页',
        user:'',
        age:''
      }
    },
    methods:{
        add(){
            let data = {
                name:this.user,
                age:this.age
            }
            config.request('post','/api/user/addUser',data).then(res => {
                if (res.data.code == config.successCode) {
                    var data = res.data;
                    console.log(data.entity)
                }
            }).catch(err => {
                console.log(err)
            })
        },
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
    margin-bottom: 10px;
  }
</style>
