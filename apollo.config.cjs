// apollo.config.js
module.exports = {
  client: {
    service: {
      name: 'point-of-vue',
      // URL to the GraphQL API
      url: `${process.env.GRAPH_URL}:${process.env.GRAPH_PORT}/${process.env.GRAPH_PATH}`,
    },
    // Files processed by the extension
    includes: ['src/**/*.vue', 'src/**/*.ts'],
  },
}
