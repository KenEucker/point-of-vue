<script setup lang="ts">
const props = defineProps({
  post: {
    type: Object,
    default: () => {
      return {}
    },
    required: true,
  },
})
const generateText = () => {
  return props.post?.text?.replace(
    /#(\S*)/g,
    '<a class="text-ll-primary" href="/search/$1">#$1</a>'
  )
}
</script>

<template>
  <p :class="props.post?.text ? ' my-4 text-xl' : ''">{{ generateText() }}</p>
</template>
