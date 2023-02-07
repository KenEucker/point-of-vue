import { CreatorByInput } from './../generated/types.d'
import { GraphQLError } from 'graphql'
import { getDefaultQueryOptions } from '../common'
import { pipe, filter } from 'graphql-yoga'
const auth0Configured = process.env.AUTH0_DOMAIN && process.env.AUTH0_CID

const Creator = {
  // @ts-ignore
  // email: (parent, args, { prisma, auth0 }, info) => {
  //   console.log({ parent, auth0 })
  //   if (parent.id === auth0?.creator?.id) {
  //     return parent.email
  //   }
  //   return null
  // },
  // @ts-ignore
  interactions: (parent, args, { prisma }, info) =>
    prisma.interaction.findMany({
      where: {
        creator: {
          id: parent.id,
        },
        post: {
          id: parent.post.id,
        },
      },
      include: {
        creator: true,
      },
      orderBy: {
        id: 'desc',
      },
    }),
  // @ts-ignore
  posts: (parent, args, { prisma }, info) => {
    return prisma.post.findMany({
      where: {
        creator: {
          handle: parent.handle,
        },
      },
      orderBy: {
        id: 'desc',
      },
    })
  },
  // @ts-ignore
  groups: (parent, args, { prisma }, info) => {
    return prisma.group.findMany({
      where: {
        id: parent.group?.id,
        creators: {
          some: {
            id: parent.id,
          },
        },
      },
      include: {
        creators: true,
      },
      orderBy: {
        id: 'desc',
      },
    })
  },
  // @ts-ignore
  tags: (parent, args, { prisma }, info) => {
    return prisma.tag.findMany({
      where: {
        id: parent.group?.id,
        creators: {
          some: {
            id: parent.id,
          },
        },
      },
      include: {
        creator: true,
      },
      orderBy: {
        id: 'desc',
      },
    })
  },
  // @ts-ignore
  templates: (parent, args, { prisma }, info) => {
    return prisma.template.findMany({
      where: {
        id: parent.template?.id,
        creator: {
          id: parent.id,
        },
      },
      include: {
        creator: true,
      },
      orderBy: {
        id: 'desc',
      },
    })
  },
  // @ts-ignore
  vues: (parent, args, { prisma }, info) => {
    return prisma.vue.findMany({
      where: {
        id: parent.vue?.id,
        creator: {
          id: parent.id,
        },
      },
      include: {
        creator: true,
      },
      orderBy: {
        id: 'desc',
      },
    })
  },
  // @ts-ignore
  vue: async (parent, args, { prisma }, info) => {
    /// The name is singular but the result is plural
    /// As this is a creator's "point of vue"
    const activeVues = await prisma.ActiveVue.findMany({
      where: {
        creatorId: parent.id,
      },
    })
    if (!activeVues) {
      return null
    }
    const vues = await prisma.vue.findMany({
      where: {
        id: {
          in: activeVues.map((v: any) => v.vueId),
        },
      },
    })

    /// return the vues themselves
    return vues
  },
  // @ts-ignore
  template: async (parent, args, { prisma }, info) => {
    const activeTemplate = await prisma.ActiveTemplate.findUnique({
      where: {
        creatorId: parent.id,
      },
    })
    if (!activeTemplate) {
      return null
    }
    const template = await prisma.template.findUnique({
      where: {
        id: activeTemplate.templateId,
      },
    })

    /// Glob the two together, effectively applying what is
    /// set in the active template over the template defaults
    return { ...template, ...activeTemplate }
  },
}

export const Query = {
  creatorExists: async (parent: never, args: any, { prisma, auth0 }: any, info: any) => {
    const where = {
      email: args.where?.email,
    }

    const creator = await prisma.creator.findUnique({ where })

    return !!creator
  },

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
    const authHeadersInvalid = !auth0 && auth0Configured

    if (noSearchParams && !idWhereIsSet) {
      throw new GraphQLError('You must specify which creator to query.')
    } else if (authedRequest && authHeadersInvalid) {
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
    if (!authedRequest && creator && auth0Configured && authHeadersInvalid) {
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

  creators: (parent: never, { where, by }: any, { prisma }: any, info: any) => {
    if (where?.id || where?.name || where?.email || where?.handle) {
      return prisma.creator.findMany({
        where,
        ...getDefaultQueryOptions(by),
      })
    }
    return prisma.creator.findMany(getDefaultQueryOptions(by))
  },
}

export const Mutation = {
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
    creatorToUpdate.chosenday = data.chosenday ?? creatorToUpdate.chosenday
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

export const Subscription = {
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
        filter((a: { data: any }) => (where?.email ? a.data.email === where.email : true)),
        filter((a: { data: any }) => (where?.id ? a.data.id === where.id : true))
      )
    },
    resolve: (data: any) => data,
  },
}

export default Creator
