module.exports = function (grunt) {

  'use strict';

  grunt.initConfig({

    clean: {
      deploy: ['deploy'],
      build: ['deploy/app/lib', 'deploy/app/js'],
      reports: ['reports']
    },

    copy: {
      deploy: {
        files: [
          {src: ['app/**'], dest: 'deploy/'}
        ]
      }
    },

    jshint: {
      all: {
        src: [ 'app/**/*.js', 'test/**/*.spec.js' ],
        options: {
          ignores: [ 'app/lib/**' ],
          jshintrc: '.jshintrc'
        }
      }
    },

    karma: {
      unit: {
        configFile: 'etc/karma-browser.conf.js'
      },
      headless: {
        configFile: 'etc/karma-phantom.conf.js'
      }
    },

    recess: {
      build: {
        src: [ 'css/main.less' ],
        dest: 'app/style.css',
        options: {
          compile: true,
          compress: true,
          noUnderscores: false,
          noIDs: false,
          zeroUnits: false,
          includePath: ['app/lib/bootstrap/less']
        }
      }
    },

    // jshint camelcase: false
    express: {
      options: {
        background: false,
        script: 'scripts/server.js'
      },
      test: {
        options: {
          node_env: 'development'
        },
        args: [ ]
      },
      prod: {
        options: {
          node_env: 'production'
        },
        args: [ ]
      }
    },
    // jshint camelcase: true

    'useminPrepare': {
      html: ['deploy/app/index.html']
    },
    'usemin': {
      html: ['deploy/app/index.html']
    }


  });

  grunt.loadTasks('scripts/tasks');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-usemin');

  grunt.registerTask('default', ['test', 'jshint']);
  grunt.registerTask('build', ['clean:deploy', 'recess', 'copy', 'useminPrepare', 'concat', 'uglify', 'usemin', 'clean:build']);

  // local server
  grunt.registerTask('server', 'run local server', function () {

    if (!this.flags.run) {
      var open = require('open');
      grunt.log.writeln('opening http://localhost:8000/ ...');
      setTimeout(function () {
        open('http://localhost:8000/');
      }, 1000);
    }

    if (this.flags.deploy) {
      grunt.task.run('express:prod');
    } else {
      grunt.task.run('express:test');
    }

  });

};
