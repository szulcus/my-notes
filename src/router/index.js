import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/Views/Home.vue'
import '@/Styles/Global.scss'
import i18n from '@/i18n'

Vue.use(VueRouter)

  const children = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: `login`,
    name: 'Login',
    component: () => import('@/Views/Login.vue')
  },
  {
    path: `register`,
    name: 'Register',
    component: () => import('@/Views/Register.vue')
  },
  {
    path: `profile`,
    name: 'Profile',
    component: () => import('@/Views/UserProfile.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: `/${i18n.locale}`
    },
    {
      path: '/:lang',
      component: {
        render (c) { return c('router-view')}
      },
      children
    },
  ]
})

export default router
