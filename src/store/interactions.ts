import { apolloClient } from '.'
import { defineStore } from 'pinia'
import { gql } from '@apollo/client/core'
import { Interaction } from '../schema/generated/types.d'

export const getInitialInteractionsState = (): {
  interactions: Interaction[]
} => ({
  interactions: [],
})

export const useInteractionsState = defineStore({
  id: 'useInteractionsState',
  state: getInitialInteractionsState,
  getters: {
    getInteractions: (s) => s.interactions,
  },
  actions: {},
})
