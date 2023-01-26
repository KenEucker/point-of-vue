<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import PlanetIcon from 'vue-ionicons/dist/md-planet.vue'
import BaseballIcon from 'vue-ionicons/dist/md-baseball.vue'
import BasketIcon from 'vue-ionicons/dist/md-basket.vue'
import AnalyticsIcon from 'vue-ionicons/dist/md-analytics.vue'
import ImagesIcon from 'vue-ionicons/dist/md-images.vue'
import HammerIcon from 'vue-ionicons/dist/md-hammer.vue'
import HeadsetIcon from 'vue-ionicons/dist/md-headset.vue'
import PullIcon from 'vue-ionicons/dist/md-git-pull-request.vue'
import { onClickOutside } from '@vueuse/core'
import type { PovComponent } from '../../utilities'
import { loadModule } from 'vue3-sfc-loader'
import { useVuesState } from '../../store/state'
import * as Vue from 'vue'

const vuesState = useVuesState()
const props = defineProps({
  component: {
    type: Object,
    default: () => ({}),
  },
  showStatus: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: 'display',
  },
  lazy: {
    type: Boolean,
    default: false,
  },
})

const showStatus = ref(false)
const emit = defineEmits(['edit', 'view', 'archive', 'delete', 'logs'])
const containerRef = ref()
const componentRef = ref()
const logs = reactive<{ errors: string[]; info: string[] }>({
  errors: [],
  info: [],
})
onClickOutside(containerRef, () => (showStatus.value = false))

const getOptions = (component: PovComponent) => {
  switch (component.status) {
    case 'good':
      return ['edit', 'archive']
    case 'error':
      return ['edit', 'logs']
    default:
      return ['view']
  }
}

const renderComponent = (component: any = undefined) => {
  component = component ?? props.component
  if (componentRef.value && props.variant === 'display') {
    /// Clear the logs
    logs.errors = []
    logs.info = []
    const options = {
      moduleCache: { vue: Vue },
      getFile: async () => {
        if (!(component?.json || component?.script || component?.template)) {
          console.error('whyy?', component)
          logs.errors.push('no files to load')
          return ''
        } else {
          // console.info('success', component)
        }

        const compiled = await vuesState.compileComponent(component)
        if (compiled.logs) {
          if (compiled.logs.info?.length) {
            logs.info = compiled.logs.info
          }
          if (compiled.logs.errors?.length) {
            logs.errors = compiled.logs.errors
            return ''
          }
        }

        return compiled.output
      },
      addStyle: async (textContent: any) => {
        // console.log({ textContent })
        // Feature blocked
        // const style = Object.assign(document.createElement('style'), { textContent })
        // const ref = document.head.getElementsByTagName('style')[0] || null
        // document.head.insertBefore(style, ref)
      },
    }

    try {
      Vue.createApp(
        Vue.defineAsyncComponent(async () => {
          try {
            return await loadModule('file.vue', options)
          } catch (error) {
            console.error('load module error', error)
            logs.errors.push('compilation error')
            logs.errors.push(e.message)

            return Promise.resolve()
          }
        })
      ).mount(componentRef.value)
    } catch (e: any) {
      console.error('compilation error', e)
      logs.errors.push('compilation error')
      logs.errors.push(e.message)
    }
    // refreshTailwindCss()
  }
}

if (!props.lazy) {
  onMounted(renderComponent)
}

const onStatusButtonClick = (option: string) => {
  /// It's a hack eat hack world out there
  switch (option) {
    case 'edit':
      emit('edit', props.component.oid)
      break

    case 'view':
      emit('view', props.component.oid)
      break

    case 'archive':
      emit('archive', props.component.oid)
      break

    case 'delete':
      emit('delete', props.component.oid)
      break

    case 'logs':
      emit('logs', props.component.oid)
      break
  }
}

defineExpose({ renderComponent })
</script>
<template>
  <div
    ref="containerRef"
    class="component-outer w-auto m-8 text-gray-800 divide-y divide-gray-300 rounded-lg shadow-md sm:m-4"
    :class="`bg-${component.background ? component.background : 'white'}`"
  >
    <div v-if="logs.errors?.length || logs.info?.length" class="h-full">
      <div
        v-if="logs.errors?.length"
        class="px-2 text-pink-900 bg-pink-100 border-4 border-pink-500 rounded-xl shadow-md"
        role="alert"
      >
        <div class="flex">
          <div class="py-1">
            <svg
              class="w-6 h-6 mr-4 text-pink-500 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
              />
            </svg>
          </div>
          <div>
            <pre class="font-bold flex flex-wrap text-sm">
              <div v-for="(error, i) in logs.errors" :key="`error-${i}`" class="">{{ error }}</div>
            </pre>
            <p class="text-sm">This prevented the component from rendering</p>
          </div>
        </div>
      </div>
      <div
        v-if="logs.info?.length"
        class="px-2 text-teal-900 bg-teal-100 border-4 border-teal-500 rounded-xl shadow-md"
        role="info"
      >
        <div class="flex">
          <div class="py-1">
            <svg
              class="w-6 h-6 mr-4 text-teal-500 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
              />
            </svg>
          </div>
          <div>
            <pre class="font-bold flex flex-wrap text-sm">
              <div
v-for="(log, i) in logs.info" :key="`log-${i}`" class="">{{ log }}</div>
            </pre>
            <p class="text-sm">This did not prevent the component from rendering</p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-start px-4 py-5">
      <div class="mr-3 my-auto">
        <planet-icon v-if="props.component.icon === 'planet'" h="40" w="40" />
        <baseball-icon v-if="props.component.icon === 'baseball'" h="40" w="40" />
        <basket-icon v-if="props.component.icon === 'basket'" h="40" w="40" />
        <analytics-icon v-if="props.component.icon === 'analytics'" h="40" w="40" />
        <images-icon v-if="props.component.icon === 'images'" h="40" w="40" />
        <hammer-icon v-if="props.component.icon === 'hammer'" h="40" w="40" />
        <headset-icon v-if="props.component.icon === 'headset'" h="40" w="40" />
        <pull-icon v-if="props.component.icon === 'pull'" h="40" w="40" />
      </div>
      <h2 class="mr-auto">
        <span class="block font-sans text-2xl font-semibold text-gray-900">{{
          props.component.name
        }}</span>
        <span class="block font-light text-gray-800">{{ props.component.category }}</span>
      </h2>

      <div v-if="props.showStatus" class="relative">
        <button
          type="button"
          class="flex items-center w-10 h-6 border rounded-full justify-evenly focus:outline-none"
          @click.stop="showStatus = true"
        >
          <span
            :class="
              props.component.status === 'good'
                ? 'bg-emerald-500'
                : props.component.status === 'error'
                ? 'bg-red-500'
                : 'bg-purple-500'
            "
            class="w-4 h-4 rounded-full sm:w-4 sm:h-4"
          ></span>
          <svg
            class="w-3 h-3 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>

        <nav
          v-show="showStatus"
          class="absolute right-0 w-32 py-2 mt-1 text-sm bg-white border border-gray-300 rounded shadow-xl sm:py-1 sm:w-24 sm:text-xs"
        >
          <button
            v-for="option in getOptions(props.component as PovComponent)"
            :key="`${props.component.name}-option-${option}`"
            class="flex items-center px-3 py-1 w-full sm:px-2 hover:bg-gray-200"
            @click="onStatusButtonClick(option)"
          >
            {{ option }}
          </button>
        </nav>
      </div>
    </div>
    <div class="component-inner">
      <div ref="componentRef"></div>
      <slot></slot>
    </div>
  </div>
</template>
