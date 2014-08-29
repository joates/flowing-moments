var Moment = require('moment')
  , Readable = require('stream').Readable
  , rs = Readable({ encoding: 'utf8', objectMode: true })

module.exports = function(date, opts, cb) {

  var _date

  if (! date) date = Date.now()
  if (typeof opts === 'function') {
    cb = opts
    opts = null
  }
  if (! opts) opts = {}

  var flowing = ! opts.limit
    , limit = opts.limit || 1
    , hardLimit = Moment('1888-06-01')

  try {
    _date = Moment(date)
    if (! _date.isValid())
      throw new Error('Invalid date')
  }
  catch(e) {
    _date = Moment()
  }

  var startDay
  if (opts.startDay) {
    try {
      startDay = Moment().day(opts.startDay).day()
      if (startDay < 0 || startDay > 6) throw new Error('Invalid start day')
    }
    catch(e) { startDay = 5 }
  }
  else
    startDay = 5		//default: Friday

  if (_date.day() < startDay)
    _date.subtract(7, 'days')

  _date.day(startDay)

  var stride = opts.stride || 1

  var format = opts.format || 'YYYY-MM-DD'
  if (_date.format(format) === 'Invalid date')
    cb(new Error('unrecognized format: '+ format))

  if (! opts.exclude || ! Array.isArray(opts.exclude)) opts.exclude = []
  var exclude = opts.exclude.map(function(item) {
    return Moment().day(item).day()
  })

  rs._read = function() {
    if (_date < hardLimit || ! flowing && ! limit--) return rs.push(null)
    while(exclude.indexOf(_date.day()) !== -1) {
      _date.subtract(stride, 'days')
    }
    rs.push(_date.format(format))
    _date.subtract(stride, 'days')
  }

  cb(null, rs)
}

