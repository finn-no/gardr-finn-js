module.exports = function(config) {

    var settings = {
        basePath: '',
        frameworks: ['mocha', 'browserify', 'es5-shim', 'sinon'],
        files: [{
                pattern: 'dist/js/gardr/**/*.js',
                watched: false,
                included: false,
                served: true
            }, {
                pattern: 'dist/js/gardr/**/iframe.htm',
                watched: false,
                included: false,
                served: true
            }, {
                pattern: 'test/integration/fixtures/*.js',
                watched: true,
                included: false,
                served: true
            },
            'test/**/*.test.js'
        ],

        reporters: ['progress'],

        browserify: {
            watch: true,
            debug: true
        },

        preprocessors: {
            'test/**/*.test.js': 'browserify'
        },

        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        captureTimeout: 30000,
        singleRun: false
    };


    if (process.env.SAUCE_USERNAME && process.env.SAUCE_ACCESS_KEY) {
        settings.browserDisconnectTimeout = 60000;
        settings.browserNoActivityTimeout = 60000;
        settings.captureTimeout = 60000 * 3;
        settings.autoWatch = false;
        settings.sauceLabs = {
            testName: 'Gardr FINN',
            tags: ['gardr', 'finn']
        };
        settings.reporters = ['dots', 'saucelabs'];
        settings.customLaunchers = {};

        var key = process.env.BROWSER_TYPE;
        var target = require('./ci-browsers.js')[key];
        if (!target) {
            console.error('Missing / Unknown BROWSER_TYPE ' + process.env.BROWSER_TYPE);
            process.exit(1);
        }

        Object.keys(target).forEach(function(key){
            settings.customLaunchers[key] = target[key];
        });

        console.log('Running CI tests on', Object.keys(settings.customLaunchers).join(', '));
        settings.browsers = Object.keys(settings.customLaunchers);
    }

    config.set(settings);
};
