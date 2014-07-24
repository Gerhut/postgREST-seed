var _ = require('lodash')
var restify = require('restify')
var User = require('./models').User

function authorization(minAccess) {
  return function (req, res, next) {
    if (!('basic' in req.authorization)) {
      return next(new restify.UnauthorizedError('Authorization required.'))
    }
    User.get(req.authorization.basic.username, function (err, result) {
      if (err) {
        if (err.code == 2) {
          return next(new restify.UnauthorizedError('No such user'))
        } else {
          console.log(err)
          return next(err)
        }
      }

      if (!result.valid(req.authorization.basic.password)) {
        return next(new restify.UnauthorizedError('Invalid password'))
      }

      if (result.access < minAccess) {
        return next(new restify.UnauthorizedError('Access not enough'))
      }

      return next()
    })
  }
}

exports = module.exports = function (server) {
  server.get('/user/:name', authorization(0), function (req, res, next) {
    User.get(req.params.name, function (err, result) {
      if (err) {
        if (err.code == 2) {
          return next(new restify.NotFoundError('No such user'))
        } else {
          console.log(err)
          return next(err)
        }
      }
      result = _.pick(result, 'name', 'access')
      res.send(result)
      return next()
    })
  })
  server.post('/user', function (req, res, next) {
    var user = _.pick(req.body, 'name', 'password')
    if (!('name' in user))
      return next(new restify.BadRequestError('Username is required'))
    if (!('password' in user))
      return next(new restify.BadRequestError('Password is required'))
    User.create(user, function (err, result) {
      if (err) {
        if (err.code == 23505) {
          return next(new restify.ConflictError('User already exists'))
        } else {
          console.log(err)
          return next(err)
        }
      }
      result = _.pick(result, 'name', 'access')
      res.header('Location', req.origin + '/user/' + result.name)
      res.header('Content-Location', req.origin + '/user/' + result.name)
      res.send(201, result)
      return next()
    })
  })
}

exports.authorization = authorization
