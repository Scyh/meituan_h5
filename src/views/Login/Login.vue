<template>
    <div class="login">
        <div class="login_box">
            <div class="login_box_title">
                <img src="//s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:9096d347/7a5ff05b334e0debdd10954a7f5d4789.png">
                <h3>美团外卖</h3>
            </div>
            <div class="login_box_body">
                <section class="login_input" placeholder="请输入手机号">
                    <input type="text" v-model="phone" maxlength="11">
                    <span :class="{ 'enabled': can_get_code }">发送验证码</span>
                </section>
                <section class="login_input">
                    <input type="text" v-model="identify_code" placeholder="请输入短信验证码" maxlength="6">
                </section>
                <section class="login_btn">
                    <div :class="{ 'enabled': can_get_code && can_login }" @click="login">登录</div>
                </section>
            </div>
            <div class="login_box_footer">
                <router-link to="/agreement">查看美团协议与说明</router-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            phone: null,
            identify_code: null,
        }
    },
    computed: {

        // 验证是否输入正确的手机号
        can_get_code() {
            return /^1\d{10}/.test(this.phone);
        },

        // 验证是否输入正确长度的验证码
        can_login() {
            return /[a-zA-Z0-9]{6}/.test(this.identify_code);
        }
    },
    methods: {
        getCode() {},

        login() {
            if (this.phone && this.can_login) {
                this.$store.commit('set_user_info', this.phone);
                this.$router.replace({ path: this.$store.state.last_route || '/home' });
            }
        }
    },
}
</script>
<style lang="scss" scoped>
@import 'src/common/style/mixin.scss';
    .login {
        padding: 0 15px;
        .login_box {
            .login_box_title {
                margin: 62px 0;
                @include flexBox(column, center, center);
                > img {
                    width: 66px;
                    height: 66px;
                }
            }
            .login_box_body {
                .login_input {
                    position: relative;
                    margin-top: 15px;
                    padding-bottom: 15px;
                    border-bottom: 1px solid #e4e4e4;
                    input {
                        width: 100%;
                        border:none;
                        outline: none;
                        font-size: 16px;
                        color: #333;
                    }
                    span {
                        position: absolute;
                        top: 5px;
                        right: 0;
                        padding: 4px 8px;
                        font-size: 14px;
                        color: #999;
                        background: #dcdcdc;
                        border-radius: 4px;
                        text-align: center;
                    }
                    span.enabled {
                        color: $global_color;
                        border: 1px solid $global_color;
                        background: transparent;
                    }
                }
                .login_btn {
                    > div {
                        width: 100%;
                        margin-top: 40px;
                        line-height: 45px;
                        text-align: center;
                        font-size: 18px;
                        color: #999;
                        background: #e5e5e5;
                        border-radius: 6px;
                    }
                    > div.enabled {
                        color: #fff;
                        background: #ffd300
                    }
                }
            }
            .login_box_footer {
                position: fixed;
                bottom: 80px;
                left: 50%;
                transform: translateX(-50%);
                @include flexBox;
                a {
                    color: #999;
                    font-size: 14px;
                    text-decoration: underline;
                }
                
            }
        }
    }
</style>
