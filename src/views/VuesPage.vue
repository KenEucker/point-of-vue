<script setup lang="ts">
import VueEditor from '../components/vues/VueEditor.vue'
import VuesProfileCard from '../components/vues/VuesProfileCard.vue'
import { useCreatorState, useVuesState } from '../store/state'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
const creatorState = useCreatorState()
const vuesState = useVuesState()
console.log('wtf')

onMounted(() => {
  console.log('atleast')
  if (!vuesState.hasCredentials()) {
    const router = useRouter()
    console.info('no way josé', { creatorCredentialsInvalid: true, path: '/vues' })
    router.push({ path: '/', replace: true })
  }

  vuesState.fetchVues()
})
</script>

<template>
  <main class="border-t border-gray-200 dark:border-gray-700">
    <vues-profile-card :creator="creatorState.getCreator" :components="vuesState.vueComponents" />
    <vue-editor class="h-1/2" :initial-code="{}" />
  </main>
</template>
