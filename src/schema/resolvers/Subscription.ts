import { Subscription as CreatorSubscription } from './Creator'
import { Subscription as PostSubscription } from './Post'
import { Subscription as InteractionSubscription } from './Interaction'

const Subscription = {
  countdown: {
    // This will return the value on every 1 sec until it reaches 0
    subscribe: async function* (parent: never, args: { from: number }) {
      const from = args.from ?? 100

      for (let i = from; i >= 0; i--) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        yield i
      }
    },
    resolve: (data: any) => data,
  },
  ...CreatorSubscription,
  ...PostSubscription,
  ...InteractionSubscription,
}

export default Subscription
