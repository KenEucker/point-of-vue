import { ActiveTemplate } from './../generated/types.d'
import { Interaction, Post } from '../generated/types'

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

export default Creator
