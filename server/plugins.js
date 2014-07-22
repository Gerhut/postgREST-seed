var restify = require('restify')
var configure = require('../configure')

module.exports = function(server) {
  server.use([
    restify.acceptParser(server.acceptable),
    restify.authorizationParser(),
    restify.queryParser({mapParams: false}),
    restify.gzipResponse(),
    restify.bodyParser({ maxBodySize: configure.bodyLimit })
  ])
}