import Vue from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './lang'
import store from './store/'
import '@styles/reset.scss'
import '@styles/icon.css'
import './mock'
import VueLazyLoad from 'vue-lazyload'
Vue.config.productionTip = false
Vue.use(VueLazyLoad)
new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
