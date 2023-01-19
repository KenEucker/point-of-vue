<script setup lang="ts">
import { ref } from 'vue'
import PlanetIcon from 'vue-ionicons/dist/md-planet.vue'
import BaseballIcon from 'vue-ionicons/dist/md-baseball.vue'
import BasketIcon from 'vue-ionicons/dist/md-basket.vue'
import AnalyticsIcon from 'vue-ionicons/dist/md-analytics.vue'
import ImagesIcon from 'vue-ionicons/dist/md-images.vue'
import HammerIcon from 'vue-ionicons/dist/md-hammer.vue'
import HeadsetIcon from 'vue-ionicons/dist/md-headset.vue'
import PullIcon from 'vue-ionicons/dist/md-git-pull-request.vue'
import { onClickOutside } from '@vueuse/core'
import type { PovComponent } from '../../utilities'
const props = defineProps({
  component: {
    type: Object,
    default: () => ({}),
  },
  showStatus: {
    type: Boolean,
    default: false,
  },
})

const showStatus = ref(false)
const emit = defineEmits(['edit'])
const containerRef = ref()
onClickOutside(containerRef, () => (showStatus.value = false))

const getOptions = (component: PovComponent) => {
  switch (component.status) {
    case 'good':
      return ['edit', 'archive']
    case 'error':
      return ['edit', 'view logs']
    default:
      return ['view']
  }
}
</script>
<template>
  <div
    ref="containerRef"
    class="w-auto m-8 text-gray-800 divide-y divide-gray-300 rounded-lg shadow-md sm:m-4"
    :class="`bg-${component.background ? component.background : 'white'}`"
  >
    <div class="flex items-start px-4 py-5">
      <div class="mr-3 my-auto">
        <planet-icon v-if="props.component.icon === 'planet'" h="40" w="40" />
        <baseball-icon v-if="props.component.icon === 'baseball'" h="40" w="40" />
        <basket-icon v-if="props.component.icon === 'basket'" h="40" w="40" />
        <analytics-icon v-if="props.component.icon === 'analytics'" h="40" w="40" />
        <images-icon v-if="props.component.icon === 'images'" h="40" w="40" />
        <hammer-icon v-if="props.component.icon === 'hammer'" h="40" w="40" />
        <headset-icon v-if="props.component.icon === 'headset'" h="40" w="40" />
        <pull-icon v-if="props.component.icon === 'pull'" h="40" w="40" />
      </div>
      <h2 class="mr-auto">
        <span class="block font-sans text-2xl font-semibold text-gray-900">{{
          props.component.name
        }}</span>
        <span class="block font-light text-gray-800">{{ props.component.category }}</span>
      </h2>

      <div v-if="props.showStatus" class="relative">
        <button
          type="button"
          class="flex items-center w-10 h-6 border rounded-full justify-evenly focus:outline-none"
          @click.stop="showStatus = true"
        >
          <span
            :class="
              props.component.status === 'good'
                ? 'bg-green-500'
                : props.component.status === 'error'
                ? 'bg-red-500'
                : 'bg-purple-500'
            "
            class="w-4 h-4 rounded-full sm:w-4 sm:h-4"
          ></span>
          <svg
            class="w-3 h-3 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>

        <nav
          v-show="showStatus"
          class="absolute right-0 w-32 py-2 mt-1 text-sm bg-white border border-gray-300 rounded shadow-xl sm:py-1 sm:w-24 sm:text-xs"
        >
          <button
            v-for="option in getOptions(props.component as PovComponent)"
            :key="`${props.component.name}-option-${option}`"
            class="flex items-center px-3 py-1 w-full sm:px-2 hover:bg-gray-200"
            @click="emit('edit')"
          >
            {{ option }}
          </button>
        </nav>
      </div>
    </div>
    <div class="">
      <slot></slot>
    </div>
  </div>
</template>
