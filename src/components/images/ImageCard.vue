<script setup lang="ts">
import { ref } from 'vue'
import HeartEmpty from 'vue-ionicons/dist/md-heart-empty.vue'
import HeartFull from 'vue-ionicons/dist/md-heart.vue'
// import EditIcon from 'vue-ionicons/dist/md-radio-button-on.vue'
import EditIcon from 'vue-ionicons/dist/md-arrow-dropdown-circle.vue'
import PopButton from '../atomic/PopButton.vue'

const props = defineProps({
  img: {
    type: String,
    default: '',
    required: true,
  },
  alt: {
    type: String,
    default: '',
    required: true,
  },
  full: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
  src: {
    type: String,
    default: null,
  },
  variant: {
    type: String,
    default: 'full',
  },
})

const hearted = ref(false)
</script>
<template>
  <div class="p-2">
    <div class="max-w-md min-w-50 w-full bg-gray-900 shadow-lg rounded-xl p-2">
      <div class="flex flex-col">
        <div class="">
          <div class="relative w-full flex mb-10" :class="props.variant === 'mini' ? 'h-30' : ''">
            <div v-if="props.variant !== 'mini'" class="absolute flex flex-col top-0 right-0 p-4">
              <pop-button
                variant="purple"
                class="bg-gray-800 shadow text-gray-500 rounded-full w-8 h-8 hover:shadow-md"
                @click="hearted = true"
              >
                <heart-full v-if="hearted" h="24" w="24" class="-ml-2 -mt-1.5 text-purple-700" />
                <heart-empty v-else h="24" w="24" class="-ml-2 -mt-1.5" />
              </pop-button>
            </div>
            <!-- <div class="absolute flex flex-col top-10 right-0 p-4">
              <pop-button
                variant="green"
                class="bg-gray-800 shadow text-gray-500 rounded-full w-8 h-8 hover:shadow-md"
              >
                <edit-icon h="24" w="24" class="-ml-2 -mt-2" />
              </pop-button>
            </div> -->
            <img
              :src="props.img"
              :alt="props.alt"
              :class="props.variant !== 'mini' ? 'object-fill' : ''"
              class="rounded-2xl cursor-pointer w-full"
            />
          </div>
          <div class="flex-auto justify-evenly">
            <div class="flex flex-wrap">
              <!-- <div class="w-full flex-none text-sm flex items-center text-gray-600">
                <star-icon h="18" w="18" class="text-red-500" />
                <span class="text-gray-400 whitespace-nowrap mr-3">4.60</span
                ><span class="mr-2 text-gray-400">India</span>
              </div> -->
              <div class="flex items-center w-full justify-between min-w-0">
                <h2 class="text-xl text-white font-semibold mt-1 truncate">{{ props.title }}</h2>

                <div
                  v-if="props.src"
                  class="flex items-center bg-green-400 text-white text-xs px-2 py-1 ml-3 rounded-lg"
                >
                  {{ props.src }}
                </div>
              </div>
            </div>
            <h2
              v-if="props.variant !== 'mini'"
              class="text-lg mr-auto cursor-pointer text-gray-400 hover:text-purple-500"
            >
              {{ props.description }}
            </h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
