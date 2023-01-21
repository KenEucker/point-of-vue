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
const storedToken = useStorage('creator-token', '')
const storedGoogleToken = useStorage('google-token', '')
const storedGitHubToken = useStorage('github-token', '')
const storedImgurToken = useStorage('imgur-token', '')

export const getInitialCreatorState = (): {
  loggedIn: boolean
  creator: Creator
  signedUp: boolean
  auth0Configured: boolean
  auth0Token: string
  authentication: any
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
  auth0Token: '',
  authentication: {},
})

export const useCreatorState = defineStore({
  id: 'useCreatorState',
  state: getInitialCreatorState,
  getters: {
    isAuth0: (s) => s.auth0Configured,
    isCreatorSignedUp: (s) => s.signedUp,
    isLoggedIn: (s) => s.loggedIn,
    getCreator: (s) => s.creator,
    getCreatorId: (s) => (s.loggedIn ? (s.signedUp ? s.creator?.id : 0) : -1),
  },
  actions: {
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
            birthday
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
        watch(auth.user, async (user) => {
          if (auth?.isAuthenticated?.value) {
            this.loggedIn = true
            this.creator = {
              id: -1,
              name: user.name,
              email: user.email,
              avatar: user.picture,
              handle: user.nickname,
              verified: false,
            }
            if (!storedToken.value.length) {
              this.auth0Token = await auth.getAccessTokenSilently()

              if (this.auth0Token.length) {
                storedToken.value = this.auth0Token
              }
            }

            this.fetchCreator(this.creator)
          } else if (storedId.value !== 0 || storedEmail.value.length) {
            this.logout()
          }
        })
      } else {
        if (await this.login()) {
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
      // console.log({ creator, token: storedToken.value })
      const loginViaEmailQuery = gql`
        query StoreFetchSelf($token: String!) {
          self(from: { token: $token }) {
            requestor {
              id
              ip
              token
              email
              github {
                email
                email_verified
                name
                avatar
                bio
                city
                country
                timezone
                hireable
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
              birthday
              website
              posts {
                id
              }
            }
          }
        }
      `
      const { data, error: queryError } = await apolloClient.query({
        query: loginViaEmailQuery,
        variables: { token: storedToken.value },
      })
      let error = null

      if (data?.self) {
        this.creator = data.self.creator
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
            birthday
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
          birthday: creator.birthday,
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
      storedToken.value = null
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
          creator(where: { email: $email }) {
            email
          }
        }
      `
      const { data, error } = await apolloClient.query({
        query: checkForEmailInUseQuery,
        variables: { email },
      })

      return error ?? data?.creator
    },
  },
})
