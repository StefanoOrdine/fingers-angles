module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: './assets'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  }
}
