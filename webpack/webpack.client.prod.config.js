const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const HtmlWebpackPlugin  = require('html-webpack-plugin');

const htmlWebpackOptions = {
  publicPath: 'http://localhost:5000',
  template: path.resolve(__dirname, 'templates', 'index.html'),
  filename: path.resolve(__dirname, '..', 'src', 'functions', 'index.html')
}

module.exports = {
  name: 'client',
  plugins: [
    new CleanWebpackPlugin(), 
    new HtmlWebpackPlugin(htmlWebpackOptions),
    new MiniCssExtractPlugin()
  ],
  entry: {
    client: path.resolve(__dirname, '..', 'src', 'frontend', 'index.tsx'),
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '..', 'build'),
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