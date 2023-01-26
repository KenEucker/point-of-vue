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

const props = defineProps<{
  modelValue: typeof editorValue.value
  activeTab: string
  loadFromStoage?: boolean
}>()

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

const { activeTab } = toRefs(props)

const editorState = useStorage<Record<string, any>>(StorageName.EDITOR_STATE, {})
const editorValue = useStorage<Record<string, any>>(StorageName.EDITOR_VALUE, {})

onMounted(() => {
  editor = monaco.editor.create(outputContainer.value!, {
    language: activeTab.value,
    theme: isDark.value ? 'vs-dark' : 'vs',
    fontSize: 16,
  })

  emit('update:modelValue', editorValue.value)

  editor.onDidChangeModelContent(
    useDebounceFn(() => {
      if (editorValue.value[activeTab.value] !== editor.getValue()!) {
        editorValue.value[activeTab.value] = editor.getValue()!
        emit('update:modelValue', editorValue.value)
      }
    }, 500)
  )

  // Set values from storage on load
  /// TODO: add check for the same creator-id
  if (props.loadFromStoage && editorValue.value[activeTab.value]) {
    editor.setValue(editorValue.value[activeTab.value])
    editor.restoreViewState(editorState.value[activeTab.value])
  }
})

watch(activeTab, (currentTab, prevTab) => {
  monaco.editor.setModelLanguage(editor.getModel()!, currentTab)

  editorState.value[prevTab] = editor.saveViewState()

  if (editorValue.value[currentTab]) {
    editor.setValue(editorValue.value[currentTab])
  } else {
    editor.setValue('')
  }

  if (editorState.value[currentTab]) {
    resetEditorView(currentTab)
  }
})

watch(props.modelValue, (updatedValue: Record<string, any>) => {
  console.log({ editorValue: editorValue.value })
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
  editor.restoreViewState(editorState.value[currentTab ?? activeTab.value]!)
  editor.focus()
}

defineExpose({ resetEditorView })

onUnmounted(() => {
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
