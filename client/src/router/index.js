import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

function isLoggedIn(to, from, next) {
  if (localStorage.token) {
    next()
  } else {
    next('/')
  }
}

const router = createRouter({
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      beforeEnter: isLoggedIn
    },
    {
      path: '/event',
      name: 'event',
      component: () => import('../views/EventView.vue'),
      beforeEnter: isLoggedIn
    }
  ]
})

export default router
