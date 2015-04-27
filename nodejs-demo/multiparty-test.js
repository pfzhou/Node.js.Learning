var http = require('http'),
  util = require('util'),
  multiparty = require('multiparty'),
  PORT = process.env.PORT || 3001,
  fs = require('fs-extra'),
  path = require('path')
  // , ncp = require('ncp').ncp
  ,
  uploadpath = './uploadfiles'

var formatDate = function(date, style) {
  var y = date.getFullYear();
  var M = "0" + (date.getMonth() + 1);
  M = M.substring(M.length - 2);
  var d = "0" + date.getDate();
  d = d.substring(d.length - 2);
  // var h = "0" + date.getHours();
  // h = h.substring(h.length - 2);
  // var m = "0" + date.getMinutes();
  // m = m.substring(m.length - 2);
  // var s = "0" + date.getSeconds();
  // s = s.substring(s.length - 2);
  return style.replace('yyyy', y).replace('MM', M).replace('dd', d); //.replace('hh', h).replace('mm', m).replace('ss', s);
};

var resHtmlHeader = function(res){
  res.writeHead(200, {
    'content-type': 'text/html'
  });
  res.write(
    '<form action="/upload" enctype="multipart/form-data" method="post">' +
    '<input type="text" name="title"><br />' +
    '<input type="file" name="upload" multiple="multiple"><br />' +
    '<input type="submit" value="Upload"><br />'
  );
}

var server = http.createServer(function(req, res) {
  if (req.url === '/') {
    resHtmlHeader(res);
    res.end('</form>');
  } else if (req.url === '/upload') {
    var form = new multiparty.Form();
    form.uploadDir = './temp';
    form.parse(req, function(err, fields, files) {
      if (err) {
        res.writeHead(400, {
          'content-type': 'text/plain'
        });
        res.end("invalid request: " + err.message);
        return;
      }
      resHtmlHeader(res);
      res.write('received fields:<br /><br />' + util.inspect(fields));
      res.write('<br /><br />');
      res.write('received files:<br /><br />' + util.inspect(files));
      res.write('<br /><br />');

      // file copy to uploadpath
      var date = formatDate(new Date(), 'yyyyMMdd');
      var filesPath = uploadpath + '/' + date;
      fs.exists(filesPath, function(exists) {
        if (!exists) {
          fs.mkdir(filesPath);
        }
      });
      for (var i = 0; i < files.upload.length; i++) {
        var file = files.upload[i];
        var source = file.path;
        var target = filesPath + '/' + file.originalFilename;
        //debugger;

        var stat = '';
        try {
          fs.copySync(source, target);
          console.log('copy ok');
          //res.write(' copy success.');
          stat = 'copy success.';
        } catch (err) {
          console.log('copy err');
          stat = ' copy fail: ' + err;

        };
        console.log(stat);
        res.write('<br />' + (i + 1) + '. ' + file.originalFilename + stat);
      }

      //done
      res.end('<br />files copy done.');
    });
  } else {
    res.writeHead(404, {
      'content-type': 'text/plain'
    });
    res.end('404');
  }
});
server.listen(PORT, function() {
  console.info('listening on http://0.0.0.0:' + PORT + '/');


  // process.on('uncaughtException', function (err) {
  //     console.log(err);
  //   });
});
