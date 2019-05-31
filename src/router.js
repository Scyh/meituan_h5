import Vue from 'vue'
import Router from 'vue-router'
import store from './store'



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
            meta: { scroll: true, animate: 1 },
            component: () => import(/* webpackChunkName: "home" */ '@/views/Home/Home.vue')
        },
        {
            path: '/search',    // 搜索页
            name: 'search',
            meta: { animate: 1 },
            component: () => import(/* webpackChunkName: "search" */ '@/views/Search/Search.vue')
        },
        {
            path: '/login',     // 登录
            name: 'login',
            component: () => import(/* webpackChunkName: "login" */ '@/views/Login/Login'),
        },
        {
            path: '/order',     // 订单列表
            name: 'order',
            meta: { login: true, scroll: true, animate: 1 },
            component: () => import(/* webpackChunkName: "order" */ '@/views/Order/Order')
        },
        {
            path: '/order_info',    // 订单详情
            name: 'order_info',
            meta: { login: true, scroll: true, animate: 1 },
            component: () => import(/* webpackChunkName: "order_info" */ '@/views/OrderInfo/OrderInfo')
        },
        {
            path: '/self',      // 个人主页
            component: () => import(/* webpackChunkName: "self" */ '@/App.vue'),
            // component: () => import(/* webpackChunkName: "self" */ '@/views/Self/Self'),
            meta: { login: true, animate: 1 },
            children: [
                {
                    path: '',
                    component: () => import(/* webpackChunkName: "self" */ '@/views/Self/Self'),
                },
                {
                    path: 'hongbao',
                    name: 'self_hongbao',
                    component: () => import(/* webpackChunkName: "self_hongbao" */ '@/views/Self/Children/HongBao/HongBao'),
                },
                {
                    path: 'addr',
                    name: 'self_addr',
                    component: () => import(/* webpackChunkName: "self_addr" */ '@/views/Self/Children/Addr/Addr')
                },
                {
                    path: 'addr_edit',
                    name: 'self_addr_edit',
                    component: () => import(/* webpackChunkName: "self_addr_edit" */ '@/views/Self/Children/AddrEdit/AddrEdit')
                },
                {
                    path: 'question',
                    name: 'self_question',
                    component: () => import(/* webpackChunkName: "SelfQuestion" */ '@/views/Self/Children/Question/Question')
                },
            ]
        },
        {
            path: '/agreement', // 美团协议
            name: 'agreement',
            meta: { animate: 1 },
            component: () => import(/* webpackChunkName: "agreement" */ '@/views/Agreement/Agreement')
        },
        {
            path: '/location',  // 定位
            name: 'location',
            meta: { scroll: true, animate: 1 },
            component: () => import(/* webpackChunkName: "location" */ '@/views/Location/Location')
        },
        {
            path: '/select_city',  // 选择城市
            name: 'select_city',
            meta: { scroll: true, animate: 1 },
            component: () => import(/* webpackChunkName: "location" */ '@/views/SelectCity/SelectCity')
        },
        {
            path: '/shop/:id',
            name: 'shop_detail',
            meta: { scroll: true, animate: 1 },
            component: () => import(/* webpackChunkName: "shop_detail" */ '@/views/Shop/Shop'),
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if(to.meta.scroll) {
            return { x: 0, y: 0 }
        }
    }
});

// 登录拦截
router.beforeEach((to, from, next) => {
    store.state.loading = true;
    store.commit('set_loading', true)
    let $store = router && router.app.$store;
    if ($store) {
        // $store.commit('set_loading', true)
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

router.afterEach(() => {
    store.commit('set_loading', false)
})

export default router