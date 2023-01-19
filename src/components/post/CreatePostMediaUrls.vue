<script setup lang="ts">
import { ref } from 'vue'
import ImagesIcon from 'vue-ionicons/dist/md-images.vue'
import AddIcon from 'vue-ionicons/dist/md-add-circle-outline.vue'
import MinusIcon from 'vue-ionicons/dist/md-remove-circle-outline.vue'
import CheckMark from 'vue-ionicons/dist/md-checkmark-circle.vue'
import Popper from 'vue3-popper'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
})

const errorMessage = ref('')
const errors = ref()

const emit = defineEmits(['update:modelValue'])

const showImages = ref(false)
const images = ref(props.modelValue)

function saveImages() {
  emit('update:modelValue', images)
  if (images.value.length === 0) {
    showImages.value = false
  } else {
    showImages.value = true
  }
}
</script>

<template>
  <popper placement="right">
    <div class="flex">
      <button
        class="flex items-center justify-center w-10 h-10 mr-2 transition-transform transform border rounded-md border-ll-border dark:border-ld-border bg-ll-base dark:bg-ld-base dark:text-gray-500 active:scale-95"
      >
        <images-icon class="m-auto" h="30" w="30" />
      </button>
    </div>
    <template #content="{ close }">
      <div class="flex justify-center">
        <div class="block max-w-sm p-6 rounded-lg shadow-lg border-white-2 bg-ld-neutral">
          <h5 class="mb-2 text-xl font-medium leading-tight">Add Image Urls</h5>
          <p v-for="(image, i) in images" :key="i" class="mb-4 text-base">
            <input
              v-model="images[i]"
              type="url"
              placeholder="http://example.com"
              class="inline-block align-middle"
            />
            <button
              type="button"
              class="px-2 py-1 ml-2 text-xs font-medium leading-tight uppercase align-middle transition duration-150 ease-in-out rounded shadow-md space-between dark:text-white bg-ll-primary hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg"
              @click="images.splice(i)"
            >
              <minus-icon h="24" w="24" />
            </button>
          </p>
          <div class="flex justify-end">
            <button
              type="button"
              class="px-2 py-1 text-xs font-medium leading-tight uppercase transition duration-150 ease-in-out rounded shadow-md space-between dark:text-white bg-ll-primary hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg"
              @click="images.push('')"
            >
              <add-icon h="24" w="24" />
            </button>
            <button
              type="submit"
              class="px-2 py-1 ml-4 text-xs font-medium leading-tight uppercase transition duration-150 ease-in-out rounded shadow-md space-between dark:text-white bg-ll-primary hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg"
              @click="saveImages(), close()"
            >
              <check-mark h="24" w="24" />
            </button>
          </div>
        </div>
      </div>
    </template>
  </popper>
</template>
