import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { useWindowSize } from '@vueuse/core'
import { useCreatorState } from './creator'

const leftMenuOpen = useStorage('leftMenuOpen', false)
const rightMenuOpen = useStorage('rightMenuOpen', false)
const bottomMenuOpen = useStorage('bottomMenuOpen', false)
const disableAbout = useStorage('disableAbout', false)
const debugMode = useStorage('debugMode', false)
const { width, height } = useWindowSize()

/// Take over logging
const ogInfo = console.info
const ogError = console.error

export const getInitialPageState = (): {
  createPostOpen: boolean
  signupOpen: boolean
  leftMenuOpen: boolean
  rightMenuOpen: boolean
  bottomMenuOpen: boolean
  about: { title: string; body: string[] }
  logs: { info: string[]; error: string[]; history: any[] }
  pageComponents: Map<string, string[]>
  pageName: string
  metaData: any
  frameUrl: string
  disableAbout: boolean
  debugMode: boolean
} => ({
  createPostOpen: false,
  signupOpen: false,
  leftMenuOpen: leftMenuOpen.value,
  rightMenuOpen: rightMenuOpen.value,
  bottomMenuOpen: bottomMenuOpen.value,
  pageComponents: new Map(),
  logs: { info: [], error: [], history: [] },
  about: { title: 'About this page', body: ['no about information for this page', 'sorry'] },
  metaData: {},
  pageName: '',
  frameUrl: '',
  disableAbout: disableAbout.value,
  debugMode: process.env.ENV !== 'production',
})

export const usePageState = defineStore('usePageState', {
  state: getInitialPageState,
  getters: {
    width: (s) => width.value,
    height: (s) => height.value,
    isDataRoute: (s) => (s.pageName === 'Data' ? true : s.pageName === 'Graph'),
    isFramed: (s) => s.frameUrl.length,
    getLogsHistory: (s) => s.logs.history,
    getLogs: (s) => ({ info: s.logs.info, error: s.logs.error }),
    getAboutPage: (s) => s.about,
    getPageFrameUrl: (s) => s.frameUrl,
    getPageFrameUrlShortened: (s) =>
      s.frameUrl
        .replace(location.origin, '')
        .replace(location.host, '')
        .replace(/https?:\/\//i, '')
        .split('?')[0],
    getPageName: (s) => s.pageName,
    getMetaData: (s) => s.metaData,
    getLeftMenuComponents: (s) => {
      const pageComponents = s.pageComponents.get(s.pageName)
      if (!pageComponents) {
        return []
      }
      return pageComponents
        .filter((n: string) => n.split(':')[0] === 'leftMenu')
        .map((s) => s.split(':')[1])
    },
    getRightMenuComponents: (s) => {
      const pageComponents = s.pageComponents.get(s.pageName)
      if (!pageComponents) {
        return []
      }
      return pageComponents
        .filter((n: string) => n.split(':')[0] === 'rightMenu')
        .map((s) => s.split(':')[1])
    },
    getBottomMenuComponents: (s) => {
      const pageComponents = s.pageComponents.get(s.pageName)
      if (!pageComponents) {
        return []
      }
      return pageComponents
        .filter((n: string) => n.split(':')[0] === 'bottomMenu')
        .map((s) => s.split(':')[1])
    },
    getPageComponents: (s) => s.pageComponents.get(s.pageName),
    isCreatePostOpen: (s) => s.createPostOpen,
    isLeftMenuOpen: (s) => s.leftMenuOpen,
    isRightMenuOpen: (s) => s.rightMenuOpen,
    isBottomMenuOpen: (s) => s.bottomMenuOpen,
    isSignupOpen: (s) => s.signupOpen,
    isAboutDisabled: (s) => s.disableAbout,
    isDebugEnabled: (s) => s.debugMode,
  },
  actions: {
    init() {
      window.console.info = (m, d) => this.debug(m, undefined, d)
      window.console.error = (m, d) => this.debug(undefined, m, d)
    },
    debug: function (
      info: string[] | string | undefined,
      error: string[] | string | undefined,
      data: any
    ) {
      if (!this.debugMode) {
        if (info) ogInfo(info, data)
        if (error) ogError(error, data)
        return
      }

      info = typeof info === 'string' ? [info] : info ?? []
      error = typeof error === 'string' ? [error] : error ?? []
      const timestamp = new Date().getTime()

      info.forEach((m) => ogInfo(m, { data, timestamp }))
      error.forEach((m) => ogError(m, { data, timestamp }))

      if (this.logs.info.length) {
        this.logs.history.push({ type: 'info', log: this.logs.info.join('; ') })
      }
      if (this.logs.error.length) {
        this.logs.history.push({ type: 'error', log: this.logs.error.join('; ') })
      }
      this.logs.info = info
      this.logs.error = error
    },
    setIsFramed(url: string) {
      this.frameUrl = url
    },
    setMetadata(pageName: string | null = null, meta: any = {}) {
      if (pageName) {
        this.pageName = pageName
        this.metaData = {}
        this.frameUrl = ''
        if (meta.components) {
          this.pageComponents.set(pageName, meta.components)
          delete meta.components
        }
        if (meta.about) {
          this.about = meta.about
          delete meta.about
        }
      }
      return (this.metaData = { ...this.metaData, ...meta })
    },
    toggleAboutSidebar() {
      disableAbout.value = this.disableAbout = !this.disableAbout
    },
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
    toggleDebugMode() {
      debugMode.value = this.debugMode = !this.debugMode
    },
    disableDebugMode() {
      debugMode.value = this.debugMode = false
    },
    enableDebugMode() {
      debugMode.value = this.debugMode = true
    },
    closeSignup() {
      this.signupOpen = false
    },
    openSignup() {
      this.signupOpen = true
    },
  },
})
