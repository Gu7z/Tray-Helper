const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = [
  {
    mode: "development",
    entry: "./src/index.js",
    target: "electron-renderer",
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
      ],
    },
    resolve: {
      extensions: ["*", ".js", ".jsx"],
    },
    output: {
      path: __dirname + "/dist",
      filename: "index.js",
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
      hot: true,
    },
  },
];
