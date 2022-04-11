const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = env => {
  console.log("env:");
  console.log(env);
  const isLegacy = !!env.legacy && !(env.legacy == "false");
  const isProd = env.NODE_ENV === 'production';
  return {
    entry: isLegacy ? [
      path.resolve(__dirname, 'node_modules/@webcomponents/custom-elements'),
      path.resolve(__dirname, 'node_modules/@webcomponents/template'),
      path.resolve(__dirname, 'src')
    ] : path.resolve(__dirname, 'src'),
    devtool: isProd ? false : 'source-map',
    output: {
      filename: isProd ? '[chunkhash].bundle.js' : '[hash].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },

    resolve: {
      mainFields: ['fesm2015', 'module', 'main'],
      extensions: ['.ts', '.js', '.json']
    },

    module: {
      rules: [
        { test: /\.(png|svg|jpg|gif)$/, use: ['file-loader'] },
        { test: /\.(csv|tsv)$/, use: ['csv-loader'] },
        { test: /\.xml$/, use: ['xml-loader'] },
        { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
        { test: /\.(ts|js)$/, loader: 'babel-loader',
        options: {
          "compact": isProd ? true : false,
          "presets": [
            ["@babel/preset-env", {
              "useBuiltIns": "usage",
              "corejs": 3,
              "targets": {
                "browsers": isLegacy ? ["defaults"] : [
                  "last 2 Chrome versions",
                  "last 2 Safari versions",
                  "last 2 iOS versions",
                  "last 2 Firefox versions",
                  "last 2 Edge versions"]
              }
            }],
            "@babel/preset-typescript"
          ],
          "plugins": [
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-transform-runtime"
          ]
        },
        exclude:
        function(modulePath) {
          return /node_modules/.test(modulePath) &&
            !/igniteui-webcomponents/.test(modulePath) &&
            !/lit-html/.test(modulePath);
        }
    }],
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: env.NODE_ENV
        }
      }),
      new HtmlWebpackPlugin({
        title: 'for-cs',
        template: 'index.html'
      }),
      new ForkTsCheckerWebpackPlugin()
    ]
  };
};
