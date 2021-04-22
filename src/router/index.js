import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//路由信息数组
const routes = [
  //登录页
  {
    path: '/',
    name: 'Login',
    component: () => import('@v/Login/Login.vue')
  },
  //登录页
  {
    path: '/Layout',
    name: 'Layout',
    component: () => import('@v/Layout/Layout.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
