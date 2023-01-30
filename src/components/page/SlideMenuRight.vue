<script setup lang="ts">
import WhatsHappening from '../pov/WhatsHappening.vue'
import FollowMore from '../pov/FollowMore.vue'
import AboutThisPage from './AboutThisPage.vue'
import DebugThisPage from './DebugThisPage.vue'
import { usePageState } from '../../store/state'
import PageOptions from './PageOptions.vue'

/// TODO: load these from the globe, as set by the viewer
const pageState = usePageState()
</script>
<template>
  <div
    class="flex flex-col w-full h-full px-2 py-2 max-w-min overflow-y-auto bg-ll-base dark:bg-ld-base ease-out transition-all"
  >
    <page-options />
    <about-this-page v-if="!pageState.disableAbout" />
    <debug-this-page v-if="pageState.debugMode" />
    <div v-for="component in pageState.getRightMenuComponents" :key="component">
      <whats-happening v-show="component === 'whats-happening'" />
      <follow-more v-show="component === 'follow-more'" />
    </div>
  </div>
</template>
