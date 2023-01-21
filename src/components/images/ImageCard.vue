<script setup lang="ts">
import { ref } from 'vue'
import HeartEmpty from 'vue-ionicons/dist/md-heart-empty.vue'
import HeartFull from 'vue-ionicons/dist/md-heart.vue'
// import EditIcon from 'vue-ionicons/dist/md-radio-button-on.vue'
import EditIcon from 'vue-ionicons/dist/md-arrow-dropdown-circle.vue'
import PopButton from '../atomic/PopButton.vue'
import Popper from 'vue3-popper'
import { getImgurImageSized } from '../../utilities'

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
    default: '',
  },
  variant: {
    type: String,
    default: 'full',
  },
  size: {
    type: String,
    default: 'm',
  },
})

const showModal = ref(false)
const maybeShowModal = () => {
  if (props.variant !== 'mini') {
    console.log('showing', props.variant)
    showModal.value = true
  }
}
const hearted = ref(false)

const getImageSized = props.img ? getImgurImageSized : () => ''
</script>
<template>
  <popper>
    <template #default>
      <pop-button class="p-2" @click.prevent="maybeShowModal">
        <div class="w-full max-w-md p-2 bg-gray-900 shadow-lg min-w-full rounded-xl">
          <div class="flex flex-col">
            <div class="">
              <div
                class="relative flex w-full mb-10"
                :class="props.variant === 'mini' ? 'h-30' : ''"
              >
                <div
                  v-if="props.variant !== 'mini'"
                  class="absolute top-0 right-0 flex flex-col p-4"
                >
                  <pop-button
                    variant="purple"
                    class="w-8 h-8 text-gray-500 bg-gray-800 rounded-full shadow hover:shadow-md"
                    @click="hearted = true"
                  >
                    <heart-full
                      v-if="hearted"
                      h="24"
                      w="24"
                      class="-ml-2 -mt-1.5 text-purple-700"
                    />
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
                  :src="getImageSized(props.img, props.size)"
                  :alt="props.alt"
                  :class="props.variant !== 'mini' ? 'object-fill' : ''"
                  class="w-full cursor-pointer rounded-2xl max-h-50"
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
                    <h2 class="mt-1 text-xl font-semibold text-white truncate">
                      {{ props.title }}
                    </h2>

                    <div
                      v-if="props.src"
                      class="flex items-center px-2 py-1 ml-3 text-xs text-white bg-emerald-400 rounded-lg"
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
      </pop-button>
    </template>
    <template #content>
      <div v-if="props.img" class="h-full md:flex">
        <div
          class="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden"
        >
          <img
            :src="props.img"
            :alt="props.alt"
            :class="props.variant !== 'mini' ? 'object-fill' : ''"
            class="w-full cursor-pointer rounded-2xl"
          />
        </div>
        <div class="flex md:w-1/2 justify-center py-10 items-center bg-white">
          <form class="bg-white">
            <h1 class="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
            <p class="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
            <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                />
              </svg>
              <input
                id=""
                class="pl-2 outline-none border-none"
                type="text"
                name=""
                placeholder="Full name"
              />
            </div>
            <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                />
              </svg>
              <input
                id=""
                class="pl-2 outline-none border-none"
                type="text"
                name=""
                placeholder="Username"
              />
            </div>
            <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <input
                id=""
                class="pl-2 outline-none border-none"
                type="text"
                name=""
                placeholder="Email Address"
              />
            </div>
            <div class="flex items-center border-2 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <input
                id=""
                class="pl-2 outline-none border-none"
                type="text"
                name=""
                placeholder="Password"
              />
            </div>
            <button
              type="submit"
              class="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
            >
              Login
            </button>
            <span class="text-sm ml-2 hover:text-blue-500 cursor-pointer">Forgot Password ?</span>
          </form>
        </div>
      </div>
    </template>
  </popper>
</template>
