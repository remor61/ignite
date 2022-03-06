const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'eval-source-map' : 'source-map',
  entry: path.resolve(__dirname, 'src', 'index.tsx'), //__dirname gets the directory of this file.
  output: {
    // here the file that webpack will generate is set
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // here we say to webpack that it can work with .js and .jsx fles
  },
  devServer: {
    static: path.resolve(__dirname, 'public'),
    hot: true,          //added with ReactRefreshWebpackPlugin
  },
  plugins: [
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.(j|t)sx$/, // regula expression to get only .jsx files
        exclude: /node_modules/, // excludes everythin in node_modules as those files are already 'browser ready'
        use: {
          loader: 'babel-loader', // sets what will be used for the conversion
          options: {    //added with ReactRefreshWebpackPlugin
            plugins: [
              isDevelopment && require.resolve('react-refresh/babel')
            ].filter(Boolean)
          }
        }
      },
      {
        test: /\.scss$/i,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
