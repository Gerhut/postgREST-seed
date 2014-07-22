module.exports = function(server) {
  server.on('after', function (req, res, route, err) {
    console.log(err)
  })
}