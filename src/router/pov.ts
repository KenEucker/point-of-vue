import useAuthGuard from '../auth/authGuard'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/posts',
    name: 'Posts',
    component: () => import('../views/PostsPage.vue'),
    meta: {
      povMenu: true,
      components: ['rightMenu:whats-happening', 'rightMenu:follow-more'],
      about: {
        title: 'This is the POV posts feed page',
        body: ['this page contains posts from the entire POV globe'],
      },
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/CreatorPage.vue'),
    meta: {
      protected: true,
      povMenu: true,
    },
    beforeEnter: useAuthGuard,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/SettingsPage.vue'),
    meta: {
      protected: true,
      povMenu: true,
    },
    beforeEnter: useAuthGuard,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutPage.vue'),
    meta: {
      povMenu: true,
      hideLeftMenu: true,
      hideRightMenu: true,
    },
  },
]

export default routes
