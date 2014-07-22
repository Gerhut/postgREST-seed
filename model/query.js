var pg = require('pg')
var configure = require('../configure')

var slice = Array.prototype.slice

module.exports = function () {
  var query = slice.call(arguments)
  var callback = query.pop()
  console.log(query)
  pg.connect(configure.database, function (err, client, done) {
    if (err)
      return callback(err)

    client.query.apply(client, query.concat(function (err, result) {
      if (err)
        return callback(err)

      done()

      callback(null, result)
    }))
  })
}
