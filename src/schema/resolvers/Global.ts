import { ImgurAccount, GoogleAccount, GitHubAccount } from './../generated/types.d'
import { GraphQLError } from 'graphql'
import { getIdentityProfile } from '../common'

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
}

export default Global
