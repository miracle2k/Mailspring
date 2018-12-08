var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  entry: [
    "./app/src/index.js",
  ],

  mode: 'development',

  devtool: 'eval',

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),

    // Will generate an index.html file for us.
    new HtmlWebpackPlugin()
  ],
    
  resolve: {
      extensions: ['.jsx', '.js', '.es6', '.json', '.ts', '.tsx'],
      alias: {
          "child_process": path.resolve(__dirname + "/app/src/env/child_process"),
          "keytar": path.resolve(__dirname + "/app/src/env/keytar"),
          "fs": path.resolve(__dirname + "/app/src/env/fs"),
          "fs-plus": path.resolve(__dirname + "/app/src/env/fs-plus"),
          "electron": path.resolve(__dirname + "/app/src/env/electron"),
          //"slate": path.resolve(__dirname + "/app/src/env/slate"),
          //"slate-edit-list": path.resolve(__dirname + "/app/src/env/dummy"),
          "mailspring-component-kit": path.resolve(__dirname + "/app/src/global/mailspring-component-kit"),
          "mailspring-exports": path.resolve(__dirname + "/app/src/global/mailspring-exports"),
          "mailspring-observables": path.resolve(__dirname + "/app/src/global/mailspring-observables"),
          "mailspring-store": path.resolve(__dirname + "/app/src/global/mailspring-store"),
          "ui-variables": path.resolve(__dirname + "/app/src/global/ui-variables"),
      },
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|es6)$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            // Workaround, for some reason .babelrc is ignored otherwise.
            options: JSON.parse(fs.readFileSync(path.resolve(__dirname, './.babelrc'))),
          },
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.less$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader", // translates CSS into CommonJS
            options: {
              url: false,
            }
        }, {
            loader: "less-loader", // compiles Less to CSS
            options: {
                paths: [
                    path.resolve(__dirname + "/app/static/base"),
                    path.resolve(__dirname + "/app/static"),
                ]
            }
        }]
      },      
      {
        test: /\.eval.js$/,
        use: [
          {
            loader: `val-loader`
          }
        ]
      },
      
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
                paths: [
                    path.resolve(__dirname + "/app")
                ]
            }  
          }
        ]
      },
    ],
  },

  output: {
    path: path.resolve(__dirname + '/build/'),
    filename: 'bundle.js',
    sourceMapFilename: 'bundle.map'
  },

  devServer: {
    port: 8000,
    host: '0.0.0.0',

    // devserver serves bundles at root, say /bundle.js
    publicPath: '/',

    // Does not serve any other static content:
    contentBase: false,

    open: false,
    clientLogLevel: 'warning',
    historyApiFallback: true,
    watchContentBase: false,
    disableHostCheck: true,
    noInfo: false,
    stats: {
      assets: false,
      cached: false,
      cachedAssets: false,
      children: false,
      chunks: false,
      chunkModules: false,
      chunkOrigins: false,
      colors: true,
      depth: false,
      entrypoints: false,
      errors: true,
      errorDetails: true,
      hash: true,
      modules: false,
      moduleTrace: false,
      performance: false,
      providedExports: false,
      publicPath: false,
      reasons: false,
      source: false,
      timings: true,
      usedExports: false,
      version: false,
      warnings: true
    }
  },
};
