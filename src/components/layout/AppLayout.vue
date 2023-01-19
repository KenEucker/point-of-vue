<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import LightIcon from 'vue-ionicons/dist/md-sunny.vue'
import DarkIcon from 'vue-ionicons/dist/md-moon.vue'
import { usePageState } from '../../store/state'
const pageState = usePageState()
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <div class="flex flex-col w-screen h-screen text-gray-500 bg-ll-base dark:bg-ld-base">
    <div class="relative flex w-full h-full overflow-hidden">
      <div
        class="absolute top-0 left-0 z-10 flex flex-col w-full h-full overflow-x-hidden transition-all origin-left border-r md:relative bg-ll-neutral dark:bg-ld-neutral border-ll-border dark:border-ld-border"
        :class="pageState.leftMenuOpen ? 'min-w-30 md:w-80' : 'w-0 md:w-25'"
      >
        <slot name="leftMenu"></slot>
      </div>
      <div class="flex flex-col w-full h-full">
        <div
          class="flex items-center justify-between w-full px-5 border-b h-14 bg-ll-neutral dark:bg-ld-neutral border-ll-border dark:border-ld-border"
        >
          <slot name="header"></slot>
          <button
            class="flex items-center justify-center w-10 h-10 ml-2 transition-transform transform border rounded-md border-ll-border dark:border-ld-border bg-ll-base dark:bg-ld-base dark:text-gray-200 active:scale-95"
            @click="toggleDark()"
          >
            <dark-icon v-show="!isDark" class="w-5 h-5" h="20" w="20" />
            <light-icon v-show="isDark" class="w-5 h-5" h="20" w="20" />
          </button>
        </div>

        <div class="flex flex-col w-full h-full overflow-auto">
          <slot name="body"></slot>
        </div>
      </div>

      <div
        v-if="$slots.rightMenu"
        class="`origin-left overflow-x-hidden transition-all border-l h-full bg-ll-neutral dark:bg-ld-neutral border-ll-border dark:border-ld-border flex flex-col"
        :class="pageState.rightMenuOpen ? 'w-130' : 'w-0'"
      >
        <slot name="rightMenu"></slot>
      </div>
    </div>
  </div>
</template>
