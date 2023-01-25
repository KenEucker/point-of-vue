<script setup lang="ts">
import { reactive, watch, ref } from 'vue'
import PovPost from './PovPost.vue'
import ErrorMessage from '../atomic/ErrorMessage.vue'
import { Post } from '../../schema/generated/types.d'
import { getGraphUrl, sleep } from '../../utilities'
import { usePostsState, useCreatorState } from '../../store/state'
import SpinnerWithError from '../atomic/SpinnerWithError.vue'

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
watch(postsState, () => {
  // console.log('postsState enter', postsState.getPostsLoading, postsState.postsHaveBeenLoaded)
  if (!postsState.getPostsLoading) {
    // console.log('postsState inject', postsState.getPosts)
    initialized.value = true
    injectPosts(postsState.getPosts)
  }
})

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
        createdAt
      }
    }
  }
`

const injectPosts = async (posts: any) => {
  leftPosts.splice(0, leftPosts.length)
  rightPosts.splice(0, rightPosts.length)

  for (let i = 0; i < posts.length; ++i) {
    await sleep(50)
    if (i % 2 != 0) {
      leftPosts.push(posts[i])
    } else {
      rightPosts.push(posts[i])
    }
  }
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

const isPostSelfPost = (post: Post) =>
  creatorState.isCreatorSignedUp && post.creator?.handle === creatorState.creator?.handle

if (!postsState.postsHaveBeenLoaded && !postsState.getPostsLoading) {
  postsState.getAllPosts()
} else {
  injectPosts(postsState.getPosts)
}
</script>

<template>
  <div>
    <spinner-with-error
      v-show="postsState.getPostsLoading || postsState.getPostsError"
      type="pov"
      :error="postsState.getPostsError?.message"
      error-title="Error Fetching Post Data"
      :full-screen="false"
    />
    <div
      v-show="!postsState.getPostsLoading && !postsState.getPostsError"
      class="grid w-full transition-all"
      :class="props.oneColumn ? 'md:grid-cols-1 px-2 pt-5' : 'md:grid-cols-2'"
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
