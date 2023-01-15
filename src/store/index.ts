import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'

const uri = `${process.env.GRAPH_URL}${
  process.env.GRAPH_PORT !== '80' ? `:${process.env.GRAPH_PORT}` : ''
}/${process.env.GRAPH_PATH}`

// HTTP connection to the API
const httpLink = createHttpLink({
  uri,
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('creator-token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
export const apolloClient = new ApolloClient({
  // link: httpLink,
  link: authLink.concat(httpLink),
  cache,
  connectToDevTools: process.env.DEV === 'true',
})
