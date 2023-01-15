<script setup lang="ts">
import PovPostInteraction from './PovPostInteraction.vue'
import { gql } from '@apollo/client/core'
import { reactive, watch, computed } from 'vue'
import { useLazyQuery } from '@vue/apollo-composable'
import { useSubscription } from '../../utilities'

const interactions = reactive({
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
})

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
    }
  }
)

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
const { result, load } = useLazyQuery(getPostInteractionsQuery, {
  id: props.postId,
})
watch(result, ({ getPostInteractions }: any) => {
  interactions.likes = getPostInteractions.likes
  interactions.loves = getPostInteractions.loves
  interactions.reposts = getPostInteractions.reposts
  interactions.shares = getPostInteractions.shares
})
load()

const onInteractionSuccess = (interaction: string) => {
  switch (interaction) {
    case 'like':
      interactions.likes = interactions.likes + 1
      break
    case 'love':
      interactions.loves = interactions.loves + 1
      break
    case 'repost':
      interactions.reposts = interactions.reposts + 1
      break
    case 'share':
      interactions.shares = interactions.shares + 1
      break
  }
}
</script>

<template>
  <div class="flex justify-between pt-4 mt-4 border-t border-ll-border dark:border-ld-border">
    <pov-post-interaction
      variant="like"
      :creator-id="props.creatorId"
      :post-id="props.postId"
      :count="interactions.likes"
      :disable-interaction="props.isSelfPost"
    />
    <pov-post-interaction
      variant="love"
      :creator-id="props.creatorId"
      :post-id="props.postId"
      :count="interactions.loves"
      :disable-interaction="props.isSelfPost"
    />
    <pov-post-interaction
      variant="repost"
      :post-id="props.postId"
      :creator-id="props.creatorId"
      :count="interactions.reposts"
      :disable-interaction="props.isSelfPost"
    />
    <pov-post-interaction
      variant="share"
      :post-id="props.postId"
      :creator-id="props.creatorId"
      :count="interactions.shares"
      :hide-count="!props.isSelfPost"
      :disable-interaction="props.isSelfPost"
    />
  </div>
</template>
