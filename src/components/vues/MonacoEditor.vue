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
const { activeTab } = refProps

const editorState = useStorage<Record<string, any>>(StorageName.EDITOR_STATE, {})
const editorValue = useStorage<Record<string, any>>(StorageName.EDITOR_VALUE, {})

const updateEditorState = (
  newState?: any,
  currentTab?: string | undefined,
  prevTab?: string | undefined
) => {
  const tab = currentTab ?? refProps.activeTab.value
  // monaco.editor.setModelLanguage(editor.getModel()!, tab)

  /// store previous state
  if (prevTab) {
    editorState.value[prevTab] = editor.saveViewState()
  }

  /// setting/resetting the state
  if (newState) {
    if (typeof newState === 'boolean') {
      editorState.value = null
    } else {
      editorState.value = newState
      editor.setValue('')
    }
  }

  /// load the editor from state
  if (editorValue.value[tab]) {
    editor.setValue(editorValue.value[tab])

    /// If the current tab is set, restore the state if possible
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
    language: activeTab.value,
    theme: isDark.value ? 'vs-dark' : 'vs',
    fontSize: 20,
  })

  emit('update:modelValue', editorValue.value)
  console.info('mounting and setting editor value', editorValue.value)

  editor.onDidChangeModelContent(
    useDebounceFn(() => {
      if (editorValue.value[activeTab.value] !== editor.getValue()!) {
        editorValue.value[activeTab.value] = editor.getValue()!
        emit('update:modelValue', editorValue.value)
        console.info('code updated, setting editor value', editorValue.value)
      }
    }, 500)
  )

  // Set values from storage on load
  /// TODO: add check for the same creator-id
  if (props.loadFromStorage && editorValue.value[activeTab.value]) {
    console.info('loading editor value from existing state', editorValue.value[activeTab.value])
    editor.setValue(editorValue.value[activeTab.value])
    editor.restoreViewState(editorState.value[activeTab.value])
  }
})

watch(activeTab, (currentTab, prevTab) => {
  monaco.editor.setModelLanguage(editor.getModel()!, currentTab)

  editorState.value[prevTab] = editor.saveViewState()

  if (editorValue.value[currentTab]) {
    console.info('setting editor value to current tab')
    editor.setValue(editorValue.value[currentTab])
  } else {
    console.info('setting editor value to empty')
    editor.setValue('')
  }

  if (editorState.value[currentTab]) {
    resetEditorView(currentTab)
  }
})

watch(props.modelValue, (updatedValue: Record<string, any>) => {
  console.info('updating editor state and value', updatedValue)
  editorState.value = updatedValue
  editorValue.value = updatedValue
  editor.setValue(editorState.value[activeTab.value])
  resetEditorView()
})

watch(isDark, (value) => {
  editor.updateOptions({
    theme: value ? 'vs-dark' : 'vs',
  })
})

const editorObserver = useResizeObserver(outputContainer, () => {
  editor.layout()
})

const resetEditorView = (currentTab?: string | undefined) => {
  console.info('resetting editor view state', editorState.value[currentTab ?? activeTab.value]!)
  editor.restoreViewState(editorState.value[currentTab ?? activeTab.value]!)
  editor.focus()
}

defineExpose({ resetEditorView })

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
