const ActiveVue = {
  // @ts-ignore
  creator: (parent, args, { prisma }, info) => {
    return prisma.creator.findUnique({
      where: {
        id: parent.creatorId,
      },
    })
  },
  // @ts-ignore
  vue: (parent, args, { prisma }, info) => {
    return prisma.vue.findUnique({
      where: {
        id: parent.vueId,
      },
    })
  },
}

export default ActiveVue
