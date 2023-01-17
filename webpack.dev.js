const { merge } = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "[name].js",
  },
  devServer: {
    port: 3000,
    static: path.join(__dirname, "src"),
  },
  devtool: "inline-source-map",
});
