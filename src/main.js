import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import apis from './apis/index'
import 'lib-flexible'

Vue.config.productionTip = false
Vue.prototype.$apis = apis

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
