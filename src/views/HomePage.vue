<script setup lang="ts">
import PointOfVue from '../components/atomic/PointOfVue2.vue'
import SignUp from '../components/pov/SignUp.vue'
import { useBrowserLocation } from '@vueuse/core'

const location = useBrowserLocation()
</script>
<template>
  <div class="w-full h-full flex flex-col lg:flex-row p-20">
    <div class="w-full flex flex-col min-h-full pr-10">
      <div class="text-7xl font-bold text-white">
        <h1>Introducing</h1>
        <h1 class="text-indigo-500">Point of Vue</h1>
      </div>
      <p class="text-gray-300 mt-10">
        a revolutionary new social sharing network for the programmable programmable web
      </p>

      <sign-up class="z-2 mt-10" />
    </div>
    <div class="w-full flex flex-col h-full overflow-y-auto text-gray-300 md:px-10">
      <PointOfVue></PointOfVue>
      <p class="mb-5 mt-5">
        Point Of Vue is a revolutionary new social sharing network for the programmable web. Our
        platform is designed to allow users to create and share custom views, called 'Vues', on any
        topic they desire, and to foster a community of creatives who want to share their ideas with
        the world. With Point of Vue, you can explore the POV globe of data, and share the web like
        you want to. Our platform integrates with other platforms using their provided Application
        Programmable Interfaces (APIs) and provides you with a new way to create content on those
        platforms. With the ability to query across the entire POV globe of data, users can discover
        new and unique perspectives on any topic they're interested in.
      </p>
      <p class="mb-5">
        The features on our roadmap include: The ability to publish custom Vues and share them
        across the POV globe. Integrating with various third-party services to provide more ways to
        share and view Vues. A user-friendly interface that makes it easy to create, share, and
        discover new Vues. We are excited about the possibilities that Point of Vue brings to the
        table and we can't wait to see what the community will create with it. We look forward to
        working with you to build the future of the programmable web.
      </p>

      <p class="mb-5">
        You can use the Point Of Vue platform to create and manage content on websites like Imgur,
        which has a thriving community and offers free uploads to share with the open web, and you
        can use those images across the programmable web by putting it into the POV globe of data.
        Log in with your soundcloud account and upload, mix, or remaster your songs at the push of a
        button.
      </p>
      <p class="mb-5">
        Our project uses a tech stack that includes Node.js, GraphQL, Vue.js, and Postgres. We have
        put a lot of effort into building a robust and efficient platform, with a focus on
        scalability and performance. We're excited to announce that the project is now open-source
        and available for anyone to contribute. The project is hosted on GitHub and you can access
        the repository on this link: https://github.com/KenEucker/point-of-vue
      </p>
      <p class="mb-5">
        GitHub users can create their own Vues, plug them into their own page or share with others,
        and create whole new ways to share content. We're excited about the possibilities that Point
        of Vue brings to the table and we can't wait to see what the community will create with it.
        We look forward to working with you to build the future of the programmable web."
      </p>
    </div>
  </div>
</template>
