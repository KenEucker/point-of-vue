<script setup lang="ts">
import LoadingSpinner from '../atomic/LoadingSpinner.vue'
import PovCreator from '../creator/CreateCreator.vue'
import { useCreatorState } from '../../store/state'
import { ref, reactive } from 'vue'
import { Creator } from '../../schema/generated/types'
import { useWindowSize } from '@vueuse/core'
import { useRouter } from 'vue-router'

const props = defineProps({
  email: {
    type: String,
    default: '',
  },
})

const { width } = useWindowSize()
const label = ref('Signup for your own Point Of Vue!')
const signUpForm = ref()
const handleRef = ref()
const loadingRef = ref(false)
const errors = ref()
const showSignupModal = ref(false)
const creatorState = useCreatorState()
const router = useRouter()
const creator = reactive({ ...creatorState.getCreator, email: props.email })

const completeSignup = async (e: Event) => {
  e.preventDefault()
  e.stopPropagation()

  loadingRef.value = true
  const result = await creatorState.creatorSignup({
    email: creator.email,
    name: creator.name,
    handle: creator.handle,
    avatar: creator.avatar,
  } as Creator)
  if (result) {
    errors.value = result
  } else {
    showSignupModal.value = false
    router.push('/posts')
  }
  loadingRef.value = false
  return false
}
</script>
<template>
  <div class="w-full mt-4 bg-gray-900 rounded-lg shadow-lg">
    <loading-spinner v-if="loadingRef" />
    <form
      v-else
      ref="signUpForm"
      class="w-full p-4 border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
      @submit="completeSignup"
    >
      <pov-creator
        :size="width < 500 ? 'medium' : 'large'"
        :creator="creator"
        :go-to-creator-page="false"
      />
      <div
        v-if="errors"
        class="relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded"
        role="alert"
      >
        <span class="block sm:inline">{{ errors }}</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3" @click="errors = null">
          <svg
            class="w-6 h-6 text-red-500 fill-current"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path
              d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
            />
          </svg>
        </span>
      </div>
      <h5 v-else class="text-xl font-medium text-white">Complete your signup</h5>
      <fieldset>
        <p>
          <label class="block mb-2 text-sm font-medium text-white" for="email">Email Address</label>
          <input
            v-model="creator.email"
            type="email"
            name="email"
            required
            readonly
            class="relative block w-full px-4 py-2 mt-2 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-500 focus:outline-none focus:ring"
          />
        </p>
        <p class="relative">
          <label class="block mb-2 text-sm font-medium text-white" for="handle">Handle</label>
          <input
            :ref="handleRef"
            v-model="creator.handle"
            type="handle"
            name="handle"
            required
            class="relative block w-full px-4.5 py-2 mt-2 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-500 focus:outline-none focus:ring"
          />
          <span class="absolute inset-y-9 left-0 flex pl-[1%]">@</span>
        </p>
        <p>
          <label class="block mb-2 text-sm font-medium text-white" for="name">Avatar URL</label>
          <input
            v-model="creator.avatar"
            type="avatar"
            name="avatar"
            required
            class="relative block w-full px-4 py-2 mt-2 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-500 focus:outline-none focus:ring"
          />
        </p>
        <p>
          <label class="block mb-2 text-sm font-medium text-white" for="name">Name</label>
          <input
            v-model="creator.name"
            type="name"
            name="name"
            required
            class="relative block w-full px-4 py-2 mt-2 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-500 focus:outline-none focus:ring"
          />
        </p>

        <div class="flex items-start mt-1">
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="verified"
                type="checkbox"
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-green-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-green-600 dark:ring-offset-gray-800"
                @click="(e: Event) => (creator.verified = (e.target as HTMLInputElement).checked)"
              />
            </div>
            <label for="verify" class="ml-2 text-sm font-medium text-gray-300">Verify me</label>
          </div>
          <a href="#" class="ml-auto text-sm text-green-700 hover:underline dark:text-green-500"
            >no password?</a
          >
        </div>
        <button
          type="submit"
          class="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 mt-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Create your account
        </button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
          By clicking create account you agree that you haven't read any terms or conditions
        </div>
      </fieldset>
    </form>
  </div>
</template>
