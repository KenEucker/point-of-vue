<script setup lang="ts">
import { studioUrl } from '../utilities'
</script>

<template>
  <div class="w-full h-600">
    <iframe class="w-full h-full" :src="studioUrl" />
  </div>
</template>
