import { createGlobalState, useDark } from '@vueuse/core'

export const getGraphUrl = (addAuthHeader = false) => {
  let authHeader = ''
  if (addAuthHeader) {
    const token = localStorage.getItem('creator-token')
    authHeader = `?headers=${encodeURIComponent(
      JSON.stringify({ Authorization: `Bearer ${token}` })
    )}`
  }

  return `${process.env.GRAPH_URL}${
    process.env.GRAPH_PORT !== '80' ? `:${process.env.GRAPH_PORT}` : ''
  }/${process.env.GRAPH_PATH}${authHeader}`
}

export const studioUrl = process.env.STUDIO_URL

export const useSubscription = (subscriptionQuery: string, callback: any) => {
  const url = new URL(getGraphUrl())

  url.searchParams.append('query', subscriptionQuery)
  const eventsource = new EventSource(url.toString(), {
    withCredentials: true, // This is required for cookies
  })

  eventsource.onmessage = function (event) {
    const data = JSON.parse(event.data)
    callback(data)
  }
}

export enum StorageName {
  ACTIVE_TAB = 'active-tab',
  EDITOR_STATE = 'editor-state',
  EDITOR_VALUE = 'editor-value',
}

export interface PovComponent {
  name: string
  category: string
  vues: number
  status: string
  icon: string
  description: string
  background?: string
  publishedAt?: Date
  archivedAt?: Date
  erroredAt?: Date
}

export const compileComponent = (
  payload: Record<string, any>
): Promise<{ output: string; logs: any }> => {
  const token = localStorage.getItem('creator-token')
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

  const dataRequest = fetch(getGraphUrl(), options)

  const normalizedHTML = removeAllAndSomeTagsFromHtml(
    payload.html,
    ['head', 'link', 'script', 'style'],
    ['body', 'html']
  )
  const normalizedJS = removeNodesWithKeywords(payload.javascript, [
    'window',
    'alert',
    'import',
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

  return dataRequest
    .then((res) => res.json())
    .then(
      (d) => ({
        output: `
        <script setup>
          ${logs}
          ${errors}
          /// Hydration
          const query = ${JSON.stringify(d.data)}
          ${normalizedJS.output}
        </script>
        <template>
          <div class="flex justify-center">
            <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
              ${normalizedHTML.output}
            </div>
          </div>
        </template>`,
        logs: undefined,
      })
      /// Feature disabled
      //   <style scoped>
      //     ${payload.css}
      //   </style>
      // `
    )
}

export const compileComponentHTML = (payload: Record<string, any>, isDark?: boolean) => {
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
}

export const useDarkGlobal = createGlobalState(() => useDark())

/// Written by CHATGPT
export const removeAllAndSomeTagsFromHtml = (
  html: string,
  tagsToRemove: string[],
  tagsToRetain: string[]
): { output: string; removed: string[] } => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const normalizedTagsToRemove = tagsToRemove.map((t) => t.toLowerCase())
  const normalizedTagsToRetain = tagsToRetain.map((t) => t.toLowerCase())
  const removed: string[] = []

  // Recursive function to remove unwanted tags
  const removeTags = (node: Node) => {
    for (let i = node.childNodes.length - 1; i >= 0; i--) {
      const child = node.childNodes[i]
      if (child.nodeType === Node.ELEMENT_NODE) {
        const childName = child.nodeName.toLowerCase()
        if (normalizedTagsToRemove.includes(childName)) {
          removed.push(childName)
          node.removeChild(child)
        } else if (!normalizedTagsToRetain.includes(childName)) {
          removeTags(child)
        }
      }
    }
  }

  removeTags(doc)
  return { output: doc.body.innerHTML, removed }
}

/// Written by CHATGPT
export const removeLinesWithKeywordsFromJavascript = (code: string, keywords: string[]) => {
  const lines = code.split('\n')
  let newCode = ''
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    let includeLine = true
    for (let j = 0; j < keywords.length; j++) {
      if (line.includes(keywords[j])) {
        includeLine = false
        break
      }
    }
    if (includeLine) {
      newCode += line + '\n'
    }
  }
  return newCode
}

