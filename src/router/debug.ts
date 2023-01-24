import useAuthGuard from '../auth/authGuard'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/data',
    name: 'Data',
    component: () => import('../views/FramedPage.vue'),
    meta: {
      protected: true,
      povMenu: process.env.ENV !== 'production',
    },
    beforeEnter: useAuthGuard,
  },
]

export default routes
