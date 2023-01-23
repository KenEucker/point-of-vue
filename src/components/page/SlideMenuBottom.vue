<script setup lang="ts">
import { usePageState } from '../../store/state'
import PageOptions from './PageOptions.vue'

/// TODO: load these from the globe, as set by the viewer
const props = defineProps({
  components: {
    type: Array,
    default: () => [],
  },
})

const pageState = usePageState()
</script>
<template>
  <div
    class="flex flex-col w-full h-full px-2 py-2 overflow-y-auto bg-ll-base dark:bg-ld-base"
  ></div>
</template>
