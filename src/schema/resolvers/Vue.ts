import { GraphQLError } from 'graphql'
import { getDefaultQueryOptions } from '../common'

const Vue = {
  // @ts-ignore
  creator: (parent, args, { prisma }, info) => {
    return prisma.creator.findMany({
      where: {
        id: parent.creatorId,
        vues: parent.creator
          ? {
              some: {
                id: parent.id,
              },
            }
          : undefined,
        email: parent.email,
        handle: parent.handle,
      },
      include: { groups: true },
    })
  },
}

export const Query = {
  vue: (parent: never, args: { where: { id: any }; id: any }, { prisma }: any, info: any) => {
    const where = {
      ...args.where,
      id: args?.id ?? args?.where?.id,
    }

    if (!where.id && Object.keys(args?.where ?? {}).length == 0) {
      throw new GraphQLError('You must specify which vue to query.')
    }

    return prisma.vue.findUnique({
      where,
    })
  },

  vues: (parent: never, { where, by }: any, { prisma }: any, info: any) => {
    if (where?.id || where?.title) {
      return prisma.vue.findMany({
        where: {
          id: where.id,
          title: {
            search: where.title,
          },
        },
        ...getDefaultQueryOptions(by),
      })
    }

    return prisma.group.findMany(getDefaultQueryOptions(by))
  },
}

export default Vue
