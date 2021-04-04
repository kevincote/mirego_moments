import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/moment/:id',
    component: () => import(/* webpackChunkName: "moment" */ '../views/Moment.vue')
  },
  {
    path: '/sign-up',
    component: () => import(/* webpackChunkName: "login" */ '../views/SignUp.vue')
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '../views/SignIn.vue')
  },
  {
    path: "/not-found",
    name: "404",
    component: () => import(/* webpackChunkName: "404" */ '../views/NotFound.vue')
  },
  {
    path: "*",
    component: () => import(/* webpackChunkName: "404" */ '../views/NotFound.vue')
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
