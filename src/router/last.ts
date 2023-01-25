import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/404',
    name: 'Error',
    component: () => import('../views/ErrorPage.vue'),
  },
  {
    path: '/:handle',
    name: 'Creator',
    component: () => import('../views/CreatorPage.vue'),
    meta: {},
  },
  {
    /// Should never land here
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
]

export default routes
