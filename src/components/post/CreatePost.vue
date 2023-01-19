<script setup lang="ts">
import { ref, onMounted, reactive, computed } from 'vue'
import { useNow, useDateFormat } from '@vueuse/core'
import LoadingSpinner from '../atomic/PovLoading.vue'
import { useMutation } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'
import { useCreatorState } from '../../store/state'
import CloseIcon from 'vue-ionicons/dist/md-close-circle-outline.vue'
import PostMedia from './PostMedia.vue'
import CreatePostTitleStatus from './CreatePostTitleStatus.vue'
import CreatePostImages from './CreatePostMediaUrls.vue'
import ErrorMessage from '../atomic/ErrorMessage.vue'
import Popper from 'vue3-popper'

const creatorState = useCreatorState()
let newPostLoading = ref(false)
const textInputRef = ref()
const errorMessage = ref('')
const errors = ref()
const newPostData = reactive({
  creatorId: 0,
  text: '',
  status: '',
  title: '',
  published: true,
  media: [],
})

const showImages = computed(() => newPostData.media.length > 0)

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  isFocused: {
    type: Boolean,
    default: false,
  },
})

const mutation = gql`
  mutation CreateNewPost($post: CreatePostInput!) {
    createPost(post: $post) {
      id
    }
  }
`
const { mutate: useCreatePostMutation } = useMutation(mutation)
const emit = defineEmits(['onClose', 'onOpen', 'onNewPostCreated'])

const getNewTitle = () => {
  console.log('newt', newPostData)
  if (newPostData.title.length) {
    return
  }
  const formatted = useDateFormat(useNow(), 'MMMM DD, YYYY @ hh:mm a')
  newPostData.title = formatted.value
}

const closeCreatePost = () => {
  emit('onClose')
}

async function createNewPost() {
  newPostLoading.value = true
  try {
    newPostData.creatorId = creatorState.getCreatorId
    const newlyCreatedPost = await useCreatePostMutation({ post: newPostData })
    console.log({ newlyCreatedPost })
    newPostLoading.value = false
    newPostData.media = []
    newPostData.status = ''
    newPostData.text = ''
    newPostData.title = ''
    emit('onNewPostCreated', newlyCreatedPost)
    closeCreatePost()
  } catch (e: any) {
    console.error(e.message)
    errors.value = true
    errorMessage.value = e.message
    newPostLoading.value = false
  }
}

onMounted(() => {
  if (props.isFocused) {
    textInputRef.value.focus()
  }
})
</script>

<template>
  <div>
    <div v-show="newPostLoading">
      <loading-spinner :full-screen="false" />
      <popper :show="errors" placement="bottom">
        <template #default></template>
        <template #content>
          <error-message :message="errorMessage" title="Error creating post" />
        </template>
      </popper>
    </div>
    <div
      v-show="!newPostLoading"
      class="relative flex flex-col mx-2 transition-all rounded-md bg-ll-neutral dark:bg-ld-neutral"
      :class="props.isOpen ? 'h-full p-5' : 'overflow-hidden h-0 p-0'"
    >
      <create-post-title-status
        v-model:title="newPostData.title"
        v-model:status="newPostData.status"
      />
      <div class="flex w-full h-full">
        <textarea
          ref="textInputRef"
          v-model="newPostData.text"
          class="w-full h-full p-4 text-lg rounded-md outline-none bg-ll-base dark:bg-ld-base"
          :class="showImages ? 'w-1/3' : ''"
          placeholder="What's happening?"
          :rows="showImages ? '10' : '4'"
          resize="none"
          @input="getNewTitle"
        ></textarea>
        <post-media v-if="showImages" class="w-2/3 ml-4" :media="newPostData.media" />
      </div>
      <div class="flex items-center justify-between w-full pt-3 z-1">
        <create-post-images v-model="newPostData.media" />
        <div class="flex">
          <button
            class="flex items-center px-5 py-2 text-sm text-white transition-transform transform rounded-md bg-ll-primary dark:bg-ld-primary active:scale-95"
            @click="createNewPost"
          >
            Post
          </button>
        </div>
      </div>
      <button
        class="absolute flex items-center w-8 h-8 mr-2 text-sm transition-transform transform border rounded-full -top-0 -right-1 bg-ll-neutral dark:bg-ld-neutral border-ll-border dark:border-ld-border active:scale-95"
        @click="closeCreatePost"
      >
        <close-icon class="m-auto" h="30" w="30" />
      </button>
    </div>
  </div>
</template>
