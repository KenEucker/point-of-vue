<script setup lang="ts">
import AppLayout from './components/layout/AppLayout.vue'
import HeaderBar from './components/page/HeaderBar.vue'
import SlideMenuLeft from './components/page/SlideMenuLeft.vue'
import SlideMenuRight from './components/page/SlideMenuRight.vue'
import SlideMenuBottom from './components/page/SlideMenuBottom.vue'
import { useRouter } from 'vue-router'
import { usePageState, usePovState } from './store/state'

const { currentRoute } = useRouter()
const pageState = usePageState()
const povState = usePovState()
pageState.init()
povState.init()
</script>
<template>
  <app-layout
    :left-menu-open="pageState.leftMenuOpen"
    :right-menu-open="pageState.rightMenuOpen"
    class="w-full h-screen"
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
      <router-view :key="$route.fullPath"></router-view>
    </template>
    <template v-if="currentRoute.meta.showBottmMenu" #bottomMenu>
      <slide-menu-bottom> </slide-menu-bottom>
    </template>
  </app-layout>
</template>
