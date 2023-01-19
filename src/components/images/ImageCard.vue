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
    <div class="w-full max-w-md p-2 bg-gray-900 shadow-lg min-w-50 rounded-xl">
      <div class="flex flex-col">
        <div class="">
          <div class="relative flex w-full mb-10" :class="props.variant === 'mini' ? 'h-30' : ''">
            <div v-if="props.variant !== 'mini'" class="absolute top-0 right-0 flex flex-col p-4">
              <pop-button
                variant="purple"
                class="w-8 h-8 text-gray-500 bg-gray-800 rounded-full shadow hover:shadow-md"
                @click="hearted = true"
              >
                <heart-full v-if="hearted" h="24" w="24" class="-ml-2 -mt-1.5 text-purple-700" />
                <heart-empty v-else h="24" w="24" class="-ml-2 -mt-1.5" />
              </pop-button>
            </div>
            <!-- <div class="absolute right-0 flex flex-col p-4 top-10">
              <pop-button
                variant="green"
                class="w-8 h-8 text-gray-500 bg-gray-800 rounded-full shadow hover:shadow-md"
              >
                <edit-icon h="24" w="24" class="-mt-2 -ml-2" />
              </pop-button>
            </div> -->
            <img
              :src="props.img"
              :alt="props.alt"
              :class="props.variant !== 'mini' ? 'object-fill' : ''"
              class="w-full cursor-pointer rounded-2xl"
            />
          </div>
          <div class="flex-auto justify-evenly">
            <div class="flex flex-wrap">
              <!-- <div class="flex items-center flex-none w-full text-sm text-gray-600">
                <star-icon h="18" w="18" class="text-red-500" />
                <span class="mr-3 text-gray-400 whitespace-nowrap">4.60</span
                ><span class="mr-2 text-gray-400">India</span>
              </div> -->
              <div class="flex items-center justify-between w-full min-w-0">
                <h2 class="mt-1 text-xl font-semibold text-white truncate">{{ props.title }}</h2>

                <div
                  v-if="props.src"
                  class="flex items-center px-2 py-1 ml-3 text-xs text-white bg-green-400 rounded-lg"
                >
                  {{ props.src }}
                </div>
              </div>
            </div>
            <h2
              v-if="props.variant !== 'mini'"
              class="mr-auto text-lg text-gray-400 cursor-pointer hover:text-purple-500"
            >
              {{ props.description }}
            </h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
