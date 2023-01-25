<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import LightIcon from 'vue-ionicons/dist/md-sunny.vue'
import DarkIcon from 'vue-ionicons/dist/md-moon.vue'
import FingerPrint from 'vue-ionicons/dist/md-finger-print.vue'
import { useCreatorState, usePageState } from '../../store/state'
import { useClipboard } from '@vueuse/core'
import Popper from 'vue3-popper'
import { watch, ref } from 'vue'
import DebugIcon from 'vue-ionicons/dist/md-bug.vue'
import AboutIcon from 'vue-ionicons/dist/md-information-circle-outline.vue'

const { copy, isSupported } = useClipboard()

const creatorState = useCreatorState()
const isDark = useDark()
const toggleDark = useToggle(isDark)
const isLoggedIn = ref(creatorState.isLoggedIn)

watch(creatorState, () => {
  if (creatorState.isLoggedIn) {
    isLoggedIn.value = true
  }
})

const copyAuthorization = () => {
  copy(
    pageState.debugMode
      ? JSON.stringify({
          Authorization: `Bearer ${creatorState.getCreatorCredentials?.creatorToken}`,
        })
      : creatorState.getCreatorCredentials?.creatorToken
  )
}

const pageState = usePageState()
</script>

<template>
  <div class="px-2 mb-5 w-full flex">
    <button
      class="flex items-center justify-center w-10 h-10 p-2 transition-transform transform border rounded-md border-ll-border dark:border-ld-border bg-ll-base dark:bg-ld-base dark:text-gray-200 active:scale-95"
      @click="toggleDark()"
    >
      <dark-icon v-show="!isDark" class="w-5 h-5" h="20" w="20" />
      <light-icon v-show="isDark" class="w-5 h-5" h="20" w="20" />
    </button>
    <popper>
      <template #default>
        <button
          v-show="isLoggedIn && pageState.isDataRoute"
          class="flex items-center justify-center w-10 h-10 ml-2 transition-transform transform border rounded-md border-ll-border dark:border-ld-border bg-ll-base dark:bg-ld-base dark:text-gray-200 active:scale-95"
          @click="copyAuthorization"
        >
          <finger-print class="w-5 h-5" h="20" w="20" />
        </button>
      </template>
      <template #content>
        <p v-show="isSupported && !pageState.debugMode">
          Your authentication token has been copied to the clipboard
        </p>
        <p v-show="isSupported && pageState.debugMode">
          Authentication headers have been copied to the clipboard
        </p>
        <p v-show="!isSupported">Your browser does not support Clipboard API</p>
      </template>
    </popper>
    <popper>
      <template #default>
        <button
          class="flex items-center justify-center w-10 h-10 ml-2 transition-transform transform border rounded-md border-ll-border dark:border-ld-border active:scale-95"
          :class="pageState.isAboutDisabled ? 'disabled' : ' dark:text-gray-200'"
          @click="pageState.toggleAboutSidebar()"
        >
          <about-icon class="w-5 h-5" h="20" w="20" />
        </button>
      </template>
      <template #content>
        <p v-show="pageState.debugMode">About widget is now enabled</p>
        <p v-show="!pageState.debugMode">About widget is disabled</p>
      </template>
    </popper>
    <popper>
      <template #default>
        <button
          v-show="isLoggedIn"
          class="flex items-center justify-center w-10 h-10 ml-2 transition-transform transform border rounded-md border-ll-border dark:border-ld-border active:scale-95"
          :class="!pageState.debugMode ? 'disabled' : ' dark:text-gray-200'"
          @click="pageState.toggleDebugMode()"
        >
          <debug-icon class="w-5 h-5" h="20" w="20" />
        </button>
      </template>
      <template #content>
        <p v-show="pageState.debugMode">Debug mode is now enabled</p>
        <p v-show="!pageState.debugMode">Debug mode is disabled</p>
      </template>
    </popper>
  </div>
</template>
