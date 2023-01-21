<script setup lang="ts">
const props = defineProps({
  img: {
    type: String,
    default: '',
  },
  show: {
    type: Boolean,
    default: false,
  },
  index: {
    type: Number,
    default: 1,
  },
})

const emit = defineEmits(['close', 'next', 'previous'])
</script>
<template>
  <div
    v-if="props.show"
    id="modal-id"
    class="fixed inset-0 top-0 left-0 z-50 flex items-center justify-center h-full bg-center bg-no-repeat bg-cover outline-none min-w-full animated fadeIn faster focus:outline-none"
    style="
      background-image: url('https://images.unsplash.com/photo-1604262725913-1c415cd27564?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2142&q=80');
    "
  >
    <div class="absolute inset-0 z-0 bg-black opacity-80"></div>
    <div class="relative flex flex-col items-center justify-center min-h-full">
      <div class="container">
        <div class="w-full max-w-md p-6 bg-gray-900 shadow-lg rounded-xl">
          <div class="flex flex-col">
            <div class="">
              <div class="relative w-full mb-3 h-62">
                <div class="absolute top-0 right-0 flex flex-col p-3">
                  <button
                    class="w-8 h-8 p-1 text-center text-gray-500 transition duration-300 ease-in bg-gray-800 rounded-full shadow hover:text-purple-500 hover:shadow-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>
                <img
                  :src="props.img"
                  alt="Just a flower"
                  class="object-fill w-full cursor-pointer rounded-2xl"
                  tabindex="0"
                  @click="emit('next')"
                  @keydown.left="emit('previous')"
                  @keydown.right="emit('next')"
                  @keydown.esc="emit('close')"
                />
              </div>
              <div class="flex-auto justify-evenly">
                <div class="flex flex-wrap">
                  <div class="flex items-center flex-none w-full text-sm text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-4 h-4 mr-1 text-red-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                    <span class="mr-3 text-gray-400 whitespace-nowrap">4.60</span
                    ><span class="mr-2 text-gray-400">India</span>
                  </div>
                  <div class="flex items-center justify-between w-full min-w-0">
                    <h2
                      class="mr-auto text-lg text-gray-200 truncate cursor-pointer hover:text-purple-500"
                    >
                      Lorem ipsum is placeholder text commonly used in the graphic
                    </h2>
                    <div
                      class="flex items-center px-2 py-1 ml-3 text-xs text-white bg-emerald-400 rounded-lg"
                    >
                      INSTOCK
                    </div>
                  </div>
                </div>
                <div class="mt-1 text-xl font-semibold text-white">$240.00</div>
                <div class="py-4 text-sm text-gray-600 lg:flex">
                  <div class="inline-flex items-center flex-1 mb-3">
                    <div class="flex items-center flex-none w-full text-sm text-gray-600">
                      <ul class="flex flex-row items-center justify-center space-x-2">
                        <li class="">
                          <span
                            class="block p-1 transition duration-300 ease-in border-2 border-gray-900 rounded-full hover:border-blue-600"
                          >
                            <a href="#blue" class="block w-3 h-3 bg-blue-600 rounded-full"></a>
                          </span>
                        </li>
                        <li class="">
                          <span
                            class="block p-1 transition duration-300 ease-in border-2 border-gray-900 rounded-full hover:border-yellow-400"
                          >
                            <a href="#yellow" class="block w-3 h-3 bg-yellow-400 rounded-full"></a>
                          </span>
                        </li>
                        <li class="">
                          <span
                            class="block p-1 transition duration-300 ease-in border-2 border-gray-900 rounded-full hover:border-red-500"
                          >
                            <a href="#red" class="block w-3 h-3 bg-red-500 rounded-full"></a>
                          </span>
                        </li>
                        <li class="">
                          <span
                            class="block p-1 transition duration-300 ease-in border-2 border-gray-900 rounded-full hover:border-emerald-500"
                          >
                            <a href="#green" class="block w-3 h-3 bg-emerald-500 rounded-full"></a>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="inline-flex items-center flex-1 mb-3">
                    <span class="mr-3 text-secondary whitespace-nowrap">Size</span>
                    <div class="text-gray-400 cursor-pointer">
                      <span class="p-1 py-0 hover:text-purple-500">S</span>
                      <span class="p-1 py-0 hover:text-purple-500">M</span>
                      <span class="p-1 py-0 hover:text-purple-500">L</span>
                      <span class="p-1 py-0 hover:text-purple-500">XL</span>
                    </div>
                  </div>
                </div>
                <div class="flex justify-start space-x-2 text-sm font-medium">
                  <button
                    class="inline-flex items-center px-5 py-2 mb-2 text-sm font-medium tracking-wider text-white transition duration-300 ease-in bg-purple-500 rounded-full md:mb-0 hover:shadow-lg hover:bg-purple-600"
                  >
                    <span>Add Cart</span>
                  </button>
                  <button
                    class="p-2 text-center text-gray-400 transition duration-300 ease-in bg-gray-700 border border-gray-700 rounded-full hover:bg-gray-800 hover:border-gray-500 hover:text-white hover:shadow-lg w-9 h-9"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class=""
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    <button class="absolute top-0 left-0" @click="emit('previous')">
                      Previous
                    </button>
                    <button class="absolute top-0 right-0" @click="emit('next')">Next</button>
                    <button class="absolute bottom-0 right-0" @click="emit('close')">Close</button>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
