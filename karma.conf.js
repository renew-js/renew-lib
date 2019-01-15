module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: [ 'jasmine' ],
        files: [
            'test/**/*.js',
            'src/**/*.js',
        ],
        exclude: [ ],
        preprocessors: { },
        reporters: [ 'progress' ],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: [
            'Firefox',
            'Chrome',
        ],
        singleRun: false,
        concurrency: Infinity,
    });
};
