<script setup lang="ts">
import MoreIcon from 'vue-ionicons/dist/md-more.vue'
import Popper from 'vue3-popper'

const props = defineProps({
  canEdit: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['onEdit', 'onDelete'])
</script>

<template>
  <popper v-if="props.canEdit">
    <button class="relative transition-transform transform active:scale-95">
      <more-icon h="30" w="30" />
    </button>
    <template #content>
      <div
        class="flex justify-end w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
      >
        <ul class="py-1" aria-labelledby="dropdownButton">
          <li>
            <a
              class="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              @click="emit('onEdit')"
              >Edit</a
            >
          </li>
          <li>
            <a
              class="block px-4 py-2 text-sm text-red-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              @click="emit('onDelete')"
              >Delete</a
            >
          </li>
        </ul>
      </div>
    </template>
  </popper>
</template>
