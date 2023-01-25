<script setup lang="ts"></script>

<template>
  <div class="p-2 mt-10 w-full md:p-4 md:w-3/4 m-auto overflow-hidden">
    <div
      class="border-1 border-gray-400 rounded-b rounded-r rounded-l p-8 items-center justify-between"
    >
      <div class="col-span-2 text-center">
        <img class="w-20 md:w-35 m-auto" src="/img/vite.svg" />
        <div class="font-bold text-xl mb-2">Vite</div>
        <p class="tagline">
          Next Generation<br />
          Frontend Tooling
        </p>
      </div>
      <p>
        In a project where Vite is installed, you can use the <code>vite</code> binary in your npm
        scripts, or run it directly with <code>npx vite</code>. Here are the dev npm scripts that
        are used when making and testing changes to the project's code.
      </p>
      <pre class="-ml-25 flex flex-wrap">
        <code>
            <span class="line"><span style="color:#89DDFF;">{</span></span>
            <span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">"</span><span style="color:#C792EA;">scripts</span><span style="color:#89DDFF;">"</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
            <span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;">// start all dev services (server,client,studio,codegen)</span></span>
            <span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">"</span><span style="color:#FFCB6B;">dev</span><span style="color:#89DDFF;">"</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">"</span><span style="color:#C3E88D;">concurrently \"npm:dev:server\" ...</span><span style="color:#89DDFF;">"</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"></span></span>
            <span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;">// starts the graphql server and watches for changes</span></span>
            <span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">"</span><span style="color:#FFCB6B;">dev:server</span><span style="color:#89DDFF;">"</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">"</span><span style="color:#C3E88D;">nodemon --watch './src/schema/**/*.ts' ...</span><span style="color:#89DDFF;">"</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span></span>
            <span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;">// starts the vite server for the frontent client </span></span>
            <span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">"</span><span style="color:#FFCB6B;">dev:client</span><span style="color:#89DDFF;">"</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">"</span><span style="color:#C3E88D;">vite --host localhost</span><span style="color:#89DDFF;">"</span><span style="color:#A6ACCD;"> </span></span>
            <span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;">// runs the prisma provided database table explorer</span></span>
            <span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">"</span><span style="color:#FFCB6B;">dev:studio</span><span style="color:#89DDFF;">"</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">"</span><span style="color:#C3E88D;">npx prisma studio --browser none</span><span style="color:#89DDFF;">"</span><span style="color:#A6ACCD;"> </span></span>
            <span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
            <span class="line"><span style="color:#89DDFF;">}</span></span>
            <span class="line"></span>
        </code>
    </pre>
      <p>
        You can specify additional CLI options like <code>--port</code> or <code>--https</code>. For
        a full list of CLI options, run <code>npx vite --help</code> in your project.
      </p>
      <p>
        Learn more about the
        <a target="_blank" href="https://vitejs.dev/guide/cli.html">Vite Command Line Interface</a>
      </p>
      <p class="p-2 text-center">
        Frontend powered by
        <a
          class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          href="https://vitejs.dev/blog/announcing-vite4.html"
          target="_blank"
          >Vite 4</a
        >, now using
        <a
          class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          href="https://rollupjs.org/guide/en/"
          target="_blank"
        >
          Rollup 3
        </a>
      </p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.tagline {
  text-align: center;
  background: linear-gradient(120deg, #bd34fe 30%, #41d1ff);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 50px;
  line-height: 1.25;
  font-weight: 900;
  letter-spacing: -1.5px;
}
</style>
