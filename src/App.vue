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
export default {
    name: "app"
};
</script>

<style>
@import url('./common/style/common.scss');
@import url('./common/style/iconfont.css');

.slide-enter-active,
.slide-leave-active {
    transition: all .4s;
}
.slide-leave-active {
    position: absolute;
}
.slide-enter,
.slide-leave-to {
    /* transform: translateX(50vw); */
    opacity: 0;
}

</style>
