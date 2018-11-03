var path = require('path');
var webpack = require('webpack');

const publicPath = path.resolve(__dirname + '/app/static/');
const contentBase = publicPath;
const port = 8000;
const host = '0.0.0.0';

module.exports = {
  entry: [
    "./app/src/index.js",
  ],

  devtool: 'eval',

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    })
  ],
    
  resolve: {
      extensions: ['.jsx', '.js', '.es6', '.json'],
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
    loaders: [
      {
        test: /\.(js|jsx|es6)$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader'
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
                    path.resolve(__dirname + "/app/static/base")
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
      }
      // {
      //   test: /\.(png|jpg|gif)$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //           paths: [
      //               path.resolve(__dirname + "/app")
      //           ]
      //       }  
      //     }
      //   ]
      // },
    ],
  },

  output: {
    path: publicPath,
    filename: 'bundle.js',
    sourceMapFilename: 'bundle.map'
  },

  devServer: {
    port,
    host,
    contentBase,
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