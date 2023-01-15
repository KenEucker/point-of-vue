<script setup lang="ts">
import PostOptions from './PostOptions.vue'
import PovPostInteractionsBar from './PovPostInteractionsBar.vue'
import LoadingSpinner from '../atomic/LoadingSpinner.vue'
import PostText from './PostText.vue'
import PovCreator from '../creator/CreateCreator.vue'
import PovPostMedia from './PovPostMedia.vue'
import { useRouter } from 'vue-router'
import { usePovState, useCreatorState } from '../../store/state'
import { useMutation } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'
import { ref } from 'vue'

const povStore = usePovState()
const creatorState = useCreatorState()
const router = useRouter()
const isLoading = ref(false)

const mutation = gql`
  mutation CreatorDeletePost($id: Int!) {
    deletePost(id: $id) {
      id
    }
  }
`
const { mutate: useDeletePostMutation } = useMutation(mutation)

function goToCreatorPage() {
  router.push(`/${props.post.creator.handle}`)
}

const props = defineProps({
  post: {
    type: Object,
    default: () => {
      return {}
    },
    required: true,
  },
  isSelfPost: {
    type: Boolean,
    default: false,
  },
})

async function deletePost() {
  isLoading.value = true
  const where = { id: props.post.id }
  await useDeletePostMutation(where)
  isLoading.value = false
}
</script>

<template>
  <div class="flex flex-col w-full p-5 mb-4 rounded-md bg-ll-neutral dark:bg-ld-neutral relative">
    <loading-spinner v-if="isLoading" :full-screen="false" />
    <div v-else>
      <div class="flex justify-between">
        <button @click="goToCreatorPage">
          <pov-creator :creator="props.post?.creator" />
        </button>
        <post-options
          class="absolute top-4 right-2"
          :creator-id="creatorState.getCreatorId"
          :post-id="props.post.id"
          :can-edit="creatorState.isLoggedIn && props.isSelfPost"
          @on-delete="deletePost"
        />
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
      />
    </div>
  </div>
</template>
