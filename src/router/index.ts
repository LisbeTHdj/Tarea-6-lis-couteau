import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';


const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('@/views/HomePage.vue')
  },
  {
    path: '/gender',
    component: () => import('@/views/GenderPage.vue')
  },
  {
    path: '/age',
    component: () => import('@/views/AgePage.vue')
  },
  {
    path: '/universities',
    component: () => import('@/views/UniversitiesPage.vue')
  },
  {
    path: '/weather',
    component: () => import('@/views/WeatherPage.vue')
  },
  {
    path: '/pokemon',
    component: () => import('@/views/PokemonPage.vue')
  },
  {
    path: '/news',
    component: () => import('@/views/NewsPage.vue')
  },
  {
    path: '/about',
    component: () => import('@/views/AboutPage.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router
