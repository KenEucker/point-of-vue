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

export default Group
