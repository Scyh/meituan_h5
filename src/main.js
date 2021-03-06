import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import FastClick from 'fastclick'
import './plugins/element.js'
import apis from './apis/index'
import 'swiper'
import 'swiper/dist/css/swiper.min.css'
// import './common/javascript/rem.js'
import tip from './plugins/tip.js'
import cconfirm from './components/common/confirm.vue'


if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

Vue.component('cconfirm', cconfirm)

Vue.config.productionTip = false

Vue.prototype.$tip = tip
Vue.prototype.$apis = apis

const app = new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')

// 如果 JS 晚于 CSS 加载完成，那直接执行渲染
if (process.env.NODE_ENV === 'production') {
    if (window.STYLE_READY) {
      app.$mount('#app')
    }
  } else {
    app.$mount('#app')
  }