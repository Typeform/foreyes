module.exports = {
  entry: `${__dirname}/src/index.js`,
  output: {
    filename: 'index.js',
    path: `${__dirname}/dist/`
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /.storybook/],
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.svg$/,
        use: 'svg-sprite-loader'
      },
      {
        test: /\.(png|jpg|woff|ttf)$/,
        use: 'url-loader'
      }
    ]
  }
}
