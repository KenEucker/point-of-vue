<script setup lang="ts">
import { ref } from 'vue'
import ErrorMessage from './ErrorMessage.vue'
import LoginLoading from './LoginLoading.vue'
import VuesLoading from './VuesLoading.vue'
import ImagesLoading from './ImagesLoading.vue'
import PovLoading from './PovLoading.vue'

const props = defineProps({
  loading: { type: Boolean, default: false },
  errorMessage: { type: String, default: null },
  type: { type: String, default: 'pov' },
})

const loadingRef = ref(props.loading)
</script>

<template>
  <div>
    <div v-if="loadingRef">
      <pov-loading v-if="props.type === 'pov'" />
      <login-loading v-else-if="props.type === 'login'" />
      <images-loading v-else-if="props.type === 'images'" />
      <vues-loading v-else-if="props.type === 'vues'" />
    </div>
    <div v-else-if="props.errorMessage">
      <error-message title="Error Fetching Profile Data" :message="props.errorMessage" />
    </div>
  </div>
</template>
