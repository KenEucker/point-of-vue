<script setup lang="ts">
import AppLayout from './components/layout/AppLayout.vue'
import HeaderBar from './components/menu/HeaderBar.vue'
import SlideMenuLeft from './components/menu/SlideMenuLeft.vue'
import SlideMenuRight from './components/menu/SlideMenuRight.vue'
import { useRouter } from 'vue-router'
import { useMenuState, usePovState } from './store/state'

const { currentRoute } = useRouter()
const menuState = useMenuState()
const povState = usePovState()
povState.initPovState()
</script>
<template>
  <app-layout :left-menu-open="menuState.leftMenuOpen" :right-menu-open="menuState.rightMenuOpen">
    <template #header>
      <header-bar
        :display-right-menu-button="!currentRoute.meta.hideRightMenu"
        :left-menu-open="menuState.leftMenuOpen"
        :right-menu-open="menuState.rightMenuOpen"
        @on-menu-click="menuState.closeRightMenu()"
        @on-right-menu-click="menuState.closeRightMenu()"
      >
      </header-bar>
    </template>
    <template #leftMenu>
      <slide-menu-left :is-expanded="menuState.leftMenuOpen"> </slide-menu-left>
    </template>
    <template v-if="!currentRoute.meta.hideRightMenu" #rightMenu>
      <slide-menu-right> </slide-menu-right>
    </template>
    <template #body>
      <router-view :key="$route.fullPath"></router-view>
    </template>
  </app-layout>
</template>
