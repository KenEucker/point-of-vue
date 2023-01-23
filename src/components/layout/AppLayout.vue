<script setup lang="ts">
import { usePageState } from '../../store/state'
const pageState = usePageState()
</script>

<template>
  <div class="flex flex-col text-gray-500 bg-ll-base dark:bg-ld-base">
    <div class="relative flex w-full h-full overflow-hidden">
      <div
        class="absolute top-0 left-0 z-10 flex flex-col w-full h-full overflow-x-hidden transition-all origin-left border-r md:relative bg-ll-neutral dark:bg-ld-neutral border-ll-border dark:border-ld-border"
        :class="pageState.leftMenuOpen ? 'min-w-30 md:w-80' : 'w-20 md:w-25'"
      >
        <slot name="leftMenu"></slot>
      </div>
      <div class="flex flex-col w-full h-full">
        <div
          class="flex items-center justify-between w-full px-5 border-b h-14 bg-ll-neutral dark:bg-ld-neutral border-ll-border dark:border-ld-border"
        >
          <slot name="header"></slot>
        </div>

        <div class="flex flex-col w-full h-full overflow-auto">
          <slot name="body"></slot>
        </div>
      </div>

      <div
        v-if="$slots.rightMenu"
        class="origin-left overflow-x-hidden transition-all border-l h-full bg-ll-neutral dark:bg-ld-neutral border-ll-border dark:border-ld-border flex flex-col"
        :class="pageState.rightMenuOpen ? 'w-130' : 'w-0'"
      >
        <slot name="rightMenu"></slot>
      </div>

      <div
        v-if="$slots.bottomMenu"
        class="origin-bottom overflow-y-hidden transition-all border-l w-full bg-ll-neutral dark:bg-ld-neutral border-ll-border dark:border-ld-border flex flex-col"
        :class="pageState.bottomMenuOpen ? 'h-1/2' : 'h-10'"
      >
        <slot name="bottomMenu"></slot>
      </div>
    </div>
  </div>
</template>
