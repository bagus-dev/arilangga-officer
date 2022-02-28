import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import OurService from '../views/pages/OurServices/OurServices.vue'
import Trips from '../views/pages/Trips/index.vue'
import contentdashboard from '../views/pages/Dashboard.vue'
import about from '../views/About.vue'
import team from '../views/pages/Teams'
Vue.use(VueRouter)
const routes = [
  {
    path:'/',
    component:Dashboard,
    children:[
      {
        path: '/trips',
        name: 'trips',
        component:Trips
      },
      {
        path: '/ourservice',
        name: 'ourservice',
        component:OurService
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component:contentdashboard
      },
      {
        path: '/about',
        name: 'about',
        component:about
      }
      ,
      {
        path: '/team',
        name: 'team',
        component:team
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },

 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  const publicPages = ['/login'];
  const authRequired = publicPages.includes(to.path);
  console.log("AUTH",authRequired);
  const loggedIn = localStorage.getItem('user');
  console.log("LOGIN",loggedIn);
  if (authRequired && loggedIn) {
    next('/');
  } 
  if(!authRequired) {
    if (loggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
});
export default router
