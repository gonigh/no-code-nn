import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: 'data',
          name: 'Data',
          // component: DataView
          component: () => import('../views/DataView.vue')
        },
        {
          path: 'model',
          name: 'Model',
          component: () => import('../views/ModelView.vue')
        },
        {
          path: 'hyperParameters',
          name: 'HyperParameters',
          component: () => import('../views/HyperParametersView.vue')
        },
        {
          path: 'training',
          name: 'Training',
          component: () => import('../views/TrainingView.vue')
        },
        {
          path: 'results',
          name: 'Results',
          component: () => import('../views/ResultsView.vue')
        }
      ]
    }
  ]
});

export default router;
