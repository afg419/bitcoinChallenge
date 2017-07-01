const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: '#source-map',
  context: __dirname,
   entry: [
     './app/main/index.tsx'
   ],
   output: {
     path: __dirname,
     filename: 'bundle.js',
     publicPath: '/'
   },
   module: {
     loaders: [{
       test: /.jsx?$/,
       loader: 'babel-loader',
       include: path.join(__dirname, 'app'),
       exclude: /node_modules/,
       query: {
         presets: ['es2015', 'react']
       }
     }, { test: /\.tsx?$/, loader: 'ts-loader' }]
   },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.scss', '.css', 'tsx', '.ts']
  }
};