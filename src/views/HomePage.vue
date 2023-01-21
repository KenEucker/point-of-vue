<script setup lang="ts">
import PointOfVue from '../components/atomic/PointOfVue2.vue'
import SignUp from '../components/pov/SignUp.vue'
import { useBrowserLocation } from '@vueuse/core'

const location = useBrowserLocation()
</script>
<template>
  <div class="m-6 leading-normal tracking-normal text-ll-primary bg-fixed bg-cover">
    <div class="container">
      <point-of-vue :expanded="true" :full="true" class="m-auto" />
    </div>

    <div class="container flex flex-col flex-wrap items-center mx-auto md:flex-row">
      <div class="flex flex-col justify-center overflow-y-hidden xl:w-2/5 lg:items-start">
        <h1
          class="my-4 text-3xl font-bold leading-tight text-center opacity-75 md:text-5xl md:text-left"
        >
          Get back to your
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-pink-500 to-purple-500"
          >
            point of vue
          </span>
          on the new
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-pink-500 to-purple-500"
            >programmable</span
          >
          web
        </h1>
        <p
          class="mb-8 text-base text-emerald-400 leading-normal text-center md:text-2xl md:text-left"
        >
          Point Of Vue is a platform that opens up all of your data on the web, allowing you to
          share it all from one place. Sign up by email, or using any one of the email based
          providers, and get access to create posts and share with others on the POV globe of data.
        </p>

        <sign-up class="z-2" />

        <p
          class="mb-8 text-base text-orange-300 leading-normal text-center md:text-2xl md:text-left"
        >
          Point Of Vue integrates with other platforms using their provided Application Programmable
          Interfaces (APIs) and provides you with a new way to create content on those platforms.
          Anyone can query the graph to explore the POV globe of data. GitHub users can create their
          own Vues, plug them into their own page or share with others, and create whole new ways to
          share content.
        </p>
      </div>

      <div class="relative w-full p-12 overflow-hidden xl:w-3/5">
        <p class="mb-8 text-base text-pink-500 leading-normal text-center md:text-2xl md:text-left">
          Are you still chatting it up via Google Groups, while everyone else has moved on to things
          like slack and discord? Now you can get a taste for what threaded conversational
          perspectives are without losing your community by logging in with Google and going to your
          "Threads".
        </p>
        <p
          class="mb-8 text-base text-purple-500 leading-normal text-center md:text-2xl md:text-left"
        >
          You can use the Point Of Vue platform to create and manage content on websites like Imgur,
          which has a thriving community and offers free uploads to share with the open web, and you
          can use those images across the programmable web by putting it into the POV globe of data.
          Log in with your soundcloud account and upload, mix, or remaster your songs at the push of
          a button.
        </p>
        <div
          class="relative w-full mx-auto my-4 transition duration-700 ease-in-out transform md:w-4/5 rotate-6 hover:scale-105 hover:rotate-6"
        >
          <img class="relative" src="/img/macbook.svg" />
          <img
            src="/img/app-screenshot.png"
            alt="app screenshot"
            class="absolute top-7 left-0 bottom-0 right-0 mx-auto w-80 h-85 overflow-hidden"
          />
        </div>
        <p
          class="mt-8 text-base text-indigo-600 leading-normal text-center md:text-2xl md:text-left"
        >
          The Point Of Vue globe is a single source of data for all of the data you put into it. If
          you want to save your data from one website and put it into a format you can store on your
          computer, you can do that here. You can also take that same data and bring it over to
          another website, allowing you to configure what you think fits where.
        </p>
      </div>
    </div>
  </div>
</template>
