import { VueComponent } from './../schema/generated/types.d'
import { apolloClient } from '.'
import { defineStore } from 'pinia'
import { gql } from '@apollo/client/core'
import {
  getGraphUrl,
  PovComponent,
  removeAllAndSomeTagsFromHtml,
  removeNodesWithKeywords,
} from '../utilities'
import Sass from 'sass.js/dist/sass.sync.js'
import { useCreatorState } from './creator'

export const getInitialVuesState = (): {
  credentials: { creatorToken?: string; githubToken?: string }
  vuesFetched: boolean
  vues: Array<VueComponent>
  vueComponents: Array<PovComponent>
} => ({
  credentials: {},
  vues: [],
  vueComponents: [],
  vuesFetched: false,
})

export const useVuesState = defineStore({
  id: 'useVuesState',
  state: getInitialVuesState,
  getters: {
    vuesHaveBeenFetched: (s) => s.vuesFetched,
    getVues: (s) => s.vues,
    getVueComponents: (s) => s.vueComponents,
  },
  actions: {
    hasCredentials() {
      if (this.credentials?.creatorToken?.length && this.credentials?.githubToken?.length) {
        return true
      }

      const creatorState = useCreatorState()
      const credentials = creatorState.getCreatorCredentials

      if (credentials.creatorToken && credentials.github) {
        this.credentials = {
          creatorToken: credentials.creatorToken,
          githubToken: credentials.github,
        }
        return true
      } else {
        return false
      }
    },
    async compileComponent(payload: any): Promise<{ output: string; logs: any }> {
      const trimAndRemove = (str: string): string => {
        const match = str.match(/^\s*query\s*\{/)
        if (match) {
          str = str.substring(match[0].length)
          str = str.substring(0, str.lastIndexOf('}'))
        }
        return str.trim()
      }
      let dataRequest
      const logs = ''
      let errors = ''
      let normalizedHTML = ''
      let normalizedJS = ''
      let stringifiedData = ''
      let normalizedJson = '{}'

      if (payload.query.trim().length) {
        /// check for bad stuff here
        const query = trimAndRemove(payload.query)
        const options = {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.credentials.creatorToken}`,
          },
          body: JSON.stringify({
            query: `query {${query}}`,
          }),
        }

        dataRequest = await fetch(getGraphUrl(), options)
          .then((res) => res.json())
          .catch((err) => {
            // this.logs.error(err)
            console.log({ err })
            errors = err.message
          })
        console.log({ dataRequest })

        if (!dataRequest || dataRequest?.errors) {
          errors = dataRequest.errors.reduce(
            (o: string, v: any) =>
              (o += `line ${v.locations[0].line}:${v.locations[0].column} -- ${v.message}`),
            ''
          )
          console.log({ errors })
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

        const itemsWereRemoved =
          jsNormalized.removed.length > 0 || htmlNormalized.removed.length > 0
        const errorsMessage = 'Lines with the following keywords were removed during compilation'
        const errorsObject = {
          template: htmlNormalized.removed,
          script: jsNormalized.removed,
        }
        normalizedHTML = htmlNormalized.output
        normalizedJS = jsNormalized.output
        errors = itemsWereRemoved
          ? `console.log('${errorsMessage}', ${JSON.stringify(errorsObject)}, new Date())`
          : ''

        /// TODO: check this payload value
        normalizedJson = payload.raw ?? '{}'
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
        <!-- Cheap Hack -->
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
          import { onMounted, ref, computed } from 'vue'

          ${logs}
          ${errors}
          /// Hydration
          const query = ${stringifiedData}
          const vue = ${normalizedJson}
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
          info: logs,
          errors: errors,
        },
      }
    },

    compileComponentHTML(payload: Record<string, any>, isDark?: boolean) {
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

    async fetchVues(oid?: string) {
      if (this.vuesFetched) {
        return Promise.resolve(this.vues)
      } else if (!this.credentials.githubToken?.length) {
        return Promise.resolve([])
      }

      console.info('fetching vues')
      const fetchVuesForCreatorQuery = gql`
        query StoreFetchVues($token: String!, $oid: String) {
          vues(from: { token: $token }, where: { oid: $oid }) {
            oid
            name
            query
            script
            template
            vue
          }
        }
      `
      const { data, error: queryError } = await apolloClient.query({
        query: fetchVuesForCreatorQuery,
        variables: { token: this.credentials.githubToken, oid },
      })
      if (data?.vues?.length && !queryError) {
        this.vuesFetched = true
        this.vues = data.vues
        this.vueComponents = this.vues.map((v) => {
          const vueComponentJson = JSON.parse(v.vue ?? '{}')
          return {
            name: vueComponentJson.name ?? '',
            vue: v.vue,
            script: v.script,
            template: v.template,
            query: v.query,
          }
        })
      } else if (queryError) {
        console.error(queryError)
      }
    },
  },
})
