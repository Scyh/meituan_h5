<template>
    <div id="self">
        <section class="self_top">
            <div class="self_profile"></div>
            <p>xxxxxxxxxxxx</p>
        </section>
        <section class="self_middle">
            <router-link to="/self/hongbao" tag="div" class="s_m_item">
                <div><i class="iconfont iconhongbao"></i>美团红包</div>
                <span class="img_right_arrow"></span>
            </router-link>
            <router-link to="/self/addr" tag="div" class="s_m_item">
                <div><i class="iconfont iconlocation"></i>收货地址</div>
                <span class="img_right_arrow"></span>
            </router-link>
            <router-link to="/self/question" tag="div" class="s_m_item">
                <div><i class="iconfont iconwenti"></i>常见问题</div>
                <span class="img_right_arrow"></span>
            </router-link>
            <router-link to="/agreement" tag="div" class="s_m_item">
                <div><i class="iconfont iconxieyixiangqing"></i>美团协议与说明</div>
                <span class="img_right_arrow"></span>
            </router-link>
            <div class="s_m_item" @click="logout">
                <div><i class="iconfont iconweb-icon-"></i>退出登录</div>
                <span class="img_right_arrow"></span>
            </div>
        </section>
        <section class="self_bottom">
            <div class="s_b_top">客服电话: 10109777</div>
            <div class="s_b_bottom">服务时间: 9:00-23:00</div>
        </section>
        <cconfirm ref="confirm" @confirm="logout_handle">确定要退出登录嘛？</cconfirm>
    </div>        
</template>
<script>
export default {
    data() {
        return {}
    },
    methods: {
        logout() {
            this.$refs.confirm.show();
        },

        logout_handle() {
            this.$store.commit('set_user_info', null);
            this.$router.replace('/home')
        }
    }
}
</script>
<style lang="scss" scoped>
@import 'src/common/style/mixin.scss';

#self {
    height: 100vh;
    background: rgb(240, 240, 240);
    .self_top {
        width: 100%;
        padding: 35px 0 15px;
        background: url('~src/assets/bg_self.png') no-repeat;
        background-size: 100% 100%;
        
        .self_profile {
            width: 80px;
            height: 80px;
            margin: 0 auto;
            border: 4px solid #ffe699;
            border-radius: 100%;
            background: url('~src/assets/self.png') no-repeat;
        }
        p {
            margin-top: 8px;
            font-size: 16px;
            text-align: center;
        }
    }
    .self_middle {
        padding-left: 15px;
        background: #fff;
        .s_m_item {
            @include flexBox(row, space-between);
            padding: 10px 0;
            border-bottom: 1px solid #e3e3e3;
            div {
                font-size: 14px;
                .iconfont {
                    display: inline-block;
                    margin-right: 10px;
                    color: #ccc;
                    vertical-align: middle;
                }
            }
            span {
                width: 15px;
                height: 15px;
            }
        }
        .s_m_item:last-child {
            border-bottom: none;
        }
    }
    .self_bottom {
        margin-top: 20px;
        text-align: center;
        .s_b_top {
            padding: 10px 0;
            font-size: 14px;
            color: #ffb000;
            background: #fff;
        }
        .s_b_bottom {
            margin-top: 10px;
            font-size: 12px;
            color: #999;
        }
        
        
        
    }
}
</style>

