const ActiveVue = {
  // @ts-ignore
  creator: (parent, args, { prisma }, info) => {
    return prisma.creator.findUnique({
      where: {
        id: parent.creatorId,
        vues: {
          id: {
            in: parent.vues,
          },
        },
      },
    })
  },
  // @ts-ignore
  vue: (parent, args, { prisma }, info) => {
    console.log({ vue: parent })
    return prisma.vue.findUnique({
      where: {
        id: parent.vueId,
      },
    })
  },
}

export default ActiveVue
