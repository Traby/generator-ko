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
                    module: true

                }
            }

        },

        karma: {
            unit: {
                configFile: 'etc/karma.conf.js'
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['karma:unit', 'jshint']);

};
