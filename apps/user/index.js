module.exports = function (database, server) {
  require('./models')(database)
  require('./routes')(server)
}
