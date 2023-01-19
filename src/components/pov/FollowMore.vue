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
    v-show="povState.getCreatorsToFollow"
    class="w-full p-5 mb-5 rounded-md bg-ll-neutral dark:bg-ld-neutral"
  >
    <li
      class="pb-3 mb-4 text-lg text-gray-700 border-b dark:text-gray-200 border-ll-border dark:border-ld-border"
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
