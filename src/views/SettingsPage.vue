<script setup lang="ts">
import PovCreator from '../components/creator/PovCreator.vue'
import { ref, computed } from 'vue'
import { useCreatorState } from '../store/state'
import { Creator } from '../schema/generated/types.d'
import { useRouter } from 'vue-router'
import SpinnerWithError from '../components/atomic/SpinnerWithError.vue'
import ErrorMessage from '../components/atomic/ErrorMessage.vue'

const creatorState = useCreatorState()
const router = useRouter()
const loadingRef = ref(false)
const emailRef = ref()
const handleRef = ref()
const nameRef = ref()
const websiteRef = ref()
const chosendayRef = ref()
const locationRef = ref()
const bioRef = ref()
const avatarRef = ref()
const bannerRef = ref()
const errors = ref()
const errorMessage = ref('')
const dirty = ref(false)

if (creatorState.isCreatorSignedUp !== true) {
  console.info('no way josé', { creatorNotSignedUp: true, path: '/settings' })
  router.push({ path: '/', replace: true })
}

const fields = computed(() => [
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    value: creatorState.getCreator.email,
    required: true,
    placeholder: 'email',
    ref: emailRef,
    fullWidth: true,
  },
  {
    name: 'handle',
    label: '@handle',
    readonly: true,
    prefix: '@',
    value: creatorState.getCreator.handle,
    placeholder: 'handle',
    ref: handleRef,
  },
  {
    name: 'name',
    label: 'Display Name',
    value: creatorState.getCreator.name,
    placeholder: 'name',
    ref: nameRef,
  },
  {
    name: 'location',
    label: 'Location',
    value: creatorState.getCreator.location,
    placeholder: 'location',
    ref: locationRef,
  },
  {
    name: 'chosenday',
    type: 'date',
    label: 'chosenday',
    value: creatorState.getCreator.chosenday,
    placeholder: 'chosenday',
    ref: chosendayRef,
  },
  {
    name: 'avatar',
    label: 'Avatar URL',
    value: creatorState.getCreator.avatar,
    placeholder: 'http://example.com',
    ref: avatarRef,
  },
  {
    name: 'banner',
    label: 'Banner URL',
    value: creatorState.getCreator.banner,
    placeholder: 'http://example.com',
    ref: bannerRef,
  },
  {
    name: 'website',
    label: 'Website',
    value: creatorState.getCreator.website,
    placeholder: 'website',
    fullWidth: true,
    ref: websiteRef,
  },
  {
    name: 'bio',
    label: 'Biography',
    type: 'textarea',
    value: creatorState.getCreator.bio,
    placeholder: 'bio',
    ref: bioRef,
    fullWidth: true,
  },
])

const setValueIfChanged = (reference: any, original: any) => {
  if (reference.value?.length) {
    if (reference.value[0].value && reference.value[0].value !== original) {
      return reference.value[0].value
    }
  }
  return undefined
}

async function saveFields(e: Event) {
  e.preventDefault()

  loadingRef.value = true
  const creatorFieldsToUpdate = {
    avatar: setValueIfChanged(avatarRef, creatorState.getCreator.avatar),
    banner: setValueIfChanged(bannerRef, creatorState.getCreator.banner),
    name: setValueIfChanged(nameRef, creatorState.getCreator.name),
    website: setValueIfChanged(websiteRef, creatorState.getCreator.website),
    chosenday: setValueIfChanged(chosendayRef, creatorState.getCreator.chosenday),
    location: setValueIfChanged(locationRef, creatorState.getCreator.location),
    bio: setValueIfChanged(bioRef, creatorState.getCreator.bio),
    email: setValueIfChanged(emailRef, creatorState.getCreator.email),
  }

  const updateResult = await creatorState.updateCreator(creatorFieldsToUpdate as Creator)
  if (updateResult) {
    avatarRef.value.value = updateResult.avatar
    bannerRef.value.value = updateResult.banner
    nameRef.value.value = updateResult.name
    websiteRef.value.value = updateResult.website
    chosendayRef.value.value = updateResult.chosenday
    locationRef.value.value = updateResult.location
    bioRef.value.value = updateResult.bio
    emailRef.value.value = updateResult.email
  }
  loadingRef.value = false
}
</script>

<template>
  <div class="" @click="errors = false">
    <section
      class="rounded-md shadow-md dark:bg-gray-800"
      :style="{
        background: `url(${creatorState.getCreator.banner}) no-repeat right`,
      }"
    >
      <pov-creator :creator="creatorState.getCreator" size="large" :go-to-creator-page="false" />
    </section>
    <spinner-with-error
      v-if="loadingRef || errors"
      type="pov"
      :error="errorMessage"
      :full-screen="false"
    />
    <section v-else class="max-w-4xl p-6 mx-auto mt-20 rounded-md shadow-md dark:bg-gray-800">
      <h1 class="text-xl font-bold capitalize dark:text-white">Profile settings</h1>
      <form>
        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div
            v-for="field in fields"
            :key="field.name"
            class="relative"
            :class="field.fullWidth ? 'col-span-2' : ''"
          >
            <label :for="field.name">{{ field.label }}</label>
            <input
              :id="field.name"
              :ref="field.ref"
              :name="field.name"
              :readonly="field.readonly"
              :type="field.type ?? 'text'"
              class="block w-full px-4 py-2 mt-2 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              :class="field.fullWidth ? 'col-span-2' : ''"
              :value="field.value"
              @change="dirty = true"
            />
            <span v-if="field.prefix" class="absolute inset-y-10 left-0 flex pl-1">{{
              field.prefix
            }}</span>
          </div>
        </div>

        <div class="flex justify-end mt-6">
          <button
            class="px-6 py-2 leading-5 text-black transition-colors duration-200 transform rounded-md dark:text-white bg-ll-primary hover:bg-ll-secondary focus:outline-none focus:bg-ll-secondary"
            :disabled="!dirty"
            @click="saveFields"
          >
            Save
          </button>
        </div>
      </form>
    </section>
  </div>
</template>
