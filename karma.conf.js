module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: [
            'mocha',
            'sinon-chai'
        ],
        files: [
            'test/**/*.spec.js',
            { pattern: 'src/**/*.js', included: false }
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
                require('rollup-plugin-sass'),
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
            'Chrome',
        ],
        singleRun: false,
        concurrency: Infinity,
    });
};
