const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = ['./host-application', './framed-fragment', './unframed-fragment'].map((path) => ({
  mode: 'development',
  // Enable sourcemaps for debugging webpack's output.
  devtool: 'inline-source-map',

  context: resolve(__dirname, path),
  entry: './index.jsx',

  resolve: {
    extensions: ['.jsx', '.js'],
    alias: {
      monteur: resolve(__dirname, '../dist/module'),
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, './index.template.html'),
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
}));
