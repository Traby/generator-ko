var page = require('webpage').create();
var url = 'http:/localhost:8000/';
page.open(url, function (status) {
  console.log('status:', status);
  phantom.exit();
});
