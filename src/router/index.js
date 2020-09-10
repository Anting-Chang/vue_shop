import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Calc from '../components/Calc'
import Home from '../components/Home'
import Welcome from '../components/Welcome'
import Users from '../components/user/Users'
import Rights from '../components/authority/rights/Rights'
import Roles from '../components/authority/roles/Roles'

Vue.use(Router)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/calc', component: Calc },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
      { path: '/rights', component: Rights },
      { path: '/roles', component: Roles }
    ]
  }
]

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  /* to the url u want to visit */
  if (to.path === '/login') return next()
  // get token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
