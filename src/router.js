import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
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
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ '@/views/About/About.vue')
        }
    ]
})
