import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    children: [
      {
        path: '',
        name: 'allQuestion',
        component: () => import(/* webpackChunkName: "allQuestion" */ '../views/allQuestion.vue')
      },
      {
        path: 'myQuestion',
        name: 'myQuestion',
        component: () => import(/* webpackChunkName: "myQuestion" */ '../views/myQuestion.vue')
      },
      {
        path: 'askQuestion',
        name: 'askQuestion',
        component: () => import(/* webpackChunkName: "askQuestion" */ '../views/askQuestion.vue')
      },
      {
        path: '/update/:id',
        name: 'update',
        component: () => import(/* webpackChunkName: "update" */ '../views/update.vue')
      },
      {
        path: '/detail/:id',
        name: 'detail',
        component: () => import(/* webpackChunkName: "detail" */ '../views/detail.vue')
      }
    ],
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token') || to.path === '/login' || to.path === '/') {
    next()
  } else {
    next({ path: '/login' })
  }
})

export default router
