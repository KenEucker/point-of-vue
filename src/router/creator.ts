import useAuthGuard from '../auth/authGuard'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/images',
    name: 'Images',
    component: () => import('../views/ImagesPage.vue'),
    meta: {
      dependsOn: ['imgur'],
      // protected: true,
      povMenu: true,
    },
    beforeEnter: useAuthGuard,
  },
  {
    path: '/threads',
    name: 'Threads',
    component: () => import('../views/ThreadsPage.vue'),
    meta: {
      dependsOn: ['google'],
      protected: true,
      povMenu: true,
    },
    beforeEnter: useAuthGuard,
  },
  {
    path: '/vues',
    name: 'Vues',
    component: () => import('../views/VuesPage.vue'),
    meta: {
      dependsOn: ['github'],
      showBottmMenu: true,
      protected: true,
      povMenu: true,
    },
    beforeEnter: useAuthGuard,
  },
  {
    path: '/graph',
    name: 'Graph',
    component: () => import('../views/FramedPage.vue'),
    meta: {
      protected: true,
      creatorMenu: true,
    },
    beforeEnter: useAuthGuard,
  },
]

export default routes
