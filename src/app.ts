import { createApp } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'

import 'vue-ionicons/ionicons.css'
import './styles/app.scss'
import 'vue3-emoji-picker/css'
import '@dafcoe/vue-notification/dist/vue-notification.css'

import App from './App.vue'

import { apolloClient } from './store'
import router from './router'
import auth from './auth'

import { MotionPlugin } from '@vueuse/motion'
import { createPinia } from 'pinia'
import VueEasyLightbox from 'vue-easy-lightbox'

const app = createApp(App)

// Auth
if (auth.initialized) {
  app.use(auth)
}

// GraphQL
app.provide(DefaultApolloClient, apolloClient)

// Router
app.use(router)

// Store
app.use(createPinia())

// other UI plugins
app.use(MotionPlugin)
app.use(VueEasyLightbox)

// Run
app.mount('#app')
