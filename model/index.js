var query = require('./query')
var compile = require('./compile')
var init = require('./init')
var convert = require('./convert')
var operation = require('./operation')

function Model(name, struct) {
  this.name = name
  
  compile.call(this, struct)
}


[init, convert, operation].forEach(function (plugin) {
  for (var funcname in plugin) {
    Model.prototype[funcname] = plugin[funcname]
  }
})

exports = module.exports = Model
