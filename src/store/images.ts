import { ImageData, AlbumData } from 'imgur/lib/common/types'
import { apolloClient } from './'
import { defineStore } from 'pinia'
import { gql } from '@apollo/client/core'
import { useStorage } from '@vueuse/core'
import { useCreatorState } from './creator'
import { watch } from 'vue'

// Local storage state
const storedImgurToken = useStorage('imgur-token', '')

export const getInitialImagesState = (): {
  credentials: { creatorToken?: string; imgurToken?: string }
  fetchingImages: boolean
  albumsFetched: boolean
  images: Map<string, ImageData[]>
  albums: AlbumData[]
} => ({
  credentials: {},
  fetchingImages: false,
  albumsFetched: false,
  images: new Map(),
  albums: [],
})

export const useImagesState = defineStore({
  id: 'useImagesState',
  state: getInitialImagesState,
  getters: {
    albumsHaveBeenFetched: (s) => s.albumsFetched,
    getImagesMap: (s) => s.images,
    getAlbums: (s) => s.albums,
  },
  actions: {
    hasCredentials() {
      /// Only imgur credentials required
      if (this.credentials.imgurToken?.length) {
        return true
      }

      const creatorState = useCreatorState()
      const credentials = creatorState.getCreatorCredentials

      /// Allow any imgur user, regardless of signed up or not
      if (credentials.imgur) {
        this.credentials = {
          creatorToken: credentials.creatorToken,
          imgurToken: credentials.imgur,
        }
        return true
      } else {
        return false
      }
    },
    checkFetchAlbumImages(albumId: string) {
      if (this.images.has(albumId)) {
        return true
      }

      // @ts-expect-error
      return this.fetchImages(albumId) && false
    },
    async fetchAlbums() {
      console.info('fetching albums')
      const creatorState = useCreatorState()
      const queryAlbumsForCreator = async () => {
        if (!(creatorState.getCreator.name?.length > 1)) {
          return
        }

        const fetchAlbumsQuery = gql`
          query StoreFetchImageAlbums($token: String!, $userName: String!) {
            albums(from: { token: $token }, where: { userName: $userName }) {
              id
              title
              description
              cover
              privacy
              link
              images_count
              order
              deletehash
              images {
                id
                link
                title
                description
                deletehash
                datetime
              }
            }
          }
        `
        const { data, error: queryError } = await apolloClient.query({
          query: fetchAlbumsQuery,
          variables: { token: this.credentials.imgurToken, userName: creatorState.getCreator.name },
        })
        if (data?.albums?.length && !queryError) {
          this.albumsFetched = true
          this.albums = data.albums
        } else if (queryError) {
          console.error(queryError)
        }
      }

      if (creatorState.loggedIn) {
        watch(creatorState, queryAlbumsForCreator)
        return queryAlbumsForCreator()
      }
    },
    async fetchImages(albumId: string) {
      console.info('fetching images', albumId)
      if (albumId.length) {
        const loginViaEmailQuery = gql`
          query StoreFetchImages($token: String!, $albumId: String!) {
            images(from: { token: $token }, where: { albumId: $albumId }) {
              id
              link
              title
              description
              deletehash
              datetime
            }
          }
        `
        const { data, error: queryError } = await apolloClient.query({
          query: loginViaEmailQuery,
          variables: { token: this.credentials.imgurToken, albumId },
        })
        if (data?.images?.length && !queryError) {
          console.info('images fetched', albumId)
        } else if (queryError) {
          console.error(queryError)
        }
      }
    },
  },
})
