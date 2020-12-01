import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Study from '@/views/Study.vue'
import Deck from '@/views/Deck.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/decks/:id/study',
    name: 'Study',
    component: Study
  },
  {
    path: '/decks/:id',
    name: 'Deck',
    component: Deck
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
