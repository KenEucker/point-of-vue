<script setup lang="ts">
import { ref } from 'vue'
import { useMouse, useCounter, useDark, useToggle, useFps } from '@vueuse/core'
import { UseNetwork } from '@vueuse/components'
import { useMotion } from '@vueuse/motion'
import { getGraphUrl } from '../../utilities'

let counting = false

const isDark = useDark()
const toggleDark = useToggle(isDark)
const { x, y } = useMouse()
const { count, inc, dec } = useCounter()
const fps = useFps()
const countdown = ref<HTMLElement>()

const { apply } = useMotion(countdown, {
  initial: {
    opacity: 0,
    y: -100,
    'text-shadow': '0 0 1px rgba(0,0,0,0),',
  },
  enter: {
    opacity: 1,
    y: 0,
    'text-shadow': '0 0 10px rgba(0,200,0,1),',
  },
  glowing: {
    opacity: 1,
    y: 0,
    'text-shadow': '0 0 10px rgba(0,200,0,1),',
    transition: {
      duration: 250,
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
})

const beginCountdown = () => {
  if (counting || !countdown.value) {
    return
  }

  countdown.value.innerHTML = '...'
  apply('glowing')
  counting = true

  const url = new URL(getGraphUrl())

  url.searchParams.append(
    'query',
    `subscription Countdown($from: Int!) {
        countdown(from: $from)
      }`
  )
  url.searchParams.append('variables', JSON.stringify({ from: 100 }))

  const eventsource = new EventSource(url.toString(), {
    withCredentials: true, // This is required for cookies
  })

  eventsource.onmessage = function (event) {
    const data = JSON.parse(event.data)
    const count = data.data.countdown

    if (!count || !countdown.value) {
      return
    }

    countdown.value.innerHTML = count
  }
}
</script>

<template>
  <div class="w-full md:p-4 md:w-3/4 m-auto">
    <div
      class="border-1 border-gray-400 rounded-b rounded-r rounded-l p-4 flex grid grid-rows-3 grid-cols-2 items-center justify-between"
    >
      <div class="col-span-2 text-center">
        <div class="font-bold text-xl mb-2">VueUse, VueUse-Motion, Vue-Apollo</div>
        <p class="text-gray-700 text-base">The following items use the tech listed above</p>
      </div>
      <div class="text-center">
        <div class="my-2 justify-center">
          <button
            class="bg-green-500 hover:bg-green-700 text-sm py-2 px-4 rounded"
            type="button"
            @click="beginCountdown()"
          >
            count down
          </button>
          <span ref="countdown" class="countdown">100</span>
        </div>
        <div class="my-2">
          <button
            class="bg-green-500 hover:bg-green-700 text-sm py-2 px-4 rounded"
            type="button"
            @click="dec()"
          >
            -
          </button>
          <span>count is {{ count }}</span>
          <button
            class="bg-green-500 hover:bg-green-700 text-sm py-2 px-4 rounded"
            type="button"
            @click="inc()"
          >
            +
          </button>
        </div>
        <div class="my-2">
          <button
            class="bg-green-500 hover:bg-green-700 text-sm py-2 px-4 rounded"
            @click="toggleDark()"
          >
            Enable {{ isDark ? 'Light' : 'Dark' }} Mode
          </button>
        </div>
      </div>
      <div class="text-lg">
        <p>Mouse: {{ x }} x {{ y }}</p>
        <UseNetwork v-slot="{ isOnline, downlink, downlinkMax, effectiveType, type }">
          <p>IsOnline: {{ isOnline }}</p>
          <p>Speed: {{ downlinkMax ?? downlink }}</p>
          <p>Connection: {{ type ?? effectiveType }}</p>
          <p>FPS: {{ fps }}</p>
        </UseNetwork>
      </div>
    </div>
  </div>
</template>

<style scoped>
span {
  padding-left: 10px;
  padding-right: 10px;
}

.countdown {
  margin-left: 25px;
  font-size: 32px;
  text-align: right;
  vertical-align: middle;
}
</style>
