<template>
    <div id="app">
        <transition name="slide" mode="out-in">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
        </transition>
        <transition name="slide" mode="out-in">
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </transition>
    </div>
</template>
<script>
import { Store } from '@/common/javascript/util.js'
export default {
    name: "app",
    created() {
        let that = this;
        window.addEventListener('beforeunload', function() {
            Store.set('__state', that.$store.state)
        })
    }
};
</script>

<style lang="scss">
@import url('./common/style/iconfont.css');

.slide-enter-active,
.slide-leave-active {
    transition: all .4s;
}
.slide-leave-active {
    // position: absolute;
}
.slide-enter,
.slide-leave-to {
    // transform: translateX(50vw);
    opacity: 0;
}
::-webkit-scrollbar {
    width: 0 !important;
}
</style>
