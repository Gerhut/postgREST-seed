var restify = require('restify')
var configure = require('../configure')

module.exports = function(server) {
  server.use(restify.acceptParser(server.acceptable))
  server.use(restify.CORS())
  server.use(restify.queryParser({mapParams: false}))
  server.use(restify.gzipResponse())
  server.use(restify.bodyParser({ maxBodySize: configure.bodyLimit }))
}