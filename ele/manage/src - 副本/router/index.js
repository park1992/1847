import Vue from 'vue'
import VueRouter from 'vue-router'
import admin from './admin/index.js'
import shop from './shop/index.js'
import good from './goods/index.js'
Vue.use(VueRouter)

const routes = [
   ...admin,
   ...shop,
   ...good
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
