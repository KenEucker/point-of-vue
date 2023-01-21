<script setup lang="ts"></script>

<template>
  <div class="p-2 mt-10 w-full md:p-4 md:w-3/4 m-auto overflow-hidden">
    <div
      class="border-1 border-gray-400 rounded-b rounded-r rounded-l p-8 items-center justify-between relative"
    >
      <div class="text-center">
        <img class="w-20 md:w-35 m-auto" src="/img/Tailwind_CSS_Logo.svg" />
        <div class="font-bold text-xl mb-2">TailwindCss</div>
        <h3 class="tailwind text-4xl">
          A utility-first CSS framework packed with classes that can be composed to build any
          design, directly in your markup.
        </h3>
      </div>
      <div class="">
        <figure class="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
          <img
            class="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto"
            src="/img/twitter-profile.jpg"
            alt=""
            width="384"
            height="512"
          />
          <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
            <blockquote>
              <p class="text-lg font-medium">
                “Tailwind CSS is really easy to use and to see how it's being used. Another huge
                benefit is that there are tailwind component examples all over the web that you can
                just drag and drop!”
              </p>
            </blockquote>
            <figcaption class="font-medium">
              <div class="text-sky-500 dark:text-sky-400">Ken Eucker</div>
              <div class="text-slate-700 dark:text-slate-500">Principal Engineer, USA</div>
            </figcaption>
          </div>
        </figure>
      </div>
      <div class="relative row-start-1 col-start-6 xl:col-start-7 col-span-7 xl:col-span-6">
        <div class="-mx-4 sm:mx-0">
          <div
            class="relative overflow-hidden shadow-xl flex bg-slate-800 h-[31.625rem] max-h-[60vh] sm:max-h-[none] sm:rounded-xl lg:h-[34.6875rem] xl:h-[31.625rem] dark:bg-slate-900/70 dark:backdrop-blur dark:ring-1 dark:ring-inset dark:ring-white/10 !h-auto max-h-[none]"
          >
            <div class="relative w-full flex flex-col">
              <div class="flex-none border-b border-slate-500/30">
                <div class="flex items-center h-8 space-x-1.5 px-3">
                  <div class="w-2.5 h-2.5 bg-slate-600 rounded-full"></div>
                  <div class="w-2.5 h-2.5 bg-slate-600 rounded-full"></div>
                  <div class="w-2.5 h-2.5 bg-slate-600 rounded-full"></div>
                </div>
              </div>
              <div class="relative min-h-0 flex-auto flex flex-col">
                <div class="w-full flex-auto flex min-h-0 overflow-auto">
                  <div class="w-full relative flex-auto">
                    <pre class="flex min-h-full text-sm leading-6">
                    <div aria-hidden="true" class="hidden md:block text-slate-600 flex-none py-4 pr-4 text-right select-none" style="width:50px">1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
</div>
                        <code class="flex-auto relative block text-slate-50 pt-4 pb-4 px-4 overflow-auto">
