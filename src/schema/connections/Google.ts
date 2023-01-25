import { GoogleAccount } from '../generated/types'

export const constructGoogleCreator = (profile: any): GoogleAccount => ({
  id: profile.user_id,
  email: profile.email,
  email_verified: profile.email_verified,
  name: profile.nickname,
  avatar: profile.picture,
  city: profile.user_metadata.city,
  country: profile.user_metadata.country,
  timezone: profile.user_metadata.timezone,
})

const Google = {
  google: async (
    _parent: never,
    args: { from: { token: string; id: string | number; email: string } },
    { prisma, auth0 }: any,
    info: any
  ) => {
    console.log('')
  },
}

export default Google
