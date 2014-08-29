var test = require('tape')
  , days = require('../index')

test('February 2008 has 5 fridays (cli)', function(t) {
  t.plan(1)

  var args = [ __dirname+'/../index.js',      '2008-02-29',
               '--limit=5',  '--startDay=5',  '--stride=7' ]
    , spawn = require('child_process').spawn
    , child = spawn('node', args)
    , result = ''

  child.stdout.setEncoding('utf8')

  child.stdout.on('data', function(chunk) {
    result += chunk
  })

  child.stdout.on('close', function(code) {
    t.equal(result, '2008-02-292008-02-222008-02-152008-02-082008-02-01', 'output compared to fixture')
  })
})

test('February 2008 has 5 fridays (module)', function(t) {
  t.plan(2)

  var opts = { limit:5, startDay:5, stride:7 }
  days('2008-02-29', opts, function(err, stream) {
    stream.setEncoding('utf8')
    var result = []
    stream.on('data', function(chunk) {
      if (chunk) result.push(chunk)
      if (result.length === opts.limit) {
        t.equal(result.length, 5, 'output matches expected limit')
        t.equal(result.toString(), '2008-02-29,2008-02-22,2008-02-15,2008-02-08,2008-02-01', 'output compared to fixture')
        t.end()
      }
    })
  })
})

