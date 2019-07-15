// * Global modules
const path = require("path");
const merge = require("webpack-merge");
const webpack = require('webpack');
// * Plugins
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// * Config
const packageConfig = require("../../package.json");
// * Loaders
const scriptLoader = require("./loaders/script.loader");
const styleLoader = require("./loaders/style.loader");
const imageLoader = require("./loaders/image.loader");
const fontLoader = require("./loaders/font.loader");
// * Workflow
const linters = require("./workflow/linters");


// * CONST
const PATH = {
  source: path.join(__dirname, "../..", "src"),
  dist: path.join(__dirname, "../..", "dist"),
};

const devConfig = {
  mode: "production",
  devtool: "inline-source-map",
  entry: {
    index: path.join(PATH.source, "index.js"),
  },
  output: {
    path: PATH.dist,
    filename: "[name].bundle.js",
    publicPath: "/"
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      "@project_src": PATH.source,
    }
  },
  devServer: {
    contentBase: PATH.dist,
    compress: true,
    port: 8080,
    quiet: true,
    historyApiFallback: true
  }
};

const devPlugins = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
        BASE_URL: '"/"',
      },
    }),
    new webpack.ProgressPlugin(),
    new FriendlyErrorsPlugin({
      clearConsole: true,
      compilationSuccessInfo: {
        messages: [
          "Your application is running here http://localhost:8080"
        ]
      }
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      template: require("html-webpack-template"),
      appMountId: 'app',
      title: packageConfig.name,
    })
  ]
};

module.exports = merge(
  devConfig,
  devPlugins,
  // Loaders
  scriptLoader.config,
  styleLoader.config,
  imageLoader.config,
  fontLoader.config,
  // Workflow
  linters.config,
);
