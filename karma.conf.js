module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: [
            'jasmine',
        ],
        files: [
            { pattern: 'test/**/*.spec.js', watched: false }
        ],
        exclude: [ 'karma.conf.js' ],
        preprocessors: {
            "test/**/*.spec.js": [ "webpack" ],
        },
        webpack: {
            mode: 'development',
        },
        reporters: [ 'progress' ],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: [
            'FirefoxHeadless',
        ],
        customLaunchers: {
            FirefoxHeadless: {
                base: 'Firefox',
                flags: [ '-headless' ],
            },
        },
        singleRun: false,
        concurrency: Infinity,
    });
};
