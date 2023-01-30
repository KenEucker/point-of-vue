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

export default Template
