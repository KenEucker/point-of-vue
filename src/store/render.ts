import { defineStore } from 'pinia'
import {
  trimAndRemoveQueryWrap,
  getGraphUrl,
  removeAllAndSomeTagsFromHtml,
  removeNodesWithKeywords,
} from '../utilities'
import { useCreatorState } from './creator'
import { loadModule } from 'vue3-sfc-loader'
import { createApp, defineAsyncComponent, Ref, ref } from 'vue'
import * as Vue from 'vue'
import * as vueuseMotion from '@vueuse/motion'
import * as vueuse from '@vueuse/core'

export const getInitialRenderState = (): {
  credentials: string | null
} => ({
  credentials: null,
})

export const useRenderState = defineStore({
  id: 'useRenderState',
  state: getInitialRenderState,
  actions: {
    createAsyncComponent(c: any, r: Ref) {
      let options = {}
      // if (c) component or code object
      if (typeof c === 'string') {
        options = {
          moduleCache: { vue: Vue, '@vueuse/core': vueuse, '@vueuse/motion': vueuseMotion },
          getFile: async () => c,
          addStyle: async (textContent: any) => {
            // console.log({ textContent })
          },
        }
      } else if (c?.json || c?.script || c?.template) {
        options = {
          moduleCache: { vue: Vue, '@vueuse/core': vueuse, '@vueuse/motion': vueuseMotion },
          getFile: async () => {
            const compiled = await this.compileVue(c)

            console.info('rendering component', c, compiled)
            if (compiled.logs) {
              if (compiled.logs.info?.length) {
                // logs.info = compiled.logs.info
              }
              if (compiled.logs.errors?.length) {
                // logs.errors = compiled.logs.errors
                return ''
              }
            }

            return compiled.output
          },
          addStyle: async (textContent: any) => {
            // console.log({ textContent })
            // Feature blocked
            // const style = Object.assign(document.createElement('style'), { textContent })
            // const ref = document.head.getElementsByTagName('style')[0] || null
            // document.head.insertBefore(style, ref)
          },
        }
      } else {
        console.error('whyy?', c)
        return null
      }

      const app = createApp(
        defineAsyncComponent(async () => {
          try {
            return await loadModule('file.vue', options)
          } catch (error: any) {
            console.error('load module error', error)

            return Promise.resolve()
          }
        })
      )

      /// Add core plugins
      app.use(vueuseMotion.MotionPlugin)
      app.mount(r.value)

      return app
    },

    async compileVue(
      payload: any
    ): Promise<{ output: string; logs: { errors: string[]; info: string[] } }> {
      let dataRequest
      let info: string[] = []
      let errors: string[] = []
      let normalizedHTML = ''
      let normalizedJS = ''
      let stringifiedData = '{}'
      let normalizedJson = '{}'

      if (payload.query.trim().length) {
        const creatorState = useCreatorState()
        const credentials = creatorState.getCreatorCredentials

        /// check for bad stuff here
        const query = trimAndRemoveQueryWrap(payload.query)
        const options = {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${credentials.creatorToken}`,
          },
          body: JSON.stringify({
            query: `query {${query}}`,
          }),
        }

        dataRequest = await fetch(getGraphUrl(), options)
          .then((res) => res.json())
          .catch((err) => {
            // this.logs.error(err)
            console.error('data fetch error', { err })
            errors.push(err.message)
          })

        if (!dataRequest || dataRequest?.errors) {
          errors = errors.concat(
            dataRequest.errors.reduce(
              (o: string[], v: any) => {
                o.push(`line ${v.locations[0].line}:${v.locations[0].column} -- ${v.message}`)
                return o
              },
              ['query errors']
            )
          )
        } else {
          stringifiedData = JSON.stringify(dataRequest?.data ?? {})
        }
      }

      if (!errors.length) {
        const htmlNormalized = removeAllAndSomeTagsFromHtml(
          payload.template,
          ['head', 'link', 'script', 'style'],
          ['body', 'html']
        )
        const jsNormalized = removeNodesWithKeywords(payload.script, [
          'window',
          'alert',
          'import',
          'fetch',
          'require',
          'console.log',
        ])

        const htmlLinesWereRemoved = htmlNormalized.removed.length
        const jsLinesWereRemoved = jsNormalized.removed.length
        if (jsLinesWereRemoved || htmlLinesWereRemoved) {
          info.push('Lines with the following keywords were removed during compilation')

          if (htmlLinesWereRemoved) {
            info = info.concat([' template ', ...htmlNormalized.removed])
          }
          if (jsLinesWereRemoved) {
            info = info.concat([' script ', ...jsNormalized.removed])
          }
        }

        normalizedHTML = htmlNormalized.output
        normalizedJS = jsNormalized.output
        /// TODO: check this payload value
        normalizedJson = payload.vue?.length ?? '{}'
      }
      /// Add tailwind
      // console.log({ Sass })
      // let css = ''
      // Sass.preloadFiles('://', 'styles', ['tailwind.css'])
      // await Sass.compile(
      //   `
      // @tailwind base;
      // @tailwind components;
      // @tailwind utilities;`,
      //   (s) => {
      //     console.log({ s })
      //     return (css = s)
      //   }
      // )
      // console.log({ css })

      return {
        output: `
        <template>
          <div class="flex justify-center">
            <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
              ${normalizedHTML}
            </div>
          </div>
        </template>
        <style scoped>
          @tailwind base;
          @tailwind components;
          @tailwind utilities;
        </style>
        <script setup>
          /// Auto Import
          import { onMounted, ref, computed } from 'vue'
          import { useMotion } from '@vueuse/motion'

          /// Hydration
          const query = ${stringifiedData}
          const vue = ${normalizedJson}
          
          /// Script
          ${normalizedJS}

          // onMounted(() => {
            // console.log('window.tailwindCSS', window.tailwindCSS)
            // window.tailwindCSS.refresh()
          // })
        </script>`,
        /// Feature disabled
        //   <style scoped>
        //     ${payload.css}
        //   </style>
        // `
        logs: {
          info,
          errors,
        },
      }
    },

    async compileTemplate(
      template: string
    ): Promise<{ output: string; logs: { errors: string[]; info: string[] } }> {
      let dataRequest
      let info: string[] = []
      const errors: string[] = []
      let normalizedHTML = ''

      if (template.length) {
        /// check for bad stuff here

        const htmlNormalized = removeAllAndSomeTagsFromHtml(
          template,
          ['head', 'link', 'script', 'style'],
          ['body', 'html']
        )

        const htmlLinesWereRemoved = htmlNormalized.removed.length
        if (htmlLinesWereRemoved) {
          info.push('Lines with the following keywords were removed during compilation')

          if (htmlLinesWereRemoved) {
            info = info.concat([' template ', ...htmlNormalized.removed])
          }
        }

        normalizedHTML = htmlNormalized.output
      }

      return {
        output: `
        <template>
          <div class="flex justify-center">
            <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
              ${normalizedHTML}
            </div>
          </div>
        </template>
        <style scoped>
          @tailwind base;
          @tailwind components;
          @tailwind utilities;
        </style>
        <script setup>
          /// Auto Import
          import { onMounted, ref, computed } from 'vue'
          import { useMotion } from '@vueuse/motion'
        </script>`,
        /// Feature disabled
        //   <style scoped>
        //     ${payload.css}
        //   </style>
        // `
        logs: {
          info,
          errors,
        },
      }
    },

    compileComponentHTML(payload: Record<string, any>, isDark?: boolean): string {
      return `<html class="${isDark ? 'dark' : ''}">
        <head>
            <style id="_style">${payload.css}</style>
            <script type="module" id="_script">
                ${payload.script}
                window.addEventListener('message', function(event) {
                    console.log(event)
                    if (event.data === 'theme-dark') {
                        document.documentElement.classList.add('dark')
                    } else if (event.data === 'theme-light') {
                        document.documentElement.classList.remove('dark')
                    }
                })
            </script>
            <script>
              
              const options = {
                method: "post",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": \`Bearer ${this.credentials.creatorToken}\`
                },
                body: JSON.stringify({
                  query: \`${payload.query}\`
                })
              };
          
              fetch('${getGraphUrl()}', options)
                .then(res => res.json())
                .then((d) => {
                  console.log({d})
                  /// Call Render Method
                  document.getElementById('data').innerText = JSON.stringify(d?.data, null, 2)
                });
            </script>
        </head>
        <body>
            <div id="_html">
              ${payload.template}
            </div>
            <div>
              <h1>DATA</h1>
              <pre id="data"></pre>
            </div>
        </body>
    </html`
    },
  },
})
