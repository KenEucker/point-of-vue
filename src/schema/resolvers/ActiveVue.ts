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
}

export default ActiveVue
