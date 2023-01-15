<script setup lang="ts">
import { ref } from 'vue'
import LoginIcon from 'vue-ionicons/dist/md-log-in.vue'
import LogoutIcon from 'vue-ionicons/dist/md-log-out.vue'
import PointOfVue from '../atomic/PointOfVue.vue'
import PopButton from '../atomic/PopButton.vue'
import PovCreator from './CreateCreator.vue'
import { useMenuState, useCreatorState } from '../../store/state'
import { storeToRefs } from 'pinia'
import LoadingSpinner from '../atomic/LoadingSpinner.vue'
import { watch } from 'vue'
const emailInput = ref()
const menuState = useMenuState()
const creatorState = useCreatorState()
const loggingIn = ref()
const errorMessage = ref()

const props = defineProps({
  isExpanded: Boolean,
  useAuth0: Boolean,
})

const { creator } = storeToRefs(creatorState)
watch(creator, () => {
  if (creatorState.isLoggedIn) {
    loggingIn.value = false
    if (creatorState.getCreatorId > 0) {
      menuState.openCreatePost()
    }
  } else {
    menuState.closeCreatePost()
  }
})

const loginWithEmail = async () => {
  loggingIn.value = true
  errorMessage.value = await creatorState.loginWithEmail(emailInput.value.value)
  loggingIn.value = false
}

const logout = () => {
  creatorState.logout()
}

creatorState.checkLogin()

const useLogin = async () => {
  await creatorState.loginWithAuth0()
}
</script>

<template>
  <div class="flex items-center justify-center">
    <div v-if="creatorState.isLoggedIn" class="relative flex flex-col profile">
      <button v-if="props.isExpanded" class="absolute -top-1/5 left-1/2" @click="logout()">
        <logout-icon h="32" w="32" />
      </button>
      <pov-creator
        :creator="creator"
        size="small"
        :image-only="!props.isExpanded"
        :go-to-creator-page="false"
      />
      <div
        v-if="props.isExpanded"
        class="flex justify-between w-full gap-2 pb-5 mt-5 border-b border-ll-border dark:border-ld-border"
      >
        <div class="flex flex-col items-center justify-center">
          <p class="text-lg font-bold text-gray-800 dark:text-gray-300">
            {{ creator.posts?.length ?? 0 }}
          </p>
          <p class="-mt-1 text-xs">Posts</p>
        </div>
        <div class="flex flex-col items-center justify-center">
          <p class="text-lg font-bold text-gray-800 dark:text-gray-300">
            {{ 0 }}
          </p>
          <p class="-mt-1 text-xs">Followers</p>
        </div>
        <div class="flex flex-col items-center justify-center">
          <p class="text-lg font-bold text-gray-800 dark:text-gray-300">
            {{ 0 }}
          </p>
          <p class="-mt-1 text-xs">Following</p>
        </div>
      </div>
    </div>
    <div
      v-else-if="props.isExpanded"
      class="flex flex-col w-full p-2 rounded shadow-md dark:bg-ld-base sm:w-100 md:w-40 lg:w-60 lg:p-4 lg:pt-6 lg:mb-4"
    >
      <loading-spinner v-if="loggingIn" :full-screen="false" />
      <div v-else-if="errorMessage" @click="errorMessage = null">
        {{ errorMessage }}
      </div>
      <div v-else-if="props.useAuth0">
        <pop-button> Login <login-icon h="24" w="24" @click="useLogin" /> </pop-button>
      </div>
      <div v-else class="mb-4">
        <label class="block mb-2 text-sm font-bold text-center text-grey-darker" for="email">
          <point-of-vue :expanded="props.isExpanded" />
        </label>
        <input
          id="email"
          ref="emailInput"
          class="w-full px-3 py-2 border rounded shadow appearance-none text-grey-darker"
          type="text"
          placeholder="Email Address"
        />
        <button
          class="flex items-center justify-center w-full py-3 mt-2 transition-transform transform rounded-lg bg-ll-primary dark:bg-ld-primary text-tight active:scale-95"
          type="button"
          @click="loginWithEmail()"
        >
          <login-icon h="20" w="20" />
        </button>
      </div>
    </div>
    <button
      v-else
      class="flex py-3 transition-transform transform rounded-lg text-tight active:scale-95"
      type="button"
    >
      <login-icon h="24" w="24" @click="menuState.openLeftMenu()" />
    </button>
  </div>
</template>
