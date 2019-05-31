<template>
    <div id="app">
        <transition :name="animation">
            <keep-alive>
                <router-view class="router-view" v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
        </transition>
        <transition :name="animation">
            <router-view  class="router-view" v-if="!$route.meta.keepAlive"></router-view>
        </transition>

        <div class="loading" v-show="pageChange">加载中</div>

    </div>
</template>
<script>
import { Store } from '@/common/javascript/util.js'
import { mapGetters } from 'vuex'
export default {
    name: "app",
    data() {
        return {
            animation: '',
        }
    },
    computed: {
        ...mapGetters(['pageChange'])
    },
    created() {
        let that = this;
        window.addEventListener('beforeunload', function() {
            Store.set('__state', that.$store.state)
        })
    },
    watch: {
        '$route'(to, from) {
            let animate = this.$router.animate || to.meta.animate;
            this.animation = animate ?
                                animate === 1 ? 'slide-left' : 
                                animate === 2 ? 'slide-right' :  ""
                            : "";
            this.$router.animate = 0
        }
    }
};
</script>

<style lang="scss">
@import url('./common/style/iconfont.css');
* {
    will-change: right;
}
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
    transition: all .4s cubic-bezier(0.55, 0, 0.1, 1);
    position: absolute;
}
.slide-left-enter,
.slide-right-leave-to {
    opacity: 0;
    transform: translateX(100vw);
}
.slide-left-leave-to,
.slide-right-enter {
    opacity: 0;
    transform: translateX(-100vw);
}

::-webkit-scrollbar {
    width: 0 !important;
}

.loading {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9999;
    background: #ccc;
    display: flex;
    justify-content: center;
}
</style>
