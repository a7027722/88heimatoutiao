import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '@/components/layout'
import login from '../views/login'
import home from '@/views/home'
import article from '@/views/article'
import NProgress from 'nprogress'
import publish from '@/views/publish'
import Comment from '@/views/comment'
import Materials from '@/views/materials'
import Account from '@/views/account'
import commentDetail from '@/views/comment-detail'

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
      },
      {
        path: '/publish',
        component: publish
      },
      {
        path: '/comment',
        component: Comment
      },
      {
        path: '/materials',
        component: Materials
      },
      {
        path: '/account',
        component: Account
      },
      {
        // 这是编辑页 与发布文章页共用相同组件 路由传ID即可
        path: '/publish/:articleId',
        component: publish
      },
      {
        path: '/comment/:commentId',
        component: commentDetail,
        props: true
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
  //  开启加载效果
  NProgress.start()
  if (to.path === '/login') {
    // 当去登录页的时候 关闭加载效果
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
  // 关闭加载效果
  NProgress.done()
})

export default router
