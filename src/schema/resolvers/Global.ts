import {
  ImageAlbumsWhereInput,
  ImagesWhereInput,
  ImgurAccount,
  GoogleAccount,
  GitHubAccount,
} from './../generated/types.d'
import { GraphQLError } from 'graphql'
import auth0Client from 'auth0'
import Client, { auth, gql, getMethod } from '@github-graph/api'
import imgur from 'imgur'

const constructImgurUser = (profile: any): ImgurAccount => ({
  id: profile.data.id,
  name: profile.data.url,
  avatar: profile.data.avatar,
  bio: profile.data.bio,
  city: profile.user_metadata.city,
  country: profile.user_metadata.country,
  timezone: profile.user_metadata.timezone,
})
const constructGoogleUser = (profile: any): GoogleAccount => ({
  id: profile.user_id,
  email: profile.email,
  email_verified: profile.email_verified,
  name: profile.nickname,
  avatar: profile.picture,
  city: profile.user_metadata.city,
  country: profile.user_metadata.country,
  timezone: profile.user_metadata.timezone,
})
const constructGitHubUser = (profile: any): GitHubAccount => ({
  id: profile.user_id,
  email: profile.email,
  email_verified: profile.email_verified,
  name: profile.nickname,
  avatar: profile.picture,
  bio: profile.bio,
  hireable: profile.hireable,
  profile: profile.html_url,
  city: profile.user_metadata.city,
  country: profile.user_metadata.country,
  timezone: profile.user_metadata.timezone,
})

