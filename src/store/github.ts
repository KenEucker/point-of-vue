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
  editingComponentOid: string | null
  componentFromCodeState: any
  credentials: string | null
  vues: Array<VueComponent>
  vueComponents: Array<PovComponent>
  vuesFetched: boolean
} => ({
  account: null,
  code: {},
  editingComponentOid: null,
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
    getEditingComponentOid: (s) => s.editingComponentOid,
    getCodeState: (s) => s.code,
    getComponentFromCodeState: (s) => s.componentFromCodeState,
    getVueComponents: (s) => s.vueComponents,
  },
  actions: {
    getVueByOid(oid: string) {
      return this.vues.find((vue) => vue.oid === oid)
    },

    setCodeState(newState: any) {
      console.info('setting new code state', newState)
      this.code = newState
      this.setComponentFromCodeState(this.code, newState.oid)
      if (newState.oid) {
        this.editingComponentOid = newState.oid
      }
    },

    setComponentFromCodeState(code: any, oid?: string) {
      const updatedComponentValues = code.json?.length ? JSON.parse(code.json) : {}
      if (oid) {
        this.editingComponentOid = oid
      } else {
        oid = this.editingComponentOid!
      }
      this.componentFromCodeState = {
        oid,
        title: this.getVueByOid(oid)?.title, // CANNOT UPDATE TITLE AFTER CREATION
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
            oid
            version
          }
        }
      `

      console.info('saving vue', component)
      const { data, errors } = await apolloClient.mutate({
        mutation: updateVueForCreatorQuery,
        variables: {
          token: this.credentials,
          component: {
            oid: component.oid,
            title: component.title,
            query: component.query,
            script: component.script,
            template: component.template,
            vue: component.vue,
          },
        },
      })
      if (data?.github_updateVue?.length && !errors) {
        console.log('updated vue', data.github_updateVue)
      } else if (errors) {
        console.error('update errors', errors)
      }

      // const componentsIndex = this.vueComponents.findIndex(
      //   (c: PovComponent) => c.oid === component.oid
      // )
      // const vuesIndex = this.vues.findIndex((c: VueComponent) => c.oid === component.oid)
      // if (componentsIndex > -1) {
      //   this.vueComponents[componentsIndex] = component
      // } else {
      //   this.vueComponents.push(component)
      // }
      // if (vuesIndex > -1) {
      //   this.vues[vuesIndex] = component
      // }
    },

    getVueComponent(oid: string): PovComponent | undefined {
      return this.vueComponents.find((c: PovComponent) => c.oid === oid)
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

    async fetchVues(oid?: string) {
      if (this.vuesFetched) {
        return Promise.resolve(this.vues)
      } else if (!this.credentials?.length) {
        return Promise.resolve([])
      }

      const fetchVuesForCreatorQuery = gql`
        query StoreFetchGithub_Vues($token: String!, $oid: String) {
          github_vues(from: { token: $token }, where: { oid: $oid }) {
            oid
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
        variables: { token: this.credentials, oid },
      })
      if (data?.github_vues?.length && !queryError) {
        this.vuesFetched = true
        this.vues = data.github_vues
        this.vueComponents = this.vues.map((v) => {
          const vueComponentJson = JSON.parse(v.vue ?? '{}')
          return {
            oid: v.oid,
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
