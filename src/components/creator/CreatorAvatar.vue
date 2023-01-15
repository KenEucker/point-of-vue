<script setup lang="ts">
const props = defineProps({
  avatar: {
    type: String,
    default: null,
  },
  showStatus: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div
    class="avatar rounded-full bg-ll-base dark:bg-ld-base border-2 border-ll-border dark:border-ld-border relative"
  >
    <img
      :src="props.avatar"
      class="rounded-full object-cover w-full h-full"
      :alt="`${props.avatar} profile picture`"
    />
  </div>
</template>
