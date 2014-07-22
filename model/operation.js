exports.get = function (key, callback) {
  if (typeof key === 'function') {
    callback = key
    key = null
  }

  if (key == null) {
    query('SELECT * FROM [' + this.name + '];', function (err, result) {
      if (err)
        return callback(err)
      else
        return callback(null, result.rows)
    })
  } else {
    query('SELECT * FROM [' + this.name + '] WHERE [' + this.key + '] = $1;', [key], function (err, result) {
      if (err)
        return callback(err)
      else
        return callback(null, result.rows[0])

    })
  }
}

/**
 * return new key
 */
exports.post = function (content, callback) {
  var parts = this.toParts(content)

  var sql = [
    'INSERT INTO [' + this.name + ']',
    '(' + parts.keyString + ')',
    'VALUES (' + parts.valueString + ')',
    'RETURNING [' + this.key + '];' // NOT STANDARD SQL
  ].join(' ')

  query(sql, parts.values, function (err, result) {
    if (err)
      return callback(err)
    return callback(null, result.rows[0][this.key])
  }
}

exports.put = function (key, content, callback) {
  var parts = this.toParts(content)
  parts.values.push(key)
  
  var sql = [
    'UPDATE [' + this.name + ']',
    'SET (' + parts.keyString + ')'
    '= (' + parts.valueString + ')'
    'WHERE [' + this.key + '] = $' + parts.values.length
  ].join(' ')

  query(sql, parts.values, function (err) {
    if (err)
      return callback(err)
    callback(null)
  })
}

exports.del = function (key, callback) {
  query('DELETE [' + this.name + '] WHERE [' + this.key + '] = $1;', [key], function (err) {
    if (err)
      return callback(err)
    callback(null)
  })
}
