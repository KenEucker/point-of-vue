import { defineStore } from 'pinia'

export const getInitialPageState = (): {
  createPostOpen: boolean
  leftMenuOpen: boolean
  rightMenuOpen: boolean
  disableAbout: boolean
  signupOpen: boolean
} => ({
  createPostOpen: false,
  leftMenuOpen: false,
  rightMenuOpen: false,
  signupOpen: false,
  disableAbout: false,
})

export const usePageState = defineStore('usePageState', {
  state: getInitialPageState,
  getters: {
    isCreatePostOpen: (s) => s.createPostOpen,
    isLeftMenuOpen: (s) => s.leftMenuOpen,
    isRightMenuOpen: (s) => s.rightMenuOpen,
    isSignupOpen: (s) => s.signupOpen,
    isAboutDisabled: (s) => s.disableAbout,
  },
  actions: {
    disableAboutSidebar() {
      this.disableAbout = true
    },
    closeCreatePost() {
      this.createPostOpen = false
    },
    openCreatePost() {
      this.createPostOpen = true
    },
    toggleLeftMenu() {
      this.leftMenuOpen = !this.leftMenuOpen
    },
    closeLeftMenu() {
      this.leftMenuOpen = false
    },
    openLeftMenu() {
      this.leftMenuOpen = true
    },
    toggleRightMenu() {
      this.rightMenuOpen = !this.rightMenuOpen
    },
    closeRightMenu() {
      this.rightMenuOpen = false
    },
    openRightMenu() {
      this.rightMenuOpen = true
    },
    closeSignup() {
      this.signupOpen = false
    },
    openSignup() {
      this.signupOpen = true
    },
  },
})
