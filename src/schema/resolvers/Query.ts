import { ForOptionsInput } from '../generated/types.d'
import { GraphQLError } from 'graphql'
import { Prisma } from '@prisma/client'
import auth0Client from 'auth0'
const auth0Configured = process.env.AUTH0_DOMAIN && process.env.AUTH0_CID

const getDefaultQueryOptions = (by: ForOptionsInput) => ({
  take: by?.take ?? 20,
  skip: by?.skip ?? 0,
  cursor: by?.cursor,
  orderBy: {
    id: by?.orderById ?? 'desc',
  },
})

const Query = {
  creator: async (parent: never, args: any, { prisma, auth0 }: any, info: any) => {
    const where = {
      ...args.where,
      id: args?.id ?? args?.where?.id,
    }
    const confirmationId = args?.id ?? args?.where?.id
    const emailWhereIsSet = where?.email?.length
    const idWhereIsSet = !!where?.id
    const idWhereIsZeroedOut = idWhereIsSet && where.id === -1
    const authedRequest = (idWhereIsSet || idWhereIsZeroedOut || emailWhereIsSet) && auth0Configured
    const noSearchParams = Object.keys(args?.where ?? {}).length == 0

    if (noSearchParams && !idWhereIsSet) {
      throw new GraphQLError('You must specify which creator to query.')
    } else if (authedRequest && !auth0 && auth0Configured) {
      throw new GraphQLError("You can't do that (E: 0008)")
    } else if (idWhereIsSet && !emailWhereIsSet) {
      throw new GraphQLError("You aren't allowed to search by ID only")
    } else {
      delete where.id
    }

    const creator = await prisma.creator.findUnique({ where })

    if (emailWhereIsSet && creator?.email !== where.email) {
      throw new GraphQLError("You can't do that (E: 0009)")
    } else if (idWhereIsSet && !idWhereIsZeroedOut && creator?.id !== confirmationId) {
      throw new GraphQLError("You can't do that (E: 0010)")
    }

    /// Check and throw error or pear down the creator response based on permissions here
    /// Maybe check for mutual "following"?
    if (!authedRequest && creator) {
      creator.id = 0
      creator.email = ''
    }

    // console.log({
    //   idWhereIsSet,
    //   idWhereIsZeroedOut,
    //   confirmationId,
    //   trueFalse: creator?.id !== confirmationId,
    // })

    return creator
  },

  post: (parent: never, args: { where: { id: any }; id: any }, { prisma }: any, info: any) => {
    const where = {
      ...args.where,
      id: args?.id ?? args?.where?.id,
    }

    if (!where.id && Object.keys(args?.where ?? {}).length == 0) {
      throw new GraphQLError('You must specify which post to query.')
    }

    return prisma.post.findUnique({
      where,
      orderBy: {
        id: 'desc',
      },
    })
  },

  interaction: (
    parent: never,
    args: { where: { id: any }; id: any },
    { prisma }: any,
    info: any
  ) => {
    const where = {
      ...args.where,
      id: args?.id ?? args?.where?.id,
    }

    if (!where.id && Object.keys(args?.where ?? {}).length == 0) {
      throw new GraphQLError('You must specify which interaction to query.')
    }

    return prisma.interaction.findUnique({
      where,
    })
  },

  creators: (parent: never, { where, by }: any, { prisma }: any, info: any) => {
    if (where?.id || where?.name || where?.email || where?.handle) {
      return prisma.creator.findMany({
        where,
        ...getDefaultQueryOptions(by),
      })
    }
    return prisma.creator.findMany(getDefaultQueryOptions(by))
  },

  posts: (parent: never, { where, by }: any, { prisma }: any, info: any) => {
    if (where?.id || where?.title || where?.text) {
      return prisma.post.findMany({
        where: {
          id: where.id,
          title: {
            search: where.title,
          },
          text: {
            search: where.text,
          },
        },
        ...getDefaultQueryOptions(by),
      })
    }

    return prisma.post.findMany(getDefaultQueryOptions(by))
  },

  interactions: (parent: never, { where, by }: any, { prisma }: any, info: any) => {
    const foundInteractions: any = []

    if (where?.creator) {
      foundInteractions.push(
        prisma.creator.findMany({
          where: {
            creator: {
              id: where.creator.id ?? 0,
            },
          },
          ...getDefaultQueryOptions(by),
        })
      )
    }

    if (where?.text) {
      foundInteractions.push(
        prisma.creator.findMany({
          where: {
            text: {
              search: where.text,
            },
          },
          ...getDefaultQueryOptions(by),
        })
      )
    }

    if (where?.creator || where?.text) {
      /// Do not return duplicates
      /// TODO: Need to dedup here
      return foundInteractions
      // return foundInteractions.filter((o: any, i: number) => foundInteractions.indexOf(o) === i)
    }

    return prisma.interaction.findMany(getDefaultQueryOptions(by))
  },

  getPostInteractions: async (parent: never, { id }: any, { prisma }: any, info: any) => {
    const query = Prisma.sql`SELECT
      COALESCE(SUM(CASE WHEN "like"=true THEN 1 ELSE 0 END), 0)::int as likes,
      COALESCE(SUM(CASE WHEN love=true THEN 1 ELSE 0 END), 0)::int as loves,
      COALESCE(SUM(CASE WHEN repost=true THEN 1 ELSE 0 END), 0)::int as reposts,
      COALESCE(SUM(CASE WHEN "share"=true THEN 1 ELSE 0 END), 0)::int as shares
    FROM "Interaction" WHERE "postId"=${Number(id)}`

    const result = await prisma.$queryRaw(query)

    const interactions = {
      likes: 0,
      loves: 0,
      reposts: 0,
      shares: 0,
    }

    if (result[0]) {
      interactions.likes = Number(result[0].likes)
      interactions.loves = Number(result[0].loves)
      interactions.reposts = Number(result[0].reposts)
      interactions.shares = Number(result[0].shares)
    }

    return interactions
  },

  searchPosts: async (
    parent: never,
    { search, by }: { search: string; by: ForOptionsInput },
    { prisma }: any,
    info: any
  ) => {
    return prisma.post.findMany({
      where: {
        text: {
          search,
        },
      },
      ...getDefaultQueryOptions(by),
    })
  },
}

export default Query
