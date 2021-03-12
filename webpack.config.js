const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, './src/js', 'main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'boundle.js',
    assetModuleFilename: 'assets/[name][ext]',
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      filename: 'index.[hash].html',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new MiniCssExtractPlugin({ filename: 'main.[contenthash].css' }),
    new ImageMinimizerPlugin({
      minimizerOptions: {
        plugins: [
          ['gifsicle', { interlaced: true }],
          ['mozjpeg', { progressive: true, quality: 20 }],
          ['pngquant', { quality: [0.7, 0.9], speed: 4 }],
          [
            'svgo',
            {
              plugins: [
                {
                  name: 'removeViewBox',
                  active: false,
                },
              ],
            },
          ],
        ],
      },
    }),
  ],

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /.(sa|sc|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset',
      },
      {
        test: /\.svg$/i,
        type: 'asset/inline',
        parser: {
          dataUrlCondition: {
            maxSize: 12 * 1024,
          },
        },
      },
    ],
  },
  devServer: {
    open: true,
  },
};
