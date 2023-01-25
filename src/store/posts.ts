import { apolloClient } from './'
import { defineStore } from 'pinia'
import { gql } from '@apollo/client/core'
import { Post } from '../schema/generated/types.d'
import { getGraphUrl } from '../utilities'

export const getInitialPostsState = (): {
  posts: Post[]
  postsLoading: boolean
  postsLoaded: boolean
  postsQueryError: any
} => ({
  postsLoading: false,
  postsLoaded: false,
  postsQueryError: null,
  posts: [],
})

export const usePostsState = defineStore({
  id: 'usePostsState',
  state: getInitialPostsState,
  getters: {
    postsHaveBeenLoaded: (s) => s.postsLoaded,
    getPostsLoading: (s) => s.postsLoading,
    getPostsError: (s) => s.postsQueryError,
    getPosts: (s) => s.posts,
  },
  actions: {
    // async getInteractionsForPost() {},
    async watchPosts() {
      const newPostSubscription = `
        subscription StoreWatchPosts {
          post {
            mutation
            data {
              id
              title
              text
              media
              createdAt
              creator {
                id
                name
                handle
                verified
                avatar
              }
            }
          }
        }
      `
      const url = new URL(getGraphUrl())

      url.searchParams.append('query', newPostSubscription)
      const eventsource = new EventSource(url.toString(), {
        withCredentials: true, // This is required for cookies
      })

      eventsource.onmessage = (event) => {
        const data = JSON.parse(event.data)
        const { data: post, mutation } = data.data.post

        if (mutation === 'CREATED') {
          this.posts = [post.value].concat(this.posts)
        } else if (mutation === 'DELETED') {
          this.posts = this.posts.filter((p) => p.id === post.id)
        }
      }
    },
    async getAllPosts() {
      if (!this.postsLoading) {
        this.postsLoading = true

        const getPostsQuery = gql`
          query posts {
            posts {
              id
              title
              text
              media
              createdAt
              creator {
                name
                handle
                verified
                avatar
              }
            }
          }
        `
        const queryResult = await apolloClient.query({
          query: getPostsQuery,
        })

        this.postsQueryError = queryResult.error

        if (queryResult.data?.posts?.length) {
          this.posts = queryResult.data.posts
        }

        this.postsLoaded = true
        this.postsLoading = false
      }
    },
  },
})
