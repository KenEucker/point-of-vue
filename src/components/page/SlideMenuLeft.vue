<script setup lang="ts">
import CloseIcon from 'vue-ionicons/dist/md-close-circle-outline.vue'
import CreatorCard from '../creator/CreatorCard.vue'
import { usePageState, useCreatorState } from '../../store/state'
import PovMenu from './PovMenu.vue'
import PostButton from '../pov/PostButton.vue'
import CreatorMenu from './CreatorMenu.vue'

const pageState = usePageState()
const creatorState = useCreatorState()

const props = defineProps({
  isExpanded: {
    type: Boolean,
    default: false,
    required: true,
  },
})

const creatorPanelClick = () => {
  if (!pageState.isLeftMenuOpen) {
    pageState.openLeftMenu()
  }
}
</script>

<template>
  <button
    v-show="props.isExpanded"
    class="absolute flex items-center w-8 h-8 mr-2 text-sm transition-transform transform border rounded-full md:hidden top-2 -right-1 bg-ll-neutral dark:bg-ld-neutral border-ll-border dark:border-ld-border active:scale-95"
    @click="pageState.closeLeftMenu()"
  >
    <close-icon h="30" w="30" />
  </button>

  <div
    class="relative flex flex-col items-center w-full h-full overflow-x-hidden overflow-y-auto"
    :class="props.isExpanded ? 'p-10 px-5' : 'p-3'"
  >
    <creator-card
      class="cursor-pointer"
      :is-expanded="props.isExpanded"
      :use-auth0="creatorState.isAuth0"
      @click="creatorPanelClick"
    />
    <pov-menu :is-expanded="props.isExpanded" />
    <creator-menu :is-expanded="props.isExpanded" />
    <post-button :is-expanded="props.isExpanded" />
  </div>
</template>
