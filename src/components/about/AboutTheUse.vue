<script setup lang="ts">
import AuthZero from './AuthZero.vue'
import PrismaOrm from './PrismaOrm.vue'
import GitHub from './GitHub.vue'
import GraphQlang from './GraphQlang.vue'
import PiniaStore from './PiniaStore.vue'
import RenderCom from './RenderCom.vue'
import TypeScript from './TypeScript.vue'
import VueLang from './VueLang.vue'
import TailwindCss from './TailwindCss.vue'
import ViteRun from './ViteRun.vue'
import VueuseTest from './VueuseTest.vue'
</script>

<template>
  <div>
    <vite-run id="vite" />
    <type-script id="typescript" />
    <vue-lang id="vue" />
    <vueuse-test id="vueuse" />
    <graph-qlang id="graphql" />
    <prisma-orm id="prisma" />
    <pinia-store id="pinia" />
    <tailwind-css id="tailwind" />
    <auth-zero id="auth0" />
    <render-com id="render" />
    <git-hub id="github" />
  </div>
</template>
