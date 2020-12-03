import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
axios.defaults.baseURL = 'http://liangwei.tech:3000'
Vue.prototype.$axios = axios

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)


Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
