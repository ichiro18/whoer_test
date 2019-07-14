const VueLoaderPlugin = require('vue-loader/lib/plugin');

exports.config = {
  module: {
    rules: [
      // Vue
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      // ES6
      {
        test: /\.js$/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
  ]
};
