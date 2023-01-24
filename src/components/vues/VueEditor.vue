<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import * as Vue from 'vue'
import { useStorage } from '@vueuse/core'
import Split from 'split.js'
import { loadModule } from 'vue3-sfc-loader'
import { StorageName, useDarkGlobal } from '../../utilities'
import MonacoEditor from './MonacoEditor.vue'
import EditorTabs from './EditorTabs.vue'
import { useMagicKeys } from '@vueuse/core'
import VueComponent from './VueComponent.vue'
import { usePageState, useVuesState } from '../../store/state'

const tabs = {
  vue: 'json',
  query: 'graphql',
  script: 'javascript',
  template: 'html',
  //style: 'css', // Feature blocked - let users take advantage of the already present tailwindcss classes
}

const props = defineProps({
  initialCode: {
    type: Object,
    default: () => ({}),
  },
  component: {
    type: Object,
    default: () => ({}),
  },
})

const vuesState = useVuesState()

const pageState = usePageState()
const containerRef = ref()
const code = ref<Record<string, any>>(props.initialCode)
const currentTab = useStorage(StorageName.ACTIVE_TAB, 'vue')
const logs = reactive({
  error: null,
  info: null,
})
const component = reactive({
  ...props.component,
  name: '',
  category: '',
  vues: 0,
  status: '',
  icon: '',
  description: '',
  background: undefined,
  publishedAt: undefined,
  archivedAt: undefined,
  erroredAt: undefined,
})

useMagicKeys({
  passive: false,
  onEventFired(e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 's' && e.type === 'keydown') {
      e.preventDefault()
      Vue.nextTick(() => {
        onPlay()
      })
    }
  },
})
const isDark = useDarkGlobal()

const onChange = (payload: any) => {
  console.log({ payload })
}

const onPlay = async () => {
  if (containerRef.value) {
    const options = {
      moduleCache: { vue: Vue },
      getFile: async () => {
        const compiled = await vuesState.compileComponent(code.value)
        if (compiled.logs) {
          if (compiled.logs.info) {
            logs.info = compiled.logs.info
          }
          if (compiled.logs.error) {
            logs.error = compiled.logs.error
          }
        }

        return compiled.output
      },
      addStyle: (textContent: any) => {
        // Feature blocked
        // const style = Object.assign(document.createElement('style'), { textContent })
        // const ref = document.head.getElementsByTagName('style')[0] || null
        // document.head.insertBefore(style, ref)
        /// Add tailwind
        // const sass = Sass.compileSync(`
        //   @tailwind base;
        //   @tailwind components;
        //   @tailwind utilities;`)
        // console.log({ sass })
        // return sass
      },
    }
    const updatedComponentValues = JSON.parse(code.value.json)
    component.name = updatedComponentValues.name
    component.background = updatedComponentValues.background
    component.icon = updatedComponentValues.icon
    component.category = updatedComponentValues.category
    component.description = updatedComponentValues.description

    Vue.createApp(Vue.defineAsyncComponent(() => loadModule('file.vue', options))).mount(
      containerRef.value
    )
  }
}

onMounted(() => {
  if (pageState.width > 700) {
    Split(['#editor', '#component'])
  }
  onPlay()
})
</script>

<template>
  <div class="flex h-full">
    <div id="editor" class="w-full">
      <editor-tabs v-model="currentTab" :tabs="tabs" @play="onPlay" />
      <monaco-editor v-model="code" :active-tab="currentTab" class="h-full" @change="onChange" />
    </div>
    <div id="component" class="w-full h-full">
      <div v-if="logs.error || logs.info" class="h-full">
        <div
          class="px-4 py-3 text-teal-900 bg-teal-100 border-t-4 border-teal-500 rounded-b shadow-md"
          role="alert"
        >
          <div class="flex">
            <div class="py-1">
              <svg
                class="w-6 h-6 mr-4 text-teal-500 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
                />
              </svg>
            </div>
            <div>
              <p class="font-bold">Our privacy policy has changed</p>
              <p class="text-sm">Make sure you know how these changes affect you.</p>
            </div>
          </div>
        </div>
        <div
          v-if="logs.info"
          class="px-4 py-3 text-teal-900 bg-teal-100 border-t-4 border-teal-500 rounded-b shadow-md"
          role="alert"
        >
          <div class="flex">
            <div class="py-1">
              <svg
                class="w-6 h-6 mr-4 text-teal-500 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
                />
              </svg>
            </div>
            <div>
              <p class="font-bold">Our privacy policy has changed</p>
              <p class="text-sm">Make sure you know how these changes affect you.</p>
            </div>
          </div>
        </div>
      </div>
      <vue-component :component="component"><div ref="containerRef"></div></vue-component>
    </div>
  </div>
</template>

<style>
.gutter {
  @apply dark:bg-gray-900 bg-no-repeat;

  background-position: 50%;
}

.gutter.gutter-horizontal {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==');
  cursor: col-resize;
}
</style>
