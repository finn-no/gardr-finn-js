#!/usr/bin/env node
/* globals rm,mkdir,target,cp,echo,env,exec */

require('shelljs/make');
var maven = require('maven-deploy');
var path = require('path');

var dotbin = require('./util/dotbin.js');

var browserify = dotbin('browserify');
var uglify = dotbin('uglifyjs');
var codestyle = dotbin('finn-js-code-style');
var karma = makeCmd('./node_modules/karma/bin/karma');

function makeCmd (unixPath) {
    var path = platformPath(unixPath);
    return function () {
        exec([path].concat([].slice.call(arguments, 0)).join(' '));
    };
}

function platformPath(p) {
    return p.split('/').join(path.sep);
}

maven.config(require('./maven-config.json'));

target.build = function() {
    rm('-rf', 'dist');
    mkdir('-p', 'dist/js/gardr', 'dist/js/gardr/app', 'dist/js/gardr/desktop', 'dist/js/gardr/mobile');

    ['desktop/host', 'mobile/host'].map(function(name) {
        browserify('-s', 'gardr src/{name}.js -o dist/js/gardr/{name}.js'.replace(/{name}/g, name));
        uglify('dist/js/gardr/{name}.js -m -c -o dist/js/gardr/{name}.min.js'.replace(/{name}/g, name));
    });

    ['app/ext', 'desktop/ext', 'mobile/ext'].map(function(name) {
        browserify('src/{name}.js -o dist/js/gardr/{name}.dev.js'.replace(/{name}/g, name));
        uglify('dist/js/gardr/{name}.dev.js -m -c -o dist/js/gardr/{name}.js'.replace(/{name}/g, name));
    });

    cp('-f', 'node_modules/gardr-ext/iframe.html', 'dist/js/gardr/app/iframe.htm');
    cp('-f', 'node_modules/gardr-ext/iframe.html', 'dist/js/gardr/desktop/iframe.htm');
    cp('-f', 'node_modules/gardr-ext/iframe.html', 'dist/js/gardr/mobile/iframe.htm');
};

target.lint = function() {
    codestyle('src', 'test', 'util');
};

target.test = function () {
    target.lint();
    karma('start', '--single-run');
};

target.ci = function () {
    target.lint();
    ['ie', 'ienew', 'chrome', 'android', 'ios', 'firefox'].forEach(function(browserType){
        env['BROWSER_TYPE'] = browserType;
        karma('start', '--single-run');
    });
};

target.install = function() {
    target.build();
    maven.install();
};

target.snapshot = function() {
    target.build();
    maven.deploy('finntech-internal-snapshot', true);
};

target.release = function() {
    target.build();
    var args = process.argv.slice(3);
    var nextVersion = args.shift() || 'patch';

    echo('npm version ' + nextVersion);
    echo('git push --follow-tags origin master');
    maven.deploy('finntech-internal-release', false);
};

target.all = target.build;
