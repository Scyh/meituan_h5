import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './plugins/element.js'
import apis from './apis/index'
// import 'lib-flexible'
import './common/javascript/rem.js'

import cconfirm from './components/common/confirm.vue'
Vue.component('cconfirm', cconfirm)

Vue.config.productionTip = false
Vue.prototype.$apis = apis

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
