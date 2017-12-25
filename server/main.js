var express = require('express');
var decode = require('./decode');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.get('/decode',function(req, res){
  var callback = decode.decode("jd","4055764");
  res.end(callback);
});
var server = app.listen(4000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});