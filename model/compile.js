module.exports = function (struct) {
  for (var name in struct) {
    var value = struct[name]
    
    if (value == null)
      continue

    if (name[0] == '_') {
      name = name.slice(1)
      this.key = name
    }

    var type = value.constructor

    if (type === Function || type === Model) { // no default value
      type = value
      value = null
    } else if (type === Object) { // directly object
      type = value.type
      value = value.default
    }

    this.struct[name] = { type: type }

    if (value != null)
      this.struct[name].default = value
  }

  if (!('key' in this)) {
    this.key = '_id'
    this.struct['_id'] = { type: 'serial' }
  }
}
