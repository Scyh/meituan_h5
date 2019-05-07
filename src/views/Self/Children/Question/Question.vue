<template>
    <div id="self_question">
        <header>
            <i @click="go_back" class="iconfont iconarrowdown"></i>
            <p>常见问题</p>
        </header>

        <main>
            <template v-if="question_list.length > 0">
                <div class="question_item_panel" v-for="(i, idx) in question_list" :key="idx">
                    <div class="q_i_panel_title" @click="toggle_panel(idx)">
                        <span><i :class="['iconfont', i.title_icon]"></i>{{i.title}}</span>
                        <i :class="['iconfont', 'iconmore', i.content_show ? 'show' : ''] "></i>
                    </div>
                    <div class="q_i_panel_content" v-show="i.content_show">
                        <template v-if="i.content.length > 0">
                            <section v-for="(item, index) in i.content" :key="index">
                                <div class="q_i_question">Q：{{item.q}}</div>
                                <div class="q_i_answer" v-html="item.a"></div>
                            </section>
                        </template>
                    </div>
                </div>
            </template>
        </main>
    </div>
</template>
<script>
export default {
    data() {
        return {
            question_list: [
                {
                    title: '支付问题',
                    title_icon: 'iconzhifufangshi',
                    content_show: false,
                    content: [
                        {
                            q: '为什么提示我“账户存在异常，无法下单”？',
                            a: '包含（但不仅限于）以下行为者，系统将自动予以封禁（客服无权解封）：<br>i）有过虚假交易（编造不存在真实买卖的订单）；<br>ii）有过恶意下单行为；'
                        },
                        {
                            q: '在线支付取消订单后钱怎么返还？',
                            a: '订单取消后，款项会在一个工作日内，直接返还到您的美团账户余额。'
                        },
                        {
                            q: '怎么查看退款是否成功？',
                            a: '退款会在一个工作日之内到美团账户余额，可在“账号管理——我的账号”中查看是否到账。'
                        }
                    ]
                },
                {
                    title: '订单问题',
                    title_icon: 'iconwenti',
                    content_show: false,
                    content: [
                        {
                            q: '如何取消订单?',
                            a: '如果商家尚未接单，您可以在订单详情页通过“取消订单”功能进行取消;如果商家已接单，则需要您电话联系后由商家取消订单。'
                        },
                        {
                            q: '我的订单为什么被取消了？',
                            a: '如果商家5分钟（部分品牌商家8分钟）未接您的订单，为了保障您的权益，系统将会为您自动取消订单；商家接单后可能由于无法联系到您、菜品售完等原因无法配送，因而取消了您的订单，具体原因可查看系统发送的短信或通知。'
                        },
                        {
                            q: '如何进行催单？',
                            a: '您可以在订单状态页面点击“电话催单”按钮向商家催单。'
                        },
                        {
                            q: '刚下单发现信息填错了怎么办？',
                            a: '如果商家尚未接单，您可以自主取消订单；如果商家已经接单，您可以电话联系商家后由对方取消订单。然后重新下一单。'
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        toggle_panel(idx) {
            this.question_list[idx].content_show = !this.question_list[idx].content_show;
        },

        go_back() {
            this.$router.push('/self')
        }
    }
}
</script>
<style lang="scss" scoped>
@import 'src/common/style/mixin.scss';

#self_question {
    header {
        position: relative;
        font-size: 14px;
        line-height: 50px;
        text-align: center;
        border-bottom: 1px solid #ccc;
        p {
            font-weight: 600;
        }
        .iconfont {
            position: absolute;
            top: 0;
            left: 0;
            width: 50px;
            height: 50px;
            text-align: center;
            transform: rotate(90deg);
        }
    }

    .question_item_panel {
        
        .q_i_panel_title {
            @include flexBox(row, space-between);
            padding: 0 15px;
            font-size: 14px;
            line-height: 50px;
            border-bottom: 1px solid #ccc;
            > i {
                transition: transform .2s linear;
            }
            > i.show {
                transform: rotate(180deg)
            }
            > span {
                @include flexBox(row, space-between);
                i {
                    margin-right: 5px;
                    color: #999;
                }
            }
        }
        .q_i_panel_content {
            padding: 15px;
            background: #eee;
            > section {
                margin-bottom: 15px;
                padding-bottom: 15px;
                border-bottom: 1px solid #dddddd;
                .q_i_question {
                    margin-bottom: 15px;
                    font-size: 15px;
                }
                .q_i_answer {
                    font-size: 12px;
                    color: #888;
                    line-height: 1.4;
                }
            }
        }
    }
}
</style>

