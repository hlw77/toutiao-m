import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
const Home = () => import('@/views/Home')
const Question = () => import('@/views/Question')
const Video = () => import('@/views/Video')
const My = () => import('@/views/My')

const Login = () => import('@/views/login')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout/my'
  },
  {
    path: '/layout',
    name: 'layout',
    component: Layout,
    children: [{
      path: 'home',
      component: Home
    }, {
      path: 'question',
      component: Question
    }, {
      path: 'video',
      component: Video
    }, {
      name: 'my',
      path: 'my',
      component: My
    }]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
