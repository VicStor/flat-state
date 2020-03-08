const path = require('path')

const mode = process.env.NODE_ENV || 'development'

module.exports = {
  mode,
  // target: 'node',
  // stats: 'verbose',
  entry: {
    index: './src/index.js',
    store: './src/store.js',
    link: './src/link.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'src')]
  }
}
