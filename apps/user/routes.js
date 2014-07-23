var User = require('./models').User

module.exports = function (server) {
  server.get('/user', function (req, res, next) {
    User.find({}, function (err, result) {
      if (err)
        return next(err)
      res.send(result)
      return next()
    })
  })
  server.get('/user/:name', function (req, res, next) {
    User.get(req.params.name, function (err, result) {
      if (err)
        return next(err)
      res.send(result)
      return next()
    })
  })
  server.post('/user', function (req, res, next) {
    User.create(req.body, function (err, result) {
      if (err)
        return next(err)
      res.send(results)
      return next()
    })
  })
}