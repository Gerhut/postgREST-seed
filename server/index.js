var configure = require('../configure')
var restify = require('restify')

var server = restify.createServer({ name: configure.name })

require('./plugins')(server)
require('./urls')(server)

module.exports = server
