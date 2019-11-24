<template>
    <div>
        <mt-header title="注册" class="head-tit">
            <router-link to="/" slot="left">
                <mt-button icon="back" class="head-back">返回</mt-button>
            </router-link>
        </mt-header>
        <div class="reg-con">
            <p class="phone-p">
                <label for="">手机号</label>
                <input type="text"  v-model="phone" disabled  maxlength="13" class="phone-int">
            </p>
            <p class="phone-p">
                <label for="">验证码</label>
                <input type="text" placeholder="输入验证码" v-model="code" maxlength="6" class="code-int">
                <button class="code-btn" :disabled="isClick" @click="codeClick">{{codeMsg}}</button>
            </p>
            <p>
                <button class="phone-btn" :class="{bg:isActive}" :disabled="isClick" @click="registNext">下一步</button>
            </p>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    import {MessageBox} from 'mint-ui';
    export default {
        data(){
            return{
                codeMsg:'60s重新获取',
                phone:this.$route.query.phone,
                isActive:false,
                code:'',//验证码
                num:60,//倒计时
                isClick:true,//按钮是否可以点击
            }
        },
        created(){
            this.timeDown();//倒计时
        },
        methods:{
            //点击获取研验证码
            codeClick() {
               this.isClick = true;
               this.codePost();//发送验证码请求
            },
            //倒计时
            timeDown(){
                var timer = setInterval(()=>{
                    if (this.num == 0) {
                        this.num = 60;
                        this.codeMsg = '重新获取';
                        this.isClick = false;
                        clearInterval(timer)
                        return false
                    }
                    this.num--;
                    this.codeMsg = this.num + 's重新获取';
                },1000)
            },
            //获取验证码接口
            codePost(){
                var val = this.phone.split('-');
                var str = '';
                val.forEach((item) => {
                    str += item;
                })
                var params = {
                    phone:str
                }
                config.request('post','/api/user/code',params).then((res) => {
                    var data = res.data;
                    if (data.code == '000') {
                        this.timeDown();//倒计时
                    }
                }).catch((err) => {
                    Toast({
                        message: '网络出错了哦！(；′⌒`)',
                        position: 'middle',
                        duration: 1500
                    });
                })
            },

            //发送请求
            registNext(){
                var val = this.phone.split('-');
                var str = '';
                val.forEach((item) => {str += item})
                var params = {
                    phone:str
                }
                config.request('post','/api/user/phoneCode',params).then(res => {
                    var data = res.data;
                    if (data.code == '000') {
                        console.log(data.entity)
                    } else {
                        Toast({
                            message: '验证码错误',
                            position: 'middle',
                            duration: 1500
                        });
                    }
                }).catch(err => {
                    Toast({
                        message: '网络出错了哦！(；′⌒`)',
                        position: 'middle',
                        duration: 1500
                    });
                })
            }
        },
        watch:{
            //判断验证码的长度变化
           code(newValue,oldValue) {
                if (newValue.length > oldValue.length) {
                    if (newValue.length === 6) {
                        this.isActive = true;
                        this.isClick = false;
                    }
                } else {
                    this.isActive = false;
                    this.isClick = true;
                }
           }
        }

    }
</script>

<style scoped>
    .reg-con {
        width: 80%;
        margin: 0 auto;
        margin-top: 3rem;
        font-size: 1rem;
        color: #000;
        font-weight: bold;
    }
    .head-tit{
        font-size: 1rem !important;
    }
    .head-back{
        font-size: 0.8rem !important;
    }
    .reg-con .phone-p {
        padding-bottom: .5rem;
        border-bottom: 2px solid #eee;
        font-size: .8rem;
        overflow: hidden;
        height: 2rem;
        line-height: 2rem;
        margin-bottom: 1rem;
    }

    .phone-p label {
        color: #000;
        float: left;
        text-align: left;
    }
    .phone-p input{
        height: 100%;
        border: none;
        color: #ddd;
        float: left;
        margin-left: 1rem;
        background: #fff;
    }
    .phone-int {
        font-size: 1.2rem !important;
    }

    input::-webkit-input-placeholder {
        color: #ddd;
    }
    .phone-btn {
        outline: none;
        border: none;
        display: block;
        width: 100%;
        background: #eee;
        color: #bbb;
        margin-top: 2.5rem;
        height: 3rem;
        -webkit-border-radius: .7rem .7rem;
        -moz-border-radius: .7rem .7rem;
        border-radius: .7rem .7rem;
        cursor: pointer;
    }
    .bg{
        background:#F9D34C !important;
        color: #000;
    }
    .code-int{
        color: #000 !important;
        width: 8rem;
        font-size: .8rem !important;
    }
    .code-btn{
        outline: none;
        border: none;
        background: #fff;
        padding-left: 1rem;
        border-left: 1px solid #ddd;
    }
</style>