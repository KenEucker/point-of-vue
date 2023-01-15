<script setup lang="ts">
import { ref } from 'vue'
import PovCreator from './CreateCreator.vue'

const followed = ref(true)
const props = defineProps({
  creator: {
    type: Object,
    default: () => {
      return {}
    },
    required: true,
  },
  imageOnly: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'small',
  },
})

function followCreator() {
  if (followed.value === true) {
    followed.value = false
  } else {
    followed.value = true
  }
}
</script>
<template>
  <div
    class="flex relative justify-between w-full"
    :class="props.size === 'large' ? 'inline-grid' : 'items-center'"
  >
    <pov-creator
      :creator="creator"
      :size="props.size"
      :image-only="props.imageOnly"
      class="inlife-flex"
    />
    <button
      class="relative inline-flex items-center justify-center text-white p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
      :class="
        followed
          ? 'ring-2 ring-orange-400 dark:ring-0'
          : 'group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white'
      "
    >
      <span
        class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md"
        :class="
          followed ? 'group-hover:bg-opacity-0' : 'bg-gradient-to-br from-pink-500 to-orange-400'
        "
        @click="followCreator"
      >
        {{ followed ? 'Following' : 'Follow' }}
      </span>
    </button>
  </div>
</template>
