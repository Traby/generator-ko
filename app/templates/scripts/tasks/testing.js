module.exports = function (grunt) {

  'use strict';

  var async = require('async');
  var fs = require('fs');
  var open = require('open');
  var path = require('path');
  var spawn = require('child_process').spawn;
  var util = require('./util')(grunt);

  var AnsiRemover = require('ansi-remover');
  var DATE_FORMAT = 'yyyymmdd"_"HHMMss';


  grunt.registerTask('test:e2e', 'Run end-to-end tests.', function () {

    var done = this.async();

    var headless = (this.flags.headless === true);
    grunt.verbose.writeln('headless:', headless);

    var startNode = function (cb) {

      grunt.log.write('starting node... ');

      var app = spawn('node', ['scripts/server.js'], {stdio: 'pipe'});
      process.on('exit', function () {
        app.kill();
        grunt.log.writeln('node terminated.');
      });
      app.stdout.setEncoding('utf8');
      app.stdout.on('data', function (data) {
        grunt.verbose.writeln('NodeJS:', data);
      });

      grunt.log.ok('node started.');
      cb();

    }; // startNode

    var loadPage = function (cb) {

      grunt.log.write('loading test page... ');

      // prime the pump
      var phantomjs = require('phantomjs');
      var app = spawn(phantomjs.path, ['scripts/loadpage.js'], {stdio: 'pipe'});
      app.on('close', function (code) {
        if (code === 0) {
          grunt.log.ok('loadpage done.');
          cb();
        } else {
          cb(new Error('Cannot load test web page via PhantomJS, code: ' + code));
        }
      });

    }; // loadPage

    var startProtractor = function (cb) {

      grunt.log.write('starting protractor... ');

      var args = [];
      args.push('node_modules/protractor/bin/protractor');
      args.push('etc/protractor.conf.js');

      var filename = 'reports/e2e/report-' + grunt.template.date(new Date(), DATE_FORMAT) + '.txt';
      grunt.file.mkdir('reports/e2e');
      var reportStream = fs.createWriteStream(filename);
      var nocolors = new AnsiRemover();

      var app = spawn('node', args, {stdio: 'pipe'});
      app.stdout.setEncoding('utf8');
      app.stdout.pipe(nocolors).pipe(reportStream);
      app.stdout.pipe(process.stdout);

      app.stderr.setEncoding('utf8');
      app.stderr.pipe(process.stderr);

      app.on('close', function (code) {
        if (code === 0) {
          grunt.log.ok('protractor done.');
          cb();
        } else {
          cb(new Error('Protractor exited with an error: ' + code));
        }
      });

    }; // startProtractor

    var updateConfigFile = function (cfgfile, tmpfile, port, cb) {

      fs.readFile(cfgfile, function (err, data) {

        if (err) grunt.fail.warn('Cannot read protractor config file:', err);

        var seleniumAddressOld = 'http://localhost:4444/wd/hub';
        var seleniumAddressNew = 'http://localhost:' + port + '/wd/hub';

        var oData = String(data);

        var nData = oData.replace(seleniumAddressOld, seleniumAddressNew);

        // grunt.log.writeln('selenium address:', seleniumAddressNew);

        fs.writeFile(tmpfile, nData, function (err) {
          cb(err);
        });

      });

    }; // update config file

    var startSelenium = function (cb) {

      if (!grunt.option('selenium.jar')) {
        grunt.fail.fatal('Option \'selenium.jar\' not set, exiting.');
      }

      var tmpFile = 'etc/protractor.conf.js';
      var cfgFile = (headless ? 'etc/protractor-phantom.conf.js' : 'etc/protractor-browser.conf.js');

      var portchecker = require('portchecker');
      portchecker.getFirstAvailable(4444, 9999, 'localhost', function (port, host) {

        updateConfigFile(cfgFile, tmpFile, port, function () {

          var finished = false;

          grunt.log.write('starting selenium... ');

          var javaArgs = ['-jar', grunt.option('selenium.jar'), '-port', port, '-debug'];
          if (!headless) {
            var chromeDriverPath = path.relative(process.cwd(), path.resolve('selenium', 'chromedriver'));
            if (process.platform === 'win32') {
              chromeDriverPath += '.exe';
            }
            grunt.verbose.writeln('chrome driver path:', chromeDriverPath);
            javaArgs.push('-Dwebdriver.chrome.driver=' + chromeDriverPath);
          }

          var app = spawn('java', javaArgs, {stdio: 'pipe'});
          app.on('close', function (code) {
            if (!finished) {
              finished = true;
              cb(new Error('selenium exited abnormally: ' + code));
            }
          });
          process.on('exit', function () {
            app.kill();
            grunt.log.writeln('selenium terminated.');
          });
          app.stderr.setEncoding('utf8');
          app.stderr.on('data', function (data) {
            grunt.verbose.writeln('Selenium:', data);
          });
          app.stdout.setEncoding('utf8');
          app.stdout.on('data', function (data) {
            grunt.verbose.writeln('Selenium:', data);
            if (data.indexOf('Started org.openqa.jetty.jetty.Server') > -1) {
              grunt.log.ok('selenium started, port', port);
              finished = true;
              cb();
            }
          });

        }); // update config

      }); // getFirstAvailable

    }; // startSelenium

    var timedCallback = function (cb) {

      var run, timer;
      var timeout = (arguments.length === 2 ? Number(arguments[1]) : 30000);

      run = function () {
        if (timer) {
          clearTimeout(timer);
          timer = null;
          cb.apply(this, arguments);
        }
      };

      var timedOutRun = function () {
        run(new Error('Timeout!'));
      };

      timer = setTimeout(timedOutRun, timeout);

      return run;

    };

    var execute = function (f, cb) {
      f(timedCallback(cb));
    };

    var series = [util.javaVersion, startNode, util.seleniumVersion, startSelenium, loadPage, startProtractor];
    async.forEachSeries(series, execute, function (err) {
      done(err);
    });

  }); // test:e2e

  grunt.registerTask('report:e2e', 'Open latest E2E report.', function () {

    var done = this.async();

    // list files in reports/e2e
    fs.readdir('reports/e2e', function (err, files) {
      files.sort();
      var file = path.resolve(process.cwd(), 'reports', 'e2e', files[files.length - 1]);
      grunt.log.writeln('opening', path.relative(process.cwd(), file), '...');
      open(file);
      done();
    });

  });

  grunt.registerTask('report:unit', 'Open latest unit test coverage report.', function () {

    var done = this.async();

    // list files in reports/e2e
    var dir = path.resolve(process.cwd(), 'reports', 'unit', 'coverage');
    fs.readdir(dir, function (err, files) {

      // find latest Chrome directory
      var chromes = [];
      for (var i = 0; i < files.length; i++)
        if (files[i].indexOf('Chrome ') === 0)
          chromes.push(files[i]);
      chromes.sort();
      var latestChrome = chromes[chromes.length - 1];

      var file = path.resolve(dir, latestChrome, 'index.html');
      grunt.log.writeln('opening', path.relative(process.cwd(), file), '...');

      open(file);

      done();

    });

  });

  grunt.registerTask('test', ['test:unit', 'test:e2e']);
  grunt.registerTask('test:unit', ['karma:unit']);

  grunt.registerTask('jenkins', ['karma:headless', 'test:e2e:headless', 'jshint']);

};
