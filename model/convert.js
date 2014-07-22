exports.toString = function () {
  var strings = []

  function typeString(type) {
    if (type === Number) {
      return 'numeric'
    } else if(type === Boolean) {
      return 'boolean'
    } else if (type === String) {
      return 'text'
    } else if (type.constructor === Model) { // foreign key
      return typeString(type.struct[type.key].type)
    } else if (type.constructor === String){ // Custom
      return type
    }

    throw(new Error('Invalid struct entry type: ' + type))
  }

  for (var name in this.struct) {
    var props = this.struct[name]

    var substrings = [name, typeString(props.type)]
    
    if ('default' in props) {
      substrings.push('default', props.default.toString())
    }

    if (this.key === name) {
      substrings.push('primary key')
    }

    strings.push(substrings.join(' '))
  }

  return strings.join(',')
}

exports.toParts = function (obj) {
  var keys = [], valueParams = [], values = []

  for (var key in obj) {
    if (key in this.struct) {
      keys.push(key)
      valueParams.push('$' + keys.length)
      values.push(obj[key])
    }
  }

  return {
    keyString: keys.join(','),
    valueString: valueParams.join(','),
    values: values
  }
}
