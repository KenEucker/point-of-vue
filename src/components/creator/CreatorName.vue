<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    default: null,
  },
})
</script>

<template>
  {{ props.name }}
</template>
