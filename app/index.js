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
    this.mkdir('test');

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
};

KoGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
};

