import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: 'demo1',
  },
  {
    path: '/demo1',
    name: 'demo1',
    component: () => import('@/pages/demo1.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
