# Point Of Vue

## A social network

Point Of Vue is a web 3 social sharing network for the programmable web. POV integrates with second-party APIs (second party are APIs you have access to as a user with an access token) to open up the world-wide web and make it personally tailored for your point of view: the apps/platforms/websites that you use while on the internet. Connecting all of these APIs together, creators on the Point Of Vue platform can share much more than simple text posts with one another: https://pointofvue.org/posts.

## A globe of data

The Point Of Vue Globe is the combination of the data that connects creators on the Point Of Vue platform and the components developed by creators for use on the platform consuming that data. The schema is public and most of the queries do not require authentication. You can use the playground directly or within the app at https://pointofvue.org/graph.

## A library of web components

The Point Of Vue Globe library contains core components maintained by the Point Of Vue dev team as well as all of the published Vue components from creators on the Point Of Vue platform. This component library can be used within pages on the Point Of Vue platform leveraging data from both creator pages as well as visitors to those pages, giving creators the ability to build and share rich, interactive, experiences on Point Of Vue.

# Live Demo

Demo: https://pointofvue.org

This demo is deployed on Render.com using a postgres db service, a webserver service (for graphql-yoga), another webserver service for the studio (optional), and a static service for the client. The demo does not contain any changes made after December 31, 2022. All of the new development that has been completed since then is not deployed to the demo as of February 2023.

# Roadmap

Please see our open issues where you can get a sense for what is on the table as far as development of the Point Of Vue platform goes. You can contribute in more ways than just software development, as well! After launch, we hope to have a more concrete roadmap of features and a timeline of when those features can be implemented.

Funding, upon launch, will be crucial to the success of this open-source project and a model for Creators on the Point Of Vue platform to be awarded monetarily for their works is our primary funding goal, before funding the platform itself. Obviously, investment in the latter begets results in the former, so please consider sponsoring this project.


# Development

## The Stack

Vite + TypeScript + Vue3 + GraphQl + Prisma + Pinia + TailwindCss

## Contributing

This project was created as a demo and I don't have anything set up for 
contributors at the moment. If someone is feeling adventurous you're welcomed to try and follow the steps below to get up and running yourself.

Right now it has two modes: demo (unauthenticated) and authenticated (using Auth0).

With the authenticated mode you will need both an Auth0 application as well as an Auth0 API, the settings of which are included below. In demo mode you can login with an email for an existing creator (which requires creating an creator with Prisma Studio) and create posts. 

The post interactions are fully wired up. You can register a new creator and update creator settings. You can create and delete posts but you cannot edit or share posts, yet. You can edit Vues as a creator logged in through Github (authed) and publish them to the point-of-vue globe. You cannot edit page templates at this time.

Three integrations are in the works at the moment: GitHub (vues), Imgur (images), Google (threads). The Vues page is semi functional but the other two integrations are lacking any mutations in the graphql API as of February 2023. Vues have mutations but no subsriptions at this time.

## Setup

This is a rough draft giude to setting up Point-Of-Vue on your machine for local development.

1. Install Node Modules

    ```
    npm install
    ```

2. Configure your environment variables by creating a .env file with the following variable:
- `DATABASE_URL="YOUR_POSTGRES_URL"`

    2a. you can spin up a local postgres database using the docker-compose.yml file included in this project, by running the command: `docker-compose up -d` before spinning up any of the following programs. If you do, this is your DATABASE_URL: `postgresql://postgres:postgres@localhost:5438/postgres`

3. These are other environment variables that can be configured:
    ```
    ORIGIN="http://localhost"
    ORIGIN_PORT=8080
    GRAPH_URL="http://localhost"
    GRAPH_PORT=8100
    GRAPH_PATH="graphql"
    STUDIO_URL="http://localhost:8200"
    AUTH0_DOMAIN="some-domain.us.auth0.com"
    AUTH0_CID="YOUR_CLIENT_ID"
    ```

    3b. The ORIGIN is the vite server or static webserver for the client app. If port 80 is used for any of the PORT variables, it will be omitted from the constructred url. The GRAPH_URL is the graph-ql server and STUDIO_URL is for Prisma Studio.

