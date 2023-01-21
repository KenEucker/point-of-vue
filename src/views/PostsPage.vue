<script setup lang="ts">
import PostFeed from '../components/post/PostFeed.vue'
import CreatePost from '../components/post/CreatePost.vue'
import { usePageState } from '../store/state'

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
        pageState.leftMenuOpen === true &&
        pageState.rightMenuOpen === true &&
        pageState.width < 1300
      "
    />
  </div>
</template>
