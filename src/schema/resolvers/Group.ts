import { GraphQLError } from 'graphql'
import { getDefaultQueryOptions } from '../common'

const Group = {
  // @ts-ignore
  creators: (parent, args, { prisma }, info) => {
    return prisma.creator.findMany({
      where: {
        id: parent.creatorId,
        groups: parent.creator
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
  groups: (parent: never, { where, by }: any, { prisma }: any, info: any) => {
    if (where?.id || where?.title) {
      return prisma.group.findMany({
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

  group: (parent: never, args: { where: { id: any }; id: any }, { prisma }: any, info: any) => {
    const where = {
      ...args.where,
      id: args?.id ?? args?.where?.id,
    }

    if (!where.id && Object.keys(args?.where ?? {}).length == 0) {
      throw new GraphQLError('You must specify which post to query.')
    }

    return prisma.group.findUnique({
      where,
    })
  },
}

export default Group
