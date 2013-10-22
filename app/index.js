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

  var prompts = [
    {
      type: 'confirm',
      name: 'koforit',
      message: 'Would you like to generate a ko project?',
      default: true
    }
  ];

  this.prompt(prompts, function (props) {
    this.koforit = props.koforit;
    if (this.koforit) cb();
  }.bind(this));

};

KoGenerator.prototype.base = function app() {

  this.copy('_bowerrc.json', '.bowerrc');
  this.copy('_editorconfig.txt', '.editorconfig');
  this.copy('_gitignore.txt', '.gitignore');
  this.copy('_jshintrc.json', '.jshintrc');
  this.copy('bower.json', 'bower.json');
  this.copy('package.json', 'package.json');
  this.copy('Gruntfile.js', 'Gruntfile.js');

};

KoGenerator.prototype.scripts = function style() {

  this.mkdir('scripts');
  this.copy('scripts/loadpage.js', 'scripts/loadpage.js');
  this.copy('scripts/server.js', 'scripts/server.js');

  this.mkdir('scripts/tasks');
  this.copy('scripts/tasks/util.js', 'scripts/tasks/util.js');
  this.copy('scripts/tasks/setup.js', 'scripts/tasks/setup.js');
  this.copy('scripts/tasks/testing.js', 'scripts/tasks/testing.js');

};

KoGenerator.prototype.app = function website() {

  this.mkdir('app');
  this.mkdir('app/lib'); // for bower components

  this.copy('app/index.html', 'app/index.html');

  this.mkdir('app/js');
  this.copy('app/js/app.js', 'app/js/app.js');

  this.mkdir('app/js/controllers');
  this.copy('app/js/controllers/home.js', 'app/js/controllers/home.js');

  this.mkdir('app/js/services');
  this.copy('app/js/services/configuration.js', 'app/js/services/configuration.js');

  this.mkdir('app/views');
  this.copy('app/views/home.html', 'app/views/home.html');

};

KoGenerator.prototype.less = function style() {

  this.mkdir('css');
  this.copy('css/main.less', 'css/main.less');

};

KoGenerator.prototype.testing = function testing() {

  this.mkdir('etc');
  this.copy('etc/karma-browser.conf.js', 'etc/karma-browser.conf.js');
  this.copy('etc/karma-phantom.conf.js', 'etc/karma-phantom.conf.js');
  this.copy('etc/protractor-browser.conf.js', 'etc/protractor-browser.conf.js');
  this.copy('etc/protractor-phantom.conf.js', 'etc/protractor-phantom.conf.js');

  this.mkdir('test');

  this.mkdir('test/unit');
  this.copy('test/unit/app.spec.js', 'test/unit/app.spec.js');

  this.mkdir('test/unit/services');
  this.copy('test/unit/services/configuration.spec.js', 'test/unit/services/configuration.spec.js');

  this.mkdir('test/unit/controllers');
  this.copy('test/unit/controllers/home.spec.js', 'test/unit/controllers/home.spec.js');

  this.mkdir('test/e2e');
  this.copy('test/e2e/app.spec.js', 'test/e2e/app.spec.js');

};
