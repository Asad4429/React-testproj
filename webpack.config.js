const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlTemplate = require('path').join(__dirname, 'index.ejs');
const autoprefixer = require('autoprefixer');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const { resolve } = require('path');

const buildPath = './dist'

/** @type {webpack.Configuration} */
const config = {
  mode: 'development',
  entry: {
    main: './src/App',
  },
  output: {
    filename: '[name].bundle.[chunkhash].js',
    path: resolve(buildPath),
    publicPath: '/',
    chunkFilename: '[name].chunk.[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
      },
      {
        test: /\.svg$/,
        loader: 'raw-loader',
      },
      {
        test: /\.(png|jpg|gif)$/i,
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [autoprefixer],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    mainFields: ['module', 'main'],
  },
  node: { fs: 'empty', net: 'empty' },
  plugins: [
    new WebpackNotifierPlugin(),
    new HtmlWebpackPlugin({
      template: HtmlTemplate,
      inject: false,
      title: 'TestApp',
      appMountId: 'app',
      cache: false,
      mobile: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};

config.plugins.push(new ForkTsCheckerWebpackPlugin());

module.exports = config;
