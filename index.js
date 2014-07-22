var configure = require('./configure')
var server = require('./server')

server.listen(configure.port)
console.log('Server listening on port ' + configure.port)