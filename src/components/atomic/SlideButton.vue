<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  variant: {
    type: String,
    default: 'green',
  },
})
const classes = computed(() => {
  let color = 'green-600'
  switch (props.variant) {
    case 'green':
    default:
      break
  }

  return `hover:shadow-${color} h-${props.variant}`
})
</script>

<template>
  <button
    v-motion
    class="flex transition-transform transform rounded-full active:scale-95"
    :class="classes"
    :initial="{
      y: 4,
      scale: 1,
    }"
    :enter="{
      y: 0,
      scale: 1,
    }"
    :tapped="{
      scale: 1.5,
    }"
  >
    <slot></slot>
  </button>
</template>
<style lang="scss" scoped>
.h-blue {
  &-active {
    color: #017acc;
  }

  &:hover {
    filter: drop-shadow(0 0 4px #017acc);
    color: #017acc;
  }
}

.h-purple {
  &-active {
    color: #646cffaa;
  }

  &:hover {
    filter: drop-shadow(0 0 4px #646cffaa);
    color: #646cffaa;
  }
}

.h-pink {
  &-active {
    color: #c025d3;
  }

  &:hover {
    filter: drop-shadow(0 0 4px #c025d3);
    color: #c025d3;
  }
}

.h-green {
  &-active {
    color: #42b883;
  }

  &:hover {
    filter: drop-shadow(0 0 4px #42b883);
    color: #42b883;
  }
}

.h-white {
  &-active {
    color: black;
  }

  &:hover {
    filter: drop-shadow(0 0 4px black);
    color: black;
  }
}

.h-red {
  &-active {
    color: #ba2c60;
  }

  &:hover {
    filter: drop-shadow(0 0 4px #ba2c60);
    color: #ba2c60;
  }
}

.dark .h-white {
  &-active {
    color: white;
  }

  &:hover {
    filter: drop-shadow(0 0 4px white);
    color: white;
  }
}

.h-yellow {
  &-active {
    color: yellow;
  }

  &:hover {
    filter: drop-shadow(0 0 4px yellow);
    color: yellow;
  }
}
</style>
