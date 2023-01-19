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
  fetchingImages: boolean
  albumsFetched: boolean
  images: Map<string, ImageData[]>
  albums: AlbumData[]
} => ({
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
    checkFetchAlbumImages(albumId: string) {
      if (this.images.has(albumId)) {
        return true
      }

      // @ts-expect-error
      return this.fetchImages(albumId) && false
    },
    async fetchAlbums() {
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
          variables: { token: storedImgurToken.value, userName: creatorState.getCreator.name },
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
          variables: { token: storedImgurToken.value, albumId },
        })
        console.log({ data })
        if (data?.images?.length && !queryError) {
          console.log('images fetched', albumId)
          this.images.set(albumId, data.images)
        } else if (queryError) {
          console.error(queryError)
        }
      }
    },
  },
})
