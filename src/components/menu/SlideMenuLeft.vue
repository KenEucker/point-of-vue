<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import PostPov from 'vue-ionicons/dist/md-bonfire.vue'
import CloseIcon from 'vue-ionicons/dist/md-close-circle-outline.vue'
import RouteButton from '../atomic/RouteButton.vue'
import CreatorCard from '../creator/CreatorCard.vue'
import { useMenuState, useCreatorState } from '../../store/state'

const menuState = useMenuState()
const creatorState = useCreatorState()
const router = useRouter()
const routes = computed(() =>
  router
    .getRoutes()
    .filter((r) => r.meta.mainMenu && (creatorState.isLoggedIn || !r.meta.protected))
)
const currentRoute = router.currentRoute

const props = defineProps({
  isExpanded: {
    type: Boolean,
    default: false,
    required: true,
  },
})

function postButtonClick() {
  menuState.openCreatePost()
  menuState.closeLeftMenu()

  router.push('/posts')
}

const creatorPanelClick = () => {
  if (!menuState.isLeftMenuOpen) {
    menuState.openLeftMenu()
  }
}
</script>
<template>
  <div
    class="relative flex flex-col items-center w-full h-full overflow-x-hidden overflow-y-auto"
    :class="props.isExpanded ? 'p-10 px-5' : 'p-2'"
  >
    <creator-card
      class="cursor-pointer"
      :is-expanded="props.isExpanded"
      :use-auth0="creatorState.isAuth0"
      @click="creatorPanelClick"
    />
    <ul class="flex flex-col pt-5" :class="props.isExpanded ? '' : 'justify-center flex '">
      <li
        v-for="route in routes"
        :key="route.name"
        class="` w-full max-w-50 py-2 flex items-center cursor-pointer active:scale-95 transform transition-transform select-none"
        :class="`${props.isExpanded ? 'mb-2' : 'justify-center mb-4'} ${
          route.name == currentRoute.name ? 'text-ll-primary' : ''
        }`"
        @click="menuState.closeLeftMenu()"
      >
        <route-button
          :path="route.path"
          :text="(route.name as string)"
          :active="route.name == currentRoute.name"
          :expanded="props.isExpanded"
        />
      </li>
    </ul>

    <button
      v-if="creatorState.isLoggedIn"
      class="flex items-center justify-center w-full px-2 py-3 text-white transition-transform transform rounded-lg max-w-50 md:max-w-90 bg-ll-primary dark:bg-ld-primary active:scale-95"
      @click="postButtonClick"
    >
      <p v-if="props.isExpanded" class="mr-4">Post</p>
      <post-pov class="" w="30" h="30" />
    </button>

    <button
      class="absolute flex items-center w-8 h-8 mr-2 text-sm transition-transform transform border rounded-full md:hidden top-2 -right-1 bg-ll-neutral dark:bg-ld-neutral border-ll-border dark:border-ld-border active:scale-95"
      @click="menuState.closeLeftMenu()"
    >
      <close-icon h="30" w="30" />
    </button>
  </div>
</template>
