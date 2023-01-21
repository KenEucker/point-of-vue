<script setup lang="ts">
import PointOfVue from '../atomic/PointOfVue2.vue'
import PopButton from '../atomic/PopButton.vue'
import RouteButton from '../atomic/RouteButton.vue'
import MenuOpen from 'vue-ionicons/dist/md-funnel.vue'
import SearchIcon from 'vue-ionicons/dist/md-search.vue'
import { useWindowSize } from '@vueuse/core'
import { usePageState } from '../../store/state'

const pageState = usePageState()

const props = defineProps({
  displayRightMenuButton: {
    type: Boolean,
    default: false,
  },
})

const { width } = useWindowSize()
</script>

<template>
  <div class="flex items-center justify-between w-full h-full">
    <div class="flex items-center">
      <button
        class="flex items-center justify-center w-10 h-10 ml-2 mr-2 transition-transform transform border rounded-md border-ll-border dark:border-ld-border bg-ll-base dark:bg-ld-base dark:text-gray-200 active:scale-95"
        :class="pageState.leftMenuOpen ? 'rotate-90' : 'rotate-270'"
        @click="pageState.toggleLeftMenu()"
      >
        <menu-open h="20" w="20" />
      </button>

      <!-- <RouteButton path="/posts">
        <pop-button variant="red">
          <point-of-vue class="md:ml-6" :full="width > 1200" :expanded="width > 500" />
        </pop-button>
      </RouteButton> -->
    </div>

    <div
      class="flex items-center w-2/4 border rounded-md bg-ll-base dakr:bg-ld-base md:min-w-60 border-ll-border dark:border-ld-border h-3/4"
    >
      <input
        type="text"
        :placeholder="`Search ${width > 550 ? 'your point of vue' : ''}`"
        class="w-full h-full px-2 bg-transparent outline-none text-md"
      />

      <button class="p-2 transition-transform transform active:scale-95">
        <search-icon h="20" w="20" class="align-middle" />
      </button>
    </div>
    <div>
      <button
        v-show="props.displayRightMenuButton && width > 480"
        class="flex items-center justify-center w-10 h-10 ml-2 mr-2 transition-transform transform border rounded-md border-ll-border dark:border-ld-border bg-ll-base dark:bg-ld-base dark:text-gray-200 active:scale-95"
        :class="pageState.rightMenuOpen ? 'rotate-270' : 'rotate-90'"
        @click="pageState.toggleRightMenu()"
      >
        <menu-open h="20" w="20" class="rotate-120" />
      </button>
    </div>
  </div>
</template>
