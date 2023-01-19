<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { onMounted, onUnmounted, ref, toRefs, watch } from 'vue'
import { useDebounceFn, useResizeObserver, useStorage } from '@vueuse/core'
import { StorageName, useDarkGlobal } from '../../utilities'

import * as monaco from 'monaco-editor'

const props = defineProps<{
  modelValue: typeof editorValue.value
  activeTab: string
}>()

const emit = defineEmits<(e: 'update:modelValue', payload: typeof editorValue.value) => void>()

self.MonacoEnvironment = {
  getWorker: function (_: never, label: any) {
    const getWorkerModule = (moduleUrl: string, label: any) => {
      // @ts-expect-error
      const workerUrl = self.MonacoEnvironment.getWorkerUrl(moduleUrl)
      return new Worker(workerUrl, {
        name: label,
        type: 'module',
      })
    }

    switch (label) {
      case 'json':
        return getWorkerModule('/monaco-editor/esm/vs/language/json/json.worker?worker', label)
      case 'graphql':
        return getWorkerModule(
          '/monaco-editor/esm/vs/language/graphql/graphql.worker?worker',
          label
        )
      case 'css':
      case 'scss':
      case 'less':
        return getWorkerModule('/monaco-editor/esm/vs/language/css/css.worker?worker', label)
      case 'html':
      case 'handlebars':
      case 'razor':
        return getWorkerModule('/monaco-editor/esm/vs/language/html/html.worker?worker', label)
      case 'typescript':
      case 'javascript':
        return getWorkerModule('/monaco-editor/esm/vs/language/typescript/ts.worker?worker', label)
      default:
        return getWorkerModule('/monaco-editor/esm/vs/editor/editor.worker?worker', label)
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
  if (editorValue.value[activeTab.value]) {
    editor.setValue(editorValue.value[activeTab.value])
    editor.restoreViewState(editorState.value[activeTab.value])
  }
})

watch(activeTab, (currentTab, prevTab) => {
  monaco.editor.setModelLanguage(editor.getModel()!, currentTab)

  editorState.value[prevTab] = editor.saveViewState()

  if (editorValue.value[currentTab]) editor.setValue(editorValue.value[currentTab])
  else editor.setValue('')

  if (editorState.value[currentTab]) {
    editor.restoreViewState(editorState.value[currentTab]!)
    editor.focus()
  }
})

watch(isDark, (value) => {
  editor.updateOptions({
    theme: value ? 'vs-dark' : 'vs',
  })
})

const editorObserver = useResizeObserver(outputContainer, () => {
  editor.layout()
})

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