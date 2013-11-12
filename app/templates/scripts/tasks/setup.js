module.exports = function (grunt) {

  'use strict';

  var async = require('async');
  var exec = require('child_process').exec;
  var fs = require('fs');
  var spawn = require('child_process').spawn;
  var util = require('./util')(grunt);

  var seleniumChecksum = function (filename, cb) {

    var crypto = require('crypto');
    var fs = require('fs');

    var checksum = crypto.createHash('md5');

    var s = fs.ReadStream(filename);
    s.on('data', function (d) {
      checksum.update(d);
    });

    s.on('end', function () {
      var d = checksum.digest('hex');
      cb(d);
    });

  }; // seleniumChecksum

  var seleniumCheckJarfileIntegrity = function (cb) {

    var filename = grunt.option('selenium.jar');
    var version = grunt.option('selenium.version');

    seleniumChecksum(filename, function (md5) {

      // TODO: put into config file
      if (version === '2.35.0' && md5 !== 'bc34d2b9727c1ac3aa45fe98dd666cbf') {
        cb(new Error('Selenium JAR with faulty checksum.'));
      } else if (version === '2.37.0' && md5 !== 'f6c80b18863e9b8f86b5269a53466160') {
        cb(new Error('Selenium JAR with faulty checksum.'));
      } else {
        cb();
      }

    });

  };

  var seleniumInstall = function (cb) {

    var done = (cb ? cb : this.async());

    fs.exists(grunt.option('selenium.jar'), function (exists) {
      if (exists) {
        grunt.log.writeln('Selenium already installed. Skipping.');
        seleniumCheckJarfileIntegrity(done);
      } else {
        grunt.log.writeln('installing selenium ...');
        grunt.verbose.writeln('spawning', util.installer, '...');
        var app = spawn('node', [util.installer], {stdio: 'pipe'});
        app.on('close', function () {
          seleniumCheckJarfileIntegrity(done);
        });
      }
    });

  }; // seleniumInstall

  grunt.registerTask('setup', 'Install and update project dependencies.', function () {

    var done = this.async();

    var execute = function (cmd, cb) {
      grunt.log.writeln(cmd);
      exec(cmd, function (err) {
        cb(err);
      });
    };

    async.series([

      // which versions of git, node and java?
      function (cb1) {
        async.parallel([
          function (cb2) {
            util.javaVersion(cb2);
          },
          function (cb2) {
            util.nodeVersion(cb2);
          },
          function (cb2) {
            util.gitVersion(cb2);
          }
        ], function (err, results) {
          if (err) {
            cb1(err);
          } else {
            grunt.log.ok('git ', results[2]);
            grunt.log.ok('node', results[1]);
            grunt.log.ok('java', results[0]);
            cb1();
          }
        });
      },

      // first, update the global npm modules
      function (cb1) {
        execute('npm -g update grunt-cli bower', cb1);
      },

      // next, run two processes in parallel: npm/selenium install and the bower component update
      function (cb1) {

        // update local npm and bower components in parallel
        async.parallel([

          // update local npm modules and afterwards install selenium
          function (cb2) {
            async.series([
              function (cb3) {
                execute('npm install', cb3);
              },
              function (cb3) {
                execute('npm update', cb3);
              },
              function (cb3) {
                execute('npm prune', cb3);
              },
              function (cb3) {
                util.seleniumVersion(cb3);
              },
              function (cb3) {
                seleniumInstall(cb3);
              }
            ], function (err) {
              cb2(err);
            });
          },

          // update bower components
          function (cb2) {
            var commands = ['bower install', 'bower update', 'bower prune'];
            async.forEachSeries(commands, execute, function (err) {
              cb2(err);
            });
          }

        ], function (err) {
          cb1(err);
        });

      }

    ], function (err) {
      done(err);
    });

  });

};
