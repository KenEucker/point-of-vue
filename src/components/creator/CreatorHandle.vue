<script setup lang="ts">
const props = defineProps({
  handle: {
    type: String,
    default: null,
  },
})
</script>

<template>@{{ props.handle }}</template>
