import {
  ImageAlbumsWhereInput,
  ImagesWhereInput,
  ImgurAccount,
  ImgurImage,
} from '../generated/types'
import { GraphQLError } from 'graphql'
import imgur from 'imgur'
import { getIdentityProfile } from '../common'
// @ts-expect-error
const ImgurClient = imgur.ImgurClient

const ImgurImageMap = (d: ImgurImage) => ({
  id: d.id,
  link: d.link,
  title: d.title,
  description: d.description,
  deletehash: d.deletehash,
  datetime: new Date(d.datetime * 1000),
})
const ImgurAlbumMap = (d: any) => ({
  id: d.id,
  link: d.link,
  title: d.title,
  description: d.description,
  deletehash: d.deletehash,
  cover: d.cover,
  privacy: d.privacy,
  images_count: d.images_count,
  order: d.order,
  // images: d.images?.map(ImgurImageMap) ?? [],
  datetime: new Date(d.datetime * 1000),
})

const Imgur = {
  // Imgur
  images: async (
    _parent: never,
    args: { from: { token: any }; where: ImagesWhereInput },
    { auth0, prisma }: any,
    _info: any
  ) => {
    const requestor = {
      token: args.from?.token,
      sub: auth0?.sub,
      connection: 'Imgur',
    }
    const identity: any = await getIdentityProfile(requestor, auth0, prisma)
    if (!identity && !requestor.token) {
      throw new GraphQLError("You can't do that (E: 0005)")
    } else if (identity) {
      requestor.token = identity.token
    }

    if (!args?.where?.albumId) {
      throw new GraphQLError('You must supply an albumId')
    }
    const imgurClient = new ImgurClient({
      accessToken: requestor.token,
    })

    const response = await imgurClient.getAlbum(args.where.albumId)

    return response.success ? response.data.images.map(ImgurImageMap) : []
  },
  albums: async (
    _parent: never,
    args: { from: { token: any }; where: ImageAlbumsWhereInput },
    { auth0 }: any,
    _info: any
  ) => {
    if (!auth0 && !args?.from?.token) {
      throw new GraphQLError("You can't do that (E: 0006)")
    }

    if (!args?.where?.userName && !auth0?.sub) {
      throw new GraphQLError("You can't do that  (E: 0007)")
    }

    const imgurClient = new ImgurClient({
      accessToken: args.from?.token,
    })

    const userName = args?.where?.userName ?? auth0.sub
    const response = await imgurClient.getAlbums(userName)

    return response.success ? response.data?.map(ImgurAlbumMap) : []
  },
}

export default Imgur
