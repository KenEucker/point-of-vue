import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'

const uri = `${process.env.GRAPH_URL}${
  process.env.GRAPH_PORT !== '80' ? `:${process.env.GRAPH_PORT}` : ''
}/${process.env.GRAPH_PATH}`

// HTTP connection to the POV API
const povLink = createHttpLink({
  uri,
})

// HTTP connection to the GitHub Graph API
const githubLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
})

const authLink = setContext(({ operationName }, { headers }) => {
  operationName = operationName ?? ''
  const [provider, query] = operationName.split('::')
  let token = localStorage.getItem('creator-token')

  switch (provider) {
    case 'github':
      token = `Bearer ${localStorage.getItem('github-token') ?? ''}`
      break
    case 'pov':
    default:
      token = token ? `Bearer ${token}` : ''
  }

  /// TODO: if a request to github, add github auth-token
  // const token = localStorage.getItem('github-token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  }
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
export const apolloClient = new ApolloClient({
  // link: httpLink,
  link: authLink.concat(povLink),
  cache,
  connectToDevTools: process.env.DEV === 'true',
})
