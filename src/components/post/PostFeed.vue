<script setup lang="ts">
import { reactive, watch, ref } from 'vue'
import PovPost from './PovPost.vue'
import LoadingSpinner from '../atomic/LoadingSpinner.vue'
import ErrorMessage from '../atomic/ErrorMessage.vue'
import { Post } from '../../schema/generated/types.d'
import { getGraphUrl } from '../../utilities'
import { usePostsState, useCreatorState } from '../../store/state'

const creatorState = useCreatorState()

const props = defineProps({
  oneColumn: {
    type: Boolean,
    default: false,
  },
})

let leftPosts: Post[] = reactive([])
let rightPosts: Post[] = reactive([])
const initialized = ref(false)

const postsState = usePostsState()
const postsLoaded = reactive(postsState)
watch(postsLoaded, () => {
  if (!postsState.getPostsLoading) {
    initialized.value = true
    injectPosts()
  }
})
postsState.getAllPosts()

const newPostSubscription = `
  subscription NewPostPostFeed {
    post {
      mutation
      data {
        id
        title
        creator {
          id
          name
          handle
          verified
          avatar
        }
        text
        media
      }
    }
  }
`

const injectPosts = () => {
  postsState.getPosts.forEach((post: Post, index: number) => {
    if (index % 2 != 0) {
      leftPosts.push(post)
    } else {
      rightPosts.push(post)
    }
  })
}

const url = new URL(getGraphUrl())

url.searchParams.append('query', newPostSubscription)
const eventsource = new EventSource(url.toString(), {
  withCredentials: true, // This is required for cookies
})

eventsource.onmessage = function (event) {
  const data = JSON.parse(event.data)
  const { data: post, mutation } = data.data.post

  if (mutation === 'CREATED') {
    if (leftPosts.length > rightPosts.length) {
      leftPosts.unshift(post)
    } else {
      rightPosts.unshift(post)
    }
  } else if (mutation === 'DELETED') {
    const isOnLeftIndex = leftPosts.findIndex((p) => p.id === post.id)
    if (isOnLeftIndex !== -1) {
      leftPosts.splice(isOnLeftIndex, 1)
    } else {
      const isOnRightIndex = rightPosts.findIndex((p) => p.id === post.id)
      if (isOnRightIndex !== -1) {
        rightPosts.splice(isOnRightIndex, 1)
      }
    }
  }
}

/// Provided by ChatGPT
function getRandomIntInclusive(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min // The maximum is inclusive and the minimum is inclusive
}

const isPostSelfPost = (post: Post) => post.creator?.handle === creatorState.creator?.handle
</script>

<template>
  <div>
    <div v-if="postsState.getPostsLoading" class="mt-5">
      <loading-spinner />
    </div>
    <div v-else-if="postsState.getPostsError">
      <error-message title="Error Fetching Post Data" :message="postsState.getPostsError.message" />
    </div>
    <div
      v-else
      class="grid w-full transition-all"
      :class="props.oneColumn ? 'md:grid-cols-1 px-20 pt-5' : 'md:grid-cols-2'"
    >
      <div class="flex flex-col p-2">
        <pov-post
          v-for="post in rightPosts"
          :key="`id-${post.id}`"
          v-motion
          :initial="{
            y: getRandomIntInclusive(-100, -80),
            opacity: 0.2,
            scale: 1,
          }"
          :enter="{
            y: 0,
            scale: 1,
            opacity: 1,
            transition: {
              stiffness: getRandomIntInclusive(70, 100).toString(),
              delay: getRandomIntInclusive(25, 200),
            },
          }"
          :is-self-post="isPostSelfPost(post)"
          :post="post"
        ></pov-post>
      </div>
      <div class="flex flex-col p-2">
        <pov-post
          v-for="post in leftPosts"
          :key="`id-${post.id}`"
          v-motion
          :initial="{
            y: getRandomIntInclusive(-100, -80),
            opacity: 0.2,
            scale: 1,
          }"
          :enter="{
            y: 0,
            scale: 1,
            opacity: 1,
            transition: {
              stiffness: getRandomIntInclusive(70, 100).toString(),
              delay: getRandomIntInclusive(25, 200),
            },
          }"
          :is-self-post="isPostSelfPost(post)"
          :post="post"
        ></pov-post>
      </div>
    </div>
  </div>
</template>
