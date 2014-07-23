var orm = require('orm')

var inited = false

exports = module.exports = function (db) {
  if (inited)
    throw new Error('Model already initialized.')
  inited = true

  exports.User = db.define('user', {
    'name': {
      type: 'text',
      key: true
    },
    'password': {
      type: 'text'
    },
    'access'  : {
      type: 'integer',
      size: 2,
      unsigned: true,
      defaultValue: 0
    }
  }, {
    validations: {
      //'password': orm.validators.password('Password is too simple.'),
      'access': orm.validators.rangeNumber(0, 0, 'Invalid access')
    }
  })
}