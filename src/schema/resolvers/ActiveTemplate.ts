const ActiveTemplate = {
  // @ts-ignore
  creator: (parent, args, { prisma }, info) => {
    return prisma.creator.findUnique({
      where: {
        id: parent.creatorId,
        template: {
          id: parent.templateId,
        },
      },
    })
  },
}

export default ActiveTemplate