4. Run the application(s). There are three programs that run this application for local development. There is the server (apollo/graphql-yoga + playground), client (vite powered frontend), studio (prisma studio for editing data tables). The command below will run all three applications simultaneously with live reload. Any changes made to the files in schema will trigger a reload of the server and client applications.

    ```
    npm run dev
    ```

5. If you run the defaults, the following urls are reachable:
- http://localhost:8080          -- [client]
- http://localhost:8100          -- [server]
- http://localhost:8100/graphql  -- [playground]
- http://localhost:8200          -- [studio]


# Thanks for reading!

This open source project was made possible by the following platforms and open source projects. Please consider sponsoring this project or any of the other projects linked. Open-Source Software is only Free if you have the time to make it.

<div>
    <div>
        <img
          src="https://point-of-vue-web.onrender.com/img/vite.svg"
          alt="vite logo"
          width="24"
          height="24"
          /><span>vite</span>
      <p>
        Vite builds the frontend client scripts and files and provides plugins for local development.
      </p>
    </div>
    <div>
        <img
          src="https://point-of-vue-web.onrender.com/img/typescript.svg"
          alt="typescript logo"
          width="24"
          height="24"
          /><span>typescript</span>
      <p>All of the source code for this project is written in TypeScript</p>
    </div>
    <div>
        <img
          src="https://point-of-vue-web.onrender.com/img/graphql-yoga.svg"
          width="24"
          height="24"
          alt="graphql-yoga logo"
        /><span>graphql-yoga</span>
      <p>A graphql server runs locally using graphql-yoga bundled with a playground</p>
    </div>
    <div>
        <img
          src="https://point-of-vue-web.onrender.com/img/prisma.png"
          width="24"
          height="24"
          alt="prisma logo"
        /><span>prisma</span>
      <p>
        Prisma is the ORM that creates and maintains the db and generating models in TypeScript.
      </p>
    </div>
    <div>
        <img
          src="https://point-of-vue-web.onrender.com/img/GraphQL_Logo.svg"
          width="24"
          height="24"
        /><span>graphql</span>
      <p>GraphQl queries power the frontend application, making it very extensible.</p>
    </div>
    <div>
        <img
          src="https://point-of-vue-web.onrender.com/img/vue.svg"
          width="24"
          height="24"
          alt="vue logo"
        /><span>vue</span>
      <p>
        The frontend is written in Vue with TypeScript using the composition API and the most modern
        best practices.
      </p>
    </div>
    <div>
        <img
          src="https://point-of-vue-web.onrender.com/img/vueuse-icon.svg"
          width="24"
          height="24"
        /><span>vueuse</span>
      <p>
        VueUse is like VueJs's version of jQuery providing both computational utilities as well as
        UI utilities.
      </p>
    </div>
    <div>
        <img
          src="https://point-of-vue-web.onrender.com/img/Tailwind_CSS_Logo.svg"
          width="24"
          height="24"
          alt="tailwind logo"
        /><span>tailwind</span>
      <p>
         Tailwind provides class based styling and easy theming in the lightest set of deliverables for a rich visual experience and rapid development.
      </p>
    </div>
    <div>
        <img
          src="https://point-of-vue-web.onrender.com/img/pinia-logo.svg"
          width="24"
          height="24"
          alt="pinia logo"
        /><span>pinia</span>
      <p>
        Pinia stores the state of the frontend for components to remain up to date with data
        subscriptions to the backend GraphQL server.
      </p>
    </div>
    <div>
        <img
          src="https://point-of-vue-web.onrender.com/img/render-com-logo.png"
          width="24"
          height="24"
          alt="render logo"
        />
      <span>render</span>
      <p>
        Render.com powers the demo for this project. I've deployed a postgres database for the
        datastore, a graphql server running graphql-yoga and accompanying playground, a static web
        server for the frontend, and another web server for the prisma studio.
      </p>
    </div>
    <div>
        <img
          src="https://point-of-vue-web.onrender.com/img/auth0-logo.svg"
          width="24"
          height="24"
          alt="auth0 logo"
        /><span>auth0</span>
      <p>
        auth0.com manages user login and authentication, providing an easy integration for social
        and passwordless login. Auth0 makes it possible for this project to provide user
        authentication with no password, ever.
      </p>
    </div>
  </div>
