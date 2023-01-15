# project description

Udemy Modern GraphQL Bootcamp (with Node.js and Apollo)
https://www.udemy.com/share/101WtW3@DsWGBqkerk4VGISrd4_ZEuZQ8IzNlGR0PGKZOuBrTDKNsxlHIT4m5XbdgdATbiQeKg==/

Learn how to build GraphQL applications using Node.js. Includes Prisma v1, authentication, Apollo Client, and more!

# stack decisions

- Vite4
- Vue3
- Apollo Server
- GraphQL Yoga
- Vue Apollo
- Pinia
- Prisma ORM
- Auht0

# development decisions

Client -- Vite Built Development server on localhost:3000/
Server -- Apollo Server w/playground on localhost:4000/graphql

GraphQL CodeGen
https://www.apollographql.com/docs/react/development-testing/static-typing/

# how I got there

https://graphql.org/learn/queries/

https://the-guild.dev/graphql/codegen/docs/guides/graphql-server-apollo-yoga

https://www.youtube.com/watch?v=tHMaNmqPIC4

https://v4.apollo.vuejs.org/
https://v4.apollo.vuejs.org/guide-composable/

Subscriptions deviates from the udemy course instruction. I believe that this is due to the fact that I am using Apollo V4 with Graphql-Yoga@latest. https://the-guild.dev/graphql/yoga-server/docs/features/subscriptions

~Hasura instead of Heroku (Just kidding went back to Heroku)~
~https://cloud.hasura.io/~

~Deploying Prisma to Heroku (Just kidding went back to Render)~
~https://github.com/prisma/prisma-examples/tree/latest/deployment-platforms/heroku~

Render.com ended up being the only place that I was able to get the graphql server running
https://point-of-view-graphql.onrender.com

With the frontend
https://point-of-vue-web.onrender.com

Auth0 deviates from how the Udemy course teaches to authenticate users. At this point I have diverged pretty far from where the Udemy course is going. I will continue to try and track along in the ways that I can, but I can already see a lot of improvements have been made in the 2 years since this course was released.

Adding auth0
https://dev.to/the-guild/graphql-authentication-with-envelop-and-auth0-2cie

I am using an Auth0 application to handle login for creators of the application and incorporating both google login and passwordless email login. Both lead the end user to create an creator account and finish their signup upon logging in before allowing them to post. Only one mutation is unauthenticated: signupCreator. The rest of the mutations: createPost, updateInteraction, etc... all require an authorization header. I am using an Auth0 api to handle this authentication which is rolled into the graphql-yoga server and uses the token provided upon login.

Adding testing with Jest appears to track current state of the graphql best practices.

- I have completed all of the coding for this project but have run into an issue, immediately this week, with the testing side that is the last 5 hours of the Udemy course. 
- I will continue to work into the next week on this project to overcome this issue or move on. 
- The notes contained within this file act as a final summary of my work this week while the final draft will come next week.
- The github project and demo url are complete and ready for review: (github)[https://github.com/KenEucker/GraphQL-demo] (demo)[https://point-of-vue-web.onrender.com/]
- I will not be demoing on a lunch and learn this week (first week of the year is not great timing.)

# potential hosting solutions

- https://nhost.io/

- Render.com

# tools used

- Vuejs devtools https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd

- Apollo Client Devtools https://chrome.google.com/webstore/detail/apollo-client-devtools/jdkknkkbebbapilgoeccciglkfbmbnfm

# advanced learning

Serverless GraphQL Starter Kit - https://github.com/serverless/serverless-graphql

Put it all into NextJs - https://github.com/dotansimha/graphql-yoga/tree/main/examples/nextjs

Whatever Remix is - https://remix.run/docs/en/v1/tutorials/blog

Fastify It - https://www.fastify.io/

# big platform ideas

Build a Coolify server - https://github.com/coollabsio/coolify
Connect Totum for artists - https://github.com/poulainv/tottem
Connect calendly for scheduling - https://github.com/calcom/cal.com
Connect umami for analytics - https://github.com/umami-software/umami
Connect vaultwarden for IAM services - https://github.com/dani-garcia/vaultwarden
Build in a code server for creating Vue's - https://github.com/coder/code-server
Connect Linen for chat spaces (no DMs!) - https://github.com/Linen-dev/linen.dev
Build Beam into posts for more rich "longform" posts - https://github.com/planetscale/beam
