<script setup lang="ts">
import FollowCreator from '../creator/FollowCreator.vue'
import { usePovState } from '../../store/state'
import { onMounted } from 'vue'

const povState = usePovState()
onMounted(() => {
  povState.pruneCreatorsToFollow()
})
</script>
<template>
  <ul
    v-if="povState.getCreatorsToFollow"
    class="w-full bg-ll-neutral dark:bg-ld-neutral p-5 rounded-md mb-5"
  >
    <li
      class="dark:text-gray-200 text-gray-700 text-lg border-b pb-3 border-ll-border dark:border-ld-border mb-4"
    >
      <p>Who to follow</p>
    </li>
    <div
      v-for="creator in povState.getCreatorsToFollow"
      :key="creator.handle"
      class="flex items-center mb-4"
    >
      <follow-creator :creator="creator" />
    </div>
  </ul>
</template>
