(function () {

    'use strict';

    var tests = Object.keys(window.__karma__.files).filter(function (file) {
        return (/\.spec\.js$/).test(file);
    });

    tests.push('angular');
    tests.push('angularMocks');
    tests.push('app');
    tests.push('home');

}());
