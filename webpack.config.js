const path = require('path')

const mode = process.env.NODE_ENV || 'development'

module.exports = {
  mode,
  target: 'node',
  stats: 'verbose',
  entry: {
    index: './src/index.js',
    store: './src/store.js',
    link: './src/link.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'src')]
  }
}
