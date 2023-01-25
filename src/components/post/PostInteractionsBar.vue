<script setup lang="ts">
import PostInteraction from './PostInteraction.vue'
import { gql } from '@apollo/client/core'
import { reactive, watch, ref, computed } from 'vue'
import { useLazyQuery } from '@vue/apollo-composable'
import { useSubscription } from '../../utilities'
import { vIntersectionObserver } from '@vueuse/components'
import CreatorStatus from '../creator/CreatorStatus.vue'

const interactions = reactive({
  active: new Array<string>(),
  likes: 0,
  loves: 0,
  reposts: 0,
  shares: 0,
})

const props = defineProps({
  creatorId: {
    type: Number,
    default: 0,
  },
  postId: {
    type: Number,
    default: 0,
  },
  disableInteraction: {
    type: Boolean,
    default: false,
  },
  isSelfPost: {
    type: Boolean,
    default: false,
  },
  subscribe: {
    type: Boolean,
    default: false,
  },
})

if (props.subscribe) {
  useSubscription(
    ` 
  subscription NewPostInteractionInteractionBar {
    interactionDelta(where: {
      post: {
        id: ${props.postId}
      }
    }) {
      mutation
      data {
        id
        text
        like
        love
        repost
        share
        creatorId
      }
    }
  }`,
    (i: any) => {
      const delta = i.data?.interactionDelta?.data
      if (delta) {
        interactions.likes += delta.like
        interactions.loves += delta.love
        interactions.reposts += delta.repost
        interactions.shares += delta.share

        if (delta.creatorId === props.creatorId) {
          if (delta.like !== 0) {
            representActiveDelta('like', delta.like)
          }
          if (delta.love !== 0) {
            representActiveDelta('love', delta.love)
          }
          if (delta.repost !== 0) {
            representActiveDelta('repost', delta.repost)
          }
          if (delta.share !== 0) {
            representActiveDelta('share', delta.share)
          }
        }
      }
    }
  )
}

const getPostInteractionsQuery = gql`
  query PovPostGetInteractionNumbers($id: Int!) {
    getPostInteractions(id: $id) {
      likes
      loves
      reposts
      shares
    }
  }
`
const { result, load } = useLazyQuery(
  getPostInteractionsQuery,
  {
    id: props.postId,
  },
  { debounce: 1000 }
)
watch(result, ({ getPostInteractions }: any) => {
  interactions.likes = getPostInteractions.likes
  interactions.loves = getPostInteractions.loves
  interactions.reposts = getPostInteractions.reposts
  interactions.shares = getPostInteractions.shares
})

const representActiveDelta = (interaction: string, delta: number) => {
  if (delta > 0) {
    const shouldBeNegativeOne = interactions.active.indexOf(interaction)
    if (shouldBeNegativeOne === -1) {
      interactions.active.push(interaction)
    }
  } else if (delta < 0) {
    const shouldNotBeNegativeOne = interactions.active.indexOf(interaction)
    if (shouldNotBeNegativeOne !== -1) {
      interactions.active.splice(shouldNotBeNegativeOne, 1)
    }
  }
}

const onInteractionSuccess = ({ interaction, delta }: { interaction: string; delta: number }) => {
  /// Let the subscriptions handle themselves
  if (props.subscribe) {
    return
  }

  switch (interaction) {
    case 'like':
      interactions.likes = interactions.likes + delta
      break
    case 'love':
      interactions.loves = interactions.loves + delta
      break
    case 'repost':
      interactions.reposts = interactions.reposts + delta
      break
    case 'share':
      interactions.shares = interactions.shares + delta
      break
  }

  representActiveDelta(interaction, delta)
}

const interactionsFetched = ref(false)

function onIntersectionObserver([{ isIntersecting }]: any) {
  if (isIntersecting && !interactionsFetched.value) {
    interactionsFetched.value = true
    load()
  }
}

const isInteractionActive = (interaction: string) => interactions.active.indexOf(interaction) !== -1

const isLikeActive = computed(() => isInteractionActive('like'))
const isLoveActive = computed(() => isInteractionActive('love'))
const isRepostActive = computed(() => isInteractionActive('repost'))
// const isShareActive = computed(() => isInteractionActive('share'))
</script>

<template>
  <div
    v-intersection-observer="onIntersectionObserver"
    class="flex justify-between pt-4 mt-4 border-t border-ll-border dark:border-ld-border"
  >
    <post-interaction
      variant="like"
      :creator-id="props.creatorId"
      :post-id="props.postId"
      :count="interactions.likes"
      :disable-interaction="props.isSelfPost"
      :active="isLikeActive"
      @on-interaction="onInteractionSuccess"
    />
    <post-interaction
      variant="love"
      :creator-id="props.creatorId"
      :post-id="props.postId"
      :count="interactions.loves"
      :disable-interaction="props.isSelfPost"
      :active="isLoveActive"
      @on-interaction="onInteractionSuccess"
    />
    <post-interaction
      variant="repost"
      :post-id="props.postId"
      :creator-id="props.creatorId"
      :count="interactions.reposts"
      :disable-interaction="props.isSelfPost"
      :active="isRepostActive"
      @on-interaction="onInteractionSuccess"
    />
    <post-interaction
      variant="share"
      :post-id="props.postId"
      :creator-id="props.creatorId"
      :count="interactions.shares"
      :hide-count="!props.isSelfPost"
      :disable-interaction="props.isSelfPost"
      @on-interaction="onInteractionSuccess"
    />
  </div>
</template>
