// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomeView.vue';
import Day from '@/views/DayView.vue'

const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/day/:date',
      name: 'Day',
      component: Day,
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
