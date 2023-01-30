import { GitHubAccount } from '../generated/types'
import { GraphQLError } from 'graphql'

import Client, { auth, gql, getMethod } from '@github-graph/api'
import { getIdentityProfile } from '../common'
// @ts-expect-error
const GithubClient = Client.default

export const constructGithubCreator = (profile: any) => ({
  id: Number(profile.user_id) ? profile.user_id : 0,
  email: profile.email,
  verified: profile.email_verified,
  handle: profile.nickname ?? profile.login,
  name: profile.name ?? profile.login ?? '',
  website: profile.blog ?? profile.websiteUrl,
  avatar: profile.picture ?? profile.avatarUrl,
  updatedAt: profile.updated_at ?? profile.updatedAt,
  joined: profile.created_at ?? profile.createdAt,
  createdAt: profile.created_at ?? profile.createdAt,
  status: profile.status?.emoji,
  bio: profile.bio,
  location: profile.location ?? `${profile.user_metadata?.city}, ${profile.user_metadata?.country}`,
})

const vetGithubRequest = async (from: any, auth0: any, prisma: any) => {
  /// right back at ya
  const requestor = {
    token: from?.token,
    email: from?.email,
    id: from?.id,
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

  return { identity, requestor, githubClient }
}

export const Query = {
  github: async (
    _parent: never,
    args: { from: { token: string; id: string | number; email: string } },
    { prisma, auth0 }: any,
    info: any
  ) => {
    const { requestor, identity, githubClient } = await vetGithubRequest(args.from, auth0, prisma)

    if (!identity || !githubClient) {
      console.log({ identity, githubClient })
      return {
        requestor,
      }
    }

    let creator: any = {}
    const query = `
    query githubAccount {
        viewer {
          id
          email
          name
          avatarUrl
          login
          location
          updatedAt
          createdAt
          bio
          status {
            emoji
          }
          websiteUrl
        }
      }
  `
    const getGithubAccount = getMethod(gql(query))

    const { viewer } = (await getGithubAccount(githubClient)) as any

    if (viewer) {
      creator = constructGithubCreator(viewer)
    }

    return {
      requestor,
      creator,
    }
  },

  github_account: async (
    _parent: never,
    args: { from: { token: string; id: string | number; email: string } },
    { prisma, auth0 }: any,
    info: any
  ) => {
    const { requestor, identity, githubClient } = await vetGithubRequest(args.from, auth0, prisma)

    if (!identity || !githubClient) {
      console.log({ identity, githubClient })
      return {
        requestor,
      }
    }

    const query = `
    query githubAccount {
        viewer {
          login
          databaseId
          id
          followers {
            totalCount
          }
          following {
            totalCount
          }
          email
          company
          bio
          avatarUrl
          isBountyHunter
          isCampusExpert
          isDeveloperProgramMember
          isEmployee
          isFollowingViewer
          isHireable
          isGitHubStar
          isSiteAdmin
          location
          name
          packages {
            totalCount
          }
          repositories {
            totalCount
          }
          repositoriesContributedTo {
            totalCount
          }
          sponsors {
            totalCount
          }
          sponsoring {
            totalCount
          }
          sponsorsListing {
            url
            isPublic
          }
          status {
            emoji
            message
          }
          url
          websiteUrl
          starredRepositories {
            totalCount
          }
        }
      }
  `
    const getGithubAccount = getMethod(gql(query))

    const { viewer } = (await getGithubAccount(githubClient)) as any

    if (viewer) {
      return {
        databaseId: viewer.databaseId,
        id: viewer.id,
        name: viewer.name,
        email: viewer.email,
        company: viewer.company,
        bio: viewer.bio,
        avatar: viewer.avatarUrl,
        location: viewer.location,
        url: viewer.url,
        website: viewer.websiteUrl,
        status: `${viewer.sponsorsListing?.emoji} ${viewer.sponsorsListing?.message}`,
        sponsorsListing: viewer.sponsorsListing?.isPublic ? viewer.sponsorsListing?.url : '',
        isBountyHunter: viewer.isBountyHunter,
        isCampusExpert: viewer.isCampusExpert,
        isDeveloperProgramMember: viewer.isDeveloperProgramMember,
        isEmployee: viewer.isEmployee,
        isFollowingViewer: viewer.isFollowingViewer,
        isHireable: viewer.isHireable,
        isGitHubStar: viewer.isGitHubStar,
        isSiteAdmin: viewer.isSiteAdmin,
        followers: viewer.followers?.totalCount,
        following: viewer.following?.totalCount,
        packages: viewer.packages?.totalCount,
        repositories: viewer.repositories?.totalCount,
        repositoriesContributedTo: viewer.repositoriesContributedTo?.totalCount,
        sponsors: viewer.sponsors?.totalCount,
        sponsoring: viewer.sponsoring?.totalCount,
        starredRepositories: viewer.starredRepositories?.totalCount,
      }
    }

    return null
  },

  github_vues: async (
    _parent: never,
    args: { from: any; where: { oid: string } },
    { auth0, prisma }: any,
    _info: any
  ) => {
    const { githubClient } = await vetGithubRequest(args.from, auth0, prisma)

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
}
