const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const terserWebpackPlugin = require('terser-webpack-plugin')
const cssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
  },
  resolve: {
    extensions: ['.tsx','.js', '.jsx'],
    alias: {
      "@components": path.resolve(__dirname, 'src/components'),
      "@containers": path.resolve(__dirname, 'src/containers'),
      "@context": path.resolve(__dirname, 'src/context'),
      "@hooks": path.resolve(__dirname, 'src/hooks'),
      "@routes": path.resolve(__dirname, 'src/routes'),
      "@styles": path.resolve(__dirname, 'src/styles/components'),
      "@assets": path.resolve(__dirname, 'src/assets/'),

    }
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.css|.styl$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'stylus-loader',
        ],
      },
      {
        test: /\.(png|jpg)$/,
        type: 'asset',
        generator: {
          filename: './assets/images/[name].[contenthash].png'
        }
      },
      {
        test: /\.(tsx|ts)$/,
        use: "ts-loader",
        exclude: /node_module/
      }
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].css',
    }),
    new CleanWebpackPlugin(),
    new ImageMinimizerPlugin({
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminMinify,
        options:{
          plugins: [
            [ 'optipng', {optimizationLevel: 5} ]
          ]
        }
      }
    })
  ],
  optimization: {
    minimize: true,
    minimizer : [
      new terserWebpackPlugin(),
      new cssMinimizerPlugin(),
  ],
    
  }
};
