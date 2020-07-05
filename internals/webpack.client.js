const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const devMode = process.env.NODE_ENV !== "production";
const webpack = require("webpack");
const rules = require("./rules");
const chalk = require("chalk");

module.exports = {
      entry: "./client/index.js",
      output: {
            filename: "bundle.js",
            path: path.resolve(process.cwd(), "public"),
      },
      module: {
            rules: rules,
      },
      devtool: "source-map",
      plugins: [
            new ProgressBarPlugin({
                  format:
                        "  build [:bar] " +
                        chalk.green.bold(":percent") +
                        " (:elapsed seconds)",
                  clear: false,
            }),
            new MiniCssExtractPlugin({
                  filename: "style.css",
            }),
            new webpack.ProvidePlugin({
                  $: "jquery",
                  jQuery: "jquery",
            }),
      ],
      mode: devMode ? "development" : "production",
      watch: devMode,
      performance: {
            hints: process.env.NODE_ENV === "production" ? "warning" : false,
      },
};