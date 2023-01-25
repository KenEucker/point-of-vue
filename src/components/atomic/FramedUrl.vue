<script setup lang="ts">
import { useAttrs } from 'vue'
import { usePageState } from '../../store/page'
const pageState = usePageState()

const attrs = useAttrs()
if (attrs.src) {
  pageState.setIsFramed(attrs.src as string)
}
</script>

<template>
  <iframe :v-bind="attrs" />
</template>
