<script setup lang="ts">
import SignUpForm from './SignUpForm.vue'
import { useCreatorState } from '../../store/state'
import { ref } from 'vue'
import { useWindowSize } from '@vueuse/core'

const label = ref('Signup for your own Point Of Vue!')
const formRef = ref()
const showSignupModal = ref(false)
const creatorState = useCreatorState()
const emailRef = ref()

if (creatorState.isLoggedIn && !creatorState.isCreatorSignedUp) {
  emailRef.value = { value: creatorState.getCreator.email }
  showSignupModal.value = true
}

const signUp = async (e: Event) => {
  e.preventDefault()

  const email = emailRef.value.value
  const emailInUse = await creatorState.isEmailInUse(email)
  if (emailInUse) {
    label.value = `email address [${email}] is already signed up.`
  } else {
    showSignupModal.value = true
  }
}
</script>
<template>
  <div class="w-full px-8 pt-6 pb-8 mb-4 bg-gray-900 rounded-lg shadow-lg">
    <div v-if="creatorState.isLoggedIn && creatorState.getCreator.id < 1">
      <div class="mb-4 text-center">
        <label class="block py-2 mb-2 text-2xl font-bold text-green-300">
          Thank you for signing up!
        </label>
      </div>
    </div>
    <form v-else v-show="!showSignupModal" ref="formRef" @submit="signUp">
      <div class="mb-4">
        <label class="block py-2 mb-2 font-bold text-green-300" for="email">
          {{ label }}
        </label>
        <input
          id="email"
          ref="emailRef"
          type="email"
          required
          class="w-full p-3 leading-tight text-gray-700 transition duration-300 ease-in-out transform border rounded shadow appearance-none focus:ring hover:scale-105"
          placeholder="you@somewhere.com"
        />
      </div>
      <div class="flex items-center justify-between pt-4">
        <button
          class="px-4 py-2 font-bold transition duration-300 ease-in-out transform rounded bg-gradient-to-r text-slate-800 from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 focus:ring hover:scale-105"
          type="submit"
        >
          Sign Up
        </button>
      </div>
    </form>
    <sign-up-form v-if="showSignupModal" :email="emailRef.value" />
  </div>
</template>
