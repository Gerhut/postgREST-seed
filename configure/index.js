var configure = require('./default')

for (var key in configure)
  if (key in process.env)
    configure[key] = process.env[key]

module.exports = configure
