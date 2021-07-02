/**
 * This is the common configuration for the clients webpack configuration.
 * Anything added here will be included in local, development, and prod.
 */

const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const htmlWebpackOptions = {
  template: path.resolve(__dirname, 'templates', 'index.html'),
  filename: path.resolve(__dirname, '..', 'src', 'functions', 'index.html')
}

const buildPath = path.resolve(__dirname, '..', 'build');

module.exports = {
  name: 'client',
  plugins: [
    new CleanWebpackPlugin(), 
    new HtmlWebpackPlugin(htmlWebpackOptions),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'public', 'manifest.json'), to: buildPath },
        { from: path.resolve(__dirname, 'public', 'robots.txt'), to: buildPath },
      ],
    }),
  ],
  entry: {
    client: path.resolve(__dirname, '..', 'src', 'frontend', 'index.tsx'),
  },
  mode: 'production',
  output: {
    path: buildPath,
    filename: '[name].[contenthash].js',
    publicPath: '',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          configFile: 'tsconfig.json',
        },
      },
      {
        test: /\.css?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          { loader: 'postcss-loader' }
        ]
      }
    ],
  },
}