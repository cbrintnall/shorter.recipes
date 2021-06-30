const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')

const manifestOptions = {
  fileName: path.resolve(__dirname, 'functions', '.runtimeconfig.json')
}

module.exports = {
  name: 'client',
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
        options: {
          configFile: 'tsconfig.json',
        },
      },
    ],
  },
  plugins: [new CleanWebpackPlugin(), new WebpackManifestPlugin(manifestOptions)],
}