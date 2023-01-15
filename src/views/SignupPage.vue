<script setup lang="ts">
import SignUp from '../components/pov/SignUp.vue'
</script>
<template>
  <div class="container flex flex-col flex-wrap items-center mx-auto md:flex-row">
    <div class="flex flex-col justify-center w-full overflow-y-hidden xl:w-2/5 lg:items-start">
      <h1 class="my-4 text-3xl font-bold leading-tight text-center md:text-5xl md:text-left">
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
  </div>
</template>
