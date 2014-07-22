var restify = require('restify')
var configure = require('../configure')

module.exports = function(server) {
  server.use([
    restify.acceptParser(server.acceptable),
    restify.authorizationParser(),
    restify.queryParser(),
    restify.gzipResponse(),
    restify.bodyParser({ maxBodySize: configure.bodyLimit })
  ])
}