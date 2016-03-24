var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');

var isProductionMode = process.argv.indexOf('-production') != -1;

var buildDistPath = 'builds';

module.exports = {
    devtool: isProductionMode ? undefined : 'source-map',
    entry: './src',
    output: {
        path: buildDistPath,
        filename: 'bundle.js',
        chunkFilename: '[name].js', //allow to name split chunks
        publicPath: buildDistPath + '/'
    },
    module: {
        preLoaders: [
            {
                test: /\.js/,
                loader: 'eslint',
            }
        ],
        loaders: [
            {
                test: /\.js/,
                exclude: /(node_modules|bower_components)/, //avoid that babel will treaverse files third-party code //TODO is it needed? webpack entry is ./src'
                loader: 'babel',
                query: {presets: ['es2015']}
            },
            {
                test:   /\.html/,
                loader: 'html',
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            },
            {
                test:   /\.(png|gif|jpe?g|svg)$/i,
                loader: 'url',
                query: {limit: 10000} //if the asset is smaller than 10kb inline it, instead of giving the url
            }
        ]
    },
    plugins:
        isProductionMode
        ?
            [
                // Cleanup the builds/ folder before compiling
                new CleanPlugin(buildDistPath),
                // prevents creating chunks that would be too small to be worth loading separately
                new webpack.optimize.MinChunkSizePlugin({
                    minChunkSize: 51200, // ~50kb
                }),
                //extract common chunks dependency into a shared js
                new webpack.optimize.CommonsChunkPlugin({
                    name: 'main', // Move dependencies to our main file
                    children: true, // Look for common dependencies in all children,
                    minChunks: 2, // How many times a dependency must come up before being extracted
                }),
                //minify code
                new webpack.optimize.UglifyJsPlugin({
                    mangle:   true,
                    compress: {
                        warnings: false, // Suppress uglification warnings
                    },
                })
            ]
        :
            []
};
