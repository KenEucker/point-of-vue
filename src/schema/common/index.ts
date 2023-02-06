import auth0Client from 'auth0'
import { JwtVerifier, getTokenFromHeader } from '@serverless-jwt/jwt-verifier'

export const auth0Configured = process.env.AUTH0_DOMAIN && process.env.AUTH0_CID
export const povCreatorRepoName = 'point-of-vue--vues'

let auth0ManagementToken: string | null = null
const auth0UserCache = new Map()

export const getAuth0ManagementToken = () => auth0ManagementToken

export const validateJwt = async (authorization: string, options: any) => {
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

export const getProfileFromJwt = (authorization: string, auth0?: any, prisma?: any) => {
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

export const getAuthManagementToken = (requestor?: any, auth0?: any) => {
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

export const getIdentityProfile = (
  requestor: any,
  auth0?: any,
  prisma?: any,
  getFullProfile = false
) => {
  return new Promise((resolve) => {
    return getAuthManagementToken(requestor, auth0).then((token) => {
      if (requestor.token && requestor.connection && !getFullProfile) {
        /// Assuming that the profile already has all it needs from the requestor
        console.info('you got all you need buddy', requestor)
        return resolve(requestor)
      } else if (!token || (!requestor.sub && !auth0?.sub)) {
        console.info("i'm not your guy, buddy", requestor)
        return getProfileFromJwt(requestor.token, auth0, prisma).then(resolve)
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
