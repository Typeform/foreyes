const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: ["./pages_server/app.js"],
  output: {
    filename: "[name].js",
    publicPath: "/"
  },
  mode: "none",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
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
  },
  devServer: {
    contentBase: path.join(__dirname, "/pages_server"),
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./pages_server/index.html",
    })
  ]
};
