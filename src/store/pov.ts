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
  },
  actions: {
    async initPovState() {
      await this.fetchCreatorsToFollow()
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
      if (creatorSate.getCreator?.id > 0) {
        this.creatorsToFollow = this.creatorsToFollow.filter(
          (a) => a.id === creatorSate.getCreator.id
        )
      }
    },
  },
})
