<template>
    <transition-group name="scale">
        <div id="common_confirm" v-show="show_box" key="1">
            <div class="confirm_box">
                <div class="confirm_body">{{message}}</div>
                <div class="confirm_footer">
                    <div @click="cancel" class="confirm_cancel">{{cancel_msg}}</div>
                    <div @click="confirm" class="confirm_confirm">{{confirm_msg}}</div>
                </div>
            </div>
        </div>
        <div class="confirm_mask" key="2" v-show="show_mask" @touchmove.prevent></div>
    </transition-group>
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
            show_box: false,
            show_mask: false,
            confirm_data: null,
        }
    },
    methods: {
        show(data) {
            this.show_box = true;
            this.show_mask = true;
            this.confirm_data = data;
        },
        cancel() {
            this.$emit('cancle');
            this.show_box = false;
            this.show_mask = false;
        },
        confirm() {
            this.$emit('confirm', this.confirm_data);
            this.show_box = false;
            this.show_mask = false;
        },
    }
}
</script>
<style lang="scss" scoped>
.scale-enter-active,
.scale-leave-active {
    transition: all .2s;
}
.scale-leave-active.confirm_mask {
    transition-delay: .2s;
    transition: all .1s;
}
.scale-leave-active {
    position: absolute;
}
.scale-enter#common_confirm,
.scale-leave-to#common_confirm {
    transform: scale(0.3);
    opacity: 0.3;
}

.scale-leave-to.confirm_mask {
    transform: scale(0);
    opacity: 0;
}
#common_confirm {
    position: fixed;
    top: 15vh;
    left: calc(50% - 150px);
    z-index: 102;
    width: 300px;
    background: #fff;
    border-radius: 10px;
    .confirm_box {
        
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
</style>

