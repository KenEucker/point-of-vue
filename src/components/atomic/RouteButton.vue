<script setup lang="ts">
import Pov from 'vue-ionicons/dist/md-bonfire.vue'
import Groups from 'vue-ionicons/dist/md-people.vue'
import Home from 'vue-ionicons/dist/md-home.vue'
import NodeJs from 'vue-ionicons/dist/logo-nodejs.vue'
import List from 'vue-ionicons/dist/md-list.vue'
import Explore from 'vue-ionicons/dist/md-grid.vue'
import Notifications from 'vue-ionicons/dist/md-notifications-outline.vue'
import Saved from 'vue-ionicons/dist/md-bookmark.vue'
import Profile from 'vue-ionicons/dist/md-person.vue'
import Settings from 'vue-ionicons/dist/md-settings.vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  active: {
    type: Boolean,
    default: true,
  },
  expanded: {
    type: Boolean,
    default: false,
  },
  path: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: null,
  },
})
</script>
<template>
  <router-link :to="props.path">
    <pov v-if="props.text == 'Hello'" w="40" h="40" />
    <list v-else-if="props.text == 'Posts'" w="30" h="30" />
    <node-js v-else-if="props.text == 'About'" w="30" h="30" class="-mt-1 text-green-400" />
    <home v-else-if="props.text == 'Home'" w="30" h="30" />
    <img
      v-else-if="props.text == 'Graph'"
      class="-mt-1 w-8 h-8 inline"
      src="/img/GraphQL_Logo.svg"
    />
    <explore v-else-if="props.text == 'Data'" w="30" h="30" class="text-blue-600" />
    <notifications v-else-if="props.text == 'Notifications'" w="30" h="30" />
    <saved v-else-if="props.text == 'Favorites'" w="30" h="30" />
    <groups v-else-if="props.text == 'Groups'" w="30" h="30" />
    <profile v-else-if="props.text == 'Profile'" w="30" h="30" />
    <settings v-else-if="props.text == 'Settings'" w="30" h="30" />
    <span v-if="props.expanded" class="ml-5 align-top text-md capitalize">{{
      props.text ?? props.text
    }}</span>
    <slot></slot>
  </router-link>
</template>
