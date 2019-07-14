const MiniCssExtractPlugin = require('mini-css-extract-plugin');

exports.config = {
  module: {
    rules: [
      // CSS
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV !== 'production'
          ? 'vue-style-loader'
          : MiniCssExtractPlugin.loader,
          'css-loader'
        ],
      },
      // SASS
      {
        test: /\.scss$/,
        use: [
          process.env.NODE_ENV !== 'production'
            ? 'vue-style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ]
};
