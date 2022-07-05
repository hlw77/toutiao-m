import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入初始化样式
// import '@/styles/reset.less'
// 引入全局样式
import '@/styles/index.less'
// 引入字体图标
// import '@/styles/icon.less'
// 引入vant
import '@/vant/index'
import 'vant/lib/index.less'
// 引入amfe-flexible文件
import 'amfe-flexible'
import MyIcon from '@/components/MyIcon.vue'
// 引入dayjs
import '@/utils/indexjs'
// 注册全局组件
Vue.component('MyIcon', MyIcon)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
