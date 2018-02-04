const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://0.0.0.0:3000',
        './src/index.js'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./public/index.html",
            filename: "./index.html"
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loaders: ["babel-loader"]
        },
        {
            test: /\.(css|scss)$/,
            exclude: /node_modules/,
            loaders: ["style-loader", "css-loader", "sass-loader"]
        },
        { //  loader configuration that does not scramble the image file names in the build task 
            test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
            loader: 'file-loader?name=[name].[ext]'  // <-- retain original file name
        }
    ]},
    devServer: { 
        historyApiFallback: true, // need this for react router
        proxy: {
            '/api': {
            target: 'http://localhost:4000',
            secure: false
            }
        }
    }
    
}