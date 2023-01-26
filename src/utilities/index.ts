import { createGlobalState, useDark } from '@vueuse/core'

export const getGraphUrl = (endpoint: string | undefined = undefined, addAuthHeader = false) => {
  let authHeader = ''
  if (addAuthHeader) {
    authHeader = `?headers=${encodeURIComponent(
      JSON.stringify({ Authorization: `Bearer ${creatorToken}` })
    )}`
  }

  return `${process.env.GRAPH_URL}${
    process.env.GRAPH_PORT !== '80' ? `:${process.env.GRAPH_PORT}` : ''
  }/${endpoint ?? process.env.GRAPH_PATH}${authHeader}`
}

export const studioUrl = process.env.STUDIO_URL
export const creatorToken = localStorage.getItem('creator-token')

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
  oid: string
  name: string
  category?: string
  vues?: number
  status?: string
  icon?: string
  description?: string
  background?: string
  publishedAt?: Date
  archivedAt?: Date
  erroredAt?: Date
  vue?: string
  query?: string
  script?: string
  template?: string
}

/// From Chatbot
export const getRange = ({ start, end }: { start: number; end: number }): number[] => {
  const result = Array.from({ length: end - start + 1 }, (_, i) => i + start)
  return result
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

export const getImgurImageSized = (
  link: string | null = null,
  size = 'l',
  id: string | null = null,
  ext = '.jpg'
) => {
  const imgurUrl = link ?? `https://i.imgur.com/${id}${ext}`
  const ret = imgurUrl
    .replace('.jpeg', `${size}.jpg`)
    .replace('.jpg', `${size}.jpg`)
    .replace('.gif', `${size}.gif`)
    .replace('.png', `${size}.png`)
    .replace('.mp4', `${size}.mp4`)

  return ret
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export const trimAndRemoveQueryWrap = (str: string): string => {
  const match = str.match(/^\s*query\s*/i)
  if (match) {
    str = str.substring(str.indexOf('{') + 1)
    str = str.substring(0, str.lastIndexOf('}'))
  }
  return str.trim()
}
