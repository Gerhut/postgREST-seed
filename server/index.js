var configure = require('../configure')
var restify = require('restify')

module.exports = function (callback) {
  var server = restify.createServer({ name: configure.name })

  require('./plugins')(server)
  require('../apps')(server, function (err) {
    if (err) {
      console.log(err)
      process.exit(1)
      return
    }
    callback(server)
  })
}
