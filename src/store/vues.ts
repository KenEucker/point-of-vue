import { VueComponent } from './../schema/generated/types.d'
import { apolloClient } from '.'
import { defineStore } from 'pinia'
import { gql } from '@apollo/client/core'
import { useStorage } from '@vueuse/core'
import {
  getGraphUrl,
  PovComponent,
  removeAllAndSomeTagsFromHtml,
  removeNodesWithKeywords,
} from '../utilities'
import Sass from 'sass.js/dist/sass.sync.js'

// Local storage state
const storedGitHubToken = useStorage('github-token', '')

export const getInitialVuesState = (): {
  vuesFetched: boolean
  vues: Array<VueComponent>
  vueComponents: Array<PovComponent>
} => ({
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
    async compileComponent(payload: Record<string, any>): Promise<{ output: string; logs: any }> {
      const token = localStorage.getItem('creator-token')
      let dataRequest
      if (payload.graphql.trim().length) {
        const options = {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            query: `${payload.graphql}`,
          }),
        }

        dataRequest = await fetch(getGraphUrl(), options).then((res) => res.json())
      }

      const normalizedHTML = removeAllAndSomeTagsFromHtml(
        payload.html,
        ['head', 'link', 'script', 'style'],
        ['body', 'html']
      )
      const normalizedJS = removeNodesWithKeywords(payload.javascript, [
        'window',
        'alert',
        'import',
        'fetch',
        'require',
        'console.log',
      ])

      const itemsWereRemoved = normalizedJS.removed.length > 0 || normalizedHTML.removed.length > 0
      const logs = ''
      const errorsMessage = 'Lines with the following keywords were removed during compilation'
      const errorsObject = {
        template: normalizedHTML.removed,
        script: normalizedJS.removed,
      }
      const errors = itemsWereRemoved
        ? `console.log('${errorsMessage}', ${JSON.stringify(errorsObject)}, new Date())`
        : ''

      /// TODO: check this payload value
      const normalizedJson = payload.json ?? '{}'

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
        <script src="https://cdn.tailwindcss.com"></script>
        <script setup>
          ${logs}
          ${errors}
          /// Hydration
          const query = ${JSON.stringify(dataRequest?.data ?? {})}
          const vue = ${normalizedJson}
          ${normalizedJS.output}
        </script>
        <template>
          <div class="flex justify-center">
            <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
              ${normalizedHTML.output}
            </div>
          </div>
        </template>
        <style scoped>
          @tailwind base;
          @tailwind components;
          @tailwind utilities;
        </style>`,
        /// Feature disabled
        //   <style scoped>
        //     ${payload.css}
        //   </style>
        // `
        logs: undefined,
      }
    },

    compileComponentHTML(payload: Record<string, any>, isDark?: boolean) {
      const token = localStorage.getItem('creator-token')
      return `<html class="${isDark ? 'dark' : ''}">
        <head>
            <style id="_style">${payload.css}</style>
            <script type="module" id="_script">
                ${payload.javascript}
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
                  "Authorization": \`Bearer ${token}\`
                },
                body: JSON.stringify({
                  query: \`${payload.graphql}\`
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
              ${payload.html}
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
      }
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
        variables: { token: storedGitHubToken.value, oid },
      })
      if (data?.vues?.length && !queryError) {
        this.vuesFetched = true
        this.vues = data.vues
        this.vueComponents = this.vues.map((v) => {
          const vueComponentJson = JSON.parse(v.vue ?? '{}')
          return { name: vueComponentJson.name ?? '' }
        })
      } else if (queryError) {
        console.error(queryError)
      }
    },
  },
})
