import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { watch } from 'vue'
import { ImgurClient } from 'imgur'
import { ImageData } from 'imgur/lib/common/types'

// Local storage state
const storedId = useStorage('imgur-id', 0)

export const getInitialImagesState = (): {
  loggedIn: boolean
  images: ImageData[]
} => ({
  loggedIn: false,
  images: [],
})

export const useImagesState = defineStore({
  id: 'useImagesState',
  state: getInitialImagesState,
  getters: {
    getImages: (s) => s.images,
  },
  actions: {},
})
