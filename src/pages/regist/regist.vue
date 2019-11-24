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
                <input type="text" placeholder="请输入手机号" v-model="phone" maxlength="13" @blur="">
            </p>
            <p>
                <button class="phone-btn" :class="{bg:isActive}" :disabled="isClick" @click="regist">注册</button>
            </p>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    import {MessageBox} from 'mint-ui';

    export default {
        data() {
            return {
                msg: '注册',
                phone: '',
                regPhone:/^1[3456789]\d{9}$/,
                isActive:false,
                isClick:true,//按钮是否可以点击
            }
        },
        methods: {
            //点击注册
            regist(){
                MessageBox.confirm('',{
                    title:'请确认手机号',
                    message:this.phone,
                    confirmButtonText:'确认',
                    cancelButtonText:'取消'
                }).then(action => {
                    if (action == 'confirm') {
                        var val = this.phone.split('-');
                        var str = '';
                        val.forEach((item) => {str += item})
                        if (this.regPhone.test(str) == false) {
                            Toast({
                                message: '请输入正确的手机号！',
                                position: 'middle',
                                duration: 1500
                            });
                            return false
                        }

                        this.regPost(str)
                    }
                }).catch(error =>{
                    if(error == 'cancel'){
                        console.log('点击取消');
                    }
                });

            },
            //发送请求
            regPost(str){
                var params = {
                    phone:str
                }
                config.request('post','/api/user/regist',params).then(res => {
                    var data = res.data;
                    if (data.code == '000') {
                        this.$router.push({path:'/registCode',query:{phone:this.phone}});
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
            // 通过watch来设置分隔符
            phone(newValue, oldValue) {
                if (newValue.length > oldValue.length) { // 文本框中输入
                    if (newValue.length === 3 || newValue.length === 8) {
                        this.phone += '-'
                    }
                    if (newValue.length === 13) {
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
        padding-bottom: 1rem;
        border-bottom: 2px solid #eee;
        font-size: 0.8rem;
        overflow: hidden;
        height: 1rem;
        line-height: 1rem;
    }

    .phone-p label {
        color: #000;
        float: left;
        text-align: left;
    }

    .phone-p input {
        border: none;
        color: #666;
        float: left;
        margin-left: 1.3rem;
        font-size: 1rem;
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
</style>