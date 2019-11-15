import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '@/components/layout'
import login from '../views/login'
import home from '@/views/home'
import article from '@/views/article'
import NProgress from 'nprogress'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: layout,
    children: [
      {
        path: '',
        component: home
      },
      {
        path: '/article',
        component: article
      }
    ]
  },
  {
    path: '/login',
    component: login
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // console.log(to, from, next)
  NProgress.start()
  if (to.path === '/login') {
    NProgress.done()
    return next()
  }
  const token = window.localStorage.getItem('user-token')
  if (token) {
    next()
  } else {
    next('/login')
  }
})
router.afterEach((to, from) => {
  NProgress.done()
})
export default router
