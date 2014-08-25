## flowing-moments


### Installation

```npm install flowing-moments```


### API

use as a module..
```javascript
var days = require('flowing-moments')

_// > use the defaults:_
_// days('', {}, cb)_

_// > specify a date that moment can parse:_
_// days(any_valid_date, cb)_

_// > opts are optional,_
_// > cb can be 2nd or 3rd parameter:_
_// days(Date.now(), null, cb)_

var opts = { format: 'dddd Do MMM YYYY' }
days('2010-12-25', opts, function(err, data) {
  if (err) throw err
  data.pipe(process.stdout)	// streaming data
})
```

_or from the command line.._
```javascript
node index.js --format='dddd Do, MMM YYYY' --limit=5 '2008-02-29'

_//output is:_
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
```shell
node index.js '2008-02-29' --limit=20 --stride=1 --exclude='sat,sun' --format='ddd Do, MMM YYYY'
```

_display usage information:_
```shell
node index.js --help
```


### Documentation

see the [Moment.js docs](http://momentjs.com/docs/#/displaying/format/) for different ways of formatting the date output


### License

MIT
