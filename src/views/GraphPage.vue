<script setup lang="ts">
import { getGraphUrl } from '../utilities'
</script>

<template>
  <div class="w-full h-screen">
    <iframe class="w-full h-full" :src="getGraphUrl(true)"> </iframe>
  </div>
</template>
