<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: 'Unkown Error Occurred',
  },
  message: {
    type: String,
    default: 'But Did You Die?',
  },
})
</script>
<template>
  <div
    class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
    role="alert"
  >
    <span class="font-medium">{{ props.title }}</span>
    <p>{{ props.message }}</p>
  </div>
</template>
