
/**
 * callback: function(err, result)
 * - force = true:
 *   - result = true: drop table then create table
 *   - result = false: directly create table
 * - force = false:
 *   - result = true: create table
 *   - result = false: table exists, skipped
 */
exports.init = function (force, callback) {
  var self = this
  force = !!force

  function create(created) {
    query('CREATE TABLE ' + self.name + ' (' + self.toCreateString() + ');', function (err, result) {
      if (err)
        return callback(err)
      else
        return created()
    })
  }

  query('SELECT * FROM [' + self.name + '] WHERE false;', function (err, result) {
    if (err == null) { // table exists
      if (force) {
        query('DROP TABLE [' + self.name + '];', function (err, result) {
          if (err)
            return callback(err)

          return create(function () {
            callback(null, true)
          })
        })
      } else {
        return callback(null, false)
      }
    } else if (err.code === '42P01') { // no such table
      return create(function () {
        callback(null, !force)
      })
    } else {
      callback(err)
    }
  })
}
