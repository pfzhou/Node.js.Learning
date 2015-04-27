var restify = require('restify');

function respond(req, res, next) {
  res.end('hello ' + req.params.name);
}

var server = restify.createServer();
server.get('/hello/:name', respond);


// var socketio = require('socketio');
// var fs = require('fs');
// var server = restify.createServer();
// var io = socketio.listen(server);
//
// server.get('/', function indexHTML(req, res, next) {
//   fs.readFile(__dirname + '/index.html', function(err, data) {
//     if (err) {
//       next(err);
//       return;
//     }
//
//     res.setHeader('Content-Type', 'text/html');
//     res.writeHead(200);
//     res.end(data);
//     next();
//   })
// });
//
//
// io.sockets.on('connection', function(socket) {
//   socket.emit('news', {
//     hello: 'world'
//   });
//   socket.on('my other event', function(data) {
//     console.log(data);
//   });
// });

server.listen(3002, function() {
  console.log('socket.io server listening at %s', server.url);
});
