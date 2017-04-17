

module.exports = {
    entry: {
        index: './app.js',
        vendor: ['react', 'react-dom', 'console-polyfill', 'es5-shim']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].js'
    },
    debug: true,
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['babel-loader'],
            },
        ],
    },
};
