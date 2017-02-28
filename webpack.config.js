module.exports = {
  entry: './example/index.js',
  output: {
    filename: 'bundle.js',
    path: './example/assets'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  }
}
