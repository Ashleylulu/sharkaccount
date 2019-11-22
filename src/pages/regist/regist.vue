<template>
    <div>
        <mt-header title="注册">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    import { Header } from 'mint-ui';
    import { Tabbar, TabItem } from 'mint-ui';
    export default {
        data() {
            return {
                msg: '注册',
            }
        },
        methods:{

        }
    }
</script>

<style scoped>


</style>