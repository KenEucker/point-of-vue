<script setup lang="ts">
import { onMounted, ref, toRefs, watch, computed } from 'vue'
import { useStorage } from '@vueuse/core'
import MonacoEditor from '../vues/MonacoEditor.vue'
import { useMagicKeys } from '@vueuse/core'
import { usePageState, useGithubState } from '../../store/state'
// import Sass from 'sass.js/dist/sass.sync.js'

const tabs = {
  template: 'html',
}

const props = defineProps({
  template: {
    type: Object,
    default: () => ({}),
  },
})

const githubState = useGithubState()
const pageState = usePageState()
/// TODO: clear the storage on log out
const editorRef = ref()

// const onChange = (payload: any) => {
// console
// }

// const onPlay = () => {}

// const onSave = async () => {}

const code = computed(() => ({ html: '' }))
</script>

<template>
  <div class="flex h-full w-full">
    <monaco-editor ref="editorRef" v-model="code" active-tab="html" class="h-full w-full" />
  </div>
</template>
