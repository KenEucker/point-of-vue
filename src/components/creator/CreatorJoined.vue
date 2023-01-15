<script setup lang="ts">
import CalendarIcon from 'vue-ionicons/dist/md-calendar.vue'

const props = defineProps({
  joined: {
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
  <span v-if="props.joined" class="flex mr-2">
    <span class="leading-5 ml-1">
      <calendar-icon v-if="props.showIcon" h="20" w="20" class="align-middle" />
      Joined {{ props.joined }}
    </span>
  </span>
</template>
