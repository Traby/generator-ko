# ko generator

A [Yeoman](http://yeoman.io/) generator for [AngularJS](http://angularjs.org/) projects.

## Features

  - One-step provisioning of modularized AngularJS skeleton application for new projects.
  - Management of web packages via [Bower](http://bower.io/).
  - Automation of common tasks via [Grunt](http://gruntjs.com/).
  - [Bootstrap](http://getbootstrap.com/) 3.0 support with the [Less](http://lesscss.org/) stylesheet language.
  - Unit testing with [Jasmine](http://pivotal.github.io/jasmine/) via the [Karma](http://karma-runner.github.io/) test harness.
  - E2E, integration or BDD testing with [Selenium](http://docs.seleniumhq.org/) and [Protractor](https://github.com/angular/protractor). Either with a real browser such as Chrome or with [PhantomJS](http://phantomjs.org/) for headless testing in a CI (continuous integration) environment.

## Prerequisites

 - Install [Git](http://help.github.com/set-up-git-redirect)
 - Install [Node.js](http://nodejs.org/download/)
 - Install [Java](http://java.com/) (Required for testing with Selenium)

Note: for Mac users, it is highly recommended to install [Homebrew](http://brew.sh/) and then to install Git and NodeJS via the following command `brew install git node`.

## Getting started
- Make sure you have yeoman installed:
    `npm install -g yo bower grunt-cli`
- Install the generator: `npm install -g generator-ko`
- Run: `yo ko`

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)

## Roadmap
- README
- minification and concatination
- deploy step
