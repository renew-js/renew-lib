const path = require('path');

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'renew.js'
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                "css-loader",
                "sass-loader"
            ]
        }]
    }
};
