module.exports = function (server) {
  server.get('/hello/:world', function (req, res, next) {
    res.send('hello' + req.params['world'])
    return next()
  })
}