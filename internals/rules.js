const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const rules = [
      {
            test: /\.s?[ac]ss$/,
            use: [
                  MiniCssExtractPlugin.loader,
                  {
                        loader: "css-loader",
                        options: { url: false, sourceMap: true },
                  },
            ],
      },
      {
            test: /\.js$/,
            exclude: /node_modules/,
            use: "babel-loader",
      },
      {
            test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
            loader: "url-loader",
      },
      {
            test: /\.(png|jpg|gif)$/,
            use: [
                  {
                        loader: "file-loader",
                        options: {
                              outputPath: "/",
                        },
                  },
            ],
      },
];

module.exports = rules;
