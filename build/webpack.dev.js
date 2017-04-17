var webpack = require('webpack')
var path = require('path')
var config = require('./conf')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base')
var utils = require('./utils')

var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
    devtool: "cheap-eval-source-map",
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: config.dev.env
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
                // any required list inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
        // extract css
        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].css')
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            hash: true
        }),
        new FriendlyErrorsPlugin()
    ]
})