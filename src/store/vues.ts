import { VueComponent } from './../schema/generated/types.d'
import { apolloClient } from '.'
import { defineStore } from 'pinia'
import { gql } from '@apollo/client/core'
import { useStorage } from '@vueuse/core'
import { Creator } from '../schema/generated/types'
import auth from '../auth'
import { watch } from 'vue'

// Local storage state
const storedGitHubToken = useStorage('github-token', '')

export const getInitialVuesState = (): {
  vuesFetched: boolean
  vues: VueComponent[]
} => ({
  vues: [],
  vuesFetched: false,
})

export const useVuesState = defineStore({
  id: 'useVuesState',
  state: getInitialVuesState,
  getters: {
    vuesHaveBeenFetched: (s) => s.vuesFetched,
    getVues: (s) => s.vues,
  },
  actions: {
    async fetchVues(oid?: string) {
      if (this.vuesHaveBeenFetched) {
        return Promise.resolve(this.vues)
      }
      const fetchVuesForCreatorQuery = gql`
        query StoreFetchVues($token: String!, $oid: String) {
          vues(from: { token: $token }, where: { oid: $oid }) {
            oid
            name
            query
            script
            template
            vue
          }
        }
      `
      const { data, error: queryError } = await apolloClient.query({
        query: fetchVuesForCreatorQuery,
        variables: { token: storedGitHubToken.value, oid },
      })
      if (data?.images?.length && !queryError) {
        // console.log('images fetched', albumId)
      } else if (queryError) {
        console.error(queryError)
      }
    },
  },
})
