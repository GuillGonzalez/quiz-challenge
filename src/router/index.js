import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/start',
      name: 'start',
      component: ()=> import('../views/StartView.vue')
    },
    {
      path: '/questions',
      name: 'questions',
      component: ()=> import('../views/QuestionsView.vue')
    },
    {
      path: '/results',
      name: 'results',
      component: ()=> import('../views/ResultsView.vue')
    }
  ]
})

export default router