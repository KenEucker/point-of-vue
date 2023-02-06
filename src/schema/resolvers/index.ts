// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Resolvers } from '../generated/types'

/// Objects
import Query from './Query'
import Date from './Date'
import Mutation from './Mutation'
import Subscription from './Subscription'
import Creator from './Creator'
import Interaction from './Interaction'
import Post from './Post'
import Group from './Group'
import ActiveVue from './ActiveVue'
import ActiveTemplate from './ActiveTemplate'
// import Tag from './Tag'
import Template from './Template'
import Vue from './Vue'

/// Additional query items
import Global from './Global'

/// Connection query items
import { Query as GithubQuery, Mutation as GithubMutation } from '../connections/Github'
import { Query as ImgurQuery } from '../connections/Imgur'
import { Query as GoogleQuery } from '../connections/Google'

/// TS-IGNORE REASON: resolvers, included below, for each of the
/// different types can produce the creator, post, or comment
/// from a scalar value. This breaks our codegen types for the
/// return of these reducers, but works at runtime.
export const resolvers: Resolvers = {
  Date,
  Query: { ...Query, ...Global, ...GithubQuery, ...ImgurQuery, ...GoogleQuery },
  Mutation: { ...Mutation, ...GithubMutation },
  Subscription,
  Creator,
  Group,
  Interaction,
  Post,
  // Tag,
  Template,
  ActiveTemplate,
  Vue,
  ActiveVue,
}
