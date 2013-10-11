# ko generator

A [Yeoman](http://yeoman.io/) generator for [AngularJS](http://angularjs.org/) projects.

## Features

  - One-step generation of modularized AngularJS skeleton application for new projects.
  - Management of web packages via [Bower](http://bower.io/).
  - Automation of common tasks via [Grunt](http://gruntjs.com/).
  - [Bootstrap](http://getbootstrap.com/) 3.0 support with the [Less](http://lesscss.org/) stylesheet language.
  - Concatenation and minification of javascript files.
  - Unit testing with [Jasmine](http://pivotal.github.io/jasmine/) via the [Karma](http://karma-runner.github.io/) test runner.
  - E2E (end-to-end) testing with [Selenium](http://docs.seleniumhq.org/) and [Protractor](https://github.com/angular/protractor), either with a real browser such as Chrome or with [PhantomJS](http://phantomjs.org/) for headless testing in a CI (continuous integration) environment.
  - No RequireJS.

## Prerequisites

 - Install [git](http://help.github.com/set-up-git-redirect)
 - Install [node.js](http://nodejs.org/download/)
 - Install [Java](http://java.com/) (Required for testing with Selenium)

Note: for Mac users, it is recommended to install Git and NodeJS via a 3rd party package manager such as [Homebrew](http://brew.sh/), for example, `brew install git node`.

### Node Configuration

It is also recommended to configure npm (node package manager) to install global packages on a per-user basis in a location writable by the current user rather than in a system-wide location which requires administrator rights. Do this by creating a directory in your home directory, for example `.node-modules`, and configure npm to use it for global modules:

	npm config set prefix $HOME/.node-modules

Be sure to add the `$HOME/.node-modules/bin` directory to your `PATH`.

Note: do not use the directory `$HOME/.npm` as this directory is already used by npm to cache modules.


## Getting started

Before you can start generating skeleton projects the generator must be installed on your local machine.

Check out the project with git:

	git clone https://github.com/kwo/generator-ko.git

Link the project into the global node modules directory:

	cd generator-ko
	npm link

Install dependencies:

	npm install -g yo bower grunt-cli

You are now finally ready to start generating projects.

## Generating Projects

Create a directory for your new project. From inside the project directory, run the generator via the following command,

	yo ko

To complete the installation, by installing selenium and updating npm and bower dependencies, run the following command,

	grunt setup

Compile project artifacts, for example, the css file,

	grunt build

View the project,

	grunt server

Run tests,

	grunt test

View the test reports,

	grunt report:unit
	grunt report:e2e

Clean up old test reports,

	grunt report:clean

Run the tests in headless mode,

	grunt jenkins


## Roadmap
- move main less file to top-level dir
- add option to grunt server to test deploy
- replace report:clean with simple clean task
- deploy step

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
