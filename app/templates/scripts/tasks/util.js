module.exports = function (grunt) {

  'use strict';

  var fs = require('fs');
  var linestream = require('linestream');
  var path = require('path');
  var spawn = require('child_process').spawn;

  var installer = path.resolve(process.cwd(), 'node_modules', 'protractor', 'bin', 'install_selenium_standalone');

  var gitVersion = function (cb) {

    var finished = false;

    var app = spawn('git', ['--version'], {stdio: 'pipe'});
    app.on('close', function (code) {
      finished = true;
      if (code !== 0) {
        cb(new Error('git terminated abnormally: ' + code));
      }
    });

    var reGitVersion = /git\s+version\s+([\d\._-]+)/;
    app.stdout.setEncoding('utf8');
    app.stdout.on('data', function (data) {
      if (!finished) {
        var match = reGitVersion.exec(data);
        if (match !== null) {
          finished = true;
          var version = match[1];
          cb(null, version);
        }
      }
    });

  };

  var javaVersion = function (cb) {

    var finished = false;

    var app = spawn('java', ['-version'], {stdio: 'pipe'});
    app.on('close', function (code) {
      finished = true;
      if (code !== 0) {
        cb(new Error('java terminated abnormally: ' + code));
      }
    });

    var reJavaVersion = /java\s+version.*"([\d\._-]+)"/;
    app.stderr.setEncoding('utf8');
    app.stderr.on('data', function (data) {
      if (!finished) {
        var match = reJavaVersion.exec(data);
        if (match !== null) {
          finished = true;
          var version = match[1];
          cb(null, version);
        }
      }
    });

  };

  var nodeVersion = function (cb) {

    var finished = false;

    var app = spawn('node', ['--version'], {stdio: 'pipe'});
    app.on('close', function (code) {
      finished = true;
      if (code !== 0) {
        cb(new Error('node terminated abnormally: ' + code));
      }
    });

    var reNodeVersion = /[Vv]*([\d\._-]+)/;
    app.stdout.setEncoding('utf8');
    app.stdout.on('data', function (data) {
      if (!finished) {
        var match = reNodeVersion.exec(data);
        if (match !== null) {
          finished = true;
          var version = match[1];
          cb(null, version);
        }
      }
    });

  };

  var seleniumVersion = function (cb) {

    var finished = false;

    var haystack = linestream.create(installer);

    haystack.on('error', function (err) {
      grunt.warn(err);
    });

    var needle = 'selenium-server-standalone-';
    haystack.on('data', function (line) {
      if (!finished) {
        var offset = line.indexOf(needle);
        if (offset > -1) {
          var end = line.indexOf('.jar\';');
          var version = line.substring(offset + needle.length, end);
          var jar = path.resolve('selenium', 'selenium-server-standalone-' + version + '.jar');
          finished = true;
          grunt.verbose.writeln(grunt.option('selenium.version', version));
          grunt.verbose.writeln(grunt.option('selenium.jar', jar));
          cb(null, version);
        }
      } // finished

    });

  };

  return {
    installer: installer,
    gitVersion: gitVersion,
    javaVersion: javaVersion,
    nodeVersion: nodeVersion,
    seleniumVersion: seleniumVersion
  };

};
