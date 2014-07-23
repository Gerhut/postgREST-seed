var orm = require('orm')

var configure = require('../configure')
var apps = require('./available')

exports = module.exports = function (server, callback) {
  orm.connect(configure.database, function (err, database) {
    if (err)
      return callback(err)

    function dealApp(index) {
      if (index >= apps.length) {
        return database.sync(function (err) {
          if (err)
            return callback(err)
          exports.database = database
          callback()
        })
      }

      var appName = apps[index]
      try {
        var app = require('./' + appName)
      } catch (err) {
        return callback(err)
      }

      if (typeof app != 'function')
        return callback(new Error('App ' + appName + ' is not a function.'))

      if (app.length <= 2) { // sync func
        try {
          app(database, server)
        } catch (err) {
          return callback(err)
        }
        setImmediate(dealApp, index + 1)
      } else { // async func
        try {
          app(database, server, function (err) {
            if (err)
              return callback(err)
            dealApp(index + 1)
          })
        } catch (err) {
          return callback(err)
        }
      }
    }

    dealApp(0)
  })
}
