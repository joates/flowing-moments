## flowing-moments


### Installation

```npm install flowing-moments```


### API

use as a module..
```javascript
var days = require('flowing-moments')

// > use the defaults:
// days('', {}, cb)

// > specify a date that moment can parse:
// days(any_valid_date, cb)

// > opts are optional,
// > cb can be 2nd or 3rd parameter:
// days(Date.now(), null, cb)

var opts = { format: 'dddd Do MMM YYYY' }
days('2010-12-25', opts, function(err, data) {
  if (err) throw err
  data.pipe(process.stdout)	// streaming data
})
```

_or from the command line.._
```javascript
node index.js --format='dddd Do, MMM YYYY' --limit=5 '2008-02-29'

//output is:
Friday 29th, Feb 2008
Friday 22nd, Feb 2008
Friday 15th, Feb 2008
Friday 8th, Feb 2008
Friday 1st, Feb 2008
```

_its easy to get the previous four fridays:_
```shell
node index.js --startDay='fri' --stride=7 |head -n4
```

_display four weeks but exclude the weekends:_
```javascript
node index.js '2008-02-29' -l20 --exclude='sat,sun' --format='ddd Do, MMM YYYY'

//output is:
Fri 29th, Feb 2008
Thu 28th, Feb 2008
Wed 27th, Feb 2008
Tue 26th, Feb 2008
Mon 25th, Feb 2008
Fri 22nd, Feb 2008
Thu 21st, Feb 2008
Wed 20th, Feb 2008
Tue 19th, Feb 2008
Mon 18th, Feb 2008
Fri 15th, Feb 2008
Thu 14th, Feb 2008
Wed 13th, Feb 2008
Tue 12th, Feb 2008
Mon 11th, Feb 2008
Fri 8th, Feb 2008
Thu 7th, Feb 2008
Wed 6th, Feb 2008
Tue 5th, Feb 2008
Mon 4th, Feb 2008
```

_display usage information:_
```shell
node index.js --help
```


### Documentation

see the [Moment.js docs](http://momentjs.com/docs/#/displaying/format/) for different ways of formatting the date output


### License

MIT
