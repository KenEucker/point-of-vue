<script setup lang="ts"></script>

<template>
  <div class="p-2 mt-10 w-full md:p-4 md:w-3/4 m-auto">
    <div
      class="border-1 border-gray-400 rounded-b rounded-r rounded-l p-8 items-center justify-between"
    >
      <div class="col-span-2 text-center">
        <img class="w-20 md:w-35 m-auto" src="/img/windicss-logo.svg" />
        <div class="font-bold text-xl mb-2">WindiCss</div>
        <h3 class="windi text-4xl">Windi CSS is a next-generation utility-first CSS framework</h3>
      </div>
      <p class="py-2">
        If you are already familiar with
        <a target="_blank" class="windi" rel="noopener noreferrer">Tailwind CSS</a>, think about
        Windi CSS as an <strong>on-demand</strong> alternative to Tailwind, which provides faster
        load times, <strong>full compatibility with Tailwind v2.0</strong>, and a bunch of
        additional cool features.
      </p>
      <ul>
        <li>⚡️ <strong>It's FAST</strong> - 20~100x times faster than Tailwind on Vite</li>
        <li>🧩 On-demand CSS utilities (Fully compatible with Tailwind CSS v2)</li>
        <li>📦 On-demand native elements style resetting (preflight)</li>
        <li>🔥 Hot module replacement (HMR)</li>
        <li>🍃 Load configurations from <code>tailwind.config.js</code></li>
        <li>🤝 Framework-agnostic - Vue, React, Svelte and vanilla!</li>
        <li>
          📄 CSS <code>@apply</code> / <code>@screen</code> directives transforms (also works for
          Vue SFC's <code>&lt;style&gt;</code>)
        </li>
        <li>
          🎳 Support Variant Groups - e.g. <code>bg-gray-200 hover:(bg-gray-100 text-red-300)</code>
        </li>
        <li>
          😎 <a href="#design-in-devtools">"Design in Devtools"</a> - if you work this way in the
          traditional Tailwind, no reason we can't!
        </li>
      </ul>
      <blockquote class="py-1">
        <p>
          When my project became larger and there were about dozens of components, the initial
          compilation time reached 3s, and hot updates took more than 1s with Tailwind CSS. -
          <a href="https://github.com/voorjaar" target="_blank" rel="noopener noreferrer"
            >@voorjaar</a
          >
        </p>
      </blockquote>
      <p>
        <a
          href="https://github.com/windicss/windicss"
          class="windi"
          target="_blank"
          rel="noopener noreferrer"
          >Windi CSS</a
        >
        is fully compatible with
        <a
          href="https://tailwindcss.com/docs"
          target="_blank"
          rel="noopener noreferrer"
          class="windi"
          >Tailwind CSS</a
        >
        v2. On top of that, they have many additional features that boost your workflow further and
        open up many more possibilities. You can go out and search for any modern tailwind styled
        components and the classes work 1:1.
      </p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.windi {
  color: rgba(72, 176, 241);
}

blockquote {
  font-weight: 400;
  font-style: normal;
  line-height: 1.5rem;
  padding: 0.6rem 1.2rem;
  opacity: 0.8;
  margin-left: 0;
  margin-right: 0.5rem;
}
</style>
