import { defineStore } from 'pinia'

export const getInitialMenuState = (): {
  createPostOpen: boolean
  leftMenuOpen: boolean
  rightMenuOpen: boolean
  signupOpen: boolean
} => ({
  createPostOpen: false,
  leftMenuOpen: false,
  rightMenuOpen: false,
  signupOpen: false,
})

export const useMenuState = defineStore('useMenuState', {
  state: getInitialMenuState,
  getters: {
    isCreatePostOpen: (s) => s.createPostOpen,
    isLeftMenuOpen: (s) => s.leftMenuOpen,
    isRightMenuOpen: (s) => s.rightMenuOpen,
    isSignupOpen: (s) => s.signupOpen,
  },
  actions: {
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
