const Interaction = {
  // @ts-ignore
  creator: async (parent, args, { prisma }, info) =>
    prisma.creator.findMany({
      where: {
        id: parent.creatorId,
      },
    }),
  // @ts-ignore
  post: async (parent, args, { prisma }, info) =>
    prisma.post.findMany({
      where: {
        id: parent.postId,
      },
    }),
}

export default Interaction
