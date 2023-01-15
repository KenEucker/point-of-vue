<script setup lang="ts">
import WhatsHappening from '../pov/WhatsHappening.vue'
import FollowMore from '../pov/FollowMore.vue'
import AboutThisPage from '../about/AboutThisPage.vue'
</script>
<template>
  <div class="w-full h-full flex flex-col py-2 px-2 bg-ll-base dark:bg-ld-base overflow-y-auto">
    <about-this-page />
    <whats-happening />
    <follow-more />
  </div>
</template>
