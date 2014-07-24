var restify = require('restify')

module.exports = function (database, server) {
  server.use(restify.authorizationParser());
  require('./models')(database)
  require('./routes')(server)
}
