<script setup lang="ts"></script>

<template>
  <div class="p-2 mt-10 w-full md:p-4 md:w-3/4 m-auto">
    <div
      class="border-1 border-gray-400 rounded-b rounded-r rounded-l p-8 items-center justify-between"
    >
      <div class="col-span-2 text-center">
        <img class="w-20 md:w-35 m-auto" src="/img/pinia-logo.svg" />
        <div class="font-bold text-xl mb-2">Pinia</div>
        <h3 class="pinia">The Vue Store that you will enjoy using</h3>
      </div>
      <p>
        Pinia is a store library for Vue, it allows you to share a state across components/pages. If
        you are familiar with the Composition API, you might be thinking you can already share a
        global state with a simple <code>export const state = reactive({})</code>. This is true for
        single page applications but exposes your application to security vulnerabilities if it is
        server side rendered. But even in small single page applications, you get a lot from using
        Pinia.
      </p>
      <div class="language-js">
        <pre><code><span class="token comment">// stores/creator.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'pinia'</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> useCreatorStore <span class="token operator">=</span> <span class="token function">defineStore</span><span class="token punctuation">(</span><span class="token string">'creator'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">state</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token literal-property property">creator</span><span class="token operator">:</span> <span class="token number">{}</span> <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">actions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">signMeUp</span><span class="token punctuation">(</span>c: any<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>signupNewCreator<span class="token operator">(c)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre>
      </div>
      <p>
        This is what using Pinia looks like in terms of API (make sure to check the
        <a class="pinia" href="https://pinia.vuejs.org/introduction.html">Getting Started</a>
        for complete instructions).
      </p>
      <p class="text-center mt-5">
        Check out this lesson,
        <a
          class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          href="https://vuejs.org/guide/quick-start.html#local"
          target="_blank"
        >
          <i>Pinia, The Enjoyable Vue Store!</i>
        </a>
        , to learn more
      </p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.pinia {
  color: #ffd859;
}
h3 {
  font-size: 2.5rem;
}
div[class*='language-'] {
  position: relative;
  margin: 1rem -1.5rem;
  background-color: #161f32;
  overflow-x: auto;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;

  :before {
    position: absolute;
    top: 0.6em;
    right: 1em;
    z-index: 2;
    font-size: 0.8rem;
    color: #888;
  }

  pre {
    position: relative;
    z-index: 1;
    margin: 0;
    padding: 1.25rem 1.5rem;
    overflow-x: auto;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
    background: transparent;

    [class*='language-'] code {
      padding: 0;
      line-height: var(--code-line-height);
      font-size: var(--code-font-size);
      color: #eee;
    }
  }
  .token.comment,
  .token.prolog,
  .token.cdata {
    color: #637777;
  }

  .token.tag,
  .token.operator,
  .token.keyword {
    color: #7fdbca;
  }

  .token.selector,
  .token.important,
  .token.atrule,
  .token.keyword,
  .token.builtin {
    color: #cc99cd;
  }

  .token.punctuation {
    color: #c792ea;
  }

  .token.attr-name,
  .token.inserted,
  code .token.inserted,
  .token.string,
  .token.url,
  .token.entity,
  .language-css .token.string,
  .style .token.string {
    color: #addb67;
  }

  .token.selector,
  .token.function,
  .token.doctype {
    color: #c792ea;
  }
}
</style>
