<script setup lang="ts">
import WhatsHappening from '../pov/WhatsHappening.vue'
import FollowMore from '../pov/FollowMore.vue'
import AboutThisPage from '../about/AboutThisPage.vue'
import { usePageState } from '../../store/state'

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
  <div class="flex flex-col w-full h-full px-2 py-2 overflow-y-auto bg-ll-base dark:bg-ld-base">
    <about-this-page v-if="!pageState.disableAbout" />
    <whats-happening v-show="props.components.find((c) => c === 'whats-happening')" />
    <follow-more />
  </div>
</template>
