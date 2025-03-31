const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  return {
    entry: './src/index.js',
	target: 'electron-renderer',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: isProduction ? './' : '/'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: 'babel-loader',
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html'
      })
    ],
    devServer: {
      port: 3000
    }
  };
}
