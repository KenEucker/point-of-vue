<script setup lang="ts">
import { reactive } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Form',
  },
  headings: {
    type: Array<any>,
    default: () => [],
  },
  fields: {
    type: Array<any>,
    default: () => [],
  },
})

const state = reactive({
  currentStep: 1,
  isLoading: false,
  totalSteps: props.fields.length,
  fieldValues: props.fields.map((a: any) =>
    a.reduce((o: any, v: any) => ({ ...o, [v.name]: v.default }), {})
  ),
  fieldNames: props.fields.map((a: any) => a.reduce((o: any, v: any) => [...o, v.name], [])),
})

const formSubmit = (e: Event) => {
  e.preventDefault()

  state.isLoading = true // Set submit button as loading/disabled when submit

  const formData = new FormData()
  state.fieldValues.forEach((a: any) => {
    Object.keys(a).forEach((k: any) => {
      formData.append(k, a[k])
    })
  })
}
</script>
<template>
  <div class="flex flex-col items-center justify-start w-full h-full bg-slate-600">
    <Transition name="fade" mode="out-in">
      <div v-show="state.currentStep < state.totalSteps + 1" class="w-full mb-4">
        <h1 class="_title">{{ props.title }}</h1>
        <div
          class="flex items-center justify-between [&>p]:text-xs [&>p]:pb-1 [&>p]:font-semibold [&>p]:w-full [&>p]:cursor-pointer [&>p]:border-b-[5px] [&>p]:flex [&>p]:items-center [&>p]:justify-between"
        >
          <p
            v-for="(heading, index) in props.headings"
            :key="`heading-${index}`"
            class="mr-2"
            :class="[
              state.currentStep >= index
                ? 'text-gray-50 border-gray-50'
                : 'border-green-300 text-green-300',
            ]"
            @click="state.currentStep = index"
          >
            > {{ index }}. {{ heading.title }}
            <span v-show="state.currentStep > index || state.isLoading == true">✓</span>
          </p>
        </div>
      </div>
    </Transition>
    <form class="relative w-full" @submit="formSubmit">
      <Transition
        v-for="(fieldset, index) in props.fields"
        :key="`fields-${index}`"
        name="fade"
        mode="out-in"
      >
        <div v-show="state.currentStep <= state.totalSteps" class="flex flex-col">
          <div>
            <p class="_sub-title">{{ headings[index] }}</p>
            <div v-for="field in fieldset" :key="`field-${field.name}`">
              <label :for="field.name">{{ field.label }}</label>
              <input
                v-if="field.type == 'text'"
                v-model="state.fieldValues[index][field.name]"
                :name="field.name"
                class="_input"
                type="text"
                :placeholder="field.label"
              />
              <input
                v-if="field.type == 'textarea'"
                v-model="state.fieldValues[index][field.name]"
                type="textarea"
                :name="field.name"
                class="_input"
                :placeholder="field.label"
              />
            </div>
            <p class="_btn-bordered" @click="state.currentStep = 2">Next -></p>
          </div>
        </div>
      </Transition>
      <Transition v-show="state.currentStep === state.totalSteps + 1" name="fade" mode="out-in">
        <div class="flex flex-col items-center justify-center">
          <p class="text-4xl text-green-400">✓</p>
          <h3 class="text-2xl font-bold text-gray-50">Thank you</h3>
          <p class="text-gray-400 text-md">Your request to publish has been sent</p>
        </div>
      </Transition>
    </form>
  </div>
</template>

<!-- This css changes default arrow of select and color of disabled option -->
<style scoped lang="scss">
._btn-white {
  @apply p-2 flex items-center justify-center text-gray-800 bg-gray-50 border border-transparent rounded-md font-medium w-full hover:bg-gray-200 hover:no-underline;
}
._btn-bordered {
  @apply p-2 flex items-center justify-center text-gray-50 border border-gray-50 rounded-md font-medium text-center cursor-pointer w-full hover:bg-gray-50 hover:text-black hover:no-underline;
}
._input {
  @apply text-gray-50 mb-3 w-full bg-slate-700 py-2 px-3 rounded-md outline-none border border-transparent focus:border-gray-400 focus:border;
}
._title {
  @apply font-semibold text-gray-50 text-left w-full text-2xl mb-4;
}
._sub-title {
  @apply text-gray-400 text-sm mb-2;
}

select {
  appearance: none;
}

.arrow {
  display: inline-block;
  position: absolute;
  padding: 2px;
  right: 15px;
  z-index: 10;
  top: 17px;
  border: solid #9ca3af;
  border-width: 0 1.5px 1.5px 0;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}

select:required:invalid {
  color: #9ca3af;
}
</style>
