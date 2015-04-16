var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var ejs = require('ejs');

var session = require('express-session'); 
var MongoStore = require('connect-mongodb'); 
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var server_config = new Server('localhost', 27017, {auto_reconnect:true, native_parser: true});
var db = new Db('session', server_config, {safe: false});  
var mongo_store = new MongoStore({db: db, reapInterval: 3000}); // check every 3 seconds

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html',require('ejs').renderFile);
app.set('view engine', 'html');


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({ resave: true,
                  saveUninitialized: true,
                  cookie: { maxAge: 900000 }, // expire session in 15 min or 900 seconds
                  secret: 'my secret',
                  store: mongo_store
}));

app.use(function(req, res, next){
  res.locals.user = req.session.user;
  var err = req.session.error;
  delete req.session.error;
  res.locals.message = '';
  if (err) res.locals.message = '<div class="alert alert-danger">' + err + '</div>';
  next();
});


app.use(express.static(path.join(__dirname, 'public')));


app.all('/login', routes.notAuthentication);
app.get('/login', routes.login);
app.post('/login', routes.doLogin);
app.get('/logout', routes.authentication);
app.get('/logout', routes.logout);
app.get('/home', routes.authentication);
app.get('/home', routes.home);

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
};

app.get('/users', users);

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
