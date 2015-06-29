# Garðr - FINN bundle


[![Build Status](https://api.travis-ci.org/finn-no/gardr-finn-js.png?branch=master)](https://travis-ci.org/finn-no/gardr-finn-js)
[![Dependency Status](https://david-dm.org/finn-no/gardr-finn-js.png)](https://david-dm.org/finn-no/gardr-finn-js)
[![devDependency Status](https://david-dm.org/finn-no/gardr-finn-js/dev-status.png)](https://david-dm.org/finn-no/gardr-finn-js#info=devDependencies)


[![Sauce Test Status](https://saucelabs.com/browser-matrix/gardr-finn-js.svg)](https://saucelabs.com/u/gardr-finn-js)


Garðr is a library for embedding content from external sources such as advertisements or similar third party content. This project bundles together the host, ext and plugins needed for FINN.no, so we can use this in our different apps where we use Garðr.


# Building

## Prerequisites
* [NodeJS + NPM](http://nodejs.org)

## Building

    $ npm install
    $ npm run build


## Logging

Debugging can be done by configuring logging to either the browser console or as an overlay inside the iframes rendered by Garðr.

You can turn on logging by adding an url-fragment with log level: #loglevel=4
By default it will display an overlay inside each banner with the log output. If the banner isn't visible, you can output to console by using: #loglevel=4&logto=console

*NB!* If the banner injects another iframe we have no good way of catching errors :(


## Polyfills required for IE8+ support

* [ES5-shim](https://npmjs.org/package/es5-shim) You do not need a sham (unsafe polyfills).
