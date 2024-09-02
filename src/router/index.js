import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Convert from '../views/ConvertView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/convert',
    name: 'Convert',
    component: Convert
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