<span class="token tag"><span class="token punctuation">&lt;</span>figure<!-- --> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span><span>m</span><span>d</span><span>:</span><span>f</span><span>l</span><span>e</span><span>x</span><span> </span>bg-slate-100 rounded-xl<span> </span><span>p</span><span>-</span><span>8</span><span> </span><span>m</span><span>d</span><span>:</span><span>p</span><span>-</span><span>0</span> dark:bg-slate-800<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token punctuation">&lt;</span>img<!-- --> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>w-24 h-24<span> </span><span>m</span><span>d</span><span>:</span><span>w</span><span>-</span><span>4</span><span>8</span><span> </span><span>m</span><span>d</span><span>:</span><span>h</span><span>-</span><span>a</span><span>u</span><span>t</span><span>o</span><span> </span><span>m</span><span>d</span><span>:</span><span>r</span><span>o</span><span>u</span><span>n</span><span>d</span><span>e</span><span>d</span><span>-</span><span>n</span><span>o</span><span>n</span><span>e</span><span> </span><span>r</span><span>o</span><span>u</span><span>n</span><span>d</span><span>e</span><span>d</span><span>-</span><span>f</span><span>u</span><span>l</span><span>l</span><span> </span><span>m</span><span>x</span><span>-</span><span>a</span><span>u</span><span>t</span><span>o</span><span class="token punctuation">"</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>/img/twitter-profile.jpg<span class="token punctuation">"</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span><span class="token punctuation">"</span></span> <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>384<span class="token punctuation">"</span></span> <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>512<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token punctuation">&lt;</span>div<!-- --> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>pt-6<span> </span><span>m</span><span>d</span><span>:</span><span>p</span><span>-</span><span>8</span><span> </span><span>t</span><span>e</span><span>x</span><span>t</span><span>-</span><span>c</span><span>e</span><span>n</span><span>t</span><span>e</span><span>r</span><span> </span><span>m</span><span>d</span><span>:</span><span>t</span><span>e</span><span>x</span><span>t</span><span>-</span><span>l</span><span>e</span><span>f</span><span>t</span> space-y-4<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token punctuation">&lt;</span>blockquote<span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token punctuation">&lt;</span>p<!-- --> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>text-lg<span> </span><span>f</span><span>o</span><span>n</span><span>t</span><span>-</span><span>m</span><span>e</span><span>d</span><span>i</span><span>u</span><span>m</span><span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>
      “Tailwind CSS is really easy to use and to see how it's being used. Another huge benefit is that there are tailwind component examples all over the web that you can just drag and drop!”
    <span class="token tag"><span class="token punctuation">&lt;/</span>p<span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token punctuation">&lt;/</span>blockquote<span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token punctuation">&lt;</span>figcaption<span> </span><span class="token attr-name"><span>c</span><span>l</span><span>a</span><span>s</span><span>s</span></span><span class="token attr-value"><span class="token punctuation"><span>=</span></span><span class="token punctuation"><span>"</span></span><span>f</span><span>o</span><span>n</span><span>t</span><span>-</span><span>m</span><span>e</span><span>d</span><span>i</span><span>u</span><span>m</span><span class="token punctuation"><span>"</span></span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token punctuation">&lt;</span>div<span> </span><span class="token attr-name"><span>c</span><span>l</span><span>a</span><span>s</span><span>s</span></span><span class="token attr-value"><span class="token punctuation"><span>=</span></span><span class="token punctuation"><span>"</span></span><span>t</span><span>e</span><span>x</span><span>t</span><span>-</span><span>s</span><span>k</span><span>y</span><span>-</span><span>5</span><span>0</span><span>0</span><span> </span><span>d</span><span>a</span><span>r</span><span>k</span><span>:</span><span>t</span><span>e</span><span>x</span><span>t</span><span>-</span><span>s</span><span>k</span><span>y</span><span>-</span><span>4</span><span>0</span><span>0</span><span class="token punctuation"><span>"</span></span></span><span class="token punctuation">&gt;</span></span>
      Ken Eucker
    <span class="token tag"><span class="token punctuation">&lt;/</span>div<span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token punctuation">&lt;</span>div<span> </span><span class="token attr-name"><span>c</span><span>l</span><span>a</span><span>s</span><span>s</span></span><span class="token attr-value"><span class="token punctuation"><span>=</span></span><span class="token punctuation"><span>"</span></span><span>t</span><span>e</span><span>x</span><span>t</span><span>-</span><span>s</span><span>l</span><span>a</span><span>t</span><span>e</span><span>-</span><span>7</span><span>0</span><span>0</span><span> </span><span>d</span><span>a</span><span>r</span><span>k</span><span>:</span><span>t</span><span>e</span><span>x</span><span>t</span><span>-</span><span>s</span><span>l</span><span>a</span><span>t</span><span>e</span><span>-</span><span>5</span><span>0</span><span>0</span><span class="token punctuation"><span>"</span></span></span><span class="token punctuation">&gt;</span></span>
      Principal Engineer, USA
    <span class="token tag"><span class="token punctuation">&lt;/</span>div<span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token punctuation">&lt;/</span>figcaption<span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token punctuation">&lt;/</span>div<span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token punctuation">&lt;/</span>figure<span class="token punctuation">&gt;</span></span>
                        </code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.tailwind {
  color: rgba(72, 176, 241);
}

.token.class-name,
.token.function,
.token.selector,
.token.selector .class,
.token.selector.class,
.token.tag {
  color: rgb(244 114 182 / var(--tw-text-opacity));
}

.token.attr-equals,
.token.punctuation {
  --tw-text-opacity: 1;
  color: rgb(100 116 139 / var(--tw-text-opacity));
}

.token.attr-value,
.token.class,
.token.string {
  --tw-text-opacity: 1;
  color: rgb(125 211 252 / var(--tw-text-opacity));
}
</style>
