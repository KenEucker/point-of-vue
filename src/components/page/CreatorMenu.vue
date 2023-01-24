<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import RouteButton from '../atomic/RouteButton.vue'
import { usePageState, useCreatorState } from '../../store/state'

const pageState = usePageState()
const creatorState = useCreatorState()
const router = useRouter()
const allRoutes = router.getRoutes()
const routes = computed(() =>
  allRoutes.filter((r) => r.meta.creatorMenu && (creatorState.isLoggedIn || !r.meta.protected))
)
const currentRoute = router.currentRoute

const props = defineProps({
  isExpanded: {
    type: Boolean,
    default: false,
    required: true,
  },
})
</script>

<template>
  <ul class="flex flex-col pt-5" :class="props.isExpanded ? '' : 'justify-center flex '">
    <li
      v-for="route in routes"
      :key="route.name"
      class="w-full min-w-max py-2 flex items-center cursor-pointer active:scale-95 transform transition-transform select-none mb-4"
      :class="`${props.isExpanded ? 'mb-2' : 'justify-center mb-4'} ${
        route.name == currentRoute.name ? 'text-ll-primary' : ''
      }`"
      @click="pageState.closeLeftMenu()"
    >
      <route-button
        :path="route.path"
        :text="(route.name as string)"
        :active="route.name == currentRoute.name"
        :expanded="props.isExpanded"
      />
    </li>
  </ul>
</template>
