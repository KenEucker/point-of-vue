import { GraphQLError } from 'graphql'
import { pipe, filter } from 'graphql-yoga'
import { Creator, CreatorByInput, InteractionByInput, PostByInput } from '../generated/types'

const Subscription = {
  countdown: {
    // This will return the value on every 1 sec until it reaches 0
    subscribe: async function* (parent: never, args: { from: number }) {
      const from = args.from ?? 100

      for (let i = from; i >= 0; i--) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        yield i
      }
    },
    resolve: (data: any) => data,
  },
  creator: {
    subscribe: async (
      parent: never,
      { where }: { where: CreatorByInput },
      { prisma, pubsub }: any
    ) => {
      if (where && (where.id || where.email || where.handle)) {
        const creator = await prisma.creator.findUnique({ where })

        if (!creator) {
          throw new GraphQLError('creator does not exist')
        }
      }

      return pipe(
        pubsub.subscribe('creator'),
        filter((a: { data: Creator }) => (where?.email ? a.data.email === where.email : true)),
        filter((a: { data: Creator }) => (where?.id ? a.data.id === where.id : true))
      )
    },
    resolve: (data: any) => data,
  },
  interactionDelta: {
    subscribe: async (
      parent: never,
      { where }: { where: InteractionByInput },
      { pubsub, prisma }: any
    ) => {
      // if (where && (where.creator?.id || where.post?.id)) {
      //   const interaction = await prisma.interaction.findFirst({ where })

      //   if (!interaction) {
      //     throw new GraphQLError('post interaction does not exist for creator')
      //   }
      // }

      return pipe(
        pubsub.subscribe('interactionDelta'),
        filter((i: any) => (where?.creator?.id ? i.data.creatorId === where.creator.id : true)),
        filter((i) => (where?.post?.id ? i.data.postId === where.post.id : true))
      )
    },
    resolve: (data: any) => data,
  },
  interaction: {
    subscribe: async (
      parent: never,
      { where }: { where: InteractionByInput },
      { pubsub, prisma }: any
    ) => {
      // if (where && (where.creator?.id || where.post?.id)) {
      //   const interaction = await prisma.interaction.findFirst({ where })

      //   if (!interaction) {
      //     throw new GraphQLError('post interaction does not exist for creator')
      //   }
      // }

      return pipe(
        pubsub.subscribe('interaction'),
        filter((i: any) => (where?.creator?.id ? i.data.creatorId === where.creator.id : true)),
        filter((i) => (where?.post?.id ? i.data.postId === where.post.id : true))
      )
    },
    resolve: (data: any) => data,
  },
  post: {
    subscribe: async (
      parent: never,
      { where }: { where: PostByInput },
      { pubsub, prisma }: any
    ) => {
      if (where && where.creator) {
        const creator = await prisma.creator.findUnique({ where: where.creator })

        if (!creator) {
          throw new GraphQLError('creator does not exist')
        }
      }

      return pipe(
        pubsub.subscribe('post'),
        filter((p: any) => (where?.creator?.id ? p.data.creatorId === where.creator.id : true)),
        filter((p: any) => (where?.creator?.email ? p.data.email === where.creator.email : true)),
        filter((p: any) =>
          where?.creator?.handle ? p.data.handle === where.creator.handle : true
        ),
        filter((p: any) => (p.mutation !== 'UNPUBLISHED' ? p.data.published : true))
      )
    },
    resolve: (data: any) => data,
  },
}

export default Subscription
