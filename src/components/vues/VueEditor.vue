<script setup lang="ts">
import * as Vue from 'vue'
import { onMounted, ref, toRefs, watch } from 'vue'
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
  oid: {
    type: String,
    default: '',
  },
})

const pageState = usePageState()
const code = ref<Record<string, any>>(props.initialCode)
/// TODO: clear the storage on log out
const currentTab = useStorage(StorageName.ACTIVE_TAB, 'vue')
const componentRef = ref()
const refProps = toRefs(props)
const component = ref<PovComponent>({
  name: '',
  category: '',
  vues: 0,
  status: 'good',
  icon: '',
  description: '',
  background: undefined,
  publishedAt: undefined,
  archivedAt: undefined,
  erroredAt: undefined,
  ...props.component.value,
})

if (component.value.oid) {
  code.value.json = component.value.raw
  code.value.html = component.value.template
  code.value.javascript = component.value.script
  code.value.graphql = component.value.query
}

watch(refProps.component, (c: any) => {
  component.value = c
  if (component.value.oid) {
    code.value.json = component.value.raw ?? ''
    code.value.html = component.value.template ?? ''
    code.value.javascript = component.value.script ?? ''
    code.value.graphql = component.value.query ?? ''
  }
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
  console.log({ html: code.value.html, script: code.value.javascript, raw: code.value.json })
  const updatedComponentValues = code.value.json.length ? JSON.parse(code.value.json) : {}
  component.value.name = updatedComponentValues.name
  component.value.background = updatedComponentValues.background
  component.value.icon = updatedComponentValues.icon
  component.value.status = 'good' /// TODO: calculate this
  component.value.category = updatedComponentValues.category
  component.value.description = updatedComponentValues.description
  component.value.raw = code.value.json
  component.value.template = code.value.html
  component.value.script = code.value.javascript
  component.value.query = code.value.graphql

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
      <monaco-editor v-model="code" :active-tab="currentTab" class="h-full" />
    </div>
    <div id="component" class="w-full h-full">
      <vue-component ref="componentRef" :component="component" :lazy="true" />
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
