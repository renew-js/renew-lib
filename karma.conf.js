module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: [
            'jasmine'
        ],
        files: [
            { pattern: 'test/**/*.spec.js', watched: false }
        ],
        exclude: [ 'karma.conf.js' ],
        preprocessors: {
            "test/**/*.spec.js": [ "rollup" ],
        },
        rollupPreprocessor: {
            plugins: [
                require('rollup-plugin-node-resolve')({ customResolveOptions: { moduleDirectory: 'node_modules' } }),
                require('rollup-plugin-node-builtins')(),
                require('rollup-plugin-commonjs')({ ignoreGlobal: true, sourceMap: true }),
                require('rollup-plugin-json')(),
                require('rollup-plugin-babel')(),
            ],
            output: {
                format: 'iife',
                name: 'Drawing',
                sourcemap: 'inline'
            }
        },
        reporters: [ 'progress' ],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: [
            'Firefox',
            'FirefoxHeadless',
            'Chrome',
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
