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
                        exclude: /node_modules|\.spec\.js$|\.json$|index\.js|\.s?css$/,
                    }
                ]
            }
        },
        reporters: [ 'progress', 'coverage' ],
        coverageReporter: {
            reports: [
                'text-summary',
                { subdir: '.', type:'lcovonly' },
                { subdir: '.', type:'json' },
            ],
            fixWebpackSourcePaths: true
        },
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