/// Written by CHATGPT (INVALID, OLD DEPENDENCIES)
// export const removeNodesWithKeywords = (
//   code: string,
//   keywords: string[]
// ): { output: string; removed: string[] } => {
//   const ast = esprima.parseScript(code)
//   const removed: string[] = []
//   estraverse.replace(ast, {
//     enter: function (node) {
//       for (let j = 0; j < keywords.length; j++) {
//         if (node.type === 'Identifier' && node.name === keywords[j]) {
//           this.remove()
//         }
//       }
//     },
//   })
//   return { output: ast.toString(), removed }
// }

/// Written by CHATGPT
// export const removeNodesWithKeywords = (
//   code: string,
//   keywords: string[]
// ): { output: string; removed: string[] } => {
//   console.log({ code, keywords })
//   const importRegex = /^import.*;?$/gm
//   const exportRegex = /^export.*;?$/gm
//   const filteredCode = code.replace(importRegex, '').replace(exportRegex, '')
//   console.log({ filteredCode })
//   const ast = acorn.parse(filteredCode, { ecmaVersion: 11 })
//   const removed: string[] = []
//   walk.simple(ast, {
//     Identifier(node: any) {
//       if (keywords.includes(node.name)) {
//         node.type = 'Literal'
//         node.value = null
//         node.raw = 'null'
//         removed.push(node.name)
//       }
//     },
//   })
//   const output = generate(ast)
//   console.log({ output })
//   return { output, removed }
// }

/// Written by CHATBOT
// export const removeNodesWithKeywords = (
//   code: string,
//   keywords: string[]
// ): { output: string; removed: string[] } => {
//   const importRegex = /^import.*;?$/gm
//   const exportRegex = /^export.*;?$/gm
//   const filteredCode = code.replace(importRegex, '').replace(exportRegex, '')
//   const ast = acorn.parse(filteredCode, { ecmaVersion: 11 })
//   const removed: string[] = []
//   walk.simple(ast, {
//     Identifier(node: any) {
//       if (keywords.includes(node.name)) {
//         removed.push(node.name)
//         node.comments = [{ type: 'Block', value: '// removed by chatbot' }]
//       }
//     },
//   })
//   const output = generate(ast)
//   console.log({ output })
//   return { output, removed }
// }

/// Written by CHATBOT
// export const removeNodesWithKeywords = (
//   code: string,
//   keywords: string[]
// ): { output: string; removed: string[] } => {
//   const lines = code.split('\n')
//   const filteredLines = lines.filter(
//     (line) => !line.startsWith('import') && !line.startsWith('export')
//   )
//   const filteredCode = filteredLines.join('\n')
//   const ast = acorn.parse(filteredCode, { ecmaVersion: 11, sourceType: 'module' })
//   const removed: string[] = []
//   walk.simple(ast, {
//     Identifier(node: any) {
//       if (keywords.includes(node.name)) {
//         node.type = 'Literal'
//         node.value = null
//         node.raw = 'null'
//         removed.push(node.name)
//       }
//     },
//     CallExpression(node: any) {
//       if (node.callee.type === 'Identifier' && keywords.includes(node.callee.name)) {
//         node.type = 'Literal'
//         node.value = null
//         node.raw = 'null'
//         removed.push(node.callee.name)
//       }
//     },
//     MemberExpression(node: any) {
//       if (node.object.type === 'Identifier' && keywords.includes(node.object.name)) {
//         node.type = 'Literal'
//         node.value = null
//         node.raw = 'null'
//         removed.push(node.object.name)
//       }
//     },
//   })
//   const output = generate(ast)
//   return { output, removed }
// }

/// Written by CHATBOT -- PRIMITIVE BUT WORKS
export const removeNodesWithKeywords = (
  code: string,
  keywords: string[]
): { output: string; removed: string[] } => {
  const importRegex = /^import.*;?$/gm
  const exportRegex = /^export.*;?$/gm
  const filteredCode = code.replace(importRegex, '').replace(exportRegex, '')
  const lines = filteredCode.split('\n')
  const filteredLines = lines.filter((line) => {
    return !keywords.some((keyword) => line.includes(keyword))
  })
  const output = filteredLines.join('\n')
  const removed = lines.filter((line) => !filteredLines.includes(line))
  return { output, removed }
}
