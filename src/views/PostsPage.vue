<script setup lang="ts">
import PostFeed from '../components/post/PostFeed.vue'
import CreatePost from '../components/post/CreatePost.vue'
import { useWindowSize } from '@vueuse/core'
import { usePageState, usePostsState, useCreatorState } from '../store/state'
import { ref, reactive } from 'vue'

const { width } = useWindowSize()
const pageState = usePageState()
</script>

<template>
  <div class="w-full">
    <create-post
      class="mt-2"
      :is-open="pageState.isCreatePostOpen"
      @on-open="pageState.openCreatePost()"
      @on-close="pageState.closeCreatePost()"
    />
    <post-feed
      :one-column="
        pageState.leftMenuOpen === true && pageState.rightMenuOpen === true && width < 1300
      "
    />
  </div>
</template>
