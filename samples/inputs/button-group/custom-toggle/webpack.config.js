const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = { entry: path.resolve(__dirname, 'src'), output: { filename: '[fullhash].bundle.js', path: path.resolve(__dirname, 'dist') }, resolve: { extensions: ['.ts', '.js'] }, module: { rules: [{ test: /\.css$/, use: ['style-loader', 'css-loader'] }, { test: /\.ts$/, use: 'babel-loader', exclude: /node_modules/ }] }, plugins: [new HtmlWebpackPlugin({ template: 'index.html' })] };
