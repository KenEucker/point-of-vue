import { createSchema, createPubSub } from 'graphql-yoga'
import { readFileSync } from 'fs'
import { resolvers } from './resolvers'
import { PrismaClient } from '@prisma/client'

// Note: this uses a path relative to the project's
// root directory, which is the current working directory
// if the server is executed using `npm run`.
const typeDefs = readFileSync('src/schema/schema.gql', { encoding: 'utf-8' })

// ... start our server
export const schema = createSchema({
  typeDefs,
  resolvers,
})
export const prisma = new PrismaClient()
export const pubsub = createPubSub()
