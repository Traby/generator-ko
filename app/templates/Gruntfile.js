module.exports = function (grunt) {

    'use strict';

    grunt.initConfig({

        jshint: {
            all: [
                'app/**/*.js',
                'test/**/*.spec.js'
            ],
            options: {
                'bitwise': true,
                'camelcase': true,
                'curly': true,
                'eqeqeq': true,
                'esnext': true,
                'indent': 4,
                'immed': true,
                'latedef': true,
                'newcap': true,
                'noarg': true,
                'quotmark': 'single',
                'regexp': true,
                'strict': true,
                'smarttabs': true,
                'trailing': true,
                'undef': true,
                'unused': true,
                'white': true,
                'ignores': [
                    'app/components/**'
                ],
                'globals': {

                    // app globals
                    services: true,

                    // framework globals
                    angular: true,

                    // browser globals
                    document: true,
                    window: true,

                    // jasmine globals
                    afterEach: true,
                    beforeEach: true,
                    describe: true,
                    expect: true,
                    inject: true,
                    it: true,
                    module: true,
                    spyOn: true

                }
            }

        },

        karma: {
            unit: {
                configFile: 'etc/karma.conf.js'
            }
        },

        recess: {
            build:  {
                src: [ 'etc/main.less' ],
                dest: 'app/style.css',
                options: {
                    compile: true,
                    compress: true,
                    noUnderscores: false,
                    noIDs: false,
                    zeroUnits: false
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-recess');

    grunt.registerTask('test', ['karma:unit', 'jshint']);
    grunt.registerTask('default', ['recess']);

};
