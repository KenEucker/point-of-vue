<script setup lang="ts">
import { computed } from 'vue'
import ExtraSpecialCheckmark from '../atomic/VerifiedCheckmark.vue'
import CreatorAvatar from './CreatorAvatar.vue'
import CreatorHandle from './CreatorHandle.vue'
import CreatorStatus from './CreatorStatus.vue'
import CreatorWebsite from './CreatorWebsite.vue'
import CreatorJoined from './CreatorJoined.vue'
import CreatorName from './CreatorName.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  creator: {
    type: Object,
    default: () => {
      return {}
    },
  },
  imageOnly: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'small',
  },
  full: {
    type: Boolean,
    default: false,
  },
  goToCreatorPage: {
    type: Boolean,
    default: true,
  },
})

const classes = computed(() => {
  switch (props.size) {
    case 'large':
      return 'max-w-sm max-h-sm'
    case 'medium':
      return 'w-18 h-18'
    case 'small':
    default:
      return 'w-14 h-14'
  }
})

const goToCreatorPage = props.goToCreatorPage
  ? () => {
      router.push(`/${props.creator?.handle}`)
    }
  : () => {
      /// nothing to do
    }
</script>
<template>
  <div
    class="relative flex w-full"
    :class="props.size === 'large' ? 'inline-grid' : 'items-center'"
  >
    <extra-special-checkmark
      v-if="props.creator?.verified"
      :size="props.size"
      class="special-aint-ya"
    />
    <creator-avatar
      :avatar="props.creator?.avatar"
      :class="`${props.goToCreatorPage ? 'cursor-pointer' : ''} ${classes}`"
      @click="goToCreatorPage"
    />
    <div v-if="!props.imageOnly" class="justify-center w-1/2 pl-4">
      <div>
        <h2 class="text-xl font-bold leading-6 dark:text-white">
          <creator-name :name="props.creator?.name" />
        </h2>
        <p class="text-sm font-medium leading-5 text-gray-600">
          <creator-handle :handle="props.creator?.handle" />
        </p>
      </div>
      <div v-if="props.full" class="mt-3">
        <p class="mb-2 leading-tight text-white">
          <creator-status :status="props.creator?.status" />
        </p>
        <div class="flex text-gray-600">
          <creator-website :website="props.creator?.website" :show-icon="true" />
          <creator-joined :joined="props.creator?.joined" :show-icon="true" />
        </div>
      </div>
      <div
        v-if="props.full"
        class="flex items-start justify-start w-full pt-3 divide-x divide-gray-800 divide-solid"
      >
        <div class="pr-3 text-center">
          <span class="font-bold dark:text-white">0</span
          ><span class="text-gray-600"> Following</span>
        </div>
        <div class="px-3 text-center">
          <span class="font-bold dark:text-white">0 </span
          ><span class="text-gray-600"> Followers</span>
        </div>
      </div>
    </div>
  </div>
</template>
