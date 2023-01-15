<script setup lang="ts">
import PostFeed from '../components/post/PostFeed.vue'
import CreatePost from '../components/post/CreatePost.vue'
import { useWindowSize } from '@vueuse/core'
import { useMenuState, usePostsState, useCreatorState } from '../store/state'
import { ref, reactive } from 'vue'

const { width } = useWindowSize()
const menuState = useMenuState()
const creatorState = useCreatorState()
// const postsState = usePostsState()
// postsState.getAllPosts()
// console.log(postsState.init)
// const loaded = ref(postsState.init)
// const posts = reactive(postsState.getPosts)
</script>

<template>
  <div class="w-full">
    <create-post
      class="mt-2"
      :is-open="menuState.isCreatePostOpen"
      @on-open="menuState.openCreatePost()"
      @on-close="menuState.closeCreatePost()"
    />
    <post-feed
      :one-column="
        menuState.leftMenuOpen === true && menuState.rightMenuOpen === true && width < 1300
      "
    />
  </div>
</template>
