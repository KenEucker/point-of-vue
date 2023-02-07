import { ForOptionsInput } from '../generated/types.d'
import { GraphQLError } from 'graphql'
import { getDefaultQueryOptions } from '../common'
import { PostByInput } from '../generated/types'
import { pipe, filter } from 'graphql-yoga'

const Post = {
  // @ts-ignore
  creator: (parent, args, { prisma }, info) => {
    return prisma.creator.findFirst({
      where: {
        id: parent.creatorId,
        posts: parent.creator
          ? {
              some: {
                id: parent.id,
              },
            }
          : undefined,
        email: parent.email,
        handle: parent.handle,
      },
      include: { posts: true },
    })
  },
  // @ts-ignore
  interactions: (parent, args, { prisma }, info) =>
    prisma.interaction.findUnique({
      where: parent,
      include: { posts: true },
      orderBy: {
        id: 'desc',
      },
    }),
}

export const Query = {
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
    })
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

export const Mutation = {
  // @ts-ignore
  async createPost(parent, args, { prisma, pubsub }, info) {
    const { creatorId, title, text, status, published } = args.post
    const creator = await prisma.creator.findUnique({
      where: {
        id: creatorId,
      },
    })
    if (!creator) {
      throw new GraphQLError(`Creator does not exist.`)
    }

    const postAlreadyExists = await prisma.post.findFirst({
      where: {
        creator: {
          id: creator.id,
        },
        title,
      },
    })

    if (postAlreadyExists) {
      throw new GraphQLError(`Post already exists with title for creator.`)
    }

    /// TODO: check for safety
    const media = args.post.media

    const newPost = {
      creatorId: creator.id,
      title,
      text: text ?? '',
      status,
      published,
      media,
    }

    const createdPost = await prisma.post.create({ data: newPost })
    pubsub.publish(`post`, { mutation: 'CREATED', data: createdPost })

    return createdPost
  },
  async publishPost(parent: any, { id }: any, { prisma, pubsub }: any, info: any) {
    const unpublishedPost = await prisma.post.findUnique({ where: { id } })

    if (!unpublishedPost) {
      throw new GraphQLError(`Post does not exist.`)
    }

    /// First, do nothing
    if (unpublishedPost.published) {
      return unpublishedPost
    }

    unpublishedPost.published = true

    const publishedPost = await prisma.post.update({
      where: {
        id: unpublishedPost.id,
      },
      data: unpublishedPost,
    })
    pubsub.publish('post', { mutation: 'PUBLISHED', data: publishedPost })

    return publishedPost
  },
  async unPublishPost(parent: any, { id }: any, { prisma, pubsub }: any, info: any) {
    const publishedPost = await prisma.post.findUnique({ where: { id } })

    if (!publishedPost) {
      throw new GraphQLError(`Post does not exist.`)
    }

    /// First, do nothing
    if (publishedPost.published) {
      return publishedPost
    }

    publishedPost.published = false

    const unPublishedPost = await prisma.post.update({
      where: {
        id: publishedPost.id,
      },
      data: publishedPost,
    })
    pubsub.publish('post', { mutation: 'PUBLISHED', data: unPublishedPost })

    return unPublishedPost
  },
  // @ts-ignore
  async updatePost(parent, args, { prisma, pubsub }, info) {
    const { data, id } = args
    const postToUpdate = await prisma.post.findUnique({ where: { id } })

    if (!postToUpdate) {
      throw new GraphQLError(`Post does not exist.`)
    }

    postToUpdate.title = data.title ?? postToUpdate.title
    postToUpdate.text = data.text ?? postToUpdate.text
    /// Not allowing the updating of the published field with updatePost
    /// Client must use publishPost/unPublishPost mutations to set this

    const updatedPost = await prisma.post.update({
      where: { id },
      data: postToUpdate,
    })

    if (updatedPost.published) {
      pubsub.publish('post', { mutation: 'UPDATED', data: updatedPost })
    }

    return updatedPost
  },
  // @ts-ignore
  async deletePost(parent, args, { prisma, pubsub }, info) {
    const where = {
      ...args.where,
      id: args?.id ?? args?.where?.id,
    }

    if (!where.id && Object.keys(args?.where ?? {}).length == 0) {
      throw new GraphQLError('You must specify which post to delete.')
    }

    const postToDelete = await prisma.post.findUnique({ where })

    if (!postToDelete) {
      throw new GraphQLError(`Post does not exist.`)
    }

    const deletedPost = await prisma.post.delete({ where })

    if (postToDelete.published) {
      pubsub.publish(`post`, { mutation: 'DELETED', data: deletedPost })
    }

    return deletedPost
  },
}

export const Subscription = {
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

export default Post
