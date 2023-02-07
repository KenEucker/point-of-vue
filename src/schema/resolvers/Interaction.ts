import { GraphQLError } from 'graphql'
import { getDefaultQueryOptions } from '../common'
import { pipe, filter } from 'graphql-yoga'
import { InteractionByInput } from '../generated/types'

const Interaction = {
  // @ts-ignore
  creator: async (parent, args, { prisma }, info) =>
    prisma.creator.findMany({
      where: {
        id: parent.creatorId,
      },
    }),
  // @ts-ignore
  post: async (parent, args, { prisma }, info) =>
    prisma.post.findMany({
      where: {
        id: parent.postId,
      },
    }),
}

export const Query = {
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
}

export const Mutation = {
  // @ts-ignore
  async createInteraction(parent, args, { prisma, pubsub }, info) {
    const { creatorId, postId } = args.interaction
    const creator = await prisma.creator.findUnique({ where: { id: creatorId } })
    if (!creator) {
      throw new GraphQLError(`Creator does not exist.`)
    }

    const post = await prisma.post.findUnique({ where: { id: postId } })

    if (!post) {
      throw new GraphQLError(`Post does not exist.`)
    }

    const alreadyInteractionedOnPost = await prisma.interaction.findUnique({
      where: {
        postId,
        creatorId,
      },
    })
    if (alreadyInteractionedOnPost) {
      throw new GraphQLError(`Creator post interaction already created for this post.`)
    }

    const newInteraction = {
      like: args.interaction.like,
      love: args.interaction.love,
      repost: args.interaction.repost,
      share: args.interaction.share,
      text: args.interaction.text,
      post: post.id,
      creator: creator.id,
    }

    const interactionCreated = await prisma.interaction.create({
      data: newInteraction,
    })

    pubsub.publish(`interaction`, {
      mutation: 'CREATED',
      data: interactionCreated,
    })

    return interactionCreated
  },

  // @ts-ignore
  async deleteInteraction(parent, args, { prisma, pubsub }, info) {
    const where = {
      ...args.where,
      id: args?.id ?? args?.where?.id,
    }

    if (!where.id && Object.keys(args?.where ?? {}).length == 0) {
      throw new GraphQLError('You must specify which interaction to delete.')
    }

    const deletedInteraction = await prisma.interaction.delete({ where })

    pubsub.publish(`interaction`, {
      mutation: 'DELETED',
      data: deletedInteraction,
    })

    return deletedInteraction
  },

  // @ts-ignore
  async toggleInteraction(parent, args, { prisma, pubsub }, info) {
    const findInteractionWhere = {
      creatorId_postId: {
        postId: args.data.postId,
        creatorId: args.data.creatorId,
      },
    }
    let updatedInteraction = await prisma.interaction.findUnique({
      where: findInteractionWhere,
    })
    const { like, love, repost, share } = args.data
    const interactionDelta = {
      id: 0,
      postId: 0,
      creatorId: 0,
      text: null,
      like: 0,
      love: 0,
      repost: 0,
      share: 0,
    }

    // Toggle
    if (like) {
      interactionDelta.like = updatedInteraction?.like ? -1 : 1
      if (updatedInteraction) {
        updatedInteraction.like = interactionDelta.like > 0
      }
    } else if (love) {
      interactionDelta.love = updatedInteraction?.love ? -1 : 1
      if (updatedInteraction) {
        updatedInteraction.love = interactionDelta.love > 0
      }
    } else if (repost) {
      interactionDelta.repost = updatedInteraction?.repost ? -1 : 1
      if (updatedInteraction) {
        updatedInteraction.repost = interactionDelta.repost > 0
      }
    } else if (share) {
      interactionDelta.share = updatedInteraction?.share ? -1 : 1
      if (updatedInteraction) {
        updatedInteraction.share = interactionDelta.share > 0
      }
    } else {
      // what?
    }

    if (!updatedInteraction) {
      updatedInteraction = await prisma.interaction.create({ data: args.data })
    } else {
      updatedInteraction = await prisma.interaction.update({
        where: findInteractionWhere,
        data: updatedInteraction,
      })
    }
    interactionDelta.id = updatedInteraction.id
    interactionDelta.text = updatedInteraction.text
    interactionDelta.postId = updatedInteraction.postId
    interactionDelta.creatorId = updatedInteraction.creatorId

    pubsub.publish('interactionDelta', {
      mutation: 'DELTA',
      data: interactionDelta,
    })
    pubsub.publish('interaction', {
      mutation: 'UPDATED',
      data: updatedInteraction,
    })

    return updatedInteraction
  },
}

export const Subscription = {
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
}

export default Interaction
