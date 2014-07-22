function url(req, tailSlash) {
  tailSlash = !!tailSlash

  var url = req.isSecure ? 'https://' : 'http://'
  
  url += req.header('Host', 'localhost')
  
  if (tailSlash && url[url.length - 1] != '/') {
    url += '/'
  } else if (!tailSlash && url[url.length - 1] == '/') {
    url = url.slice(0, url.length - 1)
  }

  return url
}


exports.GET = function () {
  var self = this
  return function (req, res, next) {
    if ('key' in req.params) {
      self.get(req.params.key, function (err, result) {
        if (err)
          return next(err)

        if (result == null)
          res.send(404)
        else
          res.send(result)
        
        return next()
      })
    } else {
      self.get(function (err, result) {
        if (err)
          return next(err)

        res.send(result)
        return next()
      })
    }
  }
}

exports.POST = function () {
  var self = this
  return function (req, res, next) {
    self.post(req.body, function (err, key) {
      if (err)
        return next(err)

      res.header('Location', url(req) + key)

      res.send(201)
    })
  }
}

exports.PUT = function () {
  var self = this
  return function (req, res, next) {
    self.put(req.params.key, req.body, function (err, key) {
      if (err)
        return next(err)

      res.send(204)
    })
  }
}

exports.DELETE = function () {
  var self = this
  return function (req, res, next) {
    self.del(req.params.key, function (err, key) {
      if (err)
        return next(err)

      res.send(204)
    })
  }
}
