import {
  ImageAlbumsWhereInput,
  ImagesWhereInput,
  ImgurAccount,
  GoogleAccount,
  GitHubAccount,
  ImgurImage,
  ImgurAlbum,
} from './../generated/types.d'
import { GraphQLError } from 'graphql'
import auth0Client from 'auth0'
import Client, { auth, gql, getMethod } from '@github-graph/api'
import imgur from 'imgur'
import { JwtVerifier, getTokenFromHeader } from '@serverless-jwt/jwt-verifier'
// @ts-expect-error
const ImgurClient = imgur.ImgurClient
// @ts-expect-error
const GithubClient = Client.default
const auth0Configured = process.env.AUTH0_DOMAIN && process.env.AUTH0_CID

let auth0ManagementToken: string | null = null
const auth0UserCache = new Map()

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

const validateJwt = async (authorization: string, options: any) => {
  let claims
  let accessToken

  try {
    const verifier = new JwtVerifier(options)
    accessToken = getTokenFromHeader(authorization)
    claims = await verifier.verifyAccessToken(accessToken)
  } catch (err: any) {
    if (typeof options.handleError !== 'undefined' && options.handleError !== null) {
      return options.handleError(err)
    }

    return {
      error: err.code,
      message: err.message,
    }
  }

  return {
    accessToken,
    claims,
  }
}

const getProfileFromJwt = (authorization: string, auth0?: any, prisma?: any) => {
  if (!authorization?.length) {
    return Promise.resolve(null)
  }

  const authOptions = auth0
    ? {
        audience: auth0.aud[0] ?? '',
        issuer: auth0.iss,
      }
    : {
        issuer: 'https://dev-0n0gjhjq.us.auth0.com/',
        audience: 'http://localhost:8100/graphql',
      }

  return validateJwt(`Bearer ${authorization}`, authOptions)
    .then((jwt) => {
      if (!jwt.error) {
        if (prisma) {
          return prisma.creator.findFirstOrThrow({
            where: {
              subs: {
                has: jwt.claims?.sub,
              },
            },
          })
        } else {
          return { subs: [jwt.sub] }
        }
      }

      return Promise.resolve(null)
    })
    .catch((error) => {
      console.error({ error })
      return null
    })
}

const getAuthManagementToken = (requestor?: any, auth0?: any) => {
  if ((requestor.token && !auth0?.sub) || !auth0Configured) {
    console.info('canceling auth0 management request', requestor)
    return Promise.resolve(null)
  }
  if (auth0ManagementToken) {
    console.info('using saved management token', requestor)
    return Promise.resolve(auth0ManagementToken)
  }

  const authClient = new auth0Client.AuthenticationClient({
    domain: process.env.AUTH0_DOMAIN ?? '',
    clientId: process.env.AUTH0_MAN_CID,
    clientSecret: process.env.AUTH0_MAN_SEC,
  })

  return new Promise<string | null>((resolve) => {
    authClient.clientCredentialsGrant(
      {
        audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
      },
      function (err, response) {
        if (err) {
          console.error({ err })
          return resolve(null)
        }

        return resolve((auth0ManagementToken = response?.access_token))
      }
    )
  })
}

