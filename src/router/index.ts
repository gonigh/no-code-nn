import { createRouter, createWebHistory } from 'vue-router';
import DataView from '../views/DataView/index.vue';
import ModelView from '../views/ModelView/index.vue';
import TrainingView from '../views/TrainingView/index.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: 'model' },
    {
      path: '/data',
      name: 'Data',
      // component: DataView
      component: DataView
    },
    {
      path: '/model',
      name: 'Model',
      component: ModelView
    },
    {
      path: '/training',
      name: 'Training',
      component: TrainingView
    }
  ]
});

export default router;
