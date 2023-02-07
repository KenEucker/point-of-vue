import { Mutation as CreatorMutation } from './Creator'
import { Mutation as PostMutation } from './Post'
import { Mutation as InteractionMutation } from './Interaction'

const Mutation = {
  ...CreatorMutation,
  ...PostMutation,
  ...InteractionMutation,
}

export default Mutation
