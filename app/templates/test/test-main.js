(function () {

    'use strict';

    Object.keys(window.__karma__.files).filter(function (file) {
        return (/\.spec\.js$/).test(file);
    });

}());
