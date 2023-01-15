const Post = {
  // @ts-ignore
  creator: (parent, args, { prisma }, info) => {
    return prisma.creator.findFirst({
      where: {
        id: parent.creatorId,
        posts: parent.creator
          ? {
              some: {
                id: parent.id,
              },
            }
          : undefined,
        email: parent.email,
        handle: parent.handle,
      },
      include: { posts: true },
    })
  },
  // @ts-ignore
  interactions: (parent, args, { prisma }, info) =>
    prisma.interaction.findUnique({
      where: parent,
      include: { posts: true },
      orderBy: {
        id: 'desc',
      },
    }),
}

export default Post
