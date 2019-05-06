<template>
    <div id="hongbao_invalid">
        <template v-if="list && list.length && list.length > 0">
            <section class="list_item" v-for="(i ,idx) in list" :key="idx">
                <div class="l_i_top">
                    <div class="l_i_title">
                        <span>大红包！</span>
                        <span>￥4</span>
                    </div>
                    <div>
                        <span>有效期至2019.05.05</span>
                        <span>满35可用</span>
                    </div>
                </div>
                <div class="l_i_bottom">
                    <div :class="[Math.random() > 0.5 ? 'used' : 'invalid']">限非到店自取订单，下午茶、夜宵、美食、蛋糕、午餐班车、甜点饮品频道使用。限登录和收餐手机号为18855185457使用。</div>
                </div>
            </section>
        </template>
    </div>
</template>
<script>
export default {
    props: ['list'],
    data() {
        return {}
    }
}
</script>
<style lang="scss" scoped>
@import 'src/common/style/mixin.scss';

#hongbao_invalid {
    margin: 15px 8px;
    .list_item {
        margin: 10px 0;
        padding: 20px 10px 10px 10px;
        font-size: 14px;
        color: #999;
        background: #fff;
        border-radius: 10px;
        .l_i_top {
            position: relative;
            margin-bottom: 35px;
            > div {
                @include flexBox(row, space-between);
            }
            .l_i_title {
                margin-bottom: 8px;
                font-size: 20px;
            }
            &::before,
            &::after {
                content: '';
                display: inline-block;
                position: absolute;
                top: 30px;
                width: 10px;
                height: 10px;
                background: #eee;
                border-radius: 100%;
            }
            &::before {
                left: -15px;
            }
            &::after {
                right: -15px;
            }
        }
        .l_i_bottom {
            > div {
                line-height: 1.45;
            }
            > .used {
                background: url('~src/assets/is_used.png') no-repeat;
                background-size: 50px;
                background-position: 100%;
            }
            > .invalid {
                background: url('~src/assets/is_invalid.png') no-repeat;
                background-size: 50px;
                background-position: 100%;
            }
        }
    }
}
</style>
