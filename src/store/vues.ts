import { apolloClient } from '.'
import { defineStore } from 'pinia'
import { gql } from '@apollo/client/core'
import { useStorage } from '@vueuse/core'
import { Creator } from '../schema/generated/types'
import auth from '../auth'
import { watch } from 'vue'

// Local storage state
const storedEmail = useStorage('creator-email', '')
const storedId = useStorage('creator-id', 0)
const storedToken = useStorage('creator-token', '')

export const getInitialVueState = () => ({})

export const useVueState = defineStore({
  id: 'useVueState',
  state: getInitialVueState,
  getters: {},
  actions: {},
})
