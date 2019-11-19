<template>
  <div>
    <h1>{{msg}}</h1>
    <form action="">
      <input type="text" name="name" v-model="user" class="int">
      <a href="javascript:;" name="age" v-model="age" @click="add">提交</a>
    </form>
  </div>
</template>
<script>
  export default {
    name: 'home',
    data () {
      return {
        msg: '首页',
        user:'',
        age:''
      }
    },
    methods:{
        add(){
          this.$axios.post('/api/user/addUser',{
              name:this.user,
              age:this.age
          }).then(res => {
              console.log(res)
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
  }
</style>
