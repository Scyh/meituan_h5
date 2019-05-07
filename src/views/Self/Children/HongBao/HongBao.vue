<template>
    <div id="self_hongbao">
        <header>
            <i @click="go_back" class="iconfont iconarrowdown"></i>
            <p>美团红包</p>
        </header>

        <template v-if="invalid_hongbao_list.length <= 0">
             <!-- 使用兑换码兑换红包 -->
            <section class="conver_hongbao">
                <span class="conver_meta">使用兑换码</span>
                <span class="conver_tip" @click="conver_hongbao">添加红包<i class="iconfont iconarrowdown"></i></span>
            </section>
            <!-- 兑换红包确认框 -->
            <cconfirm ref="confirm">
                <p class="text-c confirm_title">添加红包</p>
                <div class="confirm_input">
                    <input type="text" placeholder="请输入兑换码">
                </div>
                <p class="text-l font-s">英文字母区分大小写</p>
            </cconfirm>

            <section class="none_hongbao" v-if="hongbao_list.length <= 0">
                <div></div>
                <p>暂无红包</p>
            </section>

            <section class="invalid_hongbao">
                <span>没有更多有效红包了</span>
                <span @click="get_invalid_hongbao">查看失效红包</span>
            </section>
        </template>

        <template v-else>
            <invalid :list="invalid_hongbao_list"></invalid>
        </template>
        
    </div>
</template>
<script>
import invalid from '@/views/Self/Children/HongBao/Children/Invalid';
export default {
    data() {
        return {
            hongbao_list: [],
            invalid_hongbao_list: [],   //  失效红包
        }
    },
    methods: {
        // 兑换红包
        conver_hongbao() {
            this.$refs.confirm.show();
        },

        go_back() {
            if (this.invalid_hongbao_list.length > 0) {
                this.invalid_hongbao_list = [];
            } else {
                this.$router.go(-1);
            }
        },

        get_invalid_hongbao() {
            this.invalid_hongbao_list = [1,1,1,1,1,1]
        }
    },
    components: { invalid, },
}
</script>
<style lang="scss" scoped>
@import 'src/common/style/mixin.scss';
#self_hongbao {
    height: 100vh;
    background: #eee;
    header {
        position: relative;
        font-size: 14px;
        line-height: 40px;
        background: #000;
        p {
            color: #fff;
            text-align: center;
        }
        .iconfont {
            position: absolute;
            top: 0;
            left: 0;
            width: 40px;
            height: 40px;
            text-align: center;
            transform: rotate(90deg);
            color: #eee;
        }
    }

    .conver_hongbao {
        font-size: 13px;
        background: #fff8e9;
        line-height: 30px;
        .conver_meta {
            display: inline-block;
            margin: 0 5px 0 15px;
            color: #666;
        }
        .conver_tip {
            color: #466899;
            i {
                display: inline-block;
                transform: rotate(-90deg);
                font-size: 14px!important;
            }
        }
    }

    .none_hongbao {
        margin-top: 80px;
        > div {
            width: 100px;
            height: 100px;
            margin: 0 auto;
            background: url('~src/assets/none_hongbao.png') no-repeat;
            background-size: cover;
        }
        > p {
            font-size: 14px;
            text-align: center;
            color: #9a9a9a;
        }
    }
    .invalid_hongbao {
        margin-top: 10px;
        font-size: 14px;
        text-align: center;
        span:first-child {
            color: #9a9a9a;
        }
        span:last-child {
            color: #466899;
            &::before {
                content: '';
                display: inline-block;
                width: 1px;
                height: 14px;
                margin: 0 15px 0 10px;
                vertical-align: middle;
                background: #9a9a9a;
            }
        }
    }
}
.confirm_title {
    font-weight: 600;
}
.confirm_input {
    margin: 15px 0 10px 0; 
    padding: 4px 8px;
    border: 1px solid #ccc;
    input {
        width: 100%;
        border: none;
        outline: none;
    }
}
</style>