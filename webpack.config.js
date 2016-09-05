var extend = require("extend");
var path = require("path");
var webpack = require("webpack");
var fs = require("fs");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var sass = require("node-sass");

var DEBUG = !process.argv.includes('--release');

var srcPath = path.join(__dirname, "./modules");
var destPath = path.join(__dirname, "./public");
var corePath = path.join(__dirname, "./core");
var nodeModulesPath = path.join(__dirname, "./node_modules");

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
      return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
      nodeModules[mod] = 'commonjs ' + mod;
  });

var config = {
}

var clientConfig = extend({}, true, config, {
  name: 'browser',
  entry: {
      'header.css':  './frontend/main.scss',
      'header.js':   './frontend/main.ts',
  },
  output: {
    filename: '[name]',
    path: destPath
  },
  module: {
    loaders: [
        // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
        { test: /\.tsx?$/, loader: "ts-loader" },

        {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        },
        // All files with a '.scss' extension will be handled by 'sass-loader'.
        {
          test: /\.scss$/i,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
        },
    ],
  },

  // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
  plugins: [
      new ExtractTextPlugin("[name]"),
      new CopyWebpackPlugin([
        { flatten: true, from: './modules/*/frontend/images/*', to: destPath},
      ])
      // new webpack.optimize.UglifyJsPlugin( {
      //   compress: {
      //     warnings: false
      //   },
      //   mangle: {
      //     except: ['$', 'exports', 'require']
      //   }
      // })
  ],

  resolve: {
      extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", "css", "scss"]
  },
  // devtool: 'source-map',
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
    // 'react': { commonjs: 'react', commonjs2: 'react', amd: 'react', root: 'React' },
    // 'react-dom': { commonjs: 'react-dom', commonjs2: 'react-dom', amd: 'react-dom', root: 'ReactDOM' },
    // 'react-addons-css-transition-group': {
    //   commonjs: 'react-addons-css-transition-group',
    //   commonjs2: 'react-addons-css-transition-group',
    //   amd: 'react-addons-css-transition-group',
    //   root: ['React','addons','CSSTransitionGroup']
    // },
    'react-addons-css-transition-group': 'React.addons.TransitionGroup'
  }
});


module.exports = [clientConfig];
