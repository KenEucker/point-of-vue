<script setup lang="ts">
import LinkIcon from 'vue-ionicons/dist/md-link.vue'

const props = defineProps({
  website: {
    type: String,
    default: null,
  },
  showIcon: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <span v-if="props.website" class="flex mr-2">
    <a :href="props.website" target="#" class="leading-5 ml-1 text-blue-400">
      <link-icon v-if="props.showIcon" h="20" w="20" class="align-middle" />
      {{ props.website }}
    </a>
  </span>
</template>
