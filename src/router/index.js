import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login/log'
import home from '@/pages/home/home'
import regist from '@/pages/regist/regist'
import registCode from '@/pages/regist/registCode'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: '首页',
            component: home
        },
        {
            path: '/login',
            name: '登录',
            component: login
        },
        {
            path: '/regist',
            name: '注册',
            component: regist
        },
        {
            path: '/registCode',
            name: '注册',
            component: registCode
        },
    ]
})
