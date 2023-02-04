<script setup lang="ts">
import ArrowBack from 'vue-ionicons/dist/md-arrow-back.vue'
import PovPost from '../components/post/PovPost.vue'
import SpinnerWithError from '../components/atomic/SpinnerWithError.vue'
import PovCreator from '../components/creator/PovCreator.vue'
import FollowCreator from '../components/creator/FollowCreator.vue'
import VueComponent from '../components/vues/VueComponent.vue'
import SlideMenuBottom from '../components/page/SlideMenuBottom.vue'
import TemplateEditor from '../components/vues/TemplateEditor.vue'
import { reactive, watch, ref } from 'vue'
import { useQuery, useLazyQuery } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'
import { useRouter } from 'vue-router'
import { useRouteParams } from '@vueuse/router'
import { useCreatorState } from '../store/state'

const router = useRouter()
const creatorState = useCreatorState()
const handleParam = useRouteParams('handle')
const handleParamIsSet = handleParam.value?.length
if (!handleParamIsSet && !creatorState.getCreator?.handle) {
  router.push({ path: '/', replace: true })
}
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
    }
  }
`

const creatorPostsByHandleQuery = gql`
  query CreatorByHandle($handle: String!) {
    creator(where: { handle: $handle }) {
      id
      posts {
        id
        title
        text
        media
        createdAt
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

const creatorVueByHandleQuery = gql`
  query CreatorByHandle($handle: String!) {
    creator(where: { handle: $handle }) {
      id
      vue {
        id
        title
        code
        creator {
          id
          handle
          name
          avatar
        }
      }
    }
  }
`

const creator = ref<any>({})
const creatorPosts = ref<any>([])
const creatorVue = ref<any>([])
const {
  result: creatorResult,
  loading: creatorLoading,
  error: creatorError,
} = useQuery(creatorByHandleQuery, { handle })
watch(creatorResult, (r) => {
  if (r?.creator) {
    creator.value = r.creator
    isOwnPage.value = creator.value.handle === creatorState.getCreator?.handle

    fetchPosts()
    fetchVue()
  } else {
    router.push({ path: '/', replace: true })
  }
})

const {
  result: postsResult,
  loading: postsLoading,
  error: postsError,
  load: fetchPosts,
} = useLazyQuery(creatorPostsByHandleQuery, { handle })

watch(postsResult, (r) => {
  if (r?.creator) {
    creatorPosts.value = r.creator.posts
  }
})

const {
  result: vueResult,
  loading: vueLoading,
  error: vueError,
  load: fetchVue,
} = useLazyQuery(creatorVueByHandleQuery, { handle })

watch(vueResult, (r) => {
  if (r?.creator) {
    creatorVue.value = r.creator.vue
  }
})

const state = reactive({
  sec: ['Vues', 'Posts', 'Groups'],
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
    <spinner-with-error
      v-if="postsLoading || creatorLoading || creatorError || postsError"
      type="pov"
      :error="creatorError?.message ?? postsError?.message"
      title="creatorError?.message ? 'Error Fetching Profile Data' : 'Error Fetching Post Data'"
      :full-screen="false"
    />
    <div v-else class="w-full p-4 pr-6 mx-auto max-w-fit">
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
          <img :src="creator?.banner" class="w-full" />
        </div>
        <pov-creator
          v-if="isOwnPage"
          :creator="creator"
          size="medium"
          class="-mt-4 -ml-10"
          :full="true"
          :go-to-creator-page="false"
        />
        <follow-creator
          v-else
          :creator="creator"
          size="medium"
          class="-mt-4 -ml-10"
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
      <div v-show="state.selected === 0" class="flex grid grid-cols-1">
        <vue-component v-for="vue in creatorVue" :key="vue.id" :vue="vue" />
      </div>
      <div v-show="state.selected === 1" class="flex grid grid-cols-1">
        <pov-post
          v-for="post in creatorPosts"
          :key="post.id"
          :post="post"
          :is-self-post="isOwnPage"
        />
      </div>
      <div v-show="state.selected === 2" class="flex grid grid-cols-1">My Groups</div>
    </div>
    <slide-menu-bottom v-if="isOwnPage">
      <template-editor class="h-full" />
    </slide-menu-bottom>
  </div>
</template>
