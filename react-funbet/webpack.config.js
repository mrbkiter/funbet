const { resolve, join } = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const modeEnv = process.env.MODE === 'localhost' ? 'development' : 'production';
const config = {
  mode: modeEnv,
  entry: {
    bundle: join(__dirname, 'src', 'index.js'),
    microBundle: join(__dirname, 'src', 'micro.js'),
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dist'),
    publicPath: './',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      redux: require.resolve('redux'),
      assets: resolve(__dirname, 'src/assets'),
      components: resolve(__dirname, 'src/components'),
      configs: resolve(__dirname, 'src/configs'),
      pages: resolve(__dirname, 'src/pages'),
      translations: resolve(__dirname, 'src/translations'),
      utils: resolve(__dirname, 'src/utils'),
      sharedModules: resolve(__dirname, 'src/sharedModules'),
      fixtures: resolve(__dirname, 'src/fixtures'),
      sections: resolve(__dirname, 'src/sections'),
      routes: resolve(__dirname, 'src/routes'),
      layouts: resolve(__dirname, 'src/layouts'),
      hooks: resolve(__dirname, 'src/hooks'),
      theme: resolve(__dirname, 'src/theme'),
      _mock: resolve(__dirname, 'src/_mock'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            cacheCompression: false,
            envName: modeEnv,
          },
        },
      },
      {
        test: /\.(scss|css)$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: [
          resolve(__dirname, 'node_modules'),
          resolve(__dirname, 'src'),
        ],
      },
      {
        test: /\.(pdf|jpg|jpeg|png|ico|mp3|wav|webp)$/,
        use: ['url-loader'],
        include: resolve(__dirname, 'src'),
      },
      {
        test: /\.json$/,
        use: ['json-loader'],
        type: 'javascript/auto',
      },
      {
        test: /\.(woff(2)?|ttf|eot|otf|gif)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[sha512:hash:base64:7].[ext]',
            },
          },
        ],
        include: [
          resolve(__dirname, 'node_modules'),
          resolve(__dirname, 'src'),
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              // inline files smaller than 10 kB
              limit: 10 * 1024,
              noquotes: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: 'body',
    }),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        MODE: JSON.stringify(process.env.MODE),
      },
    }),
    new Dotenv(),
  ],
};

console.warn('modeEnv', modeEnv);
console.warn('process.env.MODE', process.env.MODE);

switch (process.env.MODE.trim()) {
  case 'localhost':
    config.devtool = 'eval-source-map';
    config.entry = {
      bundle: join(__dirname, 'src', 'index.js'),
    };
    config.output = {
      filename: '[name].js',
      path: resolve(__dirname, 'dist'),
      publicPath: './',
    };
    config.devServer = {
      open: false,
      compress: true,
      // stats: 'errors-only',
      headers: { 'Access-Control-Allow-Origin': '*' },
      contentBase: join(__dirname, 'public'),
      host: 'localhost',
      port: 4009,
      publicPath: '/',
      historyApiFallback: true,
      overlay: {
        errors: true,
        warnings: true,
      },
      hot: true,
    };
    break;
  case 'funbet':
    config.output = {
      filename: '[name].js',
      path: resolve(__dirname, `dist`),
      publicPath: 'auto',
    };
    config.optimization = {
      minimizer: [new TerserWebpackPlugin()],
    };
    config.plugins = [
      new HtmlWebpackPlugin({
        template: 'public/index.html',
        inject: 'body',
        excludeChunks: ['microBundle'],
      }),
      new webpack.ProvidePlugin({
        React: 'react',
      }),
      new webpack.DefinePlugin({
        'process.env': {
          MODE: JSON.stringify(process.env.MODE),
        },
      }),
      new CopyPlugin({
        patterns: [{ from: 'public', to: '' }],
      }),
      new Dotenv(),
      new CleanWebpackPlugin(),
    ];
    break;
  default:
    break;
}

module.exports = config;
