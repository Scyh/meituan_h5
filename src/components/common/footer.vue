<template>
    <footer class="footer">
        <section>
            <router-link to="/home" tag="div" class="footer-item">
                <i :class="['img_index', selected === 1 ? 'selected' : '']"></i><span>首页</span>
            </router-link>
            <router-link to="/order" tag="div" class="footer-item">
                <i :class="['img_order', selected === 2 ? 'selected' : '']"></i><span>订单</span>
            </router-link>
            <router-link to="/self" tag="div" class="footer-item">
                <i :class="['img_self', selected === 3 ? 'selected' : '']"></i><span>我的</span>
            </router-link>
        </section>
    </footer>
</template>
<script>
export default {
    name: 'common-footer',
    props: {
        selected: Number
    },
    data() {
        return {}
    },
    created() {},
    methods: {},
}
</script>
<style lang="scss" scoped>
@import 'src/common/style/mixin.scss';

.footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fafafa;
    z-index: 110;
    > section {
        width: 100%;
        @include flexBox(row, space-around, align);
        .footer-item {
            @include flexBox(column);
            height: 50px;
            > i {}
            > span {
                font-size: 12px;
                transform: scale(0.9);
                color: #999;
            }
        }
    }
}
</style>
