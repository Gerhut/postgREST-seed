var restify = require('restify')
var bunyan = require('bunyan')
var configure = require('../configure')

module.exports = function(server) {
  server.pre(function(req, res, next) {
    req.origin = (req.isSecure() ? 'https://' : 'http://') + req.header('Host')
    next()
  })

  server.use(restify.acceptParser(server.acceptable))
  server.use(restify.CORS())
  server.use(restify.queryParser({mapParams: false}))
  server.use(restify.gzipResponse())
  server.use(restify.bodyParser({ maxBodySize: configure.bodyLimit }))

  server.on('after', restify.auditLogger({
    log: bunyan.createLogger({
      name: 'restify'
    })
  }))
}
