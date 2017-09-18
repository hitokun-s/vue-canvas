const webpack = require("webpack");
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin');
var WebpackStrip = require('webpack-strip');

module.exports = {
  context: __dirname + '/src',

  entry: "./vue-canvas.js",
  
  output: {
    path: __dirname + '/dist',
    filename: "vue-canvas.min.js"
  },
  
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new UnminifiedWebpackPlugin()
  ],

  module: {
    loaders: [
      { test: /\.js$/, loader: WebpackStrip.loader('debug', 'console.log') }
    ]
  }
}