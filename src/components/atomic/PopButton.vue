<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import Popper from 'vue3-popper'

const props = defineProps({
  variant: {
    type: String,
    default: 'green',
  },
  popoverContent: {
    type: String,
    default: null,
  },
})

const classes = computed(() => {
  const [color, size] = props.variant.split('-')
  let hColor = color
  let hoverColor = ''
  let hoverSize = ''

  switch (color) {
    case 'like':
      hColor = 'red'
      break
    case 'love':
      hColor = 'purple'
      break
    case 'repost':
      hColor = 'green'
      break
    case 'share':
      hColor = 'blue'
      break
    default:
      break
  }
  hoverColor = hColor ? `${hColor}-600` : ''
  switch (size) {
    case 'thick':
      hoverSize = '-xl'
      break
    default:
      hoverSize = ''
      break
  }

  return `${hoverColor.length ? `hover:shadow-${hoverColor}` : ''} ${
    hoverSize.length ? `hover:shadow${hoverSize}` : ''
  } h-${hColor}`
})

const attrs = useAttrs()
</script>

<template>
  <popper
    :content="props.popoverContent"
    placement="top"
    :arrow="true"
    :close-delay="200"
    :disable-click-away="false"
  >
    <button
      v-motion
      class="flex m-auto transition-transform transform rounded-full active:scale-95"
      :class="classes"
      :v-bind="attrs"
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
  </popper>
</template>
<style>
:root {
  --popper-theme-background-color: #fff;
  --popper-theme-background-color-hover: #fff;
  --popper-theme-text-color: #333;
  --popper-theme-border-width: 0;
  --popper-theme-border-style: solid;
  --popper-theme-border-radius: 6px;
  --popper-theme-padding: 5px;
  --popper-theme-box-shadow: 0 6px 30px -6px rgb(0 0 0 / 25%);
}
</style>
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

.h-red {
  &-active {
    color: #ba2c60;
  }

  &:hover {
    filter: drop-shadow(0 0 4px #ba2c60);
    color: #ba2c60;
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
