<script setup lang="ts">
import * as Vue from 'vue'
import { onMounted, ref, toRefs, watch, computed } from 'vue'
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
  component: {
    type: Object,
    default: () => ({}),
  },
  oid: {
    type: String,
    default: '',
  },
})

const vuesState = useVuesState()
const pageState = usePageState()
/// TODO: clear the storage on log out
const currentTab = useStorage(StorageName.ACTIVE_TAB, 'vue')
const componentRef = ref()
const editorRef = ref()
const refProps: any = toRefs(props)
const component = ref({ ...props.component })

if (component.value.oid) {
  vuesState.setCodeState({
    json: component.value.vue,
    html: component.value.template,
    javascript: component.value.script,
    graphql: component.value.query,
  })
}

watch(refProps.component, (c: any) => {
  console.info('view editor component changed', c)
  component.value = c
  if (component.value.oid) {
    vuesState.setCodeState({
      json: component.value.vue ?? '',
      html: component.value.template ?? '',
      javascript: component.value.script ?? '',
      graphql: component.value.query ?? '',
    })

    console.info('code state set by loaded component', vuesState.getCodeState)
    editorRef.value.updateEditorValue(vuesState.getCodeState)
  }
})

useMagicKeys({
  passive: false,
  onEventFired(e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 's' && e.type === 'keydown') {
      e.preventDefault()
      Vue.nextTick(onSave)
    }
  },
})
const isDark = useDarkGlobal()

const onChange = (payload: any) => {
  // console
}

const onPlay = () => {
  const c = vuesState.getComponentFromCodeState
  console.info('onPlay event setting component and calling render', c)
  component.value = c
  componentRef.value.renderComponent(c)
}

const onSave = async () => {
  const c = vuesState.getComponentFromCodeState
  console.info('onSave event setting component and calling render', c)
  component.value = c
  componentRef.value.renderComponent(c)
}

onMounted(() => {
  if (pageState.width > 700) {
    Split(['#editor', '#component'])
  }
  /// Don't auto compile
  // onPlay()
})

const code = computed({
  get: () => vuesState.getCodeState,
  set: (v) => vuesState.setCodeState(v),
})
</script>

<template>
  <div class="flex h-full">
    <div id="editor" class="w-full">
      <editor-tabs v-model="currentTab" :tabs="tabs" @play="onPlay" @save="onSave" />
      <monaco-editor ref="editorRef" v-model="code" :active-tab="currentTab" class="h-full" />
    </div>
    <div id="component" class="w-full h-full">
      <vue-component ref="componentRef" :component="component" :skip-first-render="true" />
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
