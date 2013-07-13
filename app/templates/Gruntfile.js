module.exports = function (grunt) {

    'use strict';

    grunt.initConfig({

        jshint: {
            all: [
                'app/**/*.js',
                'test/**/*.js'
            ],
            options: {
                'esnext': true,
                'bitwise': true,
                'camelcase': true,
                'curly': true,
                'eqeqeq': true,
                'immed': true,
                'indent': 4,
                'latedef': true,
                'newcap': true,
                'noarg': true,
                'quotmark': 'single',
                'regexp': true,
                'undef': true,
                'unused': true,
                'strict': true,
                'trailing': true,
                'smarttabs': true,
                'white': true,
                'ignores': [
                    'app/components/**'
                ],
                'globals': {
                    require: true,
                    define: true,
                    document: true,
                    angular: true
                }
            }

        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('default', ['jshint']);

};
