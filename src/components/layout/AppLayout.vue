<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import LightIcon from 'vue-ionicons/dist/md-sunny.vue'
import DarkIcon from 'vue-ionicons/dist/md-moon.vue'
import { useMenuState } from '../../store/state'
const state = useMenuState()

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <div class="w-screen h-screen bg-ll-base dark:bg-ld-base flex flex-col text-gray-500">
    <div class="w-full flex h-full relative overflow-hidden">
      <div
        class="absolute left-0 top-0 z-10 w-full md:relative origin-left overflow-x-hidden transition-all border-r h-full bg-ll-neutral dark:bg-ld-neutral border-ll-border dark:border-ld-border flex flex-col"
        :class="state.leftMenuOpen ? 'min-w-30 md:w-80' : 'w-0 md:w-25'"
      >
        <slot name="leftMenu"></slot>
      </div>
      <div class="w-full h-full flex flex-col">
        <div
          class="w-full h-14 bg-ll-neutral dark:bg-ld-neutral border-ll-border dark:border-ld-border border-b flex justify-between items-center px-5"
        >
          <slot name="header"></slot>
          <button
            class="w-10 h-10 border rounded-md flex justify-center items-center ml-2 border-ll-border dark:border-ld-border bg-ll-base dark:bg-ld-base dark:text-gray-200 active:scale-95 transition-transform transform"
            @click="toggleDark()"
          >
            <dark-icon v-if="!isDark" class="w-5 h-5" h="20" w="20" />
            <light-icon v-else class="w-5 h-5" h="20" w="20" />
          </button>
        </div>

        <div class="w-full h-full flex flex-col overflow-auto">
          <slot name="body"></slot>
        </div>
      </div>

      <div
        v-if="$slots.rightMenu"
        class="`origin-left overflow-x-hidden transition-all border-l h-full bg-ll-neutral dark:bg-ld-neutral border-ll-border dark:border-ld-border flex flex-col"
        :class="state.rightMenuOpen ? 'w-130' : 'w-0'"
      >
        <slot name="rightMenu"></slot>
      </div>
    </div>
  </div>
</template>
