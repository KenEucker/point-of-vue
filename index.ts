// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { createServer } from 'node:http'
import { createYoga, useReadinessCheck } from 'graphql-yoga'
import { EnvelopArmorPlugin } from '@escape.tech/graphql-armor'
import { schema, pubsub, prisma } from './src/schema'
import { useAuth0 } from '@envelop/auth0'
import { applyMiddleware } from 'graphql-middleware'
import db from './src/store/seed'
import permissions from './src/auth/permissions'
import { useResponseCache } from '@graphql-yoga/plugin-response-cache'

/// Environment Variables and their Defaults
const originUrl = process.env.ORIGIN ?? 'http://localhost'
const originPort = process.env.ORIGIN_PORT ? Number(process.env.ORIGIN_PORT) : 8080
const graphUrl = process.env.GRAPH_URL ?? 'http://localhost'
const graphPort = process.env.GRAPH_PORT ? Number(process.env.GRAPH_PORT) : 8100
const graphPath = process.env.GRAPH_PATH ?? 'graphql'
const port = process.env.PORT ? Number(process.env.PORT) : graphPort

const authIsConfigured = process.env.AUTH0_DOMAIN && process.env.AUTH0_CID
const plugins =
  /// Authentication plugins
  authIsConfigured
    ? [
        EnvelopArmorPlugin(),
        useAuth0({
          // onError: (e) => {},
          domain: process.env.AUTH0_DOMAIN,
          audience: process.env.AUTH0_AUDIENCE,
          headerName: 'authorization',
          preventUnauthenticatedAccess: false,
          extendContextField: 'auth0',
          tokenType: 'Bearer',
        }),
      ]
    : /// Non-auth plugins
      []

/// Add logged in user caching
plugins.push(
  useResponseCache({
    // cache based on the authentication header
    session: (request) => request.headers.get('authentication'),
  })
)
/// Invalidate stale cache upon data changes
// pubsub.subscribe(() => {
//   console.log('resetting')
//   server.resetStore()
// })

/// Add readines checks
plugins.push(
  useReadinessCheck({
    endpoint: '/ready', // default
    check: async () => {
      try {
        const res = await prisma.$queryRaw`select 1`
        // if true, respond with 200 OK

        return !!res
      } catch (err) {
        // log the error on the server for debugging purposes
        console.error(err)
        // if false, respond with 504 Service Unavailable and no bdy
        return false
      }
    },
  })
)

/// Constructed server host url
const serverUrl = `${graphUrl}:${port}/${graphPath}`

// Create a Yoga instance with a GraphQL schema.
const yoga = createYoga({
  plugins,
  schema: authIsConfigured ? applyMiddleware(schema, permissions) : schema,
  context: {
    db,
    pubsub,
    prisma,
  },
  cors: {
    origin: `${originUrl}${originPort !== 80 ? `:${originPort}` : ''}`,
    credentials: true,
  },
  healthCheckEndpoint: '/health',
})

// Pass it into a server to hook into request handlers.
const server = createServer(yoga)

server.listen(port, () => {
  if (authIsConfigured) console.warn('server is using Auth0 authentication')
  console.info(`🚀 GraphQL Server (yoga) is running on ${serverUrl}`)
})

export default server
