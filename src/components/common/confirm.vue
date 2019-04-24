<template>
<transition name="scale" key="main">
    <div id="common_confirm" v-show="show" >
        
            <div class="confirm_box">
                <div class="confirm_body">{{message}}</div>
                <div class="confirm_footer">
                    <div @click="cancel" class="confirm_cancel">{{cancel_msg}}</div>
                    <div @click="confirm" class="confirm_confirm">{{confirm_msg}}</div>
                </div>
            </div>
        
        <!-- <transition name="scale" key="mask">
            <div class="confirm_mask" v-show="show"></div>
        </transition> -->
    </div>
    </transition>
</template>
<script>
export default {
    name: 'common_confirm',
    props: {
        message: {
            type: String,
            default: '确认进行当前操作？'
        },
        cancel_msg: {
            type: String,
            default: '取消'
        },
        confirm_msg: {
            type: String,
            default: '确认'
        },
    },
    data() {
        return {
            show: false,
        }
    },
    methods: {
        cancel() {
            this.$emit('cancle');
            this.show = false;
        },
        confirm() {
            this.$emit('confirm');
            this.show = false;
        },
    }
}
</script>
<style lang="scss" scoped>
.scale-enter-active,
.scale-leave-active {
    transition: all .4s;
}
.scale-leave-active {
    position: absolute;
}
.scale-enter,
.scale-leave-to {
    transform: scale(0.3);
}
#common_confirm {
    .confirm_box {
        position: absolute;
        top: 10vh;
        left: 50%;
        transform: translateX(-50%);
        z-index: 102;
        width: 300px;
        background: #fff;
        border-radius: 10px;
        .confirm_body {
            padding: 25px;
            text-align: center;
            font-size: 15px;
        }
        .confirm_footer {
            display: flex;
            justify-content: space-around;
            align-items: center;
            flex-wrap: nowrap;
            border-top: 1px solid #e7e7e7;
            > .confirm_cancel {
                flex: 1;
                font-size: 15px;
                line-height: 44px;
                text-align: center;
                border-right: 1px solid #e7e7e7;
            }
            > .confirm_confirm {
                flex: 1;
                font-size: 15px;
                line-height: 44px;
                text-align: center;
                color: #ffaf00;
            }
        }
    }
    .confirm_mask {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 100;
        background: rgba(0, 0, 0, .4);
    }
}
</style>

