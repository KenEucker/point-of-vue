<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import LightIcon from 'vue-ionicons/dist/md-sunny.vue'
import DarkIcon from 'vue-ionicons/dist/md-moon.vue'
import FingerPrint from 'vue-ionicons/dist/md-finger-print.vue'
import { useCreatorState } from '../../store/state'
import { useRouter } from 'vue-router'
import { useStorage, useClipboard } from '@vueuse/core'
import Popper from 'vue3-popper'
import { watch, ref, computed } from 'vue'

const storedToken = useStorage('creator-token', '')
const { copy, isSupported } = useClipboard()

const router = useRouter()
const creatorState = useCreatorState()
const isDark = useDark()
const toggleDark = useToggle(isDark)
const isLoggedIn = ref(creatorState.isLoggedIn)

watch(creatorState, () => {
  if (creatorState.isLoggedIn) {
    isLoggedIn.value = true
  }
})

const isDataRoute = computed(() =>
  router.currentRoute.value.path === '/data' ? true : router.currentRoute.value.path === '/graph'
)
</script>

<template>
  <div class="px-2 mb-5 w-full flex">
    <button
      class="flex items-center justify-center w-10 h-10 ml-2 transition-transform transform border rounded-md border-ll-border dark:border-ld-border bg-ll-base dark:bg-ld-base dark:text-gray-200 active:scale-95"
      @click="toggleDark()"
    >
      <dark-icon v-show="!isDark" class="w-5 h-5" h="20" w="20" />
      <light-icon v-show="isDark" class="w-5 h-5" h="20" w="20" />
    </button>
    <popper>
      <template #default>
        <button
          v-show="isLoggedIn && isDataRoute"
          class="flex items-center justify-center w-10 h-10 ml-2 transition-transform transform border rounded-md border-ll-border dark:border-ld-border bg-ll-base dark:bg-ld-base dark:text-gray-200 active:scale-95"
          @click="copy(storedToken)"
        >
          <finger-print class="w-5 h-5" h="20" w="20" />
        </button>
      </template>
      <template #content>
        <p v-if="isSupported">Your authentication token has been copied to the clipboard</p>
        <p v-else>Your browser does not support Clipboard API</p>
      </template>
    </popper>
  </div>
</template>
