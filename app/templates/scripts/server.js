var express = require('express');
var fs      = require('fs');
var path    = require('path');

var root = path.resolve(__dirname, '..', 'app');
var app  = express();

/* Configuration */
app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.logger());
    //app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    app.use(express.static(root));
    app.use(app.router);
});

/* Default Mapping */
app.get('/', function(req, res) {
    res.redirect('index.html');
});

/* Launch server */
app.listen(8000);
console.log('serving app (', root, ') at http://localhost:8000');
