<script setup lang="ts"></script>

<template>
  <div class="p-2 mt-10 w-full md:p-4 md:w-3/4 m-auto overflow-hidden">
    <div
      class="border-1 border-gray-400 rounded-b rounded-r rounded-l p-8 items-center justify-between"
    >
      <div class="col-span-2 text-center">
        <img class="w-20 md:w-35 m-auto" src="/img/typescript.svg" />
        <div class="font-bold text-xl mb-2">TypeScript</div>
        <h3>TypeScript is <strong>JavaScript with syntax for types.</strong></h3>
      </div>
      <p class="py-2">
        This project uses
        <a
          target="_blank"
          class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          href="https://typestrong.org/ts-node/"
        >
          ts-node
        </a>
        which is a TypeScript execution engine and REPL for Node.js. It JIT transforms TypeScript
        into JavaScript, enabling you to directly execute TypeScript on Node.js without
        precompiling. This is accomplished by hooking node's module loading APIs, enabling it to be
        used seamlessly alongside other Node.js tools and libraries.
      </p>
      <p class="pt-3">
        The presence of a tsconfig.json file in a directory indicates that the directory is the root
        of a TypeScript project. The tsconfig.json file specifies the root files and the compiler
        options required to compile the project.
      </p>
      <pre class="-ml-25 flex flex-wrap">
        <code>
            <span class="line"><span style="color:#89DDFF;">{</span></span>
            <span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">"</span><span style="color:#C792EA;">compilerOptions</span><span style="color:#89DDFF;">"</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
            <span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;">// targets the next version of ecmascript</span></span>
            <span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">"</span><span style="color:#FFCB6B;">target</span><span style="color:#89DDFF;">"</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">"</span><span style="color:#C3E88D;">ESNext</span><span style="color:#89DDFF;">"</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"></span></span>
            <span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;">// using both esnext and dom libraries</span></span>
            <span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">"</span><span style="color:#FFCB6B;">lib</span><span style="color:#89DDFF;">"</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">"</span><span style="color:#C3E88D;"></span>["ESNext", "DOM"]<span style="color:#89DDFF;">"</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span></span>
            <span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;">// production builds to the 'dist' folder </span></span>
            <span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">"</span><span style="color:#FFCB6B;">outDir</span><span style="color:#89DDFF;">"</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">"</span><span style="color:#C3E88D;">dist</span><span style="color:#89DDFF;">"</span><span style="color:#A6ACCD;"> </span></span>
            <span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;">// the module (backend) is also ESNext</span></span>
            <span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">"</span><span style="color:#FFCB6B;">module</span><span style="color:#89DDFF;">"</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">"</span><span style="color:#C3E88D;">ESNext</span><span style="color:#89DDFF;">"</span><span style="color:#A6ACCD;"> </span></span>
            <span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
            <span class="line"><span style="color:#89DDFF;">}</span></span>
            <span class="line"></span>
        </code>
    </pre>
      <p>
        The other settings found in this project's tsconfig were added out of necessity in the
        process of adding more third party libraries and working with new language features. It is
        also important to note that the server file (index.ts) is running with the flag
        --experimental-specifier-resolution=node (as of Jan 2023).
      </p>
      <p class="text-center mt-5">
        Learn more about
        <a
          target="_blank"
          class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          href="https://www.typescriptlang.org/docs/handbook/tsconfig-json.html"
        >
          What is a tsconfig.json
        </a>
        at typescriptlang.org
      </p>
    </div>
  </div>
</template>
<style scoped>
h3 {
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol', 'Noto Color Emoji';
  font-size: 2.5rem;
  font-weight: 200;
  line-height: 2.8rem;
  margin-top: 0;
  padding-right: 40px;
  color: #fff;
}
</style>
