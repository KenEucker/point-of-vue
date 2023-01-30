<script setup lang="ts">
import { usePageState, useGithubState } from '../../store/state'
import ArrowUp from 'vue-ionicons/dist/md-arrow-round-up.vue'
import ArrowDown from 'vue-ionicons/dist/md-arrow-round-down.vue'

const pageState = usePageState()
</script>
<template>
  <div
    class="fixed bottom-0 inset-x-0 flex flex-col w-full px-2 py-2 overflow-y-visible bg-ll-base dark:bg-ld-base z-100 transition-all ease-in-out"
    :class="pageState.bottomMenuOpen ? 'h-2/3' : 'h-10'"
  >
    <div
      class="mx-auto -mt-4 bg-slate-400 rounded-full px-3 py-3 cursor-pointer"
      @click="pageState.toggleBottomMenu()"
    >
      <arrow-up v-show="!pageState.bottomMenuOpen" class="animate-bounce infinite'" h="30" w="30" />
      <arrow-down v-show="pageState.bottomMenuOpen" h="30" w="30" />
    </div>
    <slot></slot>
  </div>
</template>
