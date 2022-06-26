import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入样式
import '@/styles/index.less'
// 引入字体图标
import '@/styles/icon.less'
// 引入vant
import '@/vant'
// 引入amfe-flexible文件
import 'amfe-flexible'

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
