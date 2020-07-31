import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignUpPage from '../views/SignUpPage.vue'
import PasswordResetEmail from '../views/PasswordResetEmail.vue'
import EnterPasswordReset from '../views/EnterPasswordReset.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'SignUpPage',
    component: SignUpPage
  },
  {
    path: '/password/reset/link',
    name: 'PasswordResetEmail',
    component: PasswordResetEmail
  },
  {
    path: '/enter/password/reset/6930275739',
    name: 'EnterPasswordReset',
    component: EnterPasswordReset
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
