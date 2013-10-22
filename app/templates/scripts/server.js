var express = require('express');
var path = require('path');

var app = express();
var port = 8000;
var root = null;

app.configure('development', function () {
  root = path.resolve(__dirname, '..', 'app');
});

app.configure('production', function () {
  root = path.resolve(__dirname, '..', 'deploy', 'app');
});

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.logger());
  app.use(express.static(root));
  app.use(app.router);
});

/* Default Mapping */
app.get('/', function (req, res) {
  res.redirect('index.html');
});

/* Launch server */
app.listen(port);
console.log('Serving %s on port %d', root, port);
