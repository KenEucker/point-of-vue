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

export default Vue
