// import { v4 as uuidv4 } from 'uuid'
import { GraphQLError } from 'graphql'

const Mutation = {
  // @ts-ignore
  async createCreator(parent, args, { prisma, pubsub }, info) {
    const emailTaken = await prisma.creator.findUnique({
      where: {
        email: args.creator.email,
      },
    })
    if (emailTaken) {
      throw new GraphQLError(`Email is already in use.`)
    }

    const handleTaken = await prisma.creator.findUnique({
      where: {
        handle: args.creator.handle,
      },
    })
    if (handleTaken) {
      throw new GraphQLError(`Handle is already in use.`)
    }

    const createdCreator = await prisma.creator.create({ data: args.creator })
    pubsub.publish(`creator`, { mutation: 'CREATED', data: createdCreator })

    return createdCreator
  },
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
  async deleteCreator(parent, args, { prisma, pubsub }, info) {
    const { data, id } = args
    const creatorToDelete = await prisma.creator.findUnique({ where: { id } })

    if (!creatorToDelete) {
      throw new GraphQLError(`Creator does not exist.`)
    }

    const deletedCreator = await prisma.creator.delete({ where: { id } })

    /// Publish the deleted event
    pubsub.publish(`creator`, { mutation: 'DELETED', data: deletedCreator })

    return deletedCreator
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

  // @ts-ignore
  async updateCreator(parent, args, { prisma, pubsub }, info) {
    const { data, id } = args
    const creatorToUpdate = await prisma.creator.findUnique({ where: { id } })

    if (!creatorToUpdate) {
      throw new GraphQLError(`Creator does not exist.`)
    }

    if (typeof data.email === 'string' && data.email !== creatorToUpdate.email) {
      const emailTaken = await prisma.creator.findUnique({
        where: { email: creatorToUpdate.email },
      })

      if (emailTaken) {
        throw new GraphQLError(`Email already taken.`)
      }

      creatorToUpdate.email = data.email
    }

    creatorToUpdate.name = data.name ?? creatorToUpdate.name
    creatorToUpdate.banner = data.banner ?? creatorToUpdate.banner
    creatorToUpdate.avatar = data.avatar ?? creatorToUpdate.avatar
    creatorToUpdate.website = data.website ?? creatorToUpdate.website
    creatorToUpdate.location = data.location ?? creatorToUpdate.location
    creatorToUpdate.birthday = data.birthday ?? creatorToUpdate.birthday
    creatorToUpdate.bio = data.bio ?? creatorToUpdate.bio
    creatorToUpdate.status = data.status ?? creatorToUpdate.status

    const updatedCreator = await prisma.creator.update({
      where: { id },
      data: creatorToUpdate,
    })
    pubsub.publish('creator', { mutation: 'UPDATED', data: updatedCreator })

    return updatedCreator
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
  async verifyCreator(parent, args, { prisma, pubsub }, info) {
    const { data, id } = args
    const creatorToUpdate = await prisma.creator.findUnique({ where: { id } })

    if (!creatorToUpdate) {
      throw new GraphQLError(`Creator does not exist.`)
    }

    // First, do nothing
    if (creatorToUpdate.verified) {
      return creatorToUpdate
    }
    creatorToUpdate.verified = true

    const updatedCreator = await prisma.creator.update({
      where: { id },
      data: creatorToUpdate,
    })

    pubsub.publish('creator', { mutation: 'UPDATED', data: updatedCreator })

    return updatedCreator
  },

  // @ts-ignore
  async unVerifyCreator(parent, args, { prisma, pubsub }, info) {
    const { data, id } = args
    const creatorToUpdate = await prisma.creator.findUnique({ where: { id } })

    if (!creatorToUpdate) {
      throw new GraphQLError(`Creator does not exist.`)
    }

    // First, do nothing
    if (!creatorToUpdate.verified) {
      return creatorToUpdate
    }
    creatorToUpdate.verified = false

    const updatedCreator = await prisma.creator.update({
      where: { id },
      data: creatorToUpdate,
    })

    pubsub.publish('creator', { mutation: 'UPDATED', data: updatedCreator })

    return updatedCreator
  },
}

export default Mutation
