<script setup lang="ts">
import { usePageState } from '../../store/state'
const pageState = usePageState()
</script>
<template>
  <ul class="w-full bg-ll-neutral dark:bg-ld-neutral p-5 rounded-md mb-5">
    <li
      class="dark:text-gray-200 text-gray-700 text-lg border-b pb-3 border-ll-border dark:border-ld-border"
    >
      <p>{{ pageState.getAboutPage.title }}</p>
    </li>
    <li class="mb-2 mt-2">
      <p v-for="(body, i) in pageState.getAboutPage.body" :key="i" class="text-md">
        {{ body }}
      </p>
    </li>
  </ul>
</template>
