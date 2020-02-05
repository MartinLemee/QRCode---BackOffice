import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Office from '../views/vueOffice.vue'
import AddCode from '../views/vueAddCode.vue'
import AddPromo from '../views/vueAddPromo.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/office',
    name: 'office',
    component: Office
  },
  {
    path: '/addcode',
    name: 'addcode',
    component: AddCode
  },
  {
    path: '/addpromo',
    name: 'addpromo',
    component: AddPromo
  },
]

const router = new VueRouter({
  routes
})

export default router
