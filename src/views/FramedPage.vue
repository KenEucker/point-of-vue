<script setup lang="ts">
import FramedUrl from '../components/atomic/FramedUrl.vue'
import { usePageState } from '../store/state'
import { getGraphUrl, studioUrl } from '../utilities'
import { ref } from 'vue'
const pageState = usePageState()

const url = ref('')

switch (pageState.pageName.toLocaleLowerCase()) {
  case 'data':
    url.value = studioUrl ?? ''
    break
  case 'graph':
    url.value = getGraphUrl()
    break
  default:
    url.value = 'https://you.com'
}
</script>

<template>
  <div class="w-full h-screen">
    <framed-url class="w-full h-full" :src="url" />
  </div>
</template>
