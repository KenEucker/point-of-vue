import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import { useCreatorState, usePageState } from '../store/state'
import firstRoutes from './first'
import povRoutes from './pov'
import creatorRoutes from './creator'
import lastRoutes from './last'
import debugRoutes from './debug'

const isProduction = process.env.ENV === 'production'

const routes = [
  /// First to load and pathless routes
  ...firstRoutes,
  /// POV routes
  ...povRoutes,
  /// Routes for debugging (never production)
  ...[...(isProduction ? [] : debugRoutes)],
  /// Routes that depend on connections
  ...creatorRoutes,
  /// The last routes to load, including wildcards
  ...lastRoutes,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((p) => {
  if (!NProgress.isStarted()) {
    NProgress.start()
  }
  const pageState = usePageState()
  const meta = pageState.setMetadata(p.name?.toString(), p.meta)

  if (p.meta?.protected && meta.dependsOn?.length) {
    const creatorState = useCreatorState()
    const authentication: any = creatorState.getCreatorCredentials
    /// TODO: race condition for getting credentials here,
    /// TODO: probably just by watching the creator and using the router after the fact
    for (let i = 0; i < meta.dependsOn.length; ++i) {
      const dep = meta.dependsOn[i]
      if (!authentication[dep] && !authentication[dep]?.length) {
        console.info('might not have what you need', { dependencyUmnet: dep, path: p.path })
        // return false
      }
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
