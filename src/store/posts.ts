import { apolloClient } from './'
import { defineStore } from 'pinia'
import { gql } from '@apollo/client/core'
import { Post } from '../schema/generated/types.d'
import { getGraphUrl } from '../utilities'

export const getInitialPostsState = (): {
  posts: Post[]
  postsLoading: boolean
  postsQueryError: any
} => ({
  postsLoading: false,
  postsQueryError: null,
  posts: [],
})

export const usePostsState = defineStore({
  id: 'usePostsState',
  state: getInitialPostsState,
  getters: {
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
              creator {
                id
                name
                handle
                verified
                avatar
              }
              text
              media
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
      this.postsLoading = true

      const getPostsQuery = gql`
        query posts {
          posts {
            id
            title
            creator {
              name
              handle
              verified
              avatar
            }
            text
            media
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

      this.postsLoading = false
    },
  },
})
