import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomePage.vue'),
    meta: {
      povMenu: true,
      hideLeftMenu: true,
      hideRightMenu: true,
    },
  },
]

export default routes
