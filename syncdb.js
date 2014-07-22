var force = (process.argv[2] == 'force')

var models = [
  require('./appuser')
]

var processed = 0
var hasError = false
models.forEach(function (model) {
  model.init(force, function (err, result) {
    if (err) hasError = true

    console.log(model.name, err ? err : result)
    
    if (++processed == models.length) {
      process.exit(hasError ? 1 : 0)
    }
  })
})