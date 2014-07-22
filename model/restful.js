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


exports.GET = function (req, res, next) {
  if ('key' in req.params) {
    this.get(req.params.key, function (err, result) {
      if (err)
        return next(err)

      res.send(result)
      return next()
    })
  } else {
    this.get(function (err, result) {
      if (err)
        return next(err)

      res.send(result)
      return next()
    })
  }
}

exports.POST = function (req, res, next) {
  this.post(req.body, function (err, key) {
    if (err)
      return next(err)

    res.header('Location', url(req) + key)

    res.send(201)
  })
}

exports.PUT = function (req, res, next) {
  this.put(req.params.key, req.body, function (err, key) {
    if (err)
      return next(err)

    res.send(204)
  })
}

exports.DELETE = function (req, res, next) {
  this.del(req.params.key, function (err, key) {
    if (err)
      return next(err)

    res.send(204)
  })
}
