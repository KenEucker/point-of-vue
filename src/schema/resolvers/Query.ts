import { ForOptionsInput } from '../generated/types.d'
import { GraphQLError } from 'graphql'
import { Prisma } from '@prisma/client'
import auth0Client from 'auth0'

const getDefaultQueryOptions = (by: ForOptionsInput) => ({
  take: by?.take ?? 20,
  skip: by?.skip ?? 0,
  cursor: by?.cursor,
  orderBy: {
    id: by?.orderById ?? 'desc',
  },
})

const Query = {
  self: async (
    parent: never,
    args: { with: { token: any; id: any } },
    { prisma, auth0 }: any,
    info: any
  ) => {
    const where: any = {
      id: args?.with?.id,
    }

    if (!auth0 && !where.id) {
      throw new GraphQLError("You can't do that")
    }

    const authentication: any = auth0 ? {} : undefined

    if (auth0) {
      const authClient = new auth0Client.AuthenticationClient({
        domain: process.env.AUTH0_DOMAIN ?? '',
        clientId: process.env.AUTH0_MAN_CID,
        clientSecret: process.env.AUTH0_MAN_SEC,
      })
      let token = args.with?.token
      authentication.creatorSubId = auth0.sub

      if (!token) {
        await new Promise<void>((resolve) => {
          authClient.clientCredentialsGrant(
            {
              audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
            },
            function (err, response) {
              if (err) {
                console.error({ err })
                // Handle error.
              }
              token = response?.access_token
              resolve()
            }
          )
        })
      }
      if (token) {
        const management = new auth0Client.ManagementClient({
          token,
          domain: process.env.AUTH0_DOMAIN ?? '',
        })
        await management
          .getUser({ id: auth0.sub })
          .then(function (read_user) {
            console.log({ read_user, ids: read_user.identities })
            where.email = read_user.email
            authentication.github = read_user.identities?.find(
              (i) => i.connection === 'github'
            )?.access_token
            authentication.google = read_user.identities?.find(
              (i) => i.connection === 'google-oauth2'
            )?.access_token
            authentication.imgur = read_user.identities?.find(
              (i) => i.connection === 'Imgur'
            )?.access_token
          })
          .catch(function (err) {
            // The cliff swallow or American cliff swallow (Petrochelidon pyrrhonota) is a member of the passerine bird family Hirundinidae, the swallows and martins. The generic name Petrochelidon is derived from Ancient Greek petros meaning "rock" and khelidon "swallow", and the specific name pyrrhonota comes from purrhos meaning "flame-coloured" and -notos "-backed".
          })
      } else {
        authentication.auth0 = 'invalid'
      }
      /// TODO: Remove this
      // authentication.auth0 = token
    }

    if (!where.id && !where.email && !where.sub) {
      throw new GraphQLError('no attached creator account')
    }

    const creator = await prisma.creator.findUnique({ where })
    return {
      creator,
      authentication,
    }
  },

  creator: (parent: never, args: { where: { id: any }; id: any }, { prisma }: any, info: any) => {
    const where = {
      ...args.where,
      id: args?.id ?? args?.where?.id,
    }

    if (!where.id && Object.keys(args?.where ?? {}).length == 0) {
      throw new GraphQLError('You must specify which creator to query.')
    }

    return prisma.creator.findUnique({ where })
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
