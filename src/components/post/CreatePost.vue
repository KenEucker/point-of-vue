<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useNow, useDateFormat } from '@vueuse/core'
import LoadingSpinner from '../atomic/LoadingSpinner.vue'
import ErrorMessage from '../atomic/ErrorMessage.vue'
import EmojiPicker from 'vue3-emoji-picker'
import { useMutation } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'
import { useCreatorState } from '../../store/state'
import CloseIcon from 'vue-ionicons/dist/md-close-circle-outline.vue'
import ImagesIcon from 'vue-ionicons/dist/md-images.vue'
import AddIcon from 'vue-ionicons/dist/md-add-circle-outline.vue'
import MinusIcon from 'vue-ionicons/dist/md-remove-circle-outline.vue'
import CheckMark from 'vue-ionicons/dist/md-checkmark-circle.vue'
import PovPostMedia from './PovPostMedia.vue'
import Popper from 'vue3-popper'

const creatorState = useCreatorState()
let newPostLoading = ref(false)
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

const firstTitle = useDateFormat(useNow(), 'MMMM DD, YYYY').value
const titleRef = ref()
const statusRef = ref()
const textRef = ref()
const errorMessage = ref('')
const errors = ref()
const images = ref([''])
const showImages = ref(false)
const showEmojiPicker = reactive({
  show: false,
  emoji: null,
})

const onSelectEmoji = (emoji: any) => {
  showEmojiPicker.show = false
  showEmojiPicker.emoji = emoji
  statusRef.value.value = emoji.i
}

const getNewTitle = () => {
  if (titleRef.value?.value?.length) {
    return
  }
  const formatted = useDateFormat(useNow(), 'MMMM DD, YYYY @ hh:mm a')
  titleRef.value.value = formatted.value
}

const closeCreatePost = () => {
  emit('onClose')
}

const openCreatePost = () => {
  emit('onOpen')
}

async function createNewPost() {
  newPostLoading.value = true
  const newPostData = {
    creatorId: creatorState.getCreatorId,
    text: textRef.value.value,
    status: statusRef.value.value,
    title: titleRef.value.value,
    published: true,
    media: showImages.value && images.value.length > 0 ? images.value : undefined,
  }

  try {
    const newlyCreatedPost = await useCreatePostMutation({ post: newPostData })
    newPostLoading.value = false
    textRef.value.value = ''
    statusRef.value.value = ''
    titleRef.value.value = ''
    emit('onNewPostCreated', newlyCreatedPost)
    closeCreatePost()
  } catch (e: any) {
    textRef.value.value = newPostData.text
    statusRef.value.value = newPostData.status
    titleRef.value.value = newPostData.title
    console.error(e.message)
    errors.value = true
    errorMessage.value = e.message
    newPostLoading.value = false
  }
}

onMounted(() => {
  if (props.isFocused) {
    textRef.value.focus()
  }
})

function saveImages() {
  if (images.value.length === 0) {
    showImages.value = false
  } else {
    showImages.value = true
  }
}
</script>

<template>
  <div class="" @click="errors = false">
    <div v-show="newPostLoading">
      <loading-spinner :full-screen="false" />
    </div>
    <div
      v-show="!newPostLoading"
      class="relative flex flex-col mx-2 transition-all rounded-md bg-ll-neutral dark:bg-ld-neutral"
      :class="props.isOpen ? 'h-full p-5' : 'overflow-hidden h-0 p-0'"
    >
      <div class="flex">
        <emoji-picker
          v-show="showEmojiPicker.show"
          :input="true"
          class="absolute z-2000"
          :native="true"
          @select="onSelectEmoji"
        />
        <input
          ref="statusRef"
          type="text"
          class="w-20 p-2 mb-2 text-lg text-center rounded-md outline-none bg-ll-base dark:bg-ld-base"
          placeholder="status"
          resize="none"
          @focus="showEmojiPicker.show = true"
        />
        <input
          ref="titleRef"
          type="text"
          class="w-3/4 p-2 mx-auto mb-2 text-lg rounded-md outline-none bg-ll-base dark:bg-ld-base"
          :placeholder="firstTitle"
          :value="''"
          resize="none"
        />
      </div>
      <div class="flex w-full h-full">
        <textarea
          ref="textRef"
          class="w-full h-full p-4 text-lg rounded-md outline-none bg-ll-base dark:bg-ld-base"
          :class="showImages ? 'w-1/3' : ''"
          placeholder="What's happening?"
          :rows="showImages ? '10' : '4'"
          resize="none"
          @input="getNewTitle"
        ></textarea>
        <pov-post-media v-if="showImages" class="w-2/3 ml-4" :media="images" />
      </div>
      <div class="flex items-center justify-between w-full pt-3 z-1">
        <popper placement="right">
          <div class="flex">
            <button
              class="flex items-center justify-center w-10 h-10 mr-2 transition-transform transform border rounded-md border-ll-border dark:border-ld-border bg-ll-base dark:bg-ld-base dark:text-gray-500 active:scale-95"
            >
              <images-icon class="m-auto" h="30" w="30" />
            </button>
          </div>
          <template #content="{ close }">
            <div class="flex justify-center">
              <div class="block max-w-sm p-6 rounded-lg shadow-lg border-white-2 bg-ld-neutral">
                <h5 class="mb-2 text-xl font-medium leading-tight">Add Image Urls</h5>
                <p v-for="(image, i) in images" :key="i" class="mb-4 text-base">
                  <input
                    v-model="images[i]"
                    type="url"
                    placeholder="http://example.com"
                    class="inline-block align-middle"
                  />
                  <button
                    type="button"
                    class="px-2 py-1 ml-2 text-xs font-medium leading-tight uppercase align-middle transition duration-150 ease-in-out rounded shadow-md space-between dark:text-white bg-ll-primary hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg"
                    @click="images.splice(i)"
                  >
                    <minus-icon h="24" w="24" />
                  </button>
                </p>
                <div class="flex justify-end">
                  <button
                    type="button"
                    class="px-2 py-1 text-xs font-medium leading-tight uppercase transition duration-150 ease-in-out rounded shadow-md space-between dark:text-white bg-ll-primary hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg"
                    @click="images.push('')"
                  >
                    <add-icon h="24" w="24" />
                  </button>
                  <button
                    type="submit"
                    class="px-2 py-1 ml-4 text-xs font-medium leading-tight uppercase transition duration-150 ease-in-out rounded shadow-md space-between dark:text-white bg-ll-primary hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg"
                    @click="saveImages(), close()"
                  >
                    <check-mark h="24" w="24" />
                  </button>
                </div>
              </div>
            </div>
          </template>
        </popper>
        <popper :show="errors" placement="bottom">
          <template #default></template>
          <template #content>
            <error-message :message="errorMessage" title="Error creating post" />
          </template>
        </popper>
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
