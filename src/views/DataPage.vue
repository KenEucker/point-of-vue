<script setup lang="ts">
import { studioUrl } from '../utilities'
import FramedUrl from '../components/atomic/FramedUrl.vue'
</script>

<template>
  <div class="w-full h-screen">
    <framed-url class="w-full h-full" :src="studioUrl" />
  </div>
</template>
