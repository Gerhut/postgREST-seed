var orm = require('orm')

var inited = false

exports = module.exports = function (db) {
  if (inited)
    throw new Error('Model already initialized.')
  inited = true

  var User = db.define('user', {
    'name': {
      type: 'text',
      key: true
    },
    'password': {
      type: 'text',
      required: true,
      size: 32
    },
    'access'  : {
      type: 'integer',
      size: 2,
      unsigned: true,
      defaultValue: 0
    }
  }, {
    validations: {
      'access': orm.validators.rangeNumber(0, 0, 'Invalid access')
    }
  })

  exports.User = User
}