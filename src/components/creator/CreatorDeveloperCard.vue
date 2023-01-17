<script setup lang="ts">
import PovCreator from './CreateCreator.vue'
import { PovComponent } from '../../utilities'
import PovComponentVue from '../editor/PovComponentVue.vue'
import ApertureIcon from 'vue-ionicons/dist/md-aperture.vue'
import CommentsIcon from 'vue-ionicons/dist/md-chatboxes.vue'
import CubeIcon from 'vue-ionicons/dist/md-cube.vue'
import MoreIcon from 'vue-ionicons/dist/md-more.vue'
import abbreviate from 'number-abbreviate'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

const props = defineProps({
  creator: {
    type: Object,
    default: () => ({}),
    required: true,
  },
  components: {
    type: Array<PovComponent>,
    default: () => [],
    required: true,
  },
  imageOnly: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'small',
  },
})

const developerStats = [
  {
    icon: 'messages',
    count: 4600,
    text: 'Comments',
  },
  {
    icon: 'cards',
    count: 6,
    text: 'Vues',
  },
  {
    icon: 'target',
    count: 120340,
    text: 'Vue Shares',
  },
]
</script>

<template>
  <div>
    <div class="flex-row rounded-lg border border-gray-200/80 light:bg-white p- md:p-6 m-5">
      <pov-creator
        :creator="creator"
        :size="props.size"
        :image-only="props.imageOnly"
        class="order-1"
        :class="width < 600 ? 'flex-row' : 'flex-infinite'"
      />
      <div class="flex flex-col px-6">
        <div class="mt-2 flex flex-row items-center space-x-5">
          <a
            v-for="stat in developerStats"
            :key="stat.text"
            href="#"
            class="flex h-16 w-32 md:h-20 md:w-40 flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80"
          >
            <div class="flex flex-row items-center justify-center">
              <CommentsIcon v-if="stat.icon === 'messages'" h="30" w="30" />
              <CubeIcon v-if="stat.icon === 'cards'" h="30" w="30" />
              <ApertureIcon v-if="stat.icon === 'target'" h="30" w="30" />
              <span class="ml-2font-bold text-gray-600">
                {{ abbreviate(stat.count, stat.count > 100000 ? 0 : 1) }}
              </span>
            </div>

            <div class="mt-2 text-sm text-gray-400">{{ stat.text }}</div>
          </a>
        </div>
      </div>

      <div class="md:w-100 flex flex-grow flex-col items-end justify-start">
        <div class="flex flex-row space-x-3">
          <button
            class="flex rounded-md bg-gray-100 py-2 px-1 text-white transition-all duration-150 ease-in-out hover:bg-gray-200"
          >
            <more-icon w="24" h="24" class="text-gray-500" />
          </button>
        </div>
      </div>

      <!-- <div :class="width < 600 ? 'flex-row order-3' : 'flex-col order-2 px-6'" class="flex">
        <div class="mt-2 flex flex-row items-center space-x-5">
          <a
            v-for="stat in developerStats"
            :key="stat.text"
            href="#"
            class="flex h-16 w-32 md:h-20 md:w-40 flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80"
          >
            <div class="flex flex-row items-center justify-center">
              <CommentsIcon v-if="stat.icon === 'messages'" h="30" w="30" />
              <CubeIcon v-if="stat.icon === 'cards'" h="30" w="30" />
              <ApertureIcon v-if="stat.icon === 'target'" h="30" w="30" />
              <span class="ml-2font-bold text-gray-600">
                {{ abbreviate(stat.count, stat.count > 100000 ? 0 : 1) }}
              </span>
            </div>

            <div class="mt-2 text-sm text-gray-400">{{ stat.text }}</div>
          </a>
        </div>
      </div>

      <div
        class="flex flex-col items-end justify-start"
        :class="width < 600 ? 'order-2' : 'order-3'"
      >
        <div class="flex flex-row space-x-3">
          <button
            class="flex rounded-md bg-gray-100 py-2 px-1 text-white transition-all duration-150 ease-in-out hover:bg-gray-200"
          >
            <more-icon w="24" h="24" class="text-gray-500" />
          </button>
        </div>
      </div> -->
    </div>
    <div class="flex flex-no-wrap overflow-x-scroll scrolling-touch items-start mb-8">
      <pov-component-vue
        v-for="component in props.components"
        :key="`component-${component.name}`"
        class="flex-none w-2/3 md:w-1/3 mr-8 md:pb-4 border rounded-lg"
        :component="component"
      ></pov-component-vue>
    </div>
  </div>
</template>
