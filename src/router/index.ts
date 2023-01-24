import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import useAuthGuard from '../auth/authGuard'
import { useCreatorState, usePageState } from '../store/state'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomePage.vue'),
    meta: {
      mainMenu: true,
      hideLeftMenu: true,
      hideRightMenu: true,
    },
  },
  {
    path: '/posts',
    name: 'Posts',
    component: () => import('../views/PostsPage.vue'),
    meta: {
      mainMenu: true,
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
      mainMenu: true,
    },
    beforeEnter: useAuthGuard,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/SettingsPage.vue'),
    meta: {
      protected: true,
      mainMenu: true,
    },
    beforeEnter: useAuthGuard,
  },
  {
    path: '/images',
    name: 'Images',
    component: () => import('../views/ImagesPage.vue'),
    meta: {
      dependsOn: ['imgur'],
      // protected: true,
      mainMenu: true,
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
      mainMenu: true,
    },
    beforeEnter: useAuthGuard,
  },
  {
    path: '/data',
    name: 'Data',
    component: () => import('../views/FramedPage.vue'),
    meta: {
      protected: true,
      mainMenu: process.env.ENV !== 'production',
    },
    beforeEnter: useAuthGuard,
  },
  {
    path: '/graph',
    name: 'Graph',
    component: () => import('../views/FramedPage.vue'),
    meta: {
      protected: true,
      mainMenu: true,
    },
    beforeEnter: useAuthGuard,
  },
  {
    path: '/vues',
    name: 'Vues',
    component: () => import('../views/VuesPage.vue'),
    meta: {
      dependsOn: ['github'],
      protected: true,
      mainMenu: true,
    },
    beforeEnter: useAuthGuard,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutPage.vue'),
    meta: {
      mainMenu: true,
      hideLeftMenu: true,
      hideRightMenu: true,
    },
  },
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

const index = createRouter({
  history: createWebHistory(),
  routes,
})

index.beforeEach((p) => {
  if (!NProgress.isStarted()) {
    NProgress.start()
  }
  const pageState = usePageState()
  const meta = pageState.setMetadata(p.name?.toString(), p.meta)
  if (p.meta?.protected && meta.dependsOn?.length) {
    const creatorState = useCreatorState()
    const authentication: any = creatorState.getCreatorCredentials
    for (let i = 0; i < meta.dependsOn.length; ++i) {
      const dep = meta.dependsOn[i]
      if (!authentication[dep] && !authentication[dep]?.length) {
        return false
      }
    }
  }
})

index.afterEach(() => {
  NProgress.done()
})

export default index
