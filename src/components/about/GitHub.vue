<script setup lang="ts"></script>

<template>
  <div class="p-2 mt-10 w-full md:p-4 md:w-3/4 m-auto">
    <div
      class="border-1 border-gray-400 rounded-b rounded-r rounded-l p-8 items-center justify-between"
    >
      <div class="col-span-2 pb-4 text-center">
        <img class="w-20 md:w-35 m-auto" src="/img/github.svg" />
        <div class="font-bold text-xl mb-2">GitHub</div>
        <h3 class="github text-2xl">
          Harnessed for productivity. Designed for collaboration. Celebrated for built-in security.
          GitHub is the platform developers love.
        </h3>
      </div>
      <div class="p-2">
        <a href="https://github.com/features/actions" class="g-box">
          GitHub Actions automate your build, test, and deployment workflow with simple and secure
          CI/CD.
        </a>
      </div>
      <div class="p-2">
        <a href="https://github.com/features/code-review" class="g-box">
          Pull requests allow real-time communication and collaboration about code changes.
        </a>
      </div>
      <div class="p-2">
        <a href="https://github.com/features/discussions" class="g-box">
          GitHub Discussions create space to ask questions and have open-ended conversations.
        </a>
      </div>
      <div class="p-2">
        <a href="https://github.com/sponsors" class="g-box">
          GitHub Sponsors lets you support your favorite open source maintainers and projects.
        </a>
      </div>

      <p class="text-center mt-5">
        You can
        <a
          class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          href="https://vuejs.org/guide/quick-start.html#local"
          target="_blank"
          >sponsor me on GitHub</a
        >
        and support all of the Open-Source development that I love to do.
      </p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.github {
  color: 36e40c9;
}

.g-box {
  flex: 1 1;
  background-color: #2f2f2f;
  transition: background-color 0.5s;
  padding: 5px 12px;
  border: 1px solid rgb(84, 84, 84, 0.65);
  border-radius: 8px;
}
</style>