const Global = {
  self: async (
    _parent: never,
    args: { from: { token: string; id: string | number; email: string } },
    { prisma, auth0 }: any,
    info: any
  ) => {
    const where: any = {
      id: args?.from?.id,
      email: args?.from?.email,
    }

    const requestor: any = {
      token: args.from?.token,
    }

    if (!auth0 && !requestor.token) {
      throw new GraphQLError("You can't do that")
    }
    const authentication: any = auth0 ? {} : undefined

    if (auth0) {
      const authClient = new auth0Client.AuthenticationClient({
        domain: process.env.AUTH0_DOMAIN ?? '',
        clientId: process.env.AUTH0_MAN_CID,
        clientSecret: process.env.AUTH0_MAN_SEC,
      })
      let token = args.from?.token
      authentication.creatorSubId = auth0.sub

      if (!token) {
        await new Promise<void>((resolve) => {
          authClient.clientCredentialsGrant(
            {
              audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
            },
            function (err, response) {
              if (err) {
                console.error({ err })
                return resolve()
              }
              token = response?.access_token
              resolve()
            }
          )
        })
      }
      if (token) {
        const management = new auth0Client.ManagementClient({
          token,
          domain: process.env.AUTH0_DOMAIN ?? '',
        })
        await management
          .getUser({ id: auth0.sub })
          .then(function (profile) {
            // console.log({ read_user, ids: read_user.identities })
            requestor.email = profile.email
            authentication.github = profile.identities?.find(
              (i) => i.connection === 'github'
            )?.access_token
            authentication.google = profile.identities?.find(
              (i) => i.connection === 'google-oauth2'
            )?.access_token
            authentication.imgur = profile.identities?.find(
              (i) => i.connection === 'Imgur'
            )?.access_token

            if (authentication.imgur) {
              requestor.imgur = constructImgurUser(profile)
              requestor.ip = profile.last_ip
            }
            if (authentication.google) {
              requestor.google = constructGoogleUser(profile)
            }
            if (authentication.github) {
              requestor.github = constructGitHubUser(profile)
            }
          })
          .catch(function (_err) {
            // The cliff swallow or American cliff swallow (Petrochelidon pyrrhonota) is a member of the passerine bird family Hirundinidae, the swallows and martins. The generic name Petrochelidon is derived from Ancient Greek petros meaning "rock" and khelidon "swallow", and the specific name pyrrhonota comes from purrhos meaning "flame-coloured" and -notos "-backed".
          })
      } else {
        authentication.auth0 = 'invalid'
      }
      /// TODO: Remove this
      // authentication.auth0 = token
      if (where.email) {
        const matchesGoogle = where.email === requestor.google?.email
        const matchesGitHub = where.email === requestor.github?.email
        const matchesImgur = false // TODO: Remove
        if (matchesGoogle) {
          requestor.email = requestor.google.email
        } else if (matchesGitHub) {
          requestor.email = requestor.github.email
        } else if (matchesImgur) {
          /// TODO: fix this imgur limitation
          requestor.email = requestor.google.email ?? requestor.github.email
        } else {
          console.log('here')
          throw new GraphQLError("You can't do that")
        }
      }
    } else if (requestor.token.length < 10) {
      console.log('everywhere')
      throw new GraphQLError("You can't do that")
    }

    const canQueryForCreator = requestor.email || where.email
    const creator = canQueryForCreator
      ? /// TODO: fix this for non-authed demo mode
        await prisma.creator.findUnique({ where: { email: requestor.email ?? where.email } })
      : undefined

    return {
      requestor,
      creator,
      authentication,
    }
  },
  // GitHub
  vues: async (
    _parent: never,
    args: { from: { token: any }; where: { oid: string } },
    { auth0 }: any,
    _info: any
  ) => {
    if (!auth0 && !args?.from?.token) {
      throw new GraphQLError("You can't do that")
    }
    // @ts-expect-error
    const githubClient = new Client.default({
      auth: auth.createTokenAuth(args.from.token),
    })
    const oid = args?.where?.oid
    const oidQuery = oid ? `,oid:"${oid}"` : ''
    const query = `
    query githubVues {
      viewer {
        repository(name: "point-of-vue--vues") {
          object(expression: "HEAD:vues") {
            ... on Tree {
              entries {
                oid
                name
                type
                object {
                  ... on Tree {
                    entries {
                      name
                      object {
                        ... on Blob {
                          text
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `
    const getVues = getMethod(gql(query))

    const response: any = await getVues(githubClient)
    const vues = response.viewer?.repository?.object?.entries
    const acceptableFilenames = ['vue', 'query', 'script', 'template']

    /*
      This code was generated by ChatGPT, a large language model developed by OpenAI.
      https://openai.com/

      "The best way to predict the future is to invent it." - Alan Kay, a pioneer of object-oriented programming and one of the pioneers of personal computing.
    */
    const globbedVues = vues.map((entry: { oid: any; name: any; object: { entries: any[] } }) => {
      const obj: any = {
        oid: entry.oid,
        name: entry.name,
      }
      entry.object.entries.forEach((nestedEntry: any) => {
        if (acceptableFilenames.includes(nestedEntry.name.split('.')[0])) {
          obj[nestedEntry.name.split('.')[0]] = nestedEntry.object.text
        }
      })
      return obj
    })

    return globbedVues
  },
  // Imgur
  images: async (
    _parent: never,
    args: { from: { token: any }; where: ImagesWhereInput },
    { auth0 }: any,
    _info: any
  ) => {
    if (!auth0 && !args?.from?.token) {
      throw new GraphQLError("You can't do that")
    }
    if (!args?.where?.albumId) {
      throw new GraphQLError('You must supply an albumId')
    }
    // @ts-expect-error
    const imgurClient = new imgur.ImgurClient({
      accessToken: args.from?.token,
    })

    const album = await imgurClient.getAlbum(args.where.albumId)

    return album.data.images
  },
  albums: async (
    _parent: never,
    args: { from: { token: any }; where: ImageAlbumsWhereInput },
    { auth0 }: any,
    _info: any
  ) => {
    if (!auth0 && !args?.from?.token) {
      throw new GraphQLError("You can't do that")
    }

    if (!args?.where?.userName && !auth0?.sub) {
      throw new GraphQLError("You can't do that")
    }

    // @ts-expect-error
    const imgurClient = new imgur.ImgurClient({
      accessToken: args.from?.token,
    })

    const userName = args?.where?.userName ?? auth0.sub
    const album = await imgurClient.getAlbums(userName)

    return album.data
  },
  // Google
  // docs: async (
  //   _parent: never,
  //   _args: { from: { token: any } },
  //   { prisma, auth0 }: any,
  //   _info: any
  // ) => {},
}

export default Global
