<script setup lang="ts">
import { faker } from '@faker-js/faker'
import PointOfVue from './PointOfVue.vue'

const props = defineProps({
  fullScreen: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <div
    :class="`${props.fullScreen ? 'w-full min-h-screen' : ''}`"
    class="flex justify-center items-center"
  >
    <div
      v-if="props.fullScreen"
      class="flex w-full w-3/4 text-xl justify-center absolute top-[30%]"
    >
      {{ faker.hacker.phrase() }}
    </div>
    <div class="p-10 rounded-xl relative">
      <div
        :class="`${props.fullScreen ? 'w-full min-h-screen' : ''}`"
        class="flex justify-center items-center"
      >
        <div :class="`${props.fullScreen ? 'min-h-screen' : ''}`" class="w-3/4 justify-center flex">
          <div
            :class="`${props.fullScreen ? 'h-50 w-50 ' : 'h-36 w-36'}`"
            class="flex items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 animate-spin"
          >
            <div
              :class="`${props.fullScreen ? 'h-40 w-40 ' : 'h-28 w-28'}`"
              class="h-40 w-40 rounded-full bg-ll-base dark:bg-ld-base flex relative"
            ></div>
          </div>
          <point-of-vue
            :icon-only="true"
            class="absolute animate-heart-beat"
            :class="`${props.fullScreen ? 'top-23' : 'top-15'}`"
          />
        </div>
      </div>
    </div>
  </div>
</template>
