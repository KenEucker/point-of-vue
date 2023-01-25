<script setup lang="ts"></script>

<template>
  <div class="p-2 mt-10 w-full md:p-4 md:w-3/4 m-auto overflow-hidden overflow-hidden">
    <div
      class="border-1 border-gray-400 rounded-b rounded-r rounded-l p-8 items-center justify-between"
    >
      <div class="col-span-2 text-center">
        <img class="w-20 md:w-35 m-auto" src="/img/prisma.png" />
        <div class="font-bold text-xl mb-2">Prisma</div>
        <div>
          <h3 class="prisma border-gray-400 rounded-b rounded-r rounded-l text-4xl">
            Prisma is a next-generation <b>Node.js</b> and <b>TypeScript</b> ORM
          </h3>
        </div>
      </div>
      <div class="section-body">
        <p class="my-3">
          Prisma unlocks a new level of <b>developer experience</b> when working with databases
          thanks to its intuitive data model, automated migrations, type-safety auto-completion.
          This is an example of an object from this project being set up by prisma for use by the
          GraphQL API.
        </p>
      </div>
      <pre
        class="prism-code language-prisma rounded-xl p-2"
        style="color: #393a34; background-color: #f6f8fa"
      >
        <code>
          <div class="code-line token-line" ><span class="code-line"><span class="token keyword" style="color:#00009f">model</span><span class="token type-class-name"> Creator</span><span class="token plain"> </span><span class="token punctuation" style="color:#393A34">{</span><span class="token plain"></span></span></div><div class="code-line token-line" ><span class="code-line"><span class="token plain">  id</span><span class="token type-class-name">    Int</span><span class="token plain">     </span><span class="token annotation punctuation" style="color:#393A34">@id</span><span class="token plain"> </span><span class="token annotation punctuation" style="color:#393A34">@default</span><span class="token punctuation" style="color:#393A34">(</span><span class="token function" style="color:#d73a49">autoincrement</span><span class="token punctuation" style="color:#393A34">(</span><span class="token punctuation" style="color:#393A34">)</span><span class="token punctuation" style="color:#393A34">)</span><span class="token plain"></span></span></div><div class="code-line token-line" ><span class="code-line"><span class="token plain">  email</span><span class="token type-class-name"> String</span><span class="token plain">  </span><span class="token annotation punctuation" style="color:#393A34">@unique</span><span class="token plain"></span></span></div><div class="code-line token-line" ><span class="code-line"><span class="token plain">  name</span><span class="token type-class-name">  String</span><span class="token operator" style="color:#393A34">?</span><span class="token plain"></span></span></div><div class="code-line token-line" ><span class="code-line"><span class="token plain">  posts</span><span class="token type-class-name"> Post</span><span class="token punctuation" style="color:#393A34">[</span><span class="token punctuation" style="color:#393A34">]</span><span class="token plain"></span></span></div><div class="code-line token-line" ><span class="code-line"><span class="token plain"></span><span class="token punctuation" style="color:#393A34">}</span><span class="token plain"></span></span></div><div class="code-line token-line" ><span class="code-line"><span class="token plain" style="display:inline-block"></span></span></div><div class="code-line token-line" ><span class="code-line"><span class="token plain"></span><span class="token keyword" style="color:#00009f">model</span><span class="token type-class-name"> Post</span><span class="token plain"> </span><span class="token punctuation" style="color:#393A34">{</span><span class="token plain"></span></span></div><div class="code-line token-line" ><span class="code-line"><span class="token plain">  id</span><span class="token type-class-name">        Int</span><span class="token plain">     </span><span class="token annotation punctuation" style="color:#393A34">@id</span><span class="token plain"> </span><span class="token annotation punctuation" style="color:#393A34">@default</span><span class="token punctuation" style="color:#393A34">(</span><span class="token function" style="color:#d73a49">autoincrement</span><span class="token punctuation" style="color:#393A34">(</span><span class="token punctuation" style="color:#393A34">)</span><span class="token punctuation" style="color:#393A34">)</span><span class="token plain"></span></span></div><div class="code-line token-line" ><span class="code-line"><span class="token plain">  title</span><span class="token type-class-name">     String</span><span class="token plain"></span></span></div><div class="code-line token-line" ><span class="code-line"><span class="token plain">  text</span><span class="token type-class-name">   String</span><span class="token operator" style="color:#393A34">?</span><span class="token plain"></span></span></div><div class="code-line token-line" ><span class="code-line"><span class="token plain">  published</span><span class="token type-class-name"> Boolean</span><span class="token plain"> </span><span class="token annotation punctuation" style="color:#393A34">@default</span><span class="token punctuation" style="color:#393A34">(</span><span class="token boolean" style="color:#36acaa">false</span><span class="token punctuation" style="color:#393A34">)</span><span class="token plain"></span></span></div><div class="code-line token-line" ><span class="code-line"><span class="token plain">  creator</span><span class="token type-class-name">    User</span><span class="token plain">    </span><span class="token annotation punctuation" style="color:#393A34">@relation</span><span class="token punctuation" style="color:#393A34">(</span><span class="token type-args">fields:</span><span class="token plain"> </span><span class="token punctuation" style="color:#393A34">[</span><span class="token plain">authorId</span><span class="token punctuation" style="color:#393A34">]</span><span class="token punctuation" style="color:#393A34">,</span><span class="token plain"> </span><span class="token type-args">references:</span><span class="token plain"> </span><span class="token punctuation" style="color:#393A34">[</span><span class="token plain">id</span><span class="token punctuation" style="color:#393A34">]</span><span class="token punctuation" style="color:#393A34">)</span><span class="token plain"></span></span></div><div class="code-line token-line" ><span class="code-line"><span class="token plain">  creatorId</span><span class="token type-class-name">  Int</span><span class="token plain"></span></span></div><div class="code-line token-line" ><span class="code-line"><span class="token plain"></span><span class="token punctuation" style="color:#393A34">}</span><span class="token plain"></span></span></div>
        </code>
      </pre>
      <p class="text-center mt-5">
        Check out the
        <a
          class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          href="https://playground.prisma.io/examples/reading/find/find-all?host=playground.prisma.io&path=examples"
          target="_blank"
          >Prisma Playground</a
        >
        to start with prisma right from the browser
      </p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
h3 {
  color: rgb(26 32 44);
  font-family: Barlow, system-ui, Arial, sans-serif;

  b {
    color: rgb(76 81 191);
    font-weight: 700;
  }
}

.prisma {
  background-color: #f6f8fa;
}

.dark p {
  color: #f6f8fa;
}
</style>
