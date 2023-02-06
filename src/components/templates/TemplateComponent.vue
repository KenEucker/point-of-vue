<script setup lang="ts">
import { ref, reactive, watch, onUnmounted, defineAsyncComponent, createApp } from 'vue'
import { loadModule } from 'vue3-sfc-loader'
import * as Vue from 'vue'
import * as vueuseMotion from '@vueuse/motion'
import * as vueuse from '@vueuse/core'

const AppRef = reactive<any>({ app: null })
const props = defineProps({
  template: {
    type: Object,
    default: () => ({}),
  },
})

const templateRef = ref()

const renderTemplate = (template?: any) => {
  let options: any

  if (templateRef.value) {
    template = template ?? props.template
    console.info('rendering creator template', template)
    options = {
      moduleCache: { vue: Vue, '@vueuse/core': vueuse, '@vueuse/motion': vueuseMotion },
      getFile: async () => {
        if (!(template?.json || template?.script || template?.template)) {
          console.error('whyy?', template)
          return ''
        }

        const template = `
        <div class="ml-10 md:ml-0">
  <slot-1 />
  <slot-2 />
  <slot-3 />
  <slot-4 />
  <slot-5 />
  <slot-6 />
  <slot-7 />
  <slot-8 />
</div>`
        const compiled = ``

        // compile the component and the vues within it
        return compiled
      },
      addStyle: async (textContent: any) => {
        // console.log({ textContent })
        // Feature blocked
        // const style = Object.assign(document.createElement('style'), { textContent })
        // const ref = document.head.getElementsByTagName('style')[0] || null
        // document.head.insertBefore(style, ref)
      },
    }
  }

  if (options) {
    try {
      /// First do nothing, Mark
      unmountComponentApp()

      AppRef.app = createApp(
        defineAsyncComponent(async () => {
          try {
            return await loadModule('file.vue', options)
          } catch (error: any) {
            console.error('load module error', error)
            // logs.errors.push('compilation error')
            // logs.errors.push(error.message)

            return Promise.resolve()
          }
        })
      )
      AppRef.app.use(vueuseMotion.MotionPlugin)
      AppRef.app.mount(templateRef.value)
    } catch (e: any) {
      console.error('compilation error', e)
      // logs.errors.push('compilation error')
      // logs.errors.push(e.message)
    }
  }
}

const unmountComponentApp = () => {
  /// Clear the logs
  // logs.errors = []
  // logs.info = []

  if (AppRef.app) {
    AppRef.app.unmount(templateRef.value)
  }
}

onUnmounted(unmountComponentApp)

watch(props.template, renderTemplate)

defineExpose({ renderTemplate, unmountComponentApp })
</script>
<template>
  <div class="creator-template">
    <div ref="templateRef"></div>
    <slot></slot>
  </div>
</template>
