const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './25.5.js',
    output: {
        filename: './bundle.js',
        path: path.resolve(__dirname, 'server/public'),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: true,
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-class-properties'],
            },
          },
        },
      ],
    },
    optimization: {
      minimize: false, 
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: false, 
            output: {
              beautify: true 
            }
          }
        })
      ],
    },
  }
