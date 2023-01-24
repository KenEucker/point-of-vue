declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue3-emoji-picker'
declare module 'vue3-sfc-loader'
declare module 'number-abbreviate'
declare module 'sass.js/dist/sass.sync.js'
declare module 'sass.js'
