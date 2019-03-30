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
            'test/**/*.spec.js': [ 'webpack' ],
            'src/**/*.js': 'coverage',
        },
        webpack: {
            mode: 'development',
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        use: {
                            loader: 'istanbul-instrumenter-loader',
                            options: { esModules: true }
                        },
                        include: /src\.*/,
                        enforce: 'post',
                        exclude: /test|node_modules|\.spec\.js$|\.json$|index\.js|\.s?css$/,
                    }
                ]
            }
        },
        reporters: [ 'progress', 'coverage-istanbul' ],
        coverageIstanbulReporter: {
            dir : 'coverage/',
            reports: [
                'json',
                'lcov',
            ]
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: [
            'FirefoxHeadless',
        ],
        customLaunchers: {
            FirefoxHeadless: {
                base: 'Firefox',
                flags: [ '-headless' ],
            },
        },
        singleRun: true,
        concurrency: Infinity,
    });
};
