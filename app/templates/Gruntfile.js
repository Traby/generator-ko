module.exports = function (grunt) {

    'use strict';

    grunt.initConfig({

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
                configFile: 'etc/testing/karma-browser.conf.js'
            },
            headless: {
                configFile: 'etc/testing/karma-phantom.conf.js'
            }
        },

        recess: {
            build:  {
                src: [ 'etc/less/main.less' ],
                dest: 'app/style.css',
                options: {
                    compile: true,
                    compress: true,
                    noUnderscores: false,
                    noIDs: false,
                    zeroUnits: false
                }
            }
        },

		express: {
			options: {
				background: false,
				port: 8000,
				script: 'scripts/server.js'
			},
			test: {
				args: [ ]
			}
		}

    });

	grunt.loadTasks('scripts/tasks');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-recess');

    grunt.registerTask('default', ['test', 'jshint']);
    grunt.registerTask('build', ['recess']);

    // local server
    grunt.registerTask('server', 'run local server', function() {

		if (!this.flags.run) {
			var open = require('open');
			grunt.log.writeln('opening http://localhost:8000/ ...');
			setTimeout(function() {
				open('http://localhost:8000/');
			}, 1000);
		}

		grunt.task.run('express:test');

    });

};
