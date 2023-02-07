import { GraphQLError } from 'graphql'
import { getDefaultQueryOptions } from '../common'

const Template = {
  // @ts-ignore
  creator: (parent, args, { prisma }, info) => {
    return prisma.creator.findFirst({
      where: {
        id: parent.creatorId,
        templates: parent.creator
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
  template: (parent: never, args: { where: { id: any }; id: any }, { prisma }: any, info: any) => {
    const where = {
      ...args.where,
      id: args?.id ?? args?.where?.id,
    }

    if (!where.id && Object.keys(args?.where ?? {}).length == 0) {
      throw new GraphQLError('You must specify which template to query.')
    }

    return prisma.template.findUnique({
      where,
    })
  },

  templates: (parent: never, { where, by }: any, { prisma }: any, info: any) => {
    if (where?.id || where?.title) {
      return prisma.template.findMany({
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

export default Template
