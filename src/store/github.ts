import { VueComponent } from '../schema/generated/types'
import { apolloClient } from '.'
import { defineStore } from 'pinia'
import { gql } from '@apollo/client/core'
import { PovComponent } from '../utilities'
// import Sass from 'sass.js/dist/sass.sync.js'
import { useCreatorState } from './creator'
import { watch } from 'vue'

export const getInitialGithubState = (): {
  account: any
  code: any
  editingComponentId: string | null
  componentFromCodeState: any
  credentials: string | null
  vues: Array<VueComponent>
  vueComponents: Array<PovComponent>
  vuesFetched: boolean
} => ({
  account: null,
  code: {},
  editingComponentId: null,
  componentFromCodeState: null,
  credentials: null,
  vues: [],
  vueComponents: [],
  vuesFetched: false,
})

export const useGithubState = defineStore({
  id: 'useGithubState',
  state: getInitialGithubState,
  getters: {
    vuesHaveBeenFetched: (s) => s.vuesFetched,
    getAccount: (s) => s.account,
    getVues: (s) => s.vues,
    getEditingComponentId: (s) => s.editingComponentId,
    getCodeState: (s) => s.code,
    getComponentFromCodeState: (s) => s.componentFromCodeState,
    getVueComponents: (s) => s.vueComponents,
  },
  actions: {
    getVueById(id: string) {
      return this.vues.find((vue) => vue.id === id)
    },

    setCodeState(newState: any) {
      console.info('setting new code state', newState)
      this.code = newState
      this.setComponentFromCodeState(this.code, newState.id)
      if (newState.id) {
        this.editingComponentId = newState.id
      }
    },

    setComponentFromCodeState(code: any, id?: string) {
      const updatedComponentValues = code.json?.length ? JSON.parse(code.json) : {}
      if (id) {
        this.editingComponentId = id
      } else {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        id = this.editingComponentId!
      }
      this.componentFromCodeState = {
        id,
        title: this.getVueById(id)?.title, // CANNOT UPDATE TITLE AFTER CREATION
        background: updatedComponentValues.background,
        icon: updatedComponentValues.icon,
        status: 'good', /// TODO: calculate this,
        category: updatedComponentValues.category,
        description: updatedComponentValues.description,
        version: updatedComponentValues.version,
        compatability: updatedComponentValues.compatability,
        license: updatedComponentValues.license,
        vue: code.json ?? '',
        template: code.html ?? '',
        script: code.javascript ?? '',
        query: code.graphql ?? '',
      }
      console.info('parsing code into component', code, this.componentFromCodeState)
    },

    async saveEditingVueComponent() {
      const component = this.componentFromCodeState
      const updateVueForCreatorQuery = gql`
        mutation StoreGithub_updateVue($token: String!, $component: UpdateGithubVueInput) {
          github_updateVue(from: { token: $token }, data: $component) {
            id
            version
          }
        }
      `

      console.info('saving vue', component)
      try {
        const { data, errors } = await apolloClient.mutate({
          mutation: updateVueForCreatorQuery,
          variables: {
            token: this.credentials,
            component: {
              id: component.id,
              query: component.query,
              script: component.script,
              template: component.template,
              vue: component.vue,
            },
          },
        })

        if (data?.github_updateVue?.id?.length && !errors) {
          const componentsIndex = this.vueComponents.findIndex(
            (c: PovComponent) => c.id === component.id
          )
          const vuesIndex = this.vues.findIndex((c: VueComponent) => c.id === component.id)
          if (componentsIndex > -1) {
            this.vueComponents[componentsIndex] = component
          } else {
            this.vueComponents.push(component)
          }
          if (vuesIndex > -1) {
            this.vues[vuesIndex] = component
          }
        } else if (errors) {
          console.error('update errors', errors)
        }

        return errors
      } catch (e: any) {
        return [e.message]
      }
    },

    getVueComponent(id: string): PovComponent | undefined {
      return this.vueComponents.find((c: PovComponent) => c.id === id)
    },

    hasCredentials() {
      if (this.credentials?.length) {
        return true
      }

      const creatorState = useCreatorState()
      const credentials = creatorState.getCreatorCredentials

      if (credentials.github) {
        this.credentials = credentials.github
        return true
      } else {
        return false
      }
    },

    async fetchVues(id?: string) {
      if (this.vuesFetched) {
        return Promise.resolve(this.vues)
      } else if (!this.credentials?.length) {
        return Promise.resolve([])
      }

      const fetchVuesForCreatorQuery = gql`
        query StoreFetchGithub_Vues($token: String!, $id: String) {
          github_vues(from: { token: $token }, where: { id: $id }) {
            id
            title
            query
            script
            template
            vue
          }
        }
      `
      const { data, error: queryError } = await apolloClient.query({
        query: fetchVuesForCreatorQuery,
        variables: { token: this.credentials, id },
      })
      if (data?.github_vues?.length && !queryError) {
        this.vuesFetched = true
        this.vues = [...data.github_vues]
        this.vueComponents = this.vues.map((v) => {
          const vueComponentJson = JSON.parse(v.vue ?? '{}')
          return {
            id: v.id,
            title: vueComponentJson.title ?? v.title ?? '',
            vue: v.vue,
            script: v.script,
            template: v.template,
            status: 'good', /// TODO: calculate this
            query: v.query,
          } as PovComponent
        })
      } else if (queryError) {
        console.error(queryError)
      }
    },

    async fetchAccount() {
      if (this.account) {
        return Promise.resolve(this.account)
      } else if (!this.hasCredentials()) {
        const creatorState = useCreatorState()
        watch(creatorState, (c) => {
          if (c.isLoggedIn) {
            this.fetchAccount()
          }
        })
      }

      const fetchGithubAccountForCreatorQuery = gql`
        query StoreFetchGithubAccount($token: String!) {
          github_account(from: { token: $token }) {
            id
            databaseId
            email
            name
            avatar
            website
            bio
            city
            country
            timezone
            profile
            company
            location
            url
            status
            sponsorsListing
            isBountyHunter
            isCampusExpert
            isDeveloperProgramMember
            isEmployee
            isFollowingViewer
            isHireable
            isGitHubStar
            isSiteAdmin
            followers
            following
            packages
            repositories
            repositoriesContributedTo
            sponsors
            sponsoring
            starredRepositories
          }
        }
      `
      const { data, error: queryError } = await apolloClient.query({
        query: fetchGithubAccountForCreatorQuery,
        variables: { token: this.credentials },
      })
      if (data?.github_account && !queryError) {
        this.account = data.github_account
      } else if (queryError) {
        console.error(queryError)
      }
    },
  },
})
