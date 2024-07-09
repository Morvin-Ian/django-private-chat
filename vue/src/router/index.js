import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignIn from "../views/auth/SignIn.vue"
import SignUp from "../views/auth/SignUp.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/sign-in',
      name: 'login',
      component: SignIn
    },
    {
      path: '/sign-up',
      name: 'register',
      component: SignUp
    },
  ]
})

export default router
