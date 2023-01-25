<script setup lang="ts"></script>

<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Rubik" />
  <div class="p-2 mt-10 w-full md:p-4 md:w-3/4 m-auto overflow-hidden">
    <div
      class="border-1 border-gray-400 rounded-b rounded-r rounded-l p-8 items-center justify-between"
    >
      <div class="heading col-span-2 text-center">
        <img class="w-20 md:w-35 m-auto" src="/img/GraphQL_Logo.svg" />
        <div class="font-bold text-xl mb-2">GraphQL</div>
        <h3 class="text-4xl text-slate-300">A query language for your API</h3>
      </div>
      <p class="py-2">
        <a
          class="font-medium gql dark:text-blue-500 hover:underline"
          href="https://graphql.org/"
          target="_blank"
          >GraphQL</a
        >
        is a query language for APIs and a runtime for fulfilling those queries with your existing
        data. GraphQL provides a complete and understandable description of the data in your API,
        gives clients the power to ask for exactly what they need and nothing more, makes it easier
        to evolve APIs over time, and enables powerful developer tools.
      </p>
      <section class="intro py-3">
        <div class="marketing-col">
          <h3>Describe your data</h3>
          <code>
            <pre
              class="prism prism-code language-graphql"
            ><div class="token-line"><span class="token type-def keyword">type</span><span class="token type-def"> Creator </span><span class="token type-def fields punctuation">{</span><span class="token type-def fields"></span></div><div class="token-line"><span class="token type-def fields">  </span><span class="token type-def fields attr-name">name</span><span class="token type-def fields punctuation">:</span><span class="token type-def fields"> </span><span class="token type-def fields type-name">String</span><span class="token type-def fields"></span></div><div class="token-line"><span class="token type-def fields">  </span><span class="token type-def fields attr-name">handle</span><span class="token type-def fields punctuation">:</span><span class="token type-def fields"> </span><span class="token type-def fields type-name">String</span><span class="token type-def fields"></span></div><div class="token-line"><span class="token type-def fields">  </span><span class="token type-def fields attr-name">posts</span><span class="token type-def fields punctuation">:</span><span class="token type-def fields"> </span><span class="token type-def fields punctuation">[</span><span class="token type-def fields type-name">Post</span><span class="token type-def fields punctuation">]</span><span class="token type-def fields"></span></div><div class="token-line"><span class="token type-def fields"></span><span class="token type-def fields punctuation">}</span></div></pre>
          </code>
        </div>
        <div class="marketing-col">
          <h3>Ask for what you want</h3>
          <code>
            <pre
              class="prism prism-code language-graphql"
            ><div class="token-line"><span class="token punctuation">{</span><span class="token plain"></span></div><div class="token-line"><span class="token plain">  creator</span><span class="token punctuation">(</span><span class="token attr-name">handle</span><span class="token punctuation">:</span><span class="token plain"> </span><span class="token string">"ken"</span><span class="token punctuation">)</span><span class="token plain"> </span><span class="token punctuation">{</span><span class="token plain"></span></div><div class="token-line"><span class="token plain">    handle</span></div><div class="token-line"><span class="token plain">    name</span></div><div class="token-line"><span class="token plain">  </span><span class="token punctuation">}</span><span class="token plain"></span></div><div class="token-line"><span class="token plain"></span><span class="token punctuation">}</span></div></pre>
          </code>
        </div>
        <div class="marketing-col">
          <h3>Get predictable results</h3>
          <code>
            <pre
              class="prism prism-code language-json"
            ><div class="token-line"><span class="token punctuation">{</span><span class="token plain"></span></div><div class="token-line"><span class="token plain">  </span><span class="token attr-name">"creator"</span><span class="token punctuation">:</span><span class="token plain"> </span><span class="token punctuation">{</span><span class="token plain"></span></div><div class="token-line"><span class="token plain">    </span><span class="token attr-name">"handle"</span><span class="token punctuation">:</span><span class="token plain"> </span><span class="token string">"ken"</span><span class="token plain"></span></div><div class="token-line"><span class="token plain">    </span><span class="token attr-name">"name"</span><span class="token punctuation">:</span><span class="token plain"> </span><span class="token string">"Ken Eucker"</span><span class="token plain"></span></div><div class="token-line"><span class="token plain">  </span><span class="token punctuation">}</span><span class="token plain"></span></div><div class="token-line"><span class="token plain"></span><span class="token punctuation">}</span></div></pre>
          </code>
        </div>
      </section>

      <p class="py-1">
        <a
          class="font-medium gql dark:text-blue-500 hover:underline"
          href="https://the-guild.dev/graphql/codegen"
          target="_blank"
          >GraphQL Code Generator</a
        >
        is a plugin-based tool that helps you get the best out of your GraphQL stack. From back-end
        to front-end, GraphQL Code Generator automates the generation of: Typed Queries, Mutations
        and, Subscriptions.
      </p>

      <p class="py-1">
        The GraphQL API of this project is made available to creators on this website to query and
        build out their own web components with their "Vue's". The GraphQL Playground provided by
        graphql-yoga can be used by anyone on this platform using their authorization.
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h3 {
  font-family: Rubik, 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

.intro {
  display: flex;

  h3 {
    color: #fff;
    line-height: 1;
    margin: 0 0 1em;
    white-space: pre;
  }

  .named-logo {
    animation: fade 1.2s ease-in-out;
    animation-fill-mode: both;
    margin-right: 18px;
    text-align: center;
  }

  .prism {
    color: #202020;
    direction: ltr;
    font-family: 'Roboto Mono', Menlo, Monaco, monospace;
    font-size: 13px;
    font-weight: 400;
    hyphens: none;
    line-height: 17px;
    position: relative;
    tab-size: 2;
    text-align: left;
    white-space: pre;
    word-break: normal;
    word-spacing: normal;

    .token {
      color: #fff;
    }

    .type-name {
      color: #ca9800;
    }

    .plain {
      color: #fff;
    }

    .prism .keyword {
      color: #b11a04;
    }

    .attr-name {
      color: #1f61a0;
    }
  }
}

.marketing-col {
  flex: 1 1;
  background-color: #2f2f2f;
  transition: background-color 0.5s;
  padding: 5px 12px;
  border: 1px solid rgb(84 84 84 / 65%);
  border-radius: 8px;
  font-size: 0.9em;
  font-weight: 600;

  &:nth-child(2) {
    animation: fade 1s ease-in-out 1s both;
  }
}

.marketing-col .prism {
  -webkit-font-smoothing: auto;
  -moz-osx-font-smoothing: auto;
  color: #fff;
}

.string,
.gql {
  color: #d64292;
}
</style>
