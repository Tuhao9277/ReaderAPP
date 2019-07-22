import Vue from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './lang'
import store from './store/'
import '@styles/reset.scss'
import '@styles/icon.css'


Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
