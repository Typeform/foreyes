module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /report/],
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
