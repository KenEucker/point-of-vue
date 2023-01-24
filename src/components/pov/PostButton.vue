<script setup lang="ts">
import PostPov from 'vue-ionicons/dist/md-bonfire.vue'
import { usePageState, useCreatorState } from '../../store/state'
import { useRouter } from 'vue-router'

const router = useRouter()
const pageState = usePageState()
const creatorState = useCreatorState()

const props = defineProps({
  isExpanded: {
    type: Boolean,
    default: false,
    required: true,
  },
})

function postButtonClick() {
  pageState.openCreatePost()
  pageState.closeLeftMenu()

  router.push('/posts')
}
</script>

<template>
  <button
    v-show="creatorState.isLoggedIn"
    class="flex items-center justify-center w-full py-3 text-white transition-transform transform rounded-lg max-w-50 md:max-w-90 bg-ll-primary dark:bg-ld-primary active:scale-95"
    :class="`${props.isExpanded ? '' : 'px-6'}`"
    @click="postButtonClick"
  >
    <p v-show="props.isExpanded" class="mr-4">Post</p>
    <post-pov class="" w="30" h="30" />
  </button>
</template>
