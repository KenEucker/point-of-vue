<script setup lang="ts">
import { usePovState } from '../../store/state'

const povState = usePovState()
</script>
<template>
  <ul class="w-full bg-ll-neutral dark:bg-ld-neutral p-5 rounded-md mb-5">
    <li
      class="dark:text-gray-200 text-gray-700 text-lg border-b pb-3 border-ll-border dark:border-ld-border"
    >
      <p>{{ povState.getTrendingTitle }}</p>
    </li>
    <li class="mb-4 mt-2">
      <p class="text-lg dark:text-gray-200 text-gray-700 font-bold">
        {{ povState.getTopTrendingTitle }}
      </p>
      <p class="text-xs">{{ povState.getTopTrendingText }}</p>
    </li>
    <li v-for="(trend, index) in povState.getTrending" :key="index" class="mb-4">
      <p class="text-xs">{{ trend.title }}</p>
      <p class="text-lg dark:text-gray-200 text-gray-700 font-bold">
        {{ trend.label }}
      </p>
      <p class="text-xs">{{ trend.stats }}</p>
    </li>
  </ul>
</template>
