<script setup lang="ts">
import PopButton from '../atomic/PopButton.vue'
import PlayIcon from 'vue-ionicons/dist/md-arrow-dropright-circle.vue'
import SaveIcon from 'vue-ionicons/dist/md-save.vue'
import PublishIcon from 'vue-ionicons/dist/md-cloud-done.vue'

const props = defineProps<{
  modelValue: string
  tabs: Record<string, string>
}>()
const emit = defineEmits(['play', 'save', 'publish', 'update:modelValue'])
</script>

<template>
  <ul
    class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
  >
    <li v-for="name in Object.keys(props.tabs)" :key="props.tabs[name]" class="mr-2">
      <a
        :class="props.modelValue === props.tabs[name] ? 'tab-item-active' : 'tab-item'"
        href="#"
        @click.prevent="emit('update:modelValue', props.tabs[name])"
      >
        {{ name }}
      </a>
    </li>
    <li class="ml-10">
      <pop-button @click="emit('save')"
        ><span class="px-1 py-1 mt-0.25 text-green-600 rounded"><save-icon w="24" h="24" /></span>
      </pop-button>
    </li>
    <li class="ml-2">
      <pop-button @click="emit('publish')"
        ><span class="px-1 py-1 mt-0.25 text-green-600 rounded"
          ><publish-icon w="24" h="24"
        /></span>
      </pop-button>
    </li>
    <li class="ml-2">
      <pop-button @click="emit('play')"
        ><span class="px-1 py-1 mt-0.25 text-green-600 rounded"><play-icon w="24" h="24" /></span>
      </pop-button>
    </li>
  </ul>
</template>

<style>
.tab-item {
  @apply inline-block px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400;
}

.tab-item-active {
  @apply inline-block px-4 py-2 border-t-2 border-green-500 text-green-500 font-semibold;
}
</style>
