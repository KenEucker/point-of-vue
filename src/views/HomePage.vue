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
          class="my-4 text-3xl font-bold leading-tight text-center opacity-75 md:text-5xl md:text-left w-2/3 m-auto"
        >
          Introducing
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-pink-500 to-purple-500"
          >
            Point of Vue
          </span>
          , a revolutionary new social sharing network for the programmable
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-pink-500 to-purple-500"
            >programmable</span
          >
          web
        </h1>
        <p
          class="mb-8 text-base text-emerald-400 leading-normal text-center md:text-2xl md:text-left"
        >
          Point Of Vue is a revolutionary new social sharing network for the programmable web. Our
          platform is designed to allow users to create and share custom views, called 'Vues', on
          any topic they desire, and to foster a community of creatives who want to share their
          ideas with the world. With Point of Vue, you can explore the POV globe of data, and share
          the web like you want to. Our platform integrates with other platforms using their
          provided Application Programmable Interfaces (APIs) and provides you with a new way to
          create content on those platforms. With the ability to query across the entire POV globe
          of data, users can discover new and unique perspectives on any topic they're interested
          in.
        </p>

        <sign-up class="z-2" />

        <p
          class="mb-8 text-base text-orange-300 leading-normal text-center md:text-2xl md:text-left"
        >
          The features on our roadmap include: The ability to publish custom Vues and share them
          across the POV globe. Integrating with various third-party services to provide more ways
          to share and view Vues. A user-friendly interface that makes it easy to create, share, and
          discover new Vues. We are excited about the possibilities that Point of Vue brings to the
          table and we can't wait to see what the community will create with it. We look forward to
          working with you to build the future of the programmable web.
        </p>
      </div>

      <div class="relative w-full p-12 overflow-hidden xl:w-3/5">
        <p
          class="mb-8 text-base text-purple-500 leading-normal text-center md:text-2xl md:text-left"
        >
          You can use the Point Of Vue platform to create and manage content on websites like Imgur,
          which has a thriving community and offers free uploads to share with the open web, and you
          can use those images across the programmable web by putting it into the POV globe of data.
          Log in with your soundcloud account and upload, mix, or remaster your songs at the push of
          a button.
        </p>
        <p class="mb-8 text-base text-pink-500 leading-normal text-center md:text-2xl md:text-left">
          Our project uses a tech stack that includes Node.js, GraphQL, Vue.js, and Postgres. We
          have put a lot of effort into building a robust and efficient platform, with a focus on
          scalability and performance. We're excited to announce that the project is now open-source
          and available for anyone to contribute. The project is hosted on GitHub and you can access
          the repository on this link: https://github.com/KenEucker/point-of-vue
        </p>
        <div
          class="relative w-full mx-auto my-4 transition duration-700 ease-in-out transform md:w-4/5 rotate-6 hover:scale-105 hover:rotate-6"
        >
          <!-- <img class="relative" src="/img/macbook.svg" />
          <img
            src="/img/app-screenshot.png"
            alt="app screenshot"
            class="absolute top-7 left-0 bottom-0 right-0 mx-auto w-80 h-85 overflow-hidden"
          /> -->
        </div>
        <p
          class="mt-8 text-base text-indigo-600 leading-normal text-center md:text-2xl md:text-left"
        >
          GitHub users can create their own Vues, plug them into their own page or share with
          others, and create whole new ways to share content. We're excited about the possibilities
          that Point of Vue brings to the table and we can't wait to see what the community will
          create with it. We look forward to working with you to build the future of the
          programmable web."
        </p>
      </div>
    </div>
  </div>
</template>
