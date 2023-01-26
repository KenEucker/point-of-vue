<script setup lang="ts">
import VueEditor from '../components/vues/VueEditor.vue'
import VuesProfileCard from '../components/vues/VuesProfileCard.vue'
import { useCreatorState, useVuesState } from '../store/state'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
const creatorState = useCreatorState()
const vuesState = useVuesState()

const componentToEdit = ref<any>({})

onMounted(() => {
  if (!vuesState.hasCredentials()) {
    const router = useRouter()
    console.info('no way josé', { creatorCredentialsInvalid: true, path: '/vues' })
    router.push({ path: '/', replace: true })
  }

  vuesState.fetchVues()
})

const onLaunchEditVue = (vueId: string) => {
  console.log('LaunchEditVue', vueId)
  componentToEdit.value = vuesState.getVueComponent(vueId)
  console.log(componentToEdit.value)
}
const onViewLogs = (vueId: string) => {
  console.log('ViewLogs', vueId)
}
const onArchiveVue = (vueId: string) => {
  console.log('ArchiveVue', vueId)
}
const onDeleteVue = (vueId: string) => {
  console.log('DeleteVue', vueId)
}
const onViewVue = (vueId: string) => {
  console.log('ViewVue', vueId)
}
</script>

<template>
  <main class="border-t border-gray-200 dark:border-gray-700">
    <vues-profile-card
      :creator="creatorState.getCreator"
      :components="vuesState.vueComponents"
      @edit="onLaunchEditVue"
      @logs="onViewLogs"
      @archive="onArchiveVue"
      @delete="onDeleteVue"
      @view="onViewVue"
    />
    <vue-editor class="h-1/2" :component="componentToEdit" />
  </main>
</template>
