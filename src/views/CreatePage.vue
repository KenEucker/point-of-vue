<script setup lang="ts">
import ArrowBack from 'vue-ionicons/dist/md-arrow-back.vue'
import LoadingSpinner from '../components/atomic/LoadingSpinner.vue'
import ErrorMessage from '../components/atomic/ErrorMessage.vue'
import { reactive, watch, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'
import { useRouteParams } from '@vueuse/router'
import { useCreatorState } from '../store/state'
import CodeEditor from 'simple-code-editor'

const loading = ref(false)
const error = ref()
const creatorState = useCreatorState()
const router = useRouter()
const handleParam = useRouteParams('handle')
function goBack() {
  router.back()
}

const state = reactive({
  sec: ['Data', 'Code', 'Preview', 'Publish'],
  selected: 0,
})

function selected(idx: number) {
  state.selected = idx
}
</script>

<template>
  <div>
    <div v-if="loading">
      <loading-spinner />
    </div>
    <div v-else-if="error">
      <error-message title="Error Fetching Profile Data" :message="error.message" />
    </div>
    <div v-else class="w-full p-4 pr-6 max-w-[700px] mx-auto">
      <div class="ml-10 md:ml-0">
        <div class="flex p-1">
          <arrow-back w="25" h="25" class="p-3 px-4 cursor-pointer" @click="goBack" />
        </div>
        <div class="flex">
          <button
            v-for="(section, index) in state.sec"
            :key="index"
            type="button"
            class="flex-grow py-4 text-sm font-semibold transition duration-150 ease-in-out border-ll-border focus:outline-none"
            @click="selected(index)"
          >
            {{ section }}
          </button>
        </div>
      </div>
      <div v-if="state.selected === 0" class="flex grid grid-cols-1">
        <code-editor> // Start your first vue component here </code-editor>
      </div>
    </div>
  </div>
</template>
