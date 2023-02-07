import { Prisma } from '@prisma/client'
import { Query as CreatorQuery } from './Creator'
import { Query as GroupQuery } from './Group'
import { Query as InteractionQuery } from './Interaction'
import { Query as PostQuery } from './Post'
import { Query as TemplateQuery } from './Template'
import { Query as VueQuery } from './Vue'

const Query = {
  getPostInteractions: async (parent: never, { id }: any, { prisma }: any, info: any) => {
    const query = Prisma.sql`SELECT
      COALESCE(SUM(CASE WHEN "like"=true THEN 1 ELSE 0 END), 0)::int as likes,
      COALESCE(SUM(CASE WHEN love=true THEN 1 ELSE 0 END), 0)::int as loves,
      COALESCE(SUM(CASE WHEN repost=true THEN 1 ELSE 0 END), 0)::int as reposts,
      COALESCE(SUM(CASE WHEN "share"=true THEN 1 ELSE 0 END), 0)::int as shares
    FROM "Interaction" WHERE "postId"=${Number(id)}`

    const result = await prisma.$queryRaw(query)

    const interactions = {
      likes: 0,
      loves: 0,
      reposts: 0,
      shares: 0,
    }

    if (result[0]) {
      interactions.likes = Number(result[0].likes)
      interactions.loves = Number(result[0].loves)
      interactions.reposts = Number(result[0].reposts)
      interactions.shares = Number(result[0].shares)
    }

    return interactions
  },
  ...CreatorQuery,
  ...GroupQuery,
  ...InteractionQuery,
  ...PostQuery,
  ...TemplateQuery,
  ...VueQuery,
}

export default Query
