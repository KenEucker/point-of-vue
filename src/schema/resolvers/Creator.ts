import { Interaction, Post } from '../generated/types'

const Creator = {
  // @ts-ignore
  // email: (parent, args, { prisma, auth0 }, info) => {
  //   console.log({ parent, auth0 })
  //   if (parent.id === auth0?.creator?.id) {
  //     return parent.email
  //   }
  //   return null
  // },
  // @ts-ignore
  interactions: (parent, args, { prisma }, info) =>
    prisma.interaction.findMany({
      where: {
        creator: {
          id: parent.id,
        },
        post: {
          id: parent.post.id,
        },
      },
      include: {
        creator: true,
      },
      orderBy: {
        id: 'desc',
      },
    }),
  // @ts-ignore
  posts: (parent, args, { prisma }, info) =>
    prisma.post.findMany({
      where: {
        creator: {
          id: parent.id,
        },
      },
      orderBy: {
        id: 'desc',
      },
    }),
}

export default Creator
