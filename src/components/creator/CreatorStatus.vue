<script setup lang="ts">
const props = defineProps({
  status: {
    type: String,
    default: null,
  },
})
</script>

<template>
  {{ props.status }}
</template>
