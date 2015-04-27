var bunyan = require('bunyan');
var log = bunyan.createLogger({name: 'myapp'});
log.info('hi');
log.warn({lang: 'cn'}, 'test');
log.error({time: '2015-04-24 12:13:14'}, '!!!!!!');
