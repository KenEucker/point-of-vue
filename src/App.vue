<script setup lang="ts">
import AppLayout from './components/layout/AppLayout.vue'
import HeaderBar from './components/page/HeaderBar.vue'
import SlideMenuLeft from './components/page/SlideMenuLeft.vue'
import SlideMenuRight from './components/page/SlideMenuRight.vue'

import { VueNotificationList } from '@dafcoe/vue-notification'

import { useRouter } from 'vue-router'
import { usePageState, usePovState, useCreatorState } from './store/state'

const { currentRoute } = useRouter()
const pageState = usePageState()
const povState = usePovState()
const creatorState = useCreatorState()

pageState.init()
creatorState.init()
povState.init()
</script>
<template>
  <app-layout
    :left-menu-open="pageState.leftMenuOpen"
    :right-menu-open="pageState.rightMenuOpen"
    class="w-full h-screen relative"
  >
    <template #header>
      <header-bar
        :display-right-menu-button="!currentRoute.meta.hideRightMenu"
        :left-menu-open="pageState.leftMenuOpen"
        :right-menu-open="pageState.rightMenuOpen"
        @on-menu-click="pageState.closeRightMenu()"
        @on-right-menu-click="pageState.closeRightMenu()"
      >
      </header-bar>
    </template>
    <template #leftMenu>
      <slide-menu-left :is-expanded="pageState.leftMenuOpen"> </slide-menu-left>
    </template>
    <template v-if="!currentRoute.meta.hideRightMenu" #rightMenu>
      <slide-menu-right> </slide-menu-right>
    </template>
    <template #body>
      <vue-notification-list :position="pageState.getNotificationsPosition"></vue-notification-list>
      <router-view :key="$route.fullPath"></router-view>
    </template>
  </app-layout>
</template>
