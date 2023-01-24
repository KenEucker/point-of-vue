<script setup lang="ts">
import * as Vue from 'vue'
import { onMounted, ref, reactive } from 'vue'
import { useStorage } from '@vueuse/core'
import Split from 'split.js'
import { PovComponent, StorageName, useDarkGlobal } from '../../utilities'
import MonacoEditor from './MonacoEditor.vue'
import EditorTabs from './EditorTabs.vue'
import { useMagicKeys } from '@vueuse/core'
import VueComponent from './VueComponent.vue'
import { usePageState, useVuesState } from '../../store/state'
// import Sass from 'sass.js/dist/sass.sync.js'

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

const pageState = usePageState()
const code = ref<Record<string, any>>(props.initialCode)
const currentTab = useStorage(StorageName.ACTIVE_TAB, 'vue')
const componentRef = ref()
const component = reactive<PovComponent>({
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
      Vue.nextTick(onPlay)
    }
  },
})
const isDark = useDarkGlobal()

const onChange = (payload: any) => {
  // console
}

const onPlay = async () => {
  const updatedComponentValues = JSON.parse(code.value.json)
  component.name = updatedComponentValues.name
  component.background = updatedComponentValues.background
  component.icon = updatedComponentValues.icon
  component.category = updatedComponentValues.category
  component.description = updatedComponentValues.description
  component.raw = code.value.json
  component.template = code.value.html
  component.script = code.value.javascript
  component.query = code.value.graphql

  componentRef.value.renderComponent()
}

onMounted(() => {
  if (pageState.width > 700) {
    Split(['#editor', '#component'])
  }
  /// Don't auto compile
  // onPlay()
})
</script>

<template>
  <div class="flex h-full">
    <div id="editor" class="w-full">
      <editor-tabs v-model="currentTab" :tabs="tabs" @play="onPlay" />
      <monaco-editor v-model="code" :active-tab="currentTab" class="h-full" @change="onChange" />
    </div>
    <div id="component" class="w-full h-full">
      <vue-component ref="componentRef" :component="component" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.gutter {
  @apply dark:bg-gray-900 bg-no-repeat;

  background-position: 50%;
}

.gutter.gutter-horizontal {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==');
  cursor: col-resize;
}
</style>
