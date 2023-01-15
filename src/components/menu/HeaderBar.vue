<script setup lang="ts">
import PointOfVue from '../atomic/PointOfVue.vue'
import PopButton from '../atomic/PopButton.vue'
import RouteButton from '../atomic/RouteButton.vue'
import MenuOpen from 'vue-ionicons/dist/md-funnel.vue'
import SearchIcon from 'vue-ionicons/dist/md-search.vue'
import { useWindowSize } from '@vueuse/core'
import { useMenuState } from '../../store/state'

const menuState = useMenuState()

const props = defineProps({
  displayRightMenuButton: {
    type: Boolean,
    default: false,
  },
})

const { width } = useWindowSize()
</script>

<template>
  <div class="flex w-full h-full justify-between items-center">
    <div class="flex items-center">
      <button
        class="w-10 h-10 mr-2 border rounded-md flex justify-center items-center ml-2 border-ll-border dark:border-ld-border bg-ll-base dark:bg-ld-base dark:text-gray-200 active:scale-95 transition-transform transform"
        :class="menuState.leftMenuOpen ? 'rotate-90' : 'rotate-270'"
        @click="menuState.toggleLeftMenu()"
      >
        <menu-open h="20" w="20" />
      </button>

      <RouteButton path="/posts">
        <pop-button variant="red">
          <point-of-vue class="md:ml-6" :full="width > 1200" :expanded="width > 500" />
        </pop-button>
      </RouteButton>
    </div>

    <div
      class="bg-ll-base dakr:bg-ld-base md:min-w-60 rounded-md border border-ll-border dark:border-ld-border w-2/4 h-3/4 flex items-center"
    >
      <input
        type="text"
        :placeholder="`Search ${width > 550 ? 'your point of vue' : ''}`"
        class="px-2 bg-transparent text-md outline-none w-full h-full"
      />

      <button class="p-2 active:scale-95 transform transition-transform">
        <search-icon h="20" w="20" class="align-middle" />
      </button>
    </div>
    <div>
      <button
        v-if="props.displayRightMenuButton && width > 480"
        class="w-10 h-10 mr-2 border rounded-md flex justify-center items-center ml-2 border-ll-border dark:border-ld-border bg-ll-base dark:bg-ld-base dark:text-gray-200 active:scale-95 transition-transform transform"
        :class="menuState.rightMenuOpen ? 'rotate-270' : 'rotate-90'"
        @click="menuState.toggleRightMenu()"
      >
        <menu-open h="20" w="20" class="rotate-120" />
      </button>
    </div>
  </div>
</template>
