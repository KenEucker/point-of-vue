import { getGraphUrl } from './../utilities/index'
import { apolloClient } from '.'
import { defineStore } from 'pinia'
import { gql } from '@apollo/client/core'
import { Creator } from '../schema/generated/types'
import { useCreatorState } from './creator'

export const getInitialPovState = (): {
  creatorsToFollow: Creator[]
  trending: any[]
  trendingTitle: string
  topTrending: any
  simple: boolean
  healthy: boolean
  ready: boolean
} => ({
  creatorsToFollow: [],
  trending: [
    {
      index: 0,
      title: 'Sports · trending',
      label: '#WorldCupRiots',
      stats: '9M Posts',
    },
    {
      index: 0,
      title: 'Entertainment',
      label: '#ChristmasMovies',
      stats: '12.3M Posts',
    },
    {
      index: 0,
      title: 'Politics · this year',
      label: '#StudentDebt',
      stats: '25.2K Posts',
    },
  ],
  topTrending: {
    title: 'WorldWarIII',
    text: 'Will there be nukes?',
  },
  trendingTitle: "What's happening",
  simple: false,
  ready: false,
  healthy: false,
})

export const usePovState = defineStore({
  id: 'usePovState',
  state: getInitialPovState,
  getters: {
    isSimpleMode: (s) => s.simple,
    getTrending: (s) => s.trending,
    getCreatorsToFollow: (s) => s.creatorsToFollow,
    getTrendingTitle: (s) => s.trendingTitle,
    getTopTrendingTitle: (s) => s.topTrending?.title,
    getTopTrendingText: (s) => s.topTrending?.text,
    isHealthy: (s) => s.healthy,
    isReady: (s) => s.ready,
    isProduction: (s) => process.env.ENV === 'production',
  },
  actions: {
    async init() {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve) => {
        fetch(getGraphUrl('ready'))
          .then((r) => {
            this.ready = r.ok
            if (this.ready) {
              return fetch(getGraphUrl('health')).then((h) => {
                this.healthy = h.ok
                this.fetchCreatorsToFollow()
              })
            }
          })
          .catch((r) => {
            console.error('readiness', r.message)
          })
          .finally(resolve as () => void)
      })
    },
    async fetchCreatorsToFollow() {
      const getCreatorsToFollowQuery = gql`
        query FollowMoreCreators {
          creators {
            email
            name
            verified
            handle
            avatar
          }
        }
      `

      const queryResult = await apolloClient.query({
        query: getCreatorsToFollowQuery,
      })

      if (queryResult.data?.creators?.length) {
        this.creatorsToFollow = queryResult.data.creators
      }
    },
    pruneCreatorsToFollow() {
      const creatorSate = useCreatorState()
      if (creatorSate.getCreatorId > 0) {
        this.creatorsToFollow = this.creatorsToFollow.filter(
          (a) => a.id === creatorSate.getCreatorId
        )
      }
    },
  },
})
