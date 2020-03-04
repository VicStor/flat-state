const path = require('path')

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.js',
    store: './src/store.js',
    link: './src/link.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
}
