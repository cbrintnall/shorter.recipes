const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const HtmlWebpackPlugin  = require('html-webpack-plugin');

const indexTemplate =`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#303030" />
    <meta
      name="description"
      content="A simple application that can extract recipe information and display it in a straight-forward manner."
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
      integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
      crossorigin="anonymous"
    />
    <title>Shorter Recipes</title>
  </head>
  <body>
    <noscript>
      You'll need Javascript enabled, we hope to have a "minimal" JS version soon.
    </noscript>
    <div id="root">{{content}}</div>
  </body>
</html>
`

const manifestOptions = {
  fileName: path.resolve(__dirname, 'functions', '.runtimeconfig.json')
}

const htmlWebpackOptions = {
  publicPath: 'http://localhost:5000',
  templateContent: indexTemplate,
  filename: path.resolve(__dirname, 'src', 'functions', 'index.html')
}

module.exports = {
  name: 'client',
  plugins: [
    new CleanWebpackPlugin(), 
    new WebpackManifestPlugin(manifestOptions),
    new HtmlWebpackPlugin(htmlWebpackOptions),
    new MiniCssExtractPlugin()
  ],
  entry: {
    client: path.resolve(__dirname, 'src/frontend/index.tsx'),
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'build'),
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