<script setup lang="ts">
import PointOfVue from '../components/atomic/PointOfVue.vue'
import SignUp from '../components/pov/SignUp.vue'
import TwitterIcon from 'vue-ionicons/dist/logo-twitter.vue'
import FacebookIcon from 'vue-ionicons/dist/logo-facebook.vue'
import { useBrowserLocation } from '@vueuse/core'

const location = useBrowserLocation()
</script>
<template>
  <div class="m-6 leading-normal tracking-normal text-ll-primary bg-fixed bg-cover">
    <!--Nav-->
    <div class="container w-full mx-auto">
      <div class="flex items-center justify-between w-full">
        <a
          class="flex items-center text-2xl font-bold text-ll-primary no-underline hover:no-underline lg:text-4xl"
          href="#"
        >
          <point-of-vue :expanded="true" :full="true" />
        </a>

        <div class="flex content-center justify-end w-1/2">
          <a
            class="inline-block h-10 p-2 text-center text-green-300 no-underline duration-300 ease-in-out transform hover:text-pink-500 hover:text-underline md:h-auto md:p-4 hover:scale-125"
            :href="`https://twitter.com/intent/tweet?url=${location.origin}`"
          >
            <twitter-icon h="28" w="28" />
          </a>
          <a
            class="inline-block h-10 p-2 text-center text-green-300 no-underline duration-300 ease-in-out transform hover:text-pink-500 hover:text-underline md:h-auto md:p-4 hover:scale-125"
            :href="`https://www.facebook.com/sharer/sharer.php?u=${location.origin}`"
          >
            <facebook-icon h="28" w="28" />
          </a>
        </div>
      </div>
    </div>

    <!--Main-->
    <div class="container flex flex-col flex-wrap items-center mx-auto md:flex-row">
      <!--Left Col-->
      <div class="flex flex-col justify-center w-full overflow-y-hidden xl:w-2/5 lg:items-start">
        <h1
          class="my-4 text-3xl font-bold leading-tight text-center opacity-75 md:text-5xl md:text-left"
        >
          Your
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-pink-500 to-purple-500"
          >
            voice
          </span>
          to yourself again!
        </h1>
        <p class="mb-8 text-base leading-normal text-center md:text-2xl md:text-left">
          Social sharing platform to get back to your point of Vue
        </p>

        <sign-up class="z-2" />
      </div>

      <!--Right Col-->
      <div class="relative w-full p-12 overflow-hidden xl:w-3/5">
        <div
          class="relative w-full mx-auto transition duration-700 ease-in-out transform md:w-4/5 -rotate-6 hover:scale-105 hover:rotate-6"
        >
          <img class="relative" src="/img/macbook.svg" />
          <img
            src="/img/app-screenshot.png"
            alt="app screenshot"
            class="absolute top-[7%] left-0 bottom-0 right-0 mx-auto w-[80%] h-[85%] overflow-hidden"
          />
        </div>
      </div>

      <!-- <div class="mx-auto md:pt-16">
        <p class="pb-8 font-bold text-center text-ll-primary lg:pb-6">Download our app:</p>
        <div class="flex justify-center w-full pb-24 md:justify-start lg:pb-0 fade-in">
          <img
            src="/img/App-Store.svg"
            class="h-12 pr-12 duration-300 ease-in-out transform hover:scale-125"
          />
          <img
            src="/img/Play-Store.svg"
            class="h-12 duration-300 ease-in-out transform hover:scale-125"
          />
        </div>
      </div> -->

      <!--Footer-->
      <div class="w-full pt-16 pb-6 text-sm text-center md:text-left fade-in">
        <a class="text-gray-500 no-underline hover:no-underline" href="#">&copy; POV 2023</a>
        - Template by
        <a
          class="text-gray-500 no-underline hover:no-underline"
          href="https://www.tailwindtoolbox.com"
          >TailwindToolbox.com</a
        >
      </div>
    </div>
  </div>
</template>
