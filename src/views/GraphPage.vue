<script setup lang="ts">
import { getGraphUrl } from '../utilities'
</script>

<template>
  <div class="w-full h-600">
    <iframe class="w-full h-full" :src="getGraphUrl(true)" />
  </div>
</template>
