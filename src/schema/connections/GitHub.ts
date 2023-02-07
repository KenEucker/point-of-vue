import { GitHubAccount } from '../generated/types'
import { GraphQLError } from 'graphql'

import Client, { auth, gql, getMethod } from '@github-graph/api'
import { getIdentityProfile, povCreatorRepoName } from '../common'
import { Octokit } from '@octokit/core'

// @ts-expect-error
const GithubClient = Client.default

export const constructGithubCreator = (profile: any) => ({
  id: Number(profile.user_id) ? profile.user_id : 0,
  email: profile.email,
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

const vetGithubRequest = async (
  from: any,
  auth0: any,
  prisma: any,
  isApiRequest = false,
  getFullProfile = false
) => {
  /// right back at ya
  const requestor = {
    token: from?.token,
    email: from?.email,
    id: from?.id,
    sub: auth0?.sub,
    connection: 'github',
  }

  const identity: any = await getIdentityProfile(requestor, auth0, prisma, getFullProfile)
  if (!identity && !requestor.token) {
    throw new GraphQLError("You can't do that (E: 0004)")
  } else if (identity) {
    requestor.token = identity.token
  }

  const githubClient = isApiRequest
    ? new Octokit({
        auth: requestor.token,
      })
    : new GithubClient({
        auth: auth.createTokenAuth(requestor.token),
      })

  return { identity, requestor, githubClient }
}

const updateGithubContent = async (
  githubClient: any,
  owner: string,
  repo: string,
  path: string,
  name: string,
  committer: { name: string; email: string },
  version: string,
  content: string
) => {
  const { data } = await githubClient
    .request('GET /repos/{owner}/{repo}/contents/{file_path}', {
      owner,
      repo,
      file_path: path,
    })
    .catch((e) => {
      console.error(e.message)
    })

  console.log({ data, owner, repo, path })
  const { sha } = data

  // Github adds a trailing line
  const currentContent = data.content.replace(/\n/g, '')
  if (currentContent === content) {
    return Promise.resolve(false)
  }

  return githubClient
    .request('PUT /repos/{owner}/{repo}/contents/{path}', {
      owner,
      repo,
      path,
      message: `updates ${name} [v${version}]`,
      committer,
      content,
      sha,
    })
    .then(() => {
      return true
    })
    .catch((e) => {
      console.error(e.message)
      return false
    })
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

  github_vues: async (_parent: never, args: { from: any }, { auth0, prisma }: any, _info: any) => {
    const { githubClient, identity } = await vetGithubRequest(args.from, auth0, prisma, false, true)

    const query = `
    query githubVues {
      viewer {
        repository(name: "${povCreatorRepoName}") {
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
                          commitResourcePath
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
    const userVues = await prisma.vue.findMany({ where: { creatorId: identity.id } })
    const globbedVues = vues.map((entry: { oid: any; name: any; object: { entries: any[] } }) => {
      const userMatched = userVues.find((v: any) => v.title === entry.name)
      const obj: any = userMatched
        ? userMatched
        : {
            id: entry.oid,
            title: entry.name,
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

export const Mutation = {
  github_createVue: async (
    _parent: never,
    args: { from: { token: string; id: string | number; email: string }; with: any },
    { prisma, auth0 }: any,
    info: any
  ) => {
    const { githubClient, identity } = await vetGithubRequest(args.from, auth0, prisma, true, true)

    await githubClient.request('PUT /repos/{owner}/{repo}/contents/{path}', {
      owner: 'OWNER',
      repo: povCreatorRepoName,
      path: 'PATH',
      message: 'my commit message',
      committer: {
        name: 'Monalisa Octocat',
        email: 'octocat@github.com',
      },
      content: 'bXkgbmV3IGZpbGUgY29udGVudHM=',
    })
  },

  github_updateVue: async (
    _parent: never,
    args: { from: { token: string; id: string | number; email: string }; data: any },
    { prisma, auth0 }: any,
    info: any
  ) => {
    const { githubClient, identity } = await vetGithubRequest(args.from, auth0, prisma, true, true)

    // get vue data from database
    const where = { id: args.data.id }
    const vue = await prisma.vue.findUnique({ where })
    const updatedVueFields = args.data

    if (!vue) {
      console.error('Vue not found', where)
      throw new Error('Vue not found')
    }

    console.log({ vue })

    const committer = {
      name: identity.name,
      email: identity.email,
    }
    const updatePromises = []

    updatePromises.push(
      updateGithubContent(
        githubClient,
        identity.nickname,
        povCreatorRepoName,
        `vues/${vue.title}/query.graphql`,
        vue.title,
        committer,
        vue.version,
        Buffer.from(updatedVueFields.query).toString('base64')
      )
    )

    updatePromises.push(
      updateGithubContent(
        githubClient,
        identity.nickname,
        povCreatorRepoName,
        `vues/${vue.title}/script.js`,
        vue.title,
        committer,
        vue.version,
        Buffer.from(updatedVueFields.script).toString('base64')
      )
    )

    updatePromises.push(
      updateGithubContent(
        githubClient,
        identity.nickname,
        povCreatorRepoName,
        `vues/${vue.title}/template.vue`,
        vue.title,
        committer,
        vue.version,
        Buffer.from(updatedVueFields.template).toString('base64')
      )
    )

    updatePromises.push(
      updateGithubContent(
        githubClient,
        identity.nickname,
        povCreatorRepoName,
        `vues/${vue.title}/vue.json`,
        vue.title,
        committer,
        vue.version,
        Buffer.from(updatedVueFields.vue).toString('base64')
      )
    )

    const success = await Promise.all(updatePromises).then((updates) => {
      return updates.reduce((o, i, v) => o || v, false)
    })

    // if success then call prisma to update the vue with the new vue json data
    if (success) {
      const parsedVueJson = JSON.parse(updatedVueFields.vue)
      vue.version = parsedVueJson.version
      /// Don't allow updates to title
      // vue.title = parsedVueJson.title
      vue.status = parsedVueJson.status
      vue.license = parsedVueJson.license
      vue.compatibility = parsedVueJson.compatibility

      const updateSuccess = await prisma.vue.update({
        where: { id: vue.id },
        data: vue,
      })
      console.log({ updateSuccess })

      if (updateSuccess) {
        return vue
      }
    }

    return null
  },

  github_archiveVue: async (
    _parent: never,
    args: { from: { token: string; id: string | number; email: string }; with: any },
    { prisma, auth0 }: any,
    info: any
  ) => {
    const { githubClient } = await vetGithubRequest(args.from, auth0, prisma, true)

    // create the file in the archived folder
    await githubClient.request('PUT /repos/{owner}/{repo}/contents/{path}', {
      owner: 'OWNER',
      repo: 'REPO',
      path: 'PATH',
      message: 'my commit message',
      committer: {
        name: 'Monalisa Octocat',
        email: 'octocat@github.com',
      },
      content: 'bXkgbmV3IGZpbGUgY29udGVudHM=',
    })

    // delete the file from the active vues folder
    await githubClient.request('DELETE /repos/{owner}/{repo}/contents/{path}', {
      owner: 'OWNER',
      repo: 'REPO',
      path: 'PATH',
      message: 'my commit message',
      committer: {
        name: 'Monalisa Octocat',
        email: 'octocat@github.com',
      },
      sha: '329688480d39049927147c162b9d2deaf885005f',
    })
  },
}
