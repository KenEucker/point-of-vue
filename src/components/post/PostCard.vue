<script setup lang="ts">
import MoreIcon from 'vue-ionicons/dist/md-more.vue'
import PovPostInteractionsBar from './PovPostInteractionsBar.vue'
import PostText from './PostText.vue'
import PovCreator from '../creator/CreateCreator.vue'
import PovPostMedia from './PovPostMedia.vue'
import { usePovState, useCreatorState } from '../../store/state'

const povStore = usePovState()
const creatorState = useCreatorState()

const props = defineProps({
  post: {
    type: Object,
    default: () => {
      return {}
    },
    required: true,
  },
})
</script>

<template>
  <div class="flex flex-col w-full p-5 mb-4 rounded-md bg-ll-neutral dark:bg-ld-neutral relative">
    <div class="flex justify-between">
      <pov-creator :creator="props.post?.creator" />
      <button class="relative transition-transform transform active:scale-95">
        <more-icon h="30" w="30" class="absolute top-0 right-0" />
      </button>
    </div>
    <p class="flex justify-between py-1 mt-2 -mb-3 text-xs text-slate-800 dark:text-white">
      {{ props.post.title }}
    </p>

    <post-text :post="props.post" />
    <pov-post-media :media="props.post?.media" />
    <pov-post-interactions-bar
      v-if="!povStore.isSimpleMode"
      :creator-id="creatorState.getCreatorId"
      :post-id="props.post.id"
      :disable-interaction="true"
    />
  </div>
</template>
