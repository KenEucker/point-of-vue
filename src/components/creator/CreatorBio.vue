<script setup lang="ts">
const props = defineProps({
  bio: {
    type: String,
    default: null,
  },
})
</script>

<template>
  {{ props.bio }}
</template>
