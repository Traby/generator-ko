'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var KoGenerator = module.exports = function KoGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
      this.installDependencies({ skipInstall: options['skip-install'] });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(KoGenerator, yeoman.generators.Base);

KoGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);

    var prompts = [{
        type: 'confirm',
        name: 'koforit',
        message: 'Would you like to generate a ko project?',
        default: true
    }];

    this.prompt(prompts, function (props) {
        this.koforit = props.koforit;
        if (this.koforit) cb();
    }.bind(this));

};

KoGenerator.prototype.app = function app() {
    this.mkdir('app');
    this.mkdir('etc');
    this.mkdir('app/components');
    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
    this.copy('bowerrc.json', '.bowerrc');
    this.copy('Gruntfile.js', 'Gruntfile.js');
};

KoGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('editorconfig', '.editorconfig');
};

KoGenerator.prototype.website = function website() {

    this.copy('website/index.html', 'app/index.html');

    this.mkdir('app/js');
    this.copy('website/js/app.js', 'app/js/app.js');

    this.mkdir('app/js/controllers');
    this.copy('website/js/controllers/home.js', 'app/js/controllers/home.js');

    this.mkdir('app/js/services');
    this.copy('website/js/services/configuration.js', 'app/js/services/configuration.js');

    this.mkdir('app/views');
    this.copy('website/views/home.html', 'app/views/home.html');

};

KoGenerator.prototype.style = function style() {

    this.copy('etc/main.less', 'etc/main.less');

};

KoGenerator.prototype.testing = function testing() {

    this.copy('etc/karma.conf.js', 'etc/karma.conf.js');

    this.mkdir('test');
    this.copy('test/test-main.js', 'test/test-main.js');

    this.mkdir('test/unit');
    this.copy('test/unit/app.spec.js', 'test/unit/app.spec.js');

    this.mkdir('test/unit/services');
    this.copy('test/unit/services/configuration.spec.js', 'test/unit/services/configuration.spec.js');

    this.mkdir('test/unit/controllers');
    this.copy('test/unit/controllers/home.spec.js', 'test/unit/controllers/home.spec.js');

};
