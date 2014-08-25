var main = require('./lib/main')

if (! module.parent) {
  var cli = require('./lib/cli')(process.argv.slice(2))

  main(cli.date, cli.opts, function(err, data) {
    if (err) throw err
    process.stdout.on('error', process.exit)
    data.pipe(process.stdout)
  })
}

module.exports = main

