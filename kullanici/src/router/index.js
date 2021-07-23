import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Yazilar from '../views/Yazilar.vue'
import Icerik from '../views/Icerik.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Yazilar',
    name: 'Yazilar',
    component: Yazilar
  },
  {
    path: '/Yazilar/:slug',
    name: 'Icerik',
    component: Icerik
  }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
