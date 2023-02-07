import {
  povGlobeDefaultCategory,
  povGlobeDefaultLicense,
  povGlobeOwnerName,
  povGlobeRepoName,
  getLicenseText,
} from './../common/index'
import { GraphQLError } from 'graphql'
import Client, { auth, gql, getMethod } from '@github-graph/api'
import { getIdentityProfile, povCreatorRepoName } from '../common'

import { Octokit } from '@octokit/core'
import { createPullRequest } from 'octokit-plugin-create-pull-request'
import { SubmitGithubVueInput } from '../generated/types'

export const removeAllAndSomeTagsFromHtml = (
  html: string,
  tagsToRemove: string[],
  tagsToRetain: string[]
): { output: string; removed: string[] } => {
  const removed: string[] = []
  return { output: html, removed }

  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const normalizedTagsToRemove = tagsToRemove.map((t) => t.toLowerCase())
  const normalizedTagsToRetain = tagsToRetain.map((t) => t.toLowerCase())

  // Recursive function to remove unwanted tags
  const removeTags = (node: Node) => {
    for (let i = node.childNodes.length - 1; i >= 0; i--) {
      const child = node.childNodes[i]
      if (child.nodeType === Node.ELEMENT_NODE) {
        const childName = child.nodeName.toLowerCase()
        if (normalizedTagsToRemove.includes(childName)) {
          removed.push(childName)
          node.removeChild(child)
        } else if (!normalizedTagsToRetain.includes(childName)) {
          removeTags(child)
        }
      }
    }
  }

  removeTags(doc)
  return { output: doc.body.innerHTML, removed }
}

const removeNodesWithKeywords = (
  code: string,
  keywords: string[]
): { output: string; removed: string[] } => {
  const importRegex = /^import.*;?$/gm
  const exportRegex = /^export.*;?$/gm
  const filteredCode = code.replace(importRegex, '').replace(exportRegex, '')
  const lines = filteredCode.split('\n')
  const filteredLines = lines.filter((line) => {
    return !keywords.some((keyword) => line.includes(keyword))
  })
  const output = filteredLines.join('\n')
  const removed = lines.filter((line) => !filteredLines.includes(line))
  return { output, removed }
}

