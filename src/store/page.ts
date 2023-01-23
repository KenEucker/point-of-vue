import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { useWindowSize } from '@vueuse/core'
import { useCreatorState } from './creator'

const leftMenuOpen = useStorage('leftMenuOpen', false)
const rightMenuOpen = useStorage('rightMenuOpen', false)
const bottomMenuOpen = useStorage('bottomMenuOpen', false)
const disableAbout = useStorage('disableAbout', false)
const { width, height } = useWindowSize()

export const getInitialPageState = (): {
  createPostOpen: boolean
  signupOpen: boolean
  leftMenuOpen: boolean
  rightMenuOpen: boolean
  bottomMenuOpen: boolean
  disableAbout: boolean
} => ({
  createPostOpen: false,
  signupOpen: false,
  leftMenuOpen: leftMenuOpen.value,
  rightMenuOpen: rightMenuOpen.value,
  bottomMenuOpen: bottomMenuOpen.value,
  disableAbout: disableAbout.value,
})

export const usePageState = defineStore('usePageState', {
  state: getInitialPageState,
  getters: {
    width: (s) => width.value,
    height: (s) => height.value,
    isCreatePostOpen: (s) => s.createPostOpen,
    isLeftMenuOpen: (s) => s.leftMenuOpen,
    isRightMenuOpen: (s) => s.rightMenuOpen,
    isSignupOpen: (s) => s.signupOpen,
    isAboutDisabled: (s) => s.disableAbout,
  },
  actions: {
    enableAboutSidebar() {
      disableAbout.value = this.disableAbout = false
    },
    disableAboutSidebar() {
      disableAbout.value = this.disableAbout = true
    },
    closeCreatePost() {
      this.createPostOpen = false
    },
    openCreatePost() {
      const creatorState = useCreatorState()
      if (creatorState.isCreatorSignedUp) {
        this.createPostOpen = true
      }
    },
    toggleLeftMenu() {
      leftMenuOpen.value = this.leftMenuOpen = !this.leftMenuOpen
    },
    closeLeftMenu() {
      leftMenuOpen.value = this.leftMenuOpen = false
    },
    openLeftMenu() {
      leftMenuOpen.value = this.leftMenuOpen = true
    },
    toggleRightMenu() {
      rightMenuOpen.value = this.rightMenuOpen = !this.rightMenuOpen
    },
    closeRightMenu() {
      rightMenuOpen.value = this.rightMenuOpen = false
    },
    openRightMenu() {
      rightMenuOpen.value = this.rightMenuOpen = true
    },
    toggleBottomMenu() {
      bottomMenuOpen.value = this.bottomMenuOpen = !this.bottomMenuOpen
    },
    closeBottomMenu() {
      bottomMenuOpen.value = this.bottomMenuOpen = false
    },
    openBottomMenu() {
      bottomMenuOpen.value = this.bottomMenuOpen = true
    },
    closeSignup() {
      this.signupOpen = false
    },
    openSignup() {
      this.signupOpen = true
    },
  },
})
