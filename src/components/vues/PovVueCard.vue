<script setup lang="ts">
import VueComponent from './VueComponent.vue'
import ErrorIcon from 'vue-ionicons/dist/md-alert.vue'
import ArchivedIcon from 'vue-ionicons/dist/md-cloud-download.vue'
import PublishedIcon from 'vue-ionicons/dist/md-cloud-done.vue'

const props = defineProps({
  component: {
    type: Object,
    default: () => ({}),
  },
})
</script>
<template>
  <vue-component :component="props.component" :show-status="true">
    <div class="flex px-6 py-4">
      <div class="text-base font-light text-gray-800 max-w-75">
        <span class="block text-sm text-gray-600">{{ component.description }}</span>
      </div>
    </div>
    <div class="px-6 py-2 font-light text-gray-600">
      <span
        v-if="component.archivedAt || component.publishedAt"
        class="font-semibold text-black mr-2"
        >{{ component.vues.toLocaleString() }}</span
      >
      <span v-if="component.archivedAt">people used this vue over its lifetime</span>
      <span v-else-if="component.publishedAt">people are using this vue</span>
      <span v-else-if="component.erroredAt">this vue cannot be published</span>
      <span v-else>not yet published</span>
    </div>
    <div class="flex justify-center px-6 py-2 pl-3 sm:justify-start">
      <div v-if="component.archivedAt">
        <archived-icon h="24" w="24" class="align-top text-purple-500" />
        <span class="ml-3 text-base font-light">arhived from the globe on </span>
        <span class="ml-1 text-base font-light">{{ component.archivedAt.toDateString() }}</span>
      </div>
      <div v-else-if="component.publishedAt">
        <published-icon h="24" w="24" class="align-top text-emerald-500" />
        <span class="ml-3 text-base font-light">published to the globe on </span>
        <span class="ml-1 text-base font-light">{{ component.publishedAt.toDateString() }}</span>
      </div>
      <div v-else-if="component.erroredAt">
        <error-icon h="24" w="24" class="align-top text-red-500" />
        <span class="ml-3 text-base font-light">last errored on </span>
        <span class="ml-1 text-base font-light">{{ component.erroredAt.toDateString() }}</span>
      </div>
    </div>
  </vue-component>
</template>