const moddedOctokit = Octokit.plugin(createPullRequest)

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
    ? new moddedOctokit({
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
    .catch((e: any) => {
      console.error(e.message)
    })

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
    .catch((e: any) => {
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
      throw new GraphQLError('Vue not found')
    }

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

      return await prisma.vue.update({
        where: { id: vue.id },
        data: vue,
      })
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

  github_publishVue: async (
    _parent: never,
    args: { from: { token: string; id: string | number; email: string }; with: any },
    { prisma, auth0 }: any,
    info: any
  ) => {},

  github_submitVue: async (
    _parent: never,
    args: {
      from: { token: string; id: string | number; email: string }
      data: SubmitGithubVueInput
    },
    { prisma, auth0 }: any,
    info: any
  ) => {
    const { githubClient, identity } = await vetGithubRequest(args.from, auth0, prisma, true, true)
    const vueToPublish: any = args.data
    const vue = await prisma.vue.findMany({
      where: { id: vueToPublish.id, creatorId: identity.id },
    })

    console.log({ vueToPublish, vue })

    if (!vueToPublish) {
      throw new GraphQLError('Vue not found')
    }

    vueToPublish.category = vueToPublish.category ?? vue.category ?? povGlobeDefaultCategory
    vueToPublish.license = vueToPublish.license ?? vue.license ?? povGlobeDefaultLicense

    const committer = {
      name: identity.name,
      email: identity.email,
      date: new Date().toISOString(),
    }

    const htmlNormalized = removeAllAndSomeTagsFromHtml(
      vueToPublish.template,
      ['head', 'link', 'script', 'style'],
      ['body', 'html']
    )
    const jsNormalized = removeNodesWithKeywords(vueToPublish.script, [
      'window',
      'alert',
      'import',
      'fetch',
      'require',
      'console.log',
    ])

    const htmlLinesWereRemoved = htmlNormalized.removed.length
    const jsLinesWereRemoved = jsNormalized.removed.length
    if (jsLinesWereRemoved || htmlLinesWereRemoved) {
      info.push('Lines with the following keywords were removed during compilation')

      if (htmlLinesWereRemoved) {
        info = info.concat([' template ', ...htmlNormalized.removed])
      }
      if (jsLinesWereRemoved) {
        info = info.concat([' script ', ...jsNormalized.removed])
      }
    }

    const files: any = {}
    const filesBase =
      'packages/lib/src/components/' + vueToPublish.category + '/' + vueToPublish.title + '/'
    if (vueToPublish.license !== povGlobeDefaultLicense) {
      // license file for Vue component (eg: packages/lib/src/components/uncategorized/MyVue/license.md)
      files[filesBase + 'license.md'] = getLicenseText(vueToPublish.license)
    }
    // source file for Vue component (eg: packages/lib/src/components/uncategorized/MyVue/MyVue.vue)
    files[filesBase + vueToPublish.title + '.vue'] = `<template>
    <div class="flex justify-center">
      <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
        ${htmlNormalized.output}
      </div>
    </div>
  </template>
  <style scoped>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
  </style>
  <script setup>
    /// Auto Import
    import { onMounted, ref, computed } from 'vue'
    import { useMotion } from '@vueuse/motion'

    /// Hydration
    const query = {}
    const vue = {}
    
    /// Script
    ${jsNormalized.output}

    // onMounted(() => {
      // console.log('window.tailwindCSS', window.tailwindCSS)
      // window.tailwindCSS.refresh()
    // })
  </script>`

    // https://octokit.github.io/rest.js/#octokit-routes-pulls-create
    return githubClient
      .createPullRequest({
        owner: povGlobeOwnerName,
        repo: povGlobeRepoName,
        title: `publish vue [${vueToPublish.title}] version ${vueToPublish.version}`,
        body: `Creator @${identity.nickname} has submitted their Vue, ${
          vueToPublish.title
        }, for publication on the POV Globe.
        
        ${vueToPublish.note ? `Note: ${vueToPublish.note}` : ''}

         This pull request will be reviewed by the POV Globe moderation team and merged if approved.`,
        head: `publish-request--${vueToPublish.category}-${vueToPublish.title}-${vueToPublish.version}`,
        // base: 'staging' /* optional: defaults to default branch */,
        update: true /* optional: set to `true` to enable updating existing pull requests */,
        forceFork: true /* optional: force creating fork even when user has write rights */,
        changes: [
          {
            /* optional: if not passed, will use the information set in author */
            committer,
            commit: `submitting vue [${vueToPublish.title}] version ${vueToPublish.version} for publishing`,
            /* optional: if `files` is not passed, an empty commit is created instead */
            files, //: {
            // 'path/to/file1.txt': 'Content for file1',
            // 'path/to/file2.png': {
            //   content: '_base64_encoded_content_',
            //   encoding: 'base64',
            // },
            // deletes file if it exists,
            // 'path/to/file3.txt': null,
            // updates file based on current content
            // 'path/to/file4.txt': ({ exists, encoding, content }) => {
            //   // do not create the file if it does not exist
            //   if (!exists) return null

            //   return Buffer.from(content, encoding).toString('utf-8').toUpperCase()
            // },
            // 'path/to/file5.sh': {
            //   content: 'echo Hello World',
            //   encoding: 'utf-8',
            //   // one of the modes supported by the git tree object
            //   // https://developer.github.com/v3/git/trees/#tree-object
            //   mode: '100755',
            // },
            // },
            /* optional: if not passed, will be the authenticated user and the current date */
            // author: {
            //   name: 'Author LastName',
            //   email: 'Author.LastName@acme.com',
            //   date: new Date().toISOString(), // must be ISO date string
            // },
          },
        ],
      })
      .then((pr: any) => {
        // console.log({ pr })
        // data: {
        //   url: 'https://api.github.com/repos/KenEucker/point-of-vue--vues/pulls/1',
        //   id: 1231572001,
        //   node_id: 'PR_kwDOIyg7A85JaEwh',
        //   html_url: 'https://github.com/KenEucker/point-of-vue--vues/pull/1',
        //   diff_url: 'https://github.com/KenEucker/point-of-vue--vues/pull/1.diff',
        //   patch_url: 'https://github.com/KenEucker/point-of-vue--vues/pull/1.patch',
        //   issue_url: 'https://api.github.com/repos/KenEucker/point-of-vue--vues/issues/1',
        //   number: 1,
        //   state: 'open',
        //   locked: false,
        //   title: 'publish vue [HelloWorld] version 0.0.1',
        //   user: {
        //     login: 'KenEucker',
        //     id: 1720267,
        //     node_id: 'MDQ6VXNlcjE3MjAyNjc=',
        //     avatar_url: 'https://avatars.githubusercontent.com/u/1720267?v=4',
        //     gravatar_id: '',
        //     url: 'https://api.github.com/users/KenEucker',
        //     html_url: 'https://github.com/KenEucker',
        //     followers_url: 'https://api.github.com/users/KenEucker/followers',
        //     following_url: 'https://api.github.com/users/KenEucker/following{/other_user}',
        //     gists_url: 'https://api.github.com/users/KenEucker/gists{/gist_id}',
        //     starred_url: 'https://api.github.com/users/KenEucker/starred{/owner}{/repo}',
        //     subscriptions_url: 'https://api.github.com/users/KenEucker/subscriptions',
        //     organizations_url: 'https://api.github.com/users/KenEucker/orgs',
        //     repos_url: 'https://api.github.com/users/KenEucker/repos',
        //     events_url: 'https://api.github.com/users/KenEucker/events{/privacy}',
        //     received_events_url: 'https://api.github.com/users/KenEucker/received_events',
        //     type: 'User',
        //     site_admin: false,
        //   },
        //   body: 'pull request description',
        //   created_at: '2023-02-07T08:05:34Z',
        //   updated_at: '2023-02-07T08:05:34Z',
        //   closed_at: null,
        //   merged_at: null,
        //   merge_commit_sha: null,
        //   assignee: null,
        //   assignees: [],
        //   requested_reviewers: [],
        //   requested_teams: [],
        //   labels: [],
        //   milestone: null,
        //   draft: false,
        //   commits_url: 'https://api.github.com/repos/KenEucker/point-of-vue--vues/pulls/1/commits',
        //   review_comments_url:
        //     'https://api.github.com/repos/KenEucker/point-of-vue--vues/pulls/1/comments',
        //   review_comment_url:
        //     'https://api.github.com/repos/KenEucker/point-of-vue--vues/pulls/comments{/number}',
        //   comments_url:
        //     'https://api.github.com/repos/KenEucker/point-of-vue--vues/issues/1/comments',
        //   statuses_url:
        //     'https://api.github.com/repos/KenEucker/point-of-vue--vues/statuses/11d34680a4e23ef454a26c8a6f731b31f34eea3a',
        //   head: {
        //     label: 'KenEucker:publish-request--uncategorized-HelloWorld-0.0.1',
        //     ref: 'publish-request--uncategorized-HelloWorld-0.0.1',
        //     sha: '11d34680a4e23ef454a26c8a6f731b31f34eea3a',
        //     user: [Object],
        //     repo: [Object],
        //   },
        //   base: {
        //     label: 'KenEucker:production',
        //     ref: 'production',
        //     sha: '82f94570f3276510437e309a9f59a0456ac2a2aa',
        //     user: [Object],
        //     repo: [Object],
        //   },
        //   _links: {
        //     self: [Object],
        //     html: [Object],
        //     issue: [Object],
        //     comments: [Object],
        //     review_comments: [Object],
        //     review_comment: [Object],
        //     commits: [Object],
        //     statuses: [Object],
        //   },
        //   author_association: 'OWNER',
        //   auto_merge: null,
        //   active_lock_reason: null,
        //   merged: false,
        //   mergeable: null,
        //   rebaseable: null,
        //   mergeable_state: 'unknown',
        //   merged_by: null,
        //   comments: 0,
        //   review_comments: 0,
        //   maintainer_can_modify: false,
        //   commits: 1,
        //   additions: 37,
        //   deletions: 0,
        //   changed_files: 1,
        // }
        return {
          title: pr.title,
          url: pr.url,
          errors: pr.errors,
        }
      })
  },
}
