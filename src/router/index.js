import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/sales-overview',
    name: 'SalesOverview',
    component: () => import('../views/SalesOverview.vue')
  },
  {
    path: '/year-end-client',
    name: 'YearEndClient',
    component: () => import('../views/YearEndClient.vue')
  },
  {
    path: '/year-end-client-bar',
    name: 'YearEndClientBar',
    component: () => import('../views/YearEndClientBar.vue')
  },
  {
    path: '/bar',
    name: 'Bar',
    component: () => import('../views/Bar.vue')
  },
  {
    path: '/doughnut',
    name: 'Doughnut',
    component: () => import('../views/Doughnut.vue')
  },
  {
    path: '/pie',
    name: 'Pie',
    component: () => import('../views/Pie.vue')
  },
  {
    path: '/radar',
    name: 'Radar',
    component: () => import('../views/Radar.vue')
  },
  {
    path: '/polar-area',
    name: 'PolarArea',
    component: () => import('../views/PolarArea.vue')
  },
  {
    path: '/bubble',
    name: 'Bubble',
    component: () => import('../views/Bubble.vue')
  },
  {
    path: '/scatter',
    name: 'Scatter',
    component: () => import('../views/Scatter.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
