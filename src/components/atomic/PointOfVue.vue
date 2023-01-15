<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  expanded: {
    type: Boolean,
    default: true,
  },
  rainbow: {
    type: Boolean,
    default: true,
  },
  condensed: {
    type: Boolean,
    default: true,
  },
  full: {
    type: Boolean,
    default: false,
  },
  /// TODO: turn into variant
  iconOnly: {
    type: Boolean,
    default: false,
  },
})

// /linear-gradient(to right, rgb(236, 72, 153), rgb(239, 68, 68), rgb(234, 179, 8))
const fancyClass = computed(() =>
  props.rainbow === true
    ? 'bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-red-600 via-orange-200'
    : ''
)
</script>
<template>
  <div v-if="props.iconOnly">
    <img class="w-24 h-24" src="/img/pov.svg" />
  </div>
  <div v-else-if="props.full">
    <span class="point" :class="fancyClass">Point</span>
    <span class="align-top point-o" :class="fancyClass">o</span>
    <img class="inline w-10 h-10 mt-1 align-middle" src="/img/pov.svg" />
    <!-- <pov class="mt-1 align-middle" w="40" h="40"></pov> -->
    <span class="align-top point-of" :class="fancyClass">f</span>
    <span class="point-of-view" :class="fancyClass">Vue</span>
  </div>
  <div v-else-if="props.expanded">
    <!-- <span class="point">Point</span> -->
    <!-- <span class="align-top point-o">o</span> -->
    <span
      class="text-xl ml-2 -mr-2.65 font-bold"
      :class="`${fancyClass} ${props.condensed ? '-skew-x-330 -skew-y-330' : ''}`"
      >P</span
    >
    <img
      class="inline w-10 h-10 mt-1 align-middle"
      src="/img/pov.svg"
      :class="props.condensed ? '-rotate-5 skew-y-5' : ''"
    />
    <!-- <pov class="mt-1 align-middle" w="40" h="40"></pov> -->
    <!-- <span class="align-top point-of">f</span> -->
    <span
      class="text-xl -ml-2.5 font-bold"
      :class="`${fancyClass} ${props.condensed ? 'skew-x-330 skew-y-330' : ''}`"
      >V</span
    >
    <span v-if="!props.condensed" class="text-xl" :class="fancyClass">ue</span>
    <!-- <span class="point-of-view">Vue</span> -->
  </div>
  <div v-else>
    <img class="inline w-10 h-10 m-auto align-middle" src="/img/pov.svg" />
    <!-- <pov class="align-middle" w="40" h="40"></pov> -->
  </div>
</template>
<style lang="scss" scoped>
.point {
  font-size: 20px;

  &-o {
    margin-right: -10px;
    padding-left: 8px;
    font-size: 25px;

    &f {
      margin-left: -8px;
      padding-right: 8px;
      font-size: 25px;

      &-view {
        font-size: 20px;
      }
    }
  }

  color: linear-gradient(to right, rgb(236 72 153), rgb(239 68 68), rgb(234 179 8));
}
</style>
