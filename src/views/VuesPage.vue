<script setup lang="ts">
import VuesProfileCard from '../components/vues/VuesProfileCard.vue'
import SlideMenuBottom from '../components/page/SlideMenuBottom.vue'
import VueEditor from '../components/vues/VueEditor.vue'

import { useCreatorState, useGithubState, usePageState } from '../store/state'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { PovComponent } from '../utilities'

const creatorState = useCreatorState()
const githubState = useGithubState()
const pageState = usePageState()

githubState.fetchAccount()

const componentToEdit = ref<any>({})

onMounted(() => {
  if (!githubState.hasCredentials()) {
    const router = useRouter()
    console.info('no way josé', { creatorCredentialsInvalid: true, path: '/vues' })
    router.push({ path: '/', replace: true })
  }

  githubState.fetchVues()
})

const onLaunchEditVue = (vueId: string) => {
  componentToEdit.value = githubState.getVueComponent(vueId)
  pageState.openBottomMenu()
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
const onSaveVue = (vue: PovComponent) => {
  pageState.setNotification(`Your Vue [${vue.title}] has been saved`)
}
const onPublishVue = (vue: any) => {
  pageState.setNotification(`Your Vue [${vue.title}] has been submitted to be published`)
}
</script>

<template>
  <main class="border-t border-gray-200 dark:border-gray-700">
    <vues-profile-card
      :creator="creatorState.getCreator"
      :components="githubState.vueComponents"
      @edit="onLaunchEditVue"
      @logs="onViewLogs"
      @archive="onArchiveVue"
      @delete="onDeleteVue"
      @view="onViewVue"
    />
    <slide-menu-bottom>
      <vue-editor
        class="h-full"
        :component="componentToEdit"
        @save="onSaveVue"
        @publish="onPublishVue"
      />
    </slide-menu-bottom>
  </main>
</template>
