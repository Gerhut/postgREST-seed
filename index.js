var configure = require('./configure')

require('./server')(function (server) {
  server.listen(configure.port)
  console.log('Server listening on port ' + configure.port)
})