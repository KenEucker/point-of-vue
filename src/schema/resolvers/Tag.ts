const Tag = {
  // @ts-ignore
  creators: (parent, args, { prisma }, info) => {
    return prisma.creator.findMany({
      where: {
        id: parent.creatorId,
        tags: {
          some: {
            id: parent.id,
          },
        },
      },
      include: { tags: true },
    })
  },
  // @ts-ignore
  posts: (parent, args, { prisma }, info) => {
    return prisma.post.findMany({
      where: {
        id: parent.postId,
        tags: {
          some: {
            id: parent.id,
          },
        },
      },
      include: { tags: true },
    })
  },
  // @ts-ignore
  groups: (parent, args, { prisma }, info) => {
    return prisma.group.findMany({
      where: {
        id: parent.groupId,
        tags: {
          some: {
            id: parent.id,
          },
        },
      },
      include: { tags: true },
    })
  },
  // @ts-ignore
  templates: (parent, args, { prisma }, info) => {
    return prisma.template.findMany({
      where: {
        id: parent.templateId,
        tags: {
          some: {
            id: parent.id,
          },
        },
      },
      include: { tags: true },
    })
  },
  // @ts-ignore
  vues: (parent, args, { prisma }, info) => {
    return prisma.vue.findMany({
      where: {
        id: parent.vueId,
        tags: {
          some: {
            id: parent.id,
          },
        },
      },
      include: { tags: true },
    })
  },
}

export default Tag
