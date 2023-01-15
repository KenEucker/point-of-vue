<script setup lang="ts">
import ArrowBack from 'vue-ionicons/dist/md-arrow-back.vue'
import PovPost from '../components/post/PovPost.vue'
import LoadingSpinner from '../components/atomic/LoadingSpinner.vue'
import ErrorMessage from '../components/atomic/ErrorMessage.vue'
import PovCreator from '../components/creator/CreateCreator.vue'
import FollowCreator from '../components/creator/FollowCreator.vue'
import { reactive, watch, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'
import { useRouteParams } from '@vueuse/router'
import { useCreatorState } from '../store/state'

const creatorState = useCreatorState()
const handleParam = useRouteParams('handle')
const handleParamIsSet = handleParam.value?.length
const handle = handleParamIsSet ? handleParam : creatorState.getCreator.handle

const creatorByHandleQuery = gql`
  query CreatorByHandle($handle: String!) {
    creator(where: { handle: $handle }) {
      id
      name
      email
      handle
      avatar
      status
      verified
      banner
      website
      posts {
        id
        title
        text
        media
        creator {
          id
          handle
          name
          avatar
          status
          verified
        }
      }
    }
  }
`

const creator = ref()
const router = useRouter()
const { result, loading, error } = useQuery(creatorByHandleQuery, { handle })
const creatorQuery = reactive(result)

watch(creatorQuery, (r) => {
  if (r?.creator) {
    creator.value = r.creator
    isOwnPage.value = creator.value.handle === handle
  } else {
    router.push('/')
  }
})

const state = reactive({
  sec: ['Posts', 'Threads', 'Groups', 'Favorites'],
  selected: 0,
})

const isOwnPage = ref(false)

function goBack() {
  router.back()
}

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
          <arrow-back
            v-if="!isOwnPage"
            w="25"
            h="25"
            class="p-3 px-4 cursor-pointer"
            @click="goBack"
          />
          <div>
            <span class="block mb-0 text-xl font-bold">{{ creator?.name }}</span>
            <small>{{ creator?.posts?.length ?? 0 }} Posts</small>
          </div>
        </div>
        <div class="object-fill bg-gray-700 banner min-h-50 h-50">
          <img :src="creator?.banner" class="w-[100%]" />
        </div>
        <pov-creator
          v-if="isOwnPage"
          :creator="creator"
          size="medium"
          class="-ml-10 -mt-4"
          :full="true"
          :go-to-creator-page="false"
        />
        <follow-creator
          v-else
          :creator="creator"
          size="medium"
          class="-ml-10 -mt-4"
          :full="true"
          :go-to-creator-page="false"
        />
        <div class="flex">
          <button
            v-for="(section, index) in state.sec"
            :key="index"
            type="button"
            class="flex-grow py-4 text-sm font-semibold transition duration-150 ease-in-out border-ll-border focus:outline-none"
            :class="state.selected ? 'border-b-2' : ''"
            @click="selected(index)"
          >
            {{ section }}
          </button>
        </div>
      </div>
      <div v-if="state.selected === 0" class="flex grid grid-cols-1">
        <pov-post
          v-for="post in creator?.posts"
          :key="post.id"
          :post="post"
          :is-self-post="isOwnPage"
        />
      </div>
    </div>
  </div>
</template>
