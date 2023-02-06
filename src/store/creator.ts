import { VueComponent } from './../schema/generated/types.d'
import { creatorToken } from './../utilities/index'
import { apolloClient } from './'
import { defineStore } from 'pinia'
import { gql } from '@apollo/client/core'
import { useStorage } from '@vueuse/core'
import { Creator } from '../schema/generated/types.d'
import auth from '../auth'
import { watch } from 'vue'

// Local storage state
const storedEmail = useStorage('creator-email', '')
const storedId = useStorage('creator-id', 0)
const storedCreatorToken = useStorage('creator-token', '')
const storedGoogleToken = useStorage('google-token', '')
const storedGitHubToken = useStorage('github-token', '')
const storedImgurToken = useStorage('imgur-token', '')

export const getInitialCreatorState = (): {
  loggedIn: boolean
  creator: Creator
  signedUp: boolean
  auth0Configured: boolean
  creatorToken: string
  authentication: any
  vues: VueComponent[]
} => ({
  loggedIn: false,
  signedUp: false,
  auth0Configured: auth.initialized,
  creator: {
    id: 0,
    avatar: '',
    banner: '',
    email: '',
    name: '',
    handle: '',
    verified: false,
  },
  vues: [],
  creatorToken: '',
  authentication: {},
})

export const useCreatorState = defineStore({
  id: 'useCreatorState',
  state: getInitialCreatorState,
  getters: {
    isAuth0: (s) => s.auth0Configured,
    isCreatorSignedUp: (s) => s.signedUp,
    getCreatorCredentials: (s) => ({
      creatorToken: s.creatorToken,
      google: s.authentication.google,
      github: s.authentication.github,
      imgur: s.authentication.imgur,
    }),
    isLoggedIn: (s) => s.loggedIn,
    getCreator: (s) => s.creator,
    getCreatorId: (s) => (s.loggedIn ? (s.signedUp ? s.creator?.id : 0) : -1),
  },
  actions: {
    async init() {
      this.checkLogin()
    },
    async creatorSignup(creator: Creator) {
      const SignUpCreatorQuery = gql`
        mutation SignUpCreator($creator: CreateCreatorInput!) {
          createCreator(creator: $creator) {
            id
            name
            email
            handle
            verified
            status
            avatar
            location
            bio
            chosenday
            banner
            website
            posts {
              id
            }
          }
        }
      `

      try {
        const { data, errors } = await apolloClient.mutate({
          mutation: SignUpCreatorQuery,
          variables: { creator },
        })

        if (data?.createCreator) {
          this.creator = data.createCreator
          storedId.value = this.creator.id
          storedEmail.value = this.creator.email
          this.loggedIn = true
        } else {
          return errors ?? data.error ?? 'unknown error'
        }

        return null
      } catch (err: any) {
        return err.message ?? err
      }
    },
    loginWithAuth0() {
      auth.loginWithRedirect()
    },
    loginWithEmail(email: string) {
      return this.fetchCreator({ email } as Creator)
    },
    async checkLogin() {
      if (this.auth0Configured) {
        const creatorValuesStored = storedId.value !== 0 || storedEmail.value.length
        watch(auth.user, async (user) => {
          if (auth?.isAuthenticated?.value) {
            this.creator = {
              id: -1,
              name: user.name,
              email: user.email,
              avatar: user.picture,
              handle: user.nickname,
              verified: false,
            }

            this.creatorToken = await auth.getAccessTokenSilently()
            if (this.creatorToken.length) {
              storedCreatorToken.value = this.creatorToken
            }

            if (creatorValuesStored) {
              this.fetchCreator()
            } else {
              this.fetchSelf()
            }
            this.loggedIn = true
          }
        })
      } else {
        if ((await this.login()) !== null) {
          this.logout()
        }
      }
    },
    async login() {
      if (this.auth0Configured && auth?.isAuthenticated?.value) {
        return this.loginWithAuth0()
      } else {
        return this.fetchCreator()
      }
    },
    async fetchCreator(creator?: Creator) {
      creator = creator ?? ({ id: storedId.value, email: storedEmail.value } as Creator)
      const getCreatorViaEmailAndIdPair = gql`
        query StoreFetchCreator($id: Int!, $email: String!) {
          creator(where: { id: $id, email: $email }) {
            id
            name
            email
            handle
            verified
            status
            avatar
            location
            banner
            bio
            chosenday
            website
            posts {
              id
            }
          }
        }
      `
      const { data, error: queryError } = await apolloClient.query({
        query: getCreatorViaEmailAndIdPair,
        variables: { id: creator.id ?? 0, email: creator.email },
      })
      let error = null

      if (data?.creator) {
        this.creator = data.creator
        storedId.value = this.creator.id
        storedEmail.value = this.creator.email
        /// Load these saved values if not already set
        this.authentication.github = this.authentication.github ?? storedGitHubToken.value
        this.authentication.google = this.authentication.google ?? storedGoogleToken.value
        this.authentication.imgur = this.authentication.imgur ?? storedImgurToken.value
        this.signedUp = true
        this.loggedIn = true
      } else if (queryError) {
        error = queryError.message
      } else {
        error = 'no creator found with that id and email address'
      }

      return error
    },
    async fetchCreatorVues(creator?: Creator) {
      creator = creator ?? ({ id: storedId.value, email: storedEmail.value } as Creator)
      const getCreatorVues = gql`
        query StoreFetchCreatorVues($id: Int!, $email: String!) {
          creator(where: { id: $id, email: $email }) {
            vues {
              id
              title
              code
            }
          }
        }
      `
      const { data, error: queryError } = await apolloClient.query({
        query: getCreatorVues,
        variables: { id: creator.id ?? 0, email: creator.email },
      })
      let error = null

      if (data?.creator) {
        this.vues = data?.creator.vues
      } else if (queryError) {
        error = queryError.message
      } else {
        error = 'no creator found with that id and email address'
      }

      return error
    },
    async fetchSelf(creator?: Creator) {
      creator = creator ?? ({ id: storedId.value, email: storedEmail.value } as Creator)
      // console.log({ creator, token: storedToken.value })
      const getSelfViaToken = gql`
        query StoreFetchSelf($token: String!) {
          self(from: { token: $token }) {
            requestor {
              id
              ip
              token
              email
              github {
                email
                name
                avatar
                bio
                city
                country
                timezone
                profile
              }
              imgur {
                name
                avatar
                bio
                city
                country
                timezone
              }
              google {
                email
                email_verified
                name
                avatar
                city
                country
                timezone
              }
            }
            authentication {
              imgur
              github
              google
            }
            creator {
              id
              name
              email
              handle
              verified
              status
              avatar
              location
              banner
              bio
              chosenday
              website
              posts {
                id
              }
            }
          }
        }
      `
      const { data, error: queryError } = await apolloClient.query({
        query: getSelfViaToken,
        variables: { token: storedCreatorToken.value },
      })
      let error = null

      if (data?.self) {
        this.creator = data.self.creator
        console.log({ creator: this.creator })
        if (this.creator) {
          storedId.value = this.creator.id
          storedEmail.value = this.creator.email
          this.signedUp = true
        } else {
          this.creator =
            data.self.requestor?.imgur ?? data.self.requestor?.github ?? data.self.requestor.google
        }

        this.authentication = data.self?.authentication
        if (this.authentication) {
          storedImgurToken.value = this.authentication.imgur?.length
            ? this.authentication.imgur
            : storedImgurToken.value
          storedGoogleToken.value = this.authentication.google?.length
            ? this.authentication.google
            : storedGoogleToken.value
          storedGitHubToken.value = this.authentication.github?.length
            ? this.authentication.github
            : storedGitHubToken.value
        }

        this.loggedIn = true
      } else if (queryError) {
        error = queryError.message
      } else {
        error = 'no creator found with that email address'
      }

      return error
    },
    async updateCreator(creator: Creator) {
      const updateCreatorMutation = gql`
        mutation StoreUpdateCreator($data: UpdateCreatorInput!, $id: Int!) {
          updateCreator(data: $data, id: $id) {
            id
            name
            email
            handle
            verified
            status
            avatar
            location
            banner
            bio
            chosenday
            website
          }
        }
      `

      const data = await apolloClient.mutate({
        mutation: updateCreatorMutation,
        variables: { data: creator, id: this.creator.id },
      })

      if (data.data.updateCreator) {
        const creator = data.data.updateCreator
        this.creator = {
          id: creator.id,
          name: creator.name,
          handle: creator.name,
          avatar: creator.avatar,
          banner: creator.banner,
          location: creator.location,
          website: creator.website,
          email: creator.email,
          bio: creator.bio,
          chosenday: creator.chosenday,
        }

        return data.data.updateCreator
      }

      return data
    },
    logout() {
      this.creator = getInitialCreatorState().creator
      this.loggedIn = false
      storedId.value = null
      storedEmail.value = null
      storedCreatorToken.value = null
      storedGitHubToken.value = null
      storedGoogleToken.value = null
      storedImgurToken.value = null

      if (auth?.isAuthenticated) {
        auth.logout({ returnTo: window.location.origin })
      }
    },
    async isEmailInUse(email: string) {
      const checkForEmailInUseQuery = gql`
        query StoreCreatorEmailInUse($email: String!) {
          creatorExists(where: { email: $email })
        }
      `
      const { data } = await apolloClient.query({
        query: checkForEmailInUseQuery,
        variables: { email },
      })

      return data?.creatorExists
    },
  },
})
