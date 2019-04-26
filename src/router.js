import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',  // 首页
            name: 'home',
            component: () => import(/* webpackChunkName: "home" */ '@/views/Home/Home.vue')
        },
        {
            path: '/search',    // 搜索页
            name: 'search',
            component: () => import(/* webpackChunkName: "search" */ '@/views/Search/Search.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import(/* webpackChunkName: "login" */ '@/views/Login/Login'),
        },
        {
            path: '/order',
            name: 'order',
            component: () => import(/* webpackChunkName: "order" */ '@/views/Order/Order'),
            meta: { login: true }
        },
        {
            path: '/self',
            name: 'self',
            component: () => import(/* webpackChunkName: "self" */ '@/views/Self/Self'),
            meta: { login: true },
        },
        {
            path: '/agreement',
            name: 'agreement',
            component: () => import(/* webpackChunkName: "agreement" */ '@/views/Agreement/Agreement')
        },
        {
            path: '/location',
            name: 'location',
            component: () => import(/* webpackChunkName: "location" */ '@/views/Location/Location')
        }
    ]
});

// 登录拦截
router.beforeEach((to, from, next) => {
    let $store = router && router.app.$store;
    if ($store) {
        if (to.meta.login) {    // 需要验证登录
            $store.commit('set_last_route', to.fullPath);
            if ($store.getters.hasLogin) {  // 已经登录，跳转回页面
                next()
            } else {    // 未登录，跳转登录页面，记录当前路由
                next({ path: '/login' });
            }
        } else {    // 不需要登录，验证是否是登录页面
            if (to.name === 'login' && $store.getters.hasLogin) {
                next({ path: '/home' });
            } else {
                next();
            }
        }
    } else {
        next();
    }
})

export default router