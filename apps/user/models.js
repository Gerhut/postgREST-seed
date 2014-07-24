var _ = require('lodash')
var orm = require('orm')
var crypto = require('crypto')

var inited = false

function salt() {
  var value = _.random(parseInt('1000', 36), parseInt('zzzz', 36))
  return value.toString(36)
}

function sha1(password, salt) {
  var sha1 = crypto.createHash('sha1')
  sha1.update(password + salt)
  return sha1.digest('hex')
}

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
    'salt': {
      type: 'text',
      size: 4
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
    },
    hooks: {
      beforeCreate: function () {
        this.salt = salt()
      },
      beforeSave: function () {
        this.password = sha1(this.password, this.salt)
      }
    },
    methods: {
      valid: function (password) {
        return sha1(password, this.salt) === this.password
      }
    }
  })

  exports.User = User
}