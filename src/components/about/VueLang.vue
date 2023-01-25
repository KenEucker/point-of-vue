<script setup lang="ts">
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <div class="p-2 mt-10 w-full md:p-4 md:w-3/4 m-auto overflow-hidden">
    <div
      class="border-1 border-gray-400 rounded-b rounded-r rounded-l p-8 items-center justify-between"
    >
      <div class="col-span-2 text-center">
        <img class="w-20 md:w-35 m-auto" src="/img/vue.svg" />
        <div class="font-bold text-xl mb-2">Vue</div>
        <p class="tagline">
          The Progressive<br />
          JavaScript Framework
        </p>
      </div>
      <p class="py-2 rounded-xl">
        Vue (pronounced /vjuː/, like view) is a JavaScript framework for building user interfaces.
        It builds on top of standard HTML, CSS, and JavaScript and provides a declarative and
        component-based programming model that helps you efficiently develop user interfaces, be
        they simple or complex.
      </p>

      <div class="code language-js py-2 my-2 rounded-xl">
        <span class="lang">script</span>
        <pre class="shiki">
          <code>
            <span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">createApp</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">'</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">'</span></span>
            <span class="line"></span>
            <span class="line"><span style="color:#82AAFF;">createApp</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
            <span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">data</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
            <span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
            <span class="line"><span style="color:#F07178;">      count</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span></span>
            <span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
            <span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
            <span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">mount</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">'</span><span style="color:#C3E88D;">#app</span><span style="color:#89DDFF;">'</span><span style="color:#A6ACCD;">)</span></span>
            <span class="line"></span>
          </code>
        </pre>
      </div>

      <div class="code language-vue-html py-1 my-1 rounded-xl">
        <span class="lang">template</span>
        <pre class="shiki">
          <code>
            <span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#F78C6C;">id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">"</span><span style="color:#C3E88D;">app</span><span style="color:#89DDFF;">"</span><span style="color:#89DDFF;">&gt;</span></span>
            <span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;"> @</span><span style="color:#C792EA;">click</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">"</span><span style="color:#A6ACCD;">count</span><span style="color:#89DDFF;">++</span><span style="color:#89DDFF;">"</span><span style="color:#89DDFF;">&gt;</span></span>
            <span class="line"><span style="color:#A6ACCD;">    Count is: </span><span style="color:#89DDFF;"><span>{</span>{</span><span style="color:#A6ACCD;"> count </span><span style="color:#89DDFF;"><span>}</span>}</span></span>
            <span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;">&gt;</span></span>
            <span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
            <span class="line"></span>
          </code>
        </pre>
      </div>

      <div class="code demo text-center py-1 my-1 rounded-xl">
        <span class="lang">result</span>
        <pre class="shiki">
          <button @click="count++">Count is: {{ count }}</button>
        </pre>
      </div>
      <p class="py-2">
        SFC is a defining feature of Vue and is the recommended way to author Vue components and it
        is not only used in the buliding of this very website but it is also used in the browser
        when creators build out their own vue components.
      </p>
      <p class="text-center py-2">
        Vue is an independent, community-driven project. It was created by
        <a href="https://twitter.com/youyuxi" target="_blank" rel="noreferrer">Evan You</a> in 2014
        as a personal side project. Today, Vue is actively maintained by
        <a href="/about/team.html"
          >a team of both full-time and volunteer members from all around the world</a
        >, where Evan serves as the project lead. You can learn more about the story of Vue in this
        <a href="https://www.youtube.com/watch?v=OrxmtDw4pVI" target="_blank" rel="noreferrer"
          >documentary</a
        >.
      </p>
    </div>
  </div>
</template>

<style scoped>
.code {
  position: relative;
}

.demo button {
  background-color: #2f2f2f;
  transition: background-color 0.5s;
  padding: 5px 12px;
  border: 1px solid rgb(84 84 84 / 65%);
  border-radius: 8px;
  font-size: 0.9em;
  font-weight: 600;
}

.tagline {
  text-align: center;
  background: linear-gradient(315deg, #42d392 25%, #647eff);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 50px;
  line-height: 1.25;
  font-weight: 900;
  letter-spacing: -1.5px;
}

pre {
  position: relative;
  z-index: 1;
  margin: 0;
  padding: 14px 0;
  background: transparent;
  overflow-x: auto;
}

[class*='language-'] pre,
[class*='language-'] code {
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  tab-size: 4;
  hyphens: none;
}

.lang {
  position: absolute;
  top: 4px;
  right: 10px;
  z-index: 2;
  font-size: 12px;
  font-weight: 500;
  color: rgb(235 235 235 / 38%);
  transition: color 0.5s;
}

.dark .demo {
  background-color: #242424;
}

.dark div[class*='language-'] {
  background-color: #242424;
}

a {
  color: #42b883;
}
</style>
