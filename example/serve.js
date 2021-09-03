const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('./webpack.config');

const compiler = webpack(config);

compiler.compilers.forEach((comp, index) => {
  new WebpackDevServer(comp, {
    contentBase: __dirname,
    hot: true,
    historyApiFallback: false,
    compress: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  }).listen(8090 + index, 'localhost', () => {});
});
