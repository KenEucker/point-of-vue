<script setup lang="ts">
import { vElementHover } from '@vueuse/components'
import PopButton from '../../components/atomic/PopButton.vue'

const logos = [
  {
    name: 'vite',
    description:
      'Builds the frontend client scripts and files and provides plugins for local development.',
    url: 'https://vitejs.dev',
    src: '/img/vite.svg',
    variant: 'purple',
  },
  {
    name: 'typescript',
    description: 'All of the source code for this project is written in TypeScript',
    url: 'https://typescriptlang.org',
    src: '/img/typescript.svg',
    variant: 'blue',
  },
  {
    name: 'graphql-yoga',
    description: 'A graphql server runs locally using graphql-yoga bundled with a playground',
    url: 'https://the-guild.dev/graphql/yoga-server',
    src: '/img/graphql-yoga.svg',
    variant: 'pink',
  },
  {
    name: 'prisma',
    description:
      'Prisma is the ORM that creates and maintains the db and generating models in TypeScript.',
    url: 'https://prisma.io',
    src: '/img/prisma.png',
    variant: 'white',
  },
  {
    name: 'graphql',
    description: 'GraphQl queries power the frontend application, making it very extensible.',
    url: 'https://graphql.org',
    src: '/img/GraphQL_Logo.svg',
    variant: 'pink',
  },
  {
    name: 'vue',
    description:
      'The frontend is written in Vue with TypeScript using the composition API and the most modern best practices.',
    url: 'https://vuejs.org',
    src: '/img/vue.svg',
    variant: 'green',
  },
  {
    name: 'vueuse',
    description:
      "VueUse is like VueJs's version of jQuery providing both computational utilities as well as UI utilities.",
    url: 'https://vueuse.org',
    src: '/img/vueuse-icon.svg',
    variant: 'green',
  },
  {
    name: 'windicss',
    description:
      'WindiCss provides class based styling and easy theming in the lightest set of deliverables for a rich visual experience and rapid development.',
    url: 'https://windicss.org',
    src: '/img/windicss-logo.svg',
    variant: 'blue',
  },
  {
    name: 'pinia',
    description:
      'Pinia stores the state of the frontend for components to remain up to date with data subscriptions to the backend GraphQL server.',
    url: 'https://pinia.vuejs.org',
    src: '/img/pinia-logo.svg',
    variant: 'yellow',
  },
  {
    name: 'render',
    description:
      "Render.com powers the demo for this project. I've deployed a postgres database for the datastore, a graphql server running graphql-yoga and accompanying playground, a static web server for the frontend, and another web server for the prisma studio.",
    url: 'https://render.com',
    src: '/img/render-com-logo.png',
    variant: 'green',
  },
  {
    name: 'auth0',
    description:
      'auth0.com manages user login and authentication, providing an easy integration for social and passwordless login. Auth0 makes it possible for this project to provide user authentication with no password, ever.',
    url: 'https://auth0.com',
    src: '/img/auth0-logo.svg',
    variant: 'white',
  },
]

const hoverered = (name: string) => {
  const logoEl = document.querySelector(`.name.${name}`)

  logoEl?.classList.add('hovered')
  setTimeout(() => {
    logoEl?.classList.remove('hovered')
  }, 500)
}

const goTo = (link: string) => {
  window.open(link, '_blank')
}
</script>

<template>
  <div class="p-2 text-center mt-10 w-full md:p-4 md:w-3/4 m-auto">
    <span class="text-xl text-center"
      >This project uses the following languages, libraries, and platforms</span
    >
    <div
      class="items-center justify-between space-between flex grid grid-cols-2 md:grid-cols-3 md:pl-10 lg:pr-30"
    >
      <div v-for="logo in logos" :key="`logo-${logo.name}`" class="text-center m-auto">
        <pop-button
          v-element-hover="() => hoverered(logo.name)"
          :variant="`${logo.variant}-thick`"
          @click="goTo(logo.url)"
        >
          <img
            v-motion
            :initial="{
              y: 100,
              opacity: 0,
              scale: 1,
            }"
            :enter="{
              y: 0,
              scale: 1,
              opacity: 1,
              transition: {
                stiffness: '100',
                delay: 100,
              },
            }"
            :hovered="{
              scale: 1.25,
            }"
            :src="logo.src"
            class="max-w-[95px] w-20 m-4 min-h-6 mx-auto"
            :class="logo.name"
            :alt="`${logo.name} logo`"
          />
        </pop-button>
        <span class="text-lg">{{ logo.name }}</span>
        <p class="text-sm">{{ logo.description }}</p>
      </div>
    </div>
  </div>
</template>
