<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { onMounted, onUnmounted, ref, toRefs, watch } from 'vue'
import { useDebounceFn, useResizeObserver, useStorage } from '@vueuse/core'
import { StorageName, useDarkGlobal } from '../../utilities'

import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
// import graphqlWorker from 'monaco-editor/esm/vs/basic-languages/graphql/graphql.worker?worker'
// import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
  activeTab: {
    type: String,
    default: '',
  },
  loadFromStorage: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<(e: 'update:modelValue', payload: typeof editorValue.value) => void>()

self.MonacoEnvironment = {
  getWorker: function (_: never, label: any) {
    switch (label) {
      case 'json':
        return new jsonWorker()
      case 'graphql':
        return new editorWorker()
      case 'html':
        return new htmlWorker()
      case 'typescript':
      case 'javascript':
        return new tsWorker()
      default:
        return new editorWorker()
    }
  },
}

const outputContainer = ref<HTMLDivElement | null>(null)
const logsContainer = ref<HTMLDivElement | null>(null)
const logs = ref()

let editor: monaco.editor.IStandaloneCodeEditor

const isDark = useDarkGlobal()
const refProps = toRefs(props)

const editorState = useStorage<Record<string, any>>(StorageName.EDITOR_STATE, {})
const editorValue = useStorage<Record<string, any>>(StorageName.EDITOR_VALUE, {})

const updateEditorValue = (
  newValue?: any,
  currentTab?: string | undefined,
  prevTab?: string | undefined
) => {
  const tab = currentTab ?? refProps.activeTab.value

  console.info('updating editor value', { tab, prevTab, currentTab, newValue })
  /// store previous state
  if (prevTab && !newValue) {
    editorState.value[prevTab] = editor.saveViewState()
  }

  /// setting/resetting the state and/or value
  if (newValue) {
    editorState.value = {}
    if (typeof newValue === 'boolean') {
      editorValue.value = null
    } else {
      editorValue.value = newValue
    }
  }

  /// set the editor value
  if (editorValue.value[tab]) {
    editor.setValue(editorValue.value[tab])

    /// If the current tab is set coming in, restore the state if possible
    if (currentTab) {
      editor.restoreViewState(editorState.value[tab])
      editor.focus()
    }
  } else {
    /// or clear it
    editor.setValue('')
  }

  monaco.editor.setModelLanguage(editor.getModel()!, tab)
}

onMounted(() => {
  editor = monaco.editor.create(outputContainer.value!, {
    language: refProps.activeTab.value,
    theme: isDark.value ? 'vs-dark' : 'vs',
    fontSize: 20,
  })

  editor.onDidChangeModelContent(
    useDebounceFn(() => {
      if (editorValue.value[refProps.activeTab.value] !== editor.getValue()) {
        /// THE ERROR IS HERE SOMEWHERE
        const newValue = editor.getValue()
        editorValue.value[refProps.activeTab.value] = newValue
        console.info('code updated, setting editor value', editorValue, newValue)
        emit('update:modelValue', editorValue.value)
      }
    }, 500)
  )

  // Set values from storage on load
  /// TODO: add check for the same creator-id
  if (props.loadFromStorage && editorValue.value[refProps.activeTab.value]) {
    editor.setValue(editorValue.value[refProps.activeTab.value])
    editor.restoreViewState(editorState.value[refProps.activeTab.value])
    console.info('mounting and loaded editor value from existing state', editorValue.value)
    emit('update:modelValue', editorValue.value)
  } else {
    editorValue.value = null
    editorState.value = null
  }
})

watch(refProps.activeTab, (currentTab, prevTab) => {
  updateEditorValue(undefined, currentTab, prevTab)
})

watch(isDark, (value) => {
  editor.updateOptions({
    theme: value ? 'vs-dark' : 'vs',
  })
})

const editorObserver = useResizeObserver(outputContainer, () => {
  editor.layout()
})

defineExpose({ updateEditorValue })

onUnmounted(() => {
  /// Clear the editor on unmount
  /// TODO: make this configurable by prop
  console.info('unmounting and resetting editor state and value')
  editorState.value = null
  editorValue.value = null
  editor?.dispose()
  editorObserver.stop()
})
</script>

<template>
  <div>
    <div ref="outputContainer" class="h-full pt-3" />
    <div v-show="logs" ref="logsContainer" class=""></div>
  </div>
</template>
