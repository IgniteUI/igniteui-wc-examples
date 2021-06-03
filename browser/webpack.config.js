const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const CopyPlugin = require('copy-webpack-plugin');

const plugins = [
  new CleanWebpackPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(nodeEnv)
    }
  }),
  new CopyPlugin([
    { from: 'assets', to: 'assets' }
  ]),
  new HtmlWebpackPlugin({
    // inject: 'head',
    title: 'Samples | IgniteUI for Web Components | Infragistics',
    // template: '!!ejs-loader!src/index.html'
    template: '!!ejs-loader!public/index.html',
    publicPath: isProd ? './' : '/'
  }),
  new webpack.LoaderOptionsPlugin({
    options: {
      tslint: {
        emitErrors: true,
        failOnHint: true
      }
    }
  })
];

var config = {
  devtool: isProd ? false : 'source-map',
  context: path.resolve('./src'),
  entry: {
    app: './index.ts'
  },
  output: {
    path: path.resolve('./dist'),
    filename:  process.env.production ? '[name].[chunkhash:8].js' : '[name].[hash:8].js',
    chunkFilename:  process.env.production ? '[name].[chunkhash:8].chunk.js' : '[name].[hash:8].chunk.js',
    publicPath: isProd ? './' : '/'
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            enforce: 'pre',
            test: /\.worker\.ts$/,
            exclude: [/\/node_modules\//],
            use: [ 'worker-loader', 'awesome-typescript-loader', 'source-map-loader' ]
          },
          {
            enforce: 'pre',
            test: /\.tsx?$/,
            exclude: [/\/node_modules\//],
            use: ['awesome-typescript-loader', 'source-map-loader']
          }
        ]
      },
      !isProd
        ? {
            test: /\.(js|ts)$/,
            loader: 'istanbul-instrumenter-loader',
            exclude: [/[\\/]node_modules[\\/]/],
            query: {
              esModules: true
            }
          }
        : null,
      { test: /\.html$/, loader: 'html-loader' },
      { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
      { test: /\.(png|svg|jpg|gif)$/, use: ['file-loader'] },
      { test: /\.(csv|tsv)$/, use: ['csv-loader'] },
      { test: /\.xml$/, use: ['xml-loader'] }
    ].filter(Boolean)
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: plugins,
  devServer: {
    contentBase: path.join(__dirname, 'dist/'),
    compress: true,
    port: 4200,
    hot: true,
    historyApiFallback: true
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        igniteuiCharts: {
          test: /[\\/]node_modules[\\/](igniteui-webcomponents-charts)[\\/]/,
          name: 'igniteui-webcomponents-charts',
          chunks: 'all',
        },
        igniteuiCore: {
          test: /[\\/]node_modules[\\/](igniteui-webcomponents-core)[\\/]/,
          name: 'igniteui-webcomponents-core',
          chunks: 'all',
        },
        igniteuiGauges: {
          test: /[\\/]node_modules[\\/](igniteui-webcomponents-gauges)[\\/]/,
          name: 'igniteui-webcomponents-gauges',
          chunks: 'all',
        },
        igniteuiGrids: {
          test: /[\\/]node_modules[\\/](igniteui-webcomponents-grids)[\\/]/,
          name: 'igniteui-webcomponents-grids',
          chunks: 'all',
        },
        igniteuiMaps: {
          test: /[\\/]node_modules[\\/](igniteui-webcomponents-maps)[\\/]/,
          name: 'igniteui-webcomponents-maps',
          chunks: 'all',
        },
        igniteuiExcel: {
          test: /[\\/]node_modules[\\/](igniteui-webcomponents-excel)[\\/]/,
          name: 'igniteui-webcomponents-excel',
          chunks: 'all',
        },
        igniteuiSpreadsheet: {
          test: /[\\/]node_modules[\\/](igniteui-webcomponents-spreadsheet)[\\/]/,
          name: 'igniteui-webcomponents-spreadsheet',
          chunks: 'all',
        },
        igniteuiSpreadsheetChartAdapter: {
          test: /[\\/]node_modules[\\/](igniteui-webcomponents-spreadsheet-chart-adapter)[\\/]/,
          name: 'igniteui-webcomponents-spreadsheet-chart-adapter',
          chunks: 'all',
        },
        igniteuiDataSources: {
          test: /[\\/]node_modules[\\/](igniteui-webcomponents-datasources)[\\/]/,
          name: 'igniteui-webcomponents-datasources',
          chunks: 'all',
        },
        igniteuiInputs: {
          test: /[\\/]node_modules[\\/](igniteui-webcomponents-inputs)[\\/]/,
          name: 'igniteui-webcomponents-inputs',
          chunks: 'all',
        },
        igniteuiLayouts: {
          test: /[\\/]node_modules[\\/](igniteui-webcomponents-layouts)[\\/]/,
          name: 'igniteui-webcomponents-layouts',
          chunks: 'all',
        },
        igniteuiDockmanager: {
          test: /[\\/]node_modules[\\/](igniteui-dockmanager)[\\/]/,
          name: 'igniteui-dockmanager',
          chunks: 'all',
        }
      }
    }
  }
};

module.exports = config;
