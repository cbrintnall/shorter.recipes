const nodeExternals = require('webpack-node-externals')
const path = require('path')

module.exports = {
  name: 'server',
  entry: {
    server: path.resolve(__dirname, 'src/index.js'),
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'functions'),
    filename: 'index.js',
    libraryTarget: 'this'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  externals: [nodeExternals()],
  target: 'node',
  node: {
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.json',
        },
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
  },
}