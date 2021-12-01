import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home.vue'
// import Wallet from '@/components/Wallet.vue'
import Login from '@/components/Login.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router