const {loadYml} = require('./utils/load')
const path = require('path')

let server = loadYml(path.resolve(__dirname, 'conf.yml'))
let graphql = loadYml(path.resolve(__dirname, 'graphql', 'conf.yml'))

module.exports = {
  server, graphql
}