const getIdentityProfile = (requestor: any, auth0?: any, prisma?: any) => {
  return new Promise((resolve) => {
    return getAuthManagementToken(requestor, auth0).then((token) => {
      if (!token || (!requestor.sub && !auth0?.sub)) {
        console.info("i'm not your guy, buddy", requestor)
        return getProfileFromJwt(requestor.token, auth0, prisma).then(resolve)
      } else if (requestor.token && requestor.connection) {
        /// Assuming that the profile already has all it needs from the requestor
        console.info('you got all you need buddy', requestor)
        return resolve(requestor)
      }

      const useSubId = requestor.sub ?? auth0.sub

      const convertProfileToIdenitity = (profile: any) => {
        requestor.email = requestor.google?.email ?? requestor.github?.email ?? profile.email
        requestor.ip = profile.last_ip
        if (!requestor.sub) {
          /// requested for info not authentication
          return resolve(requestor)
        } else {
          /// If the token is being requested for a specific connection
          if (requestor.connection) {
            requestor.token = profile.identities?.find(
              (i: { connection: string }) => i.connection === requestor.connection
            )?.access_token
          }
          /// All fields, requested for authentication
          return resolve({ ...requestor, ...profile })
        }
      }

      const cachedSubProfile = auth0UserCache.get(useSubId)
      if (cachedSubProfile) {
        console.info('using cached profile', useSubId)
        return convertProfileToIdenitity(cachedSubProfile)
      }

      console.info('auth0 requested', useSubId)

      const management = new auth0Client.ManagementClient({
        token,
        domain: process.env.AUTH0_DOMAIN ?? '',
      })
      return management
        .getUser({ id: useSubId })
        .then((p) => {
          auth0UserCache.set(useSubId, p)
          return convertProfileToIdenitity(p)
        })
        .catch(function (_err) {
          // The cliff swallow or American cliff swallow (Petrochelidon pyrrhonota) is a member of the passerine bird family Hirundinidae, the swallows and martins. The generic name Petrochelidon is derived from Ancient Greek petros meaning "rock" and khelidon "swallow", and the specific name pyrrhonota comes from purrhos meaning "flame-coloured" and -notos "-backed".
          console.error({ _err })
          resolve(requestor)
        })
    })
  })
}

const Global = {
  viewer: async (
    _parent: never,
    args: { from: { token: string; id: string | number; email: string } },
    { prisma, auth0 }: any,
    info: any
  ) => {
    /// right back at ya
    const requestor: any = {
      token: args.from?.token,
      // Remove?
      id: args.from?.id,
      email: args.from?.email,
    }

    const profile: any = await getIdentityProfile(requestor, auth0, prisma)

    if (profile) {
      if (profile.id && profile.email) {
        /// Profile was decoded from valid token
        profile.token = requestor.token
        return profile
      }

      /// User profile retrieved from Auth0, need to add the creator id
      const creator = await prisma.creator.findUnique({
        where: { email: requestor.email },
      })
      profile.id = creator.id
      profile.email = creator.email

      return profile
    } else if (requestor.token) {
      requestor.token = 'invalid'
    }

    return requestor
  },
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
      throw new GraphQLError("You can't do that (E: 0001)")
    }
    const authentication: any = auth0 ? {} : undefined

    if (auth0) {
      /// Instructs the next method to return the entire profile
      requestor.sub = auth0.sub

      await getIdentityProfile(requestor, auth0, prisma)
        .then(function (profile: any) {
          requestor.email = profile.email
          requestor.ip = profile.last_ip

          authentication.github = profile.identities?.find(
            (i: { connection: string }) => i.connection === 'github'
          )?.access_token
          authentication.google = profile.identities?.find(
            (i: { connection: string }) => i.connection === 'google-oauth2'
          )?.access_token
          authentication.imgur = profile.identities?.find(
            (i: { connection: string }) => i.connection === 'Imgur'
          )?.access_token

          if (authentication.imgur) {
            requestor.imgur = constructImgurUser(profile)
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
          // console.error(_err.message)
          requestor.token = 'error'
        })
    } else {
      authentication.auth0 = 'invalid'
    }

    if (where.email && where.email !== requestor.email) {
      /// TODO: remove hack for Imgur testing
      if (!requestor.imgur) {
        throw new GraphQLError("You can't do that (E: 0002)")
      }
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
    args: { from: any; where: { oid: string } },
    { auth0, prisma }: any,
    _info: any
  ) => {
    const requestor = {
      token: args.from?.token,
      email: args.from?.email,
      id: args.from?.id,
      sub: auth0?.sub,
      connection: 'github',
    }
    const identity: any = await getIdentityProfile(requestor, auth0, prisma)
    if (!identity && !requestor.token) {
      throw new GraphQLError("You can't do that (E: 0004)")
    } else if (identity) {
      requestor.token = identity.token
    }

    const githubClient = new GithubClient({
      auth: auth.createTokenAuth(requestor.token),
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
  // Google
  // threads: async (
  //   _parent: never,
  //   _args: { from: { token: any } },
  //   { prisma, auth0 }: any,
  //   _info: any
  // ) => {},
}

export default Global
