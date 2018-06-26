'use strict'
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const config = require('./config')

const _ = require('./utils')

module.exports = {
  entry: {
    client: './client/index.js'
  },
  output: {
    path: _.outputPath,
    filename: '[name].js',
    publicPath: config.publicPath,
    // Point sourcemap entries to original disk location
    devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath),
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true
  },
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false
  },
  resolve: {
    extensions: ['.js', '.vue', '.css', '.json'],
    alias: {
      root: path.join(__dirname, '../client'),
      '@': path.join(__dirname, '../client'),
      components: path.join(__dirname, '../client/components'),
      views: path.join(__dirname, '../client/views'),
      vendors: path.join(__dirname, '../client/vendors'),
    },
    modules: [
      _.cwd('node_modules'),
      // this meanse you can get rid of dot hell
      // for example import 'components/Foo' instead of import '../../components/Foo'
      _.cwd('client')
    ]
  },
  module: {
    loaders: [
        {test: require.resolve('jquery'), loader: 'expose-loader?jQuery!expose-loader?$'},
        {
            test: /\.vue$/,
            loaders: ['vue-loader']
        },
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: [/node_modules/]
      },
      {
        test: /\.es6$/,
        loaders: ['babel-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf)(\?.*$|$)/,
        loader: 'url-loader?importLoaders=1&limit=100000'
      },
      {
        test: /\.(ico|jpg|png|gif|otf|webp)(\?.*)?$/,
        loader: 'file-loader',
        query: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      {
        test   : /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
      },
      {
        test: /\.svg$/,
        loader: 'vue-svg-loader', // `vue-svg` for webpack 1.x
        options: {
          // o
          // ptional [svgo](https://github.com/svg/svgo) options
          svgo: {
            plugins: [
              {removeDoctype: false},
              {cleanupIDs: false},
              {removeEmptyAttrs: false},
              {removeHiddenElems: false},
              {removeEmptyText: false},
              {removeEmptyContainers: false},
              {removeViewBox: false},
              {mergePaths: false}
              // {collapseGroups: false}
            ]
          }
        }
      }
    ]
  },
  plugins: [
    /*new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jquery',
      'window.jQuery': 'jquery',
      jQuery: 'jquery',
    }),*/
    new HtmlWebpackPlugin({
      title: config.title,
      template: path.resolve(__dirname, 'index.html'),
      favicon: path.resolve('favicon.ico'),
      filename: _.outputIndexPath
    }),
    new webpack.LoaderOptionsPlugin(_.loadersOptions()),
    new CopyWebpackPlugin([
      {
        from: _.cwd('./static'),
        // to the root of dist path
        to: './'
      }
    ])
  ],
  target: _.target
}
