console.log(">> webpack config ...");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';
const isLegacy = !!process.env.legacy && !(process.env.legacy == "false");
console.log(">> webpack nodeEnv=" + nodeEnv);
console.log(">> webpack isProd=" + isProd);
console.log(">> webpack isLegacy=" + isLegacy);

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const CopyPlugin = require('copy-webpack-plugin');

const plugins = [
  new CleanWebpackPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(nodeEnv)
    }
  }),
  new CopyPlugin({
    patterns: [
      { from: 'assets', to: 'assets' }
    ]
  }),
  new HtmlWebpackPlugin({
    // inject: 'head',
    title: 'Samples | IgniteUI for Web Components | Infragistics',
    // template: '!!ejs-loader!src/index.html'
    template: '!!ejs-loader!browser/public/index.html',
    publicPath: isProd ? './' : '/'
  }),
  new webpack.LoaderOptionsPlugin({
    options: {
      tslint: {
        emitErrors: true,
        failOnHint: true
      }
    }
  }),
  new ForkTsCheckerWebpackPlugin({ typescript: { configFile: path.join(__dirname, 'tsconfig.json'), memoryLimit: 4096 } })
];

const presets = [
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
];

var config = {
  stats: {
     errorDetails: true,
     children: true
  },
  devtool: isProd ? false : 'source-map',
  context: path.resolve('./browser/src'),
  entry: {
    app: './index.ts'
  },
  output: {
    path: path.resolve('./browser/dist'),
    filename:  process.env.production ? '[name].[chunkhash:8].js' : '[name].[fullhash:8].js',
    chunkFilename:  process.env.production ? '[name].[chunkhash:8].chunk.js' : '[name].[fullhash:8].chunk.js',
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
            use: [
              { loader: 'worker-loader' },
              { loader: 'babel-loader', options: {
                "compact": isProd ? true : false,
                "presets": presets,
                "plugins": [
                  "@babel/plugin-transform-class-static-block",
                  "@babel/plugin-transform-class-properties",
                  "@babel/plugin-transform-runtime"
                ] }
              },
              { loader: 'source-map-loader' }
            ]
          },
          {
            enforce: 'pre',
            test: /\.tsx?$/,
            exclude:
            function(modulePath) {
              return /node_modules/.test(modulePath) &&
                !/igniteui-webcomponents/.test(modulePath) &&
                !/lit-html/.test(modulePath);
            },
            use: [
              { loader: 'babel-loader', options: {
                "compact": isProd ? true : false,
                "presets": presets,
                "plugins": [
                  "@babel/plugin-transform-class-static-block",
                  "@babel/plugin-transform-class-properties",
                  "@babel/plugin-transform-runtime"
                ] }
              },
              { loader: 'source-map-loader' }
            ]
          }
        ]
      },
      { test: /\.html$/, use: 'html-loader' },
      {
        test: /\.scss$/,
        sideEffects: true,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                silenceDeprecations: ['color-functions', 'if-function'],
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        sideEffects: true,
        use: [
            'style-loader',
            {
            loader: 'css-loader',
            options: { importLoaders: 1 }
            },
            'postcss-loader'
        ]
      },
      {
        test: /\.scss$/,
        sideEffects: true,
        use: [
            'style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  silenceDeprecations: ['color-functions', 'if-function'],
                  loadPaths: [
                    path.resolve(__dirname, 'node_modules'),
                  ]
                }
              }
            }
        ]
      },
      { test: /\.(png|svg|jpg|gif)$/, use: ['file-loader'] },
      { test: /\.(csv|tsv)$/, use: ['csv-loader'] },
      { test: /\.xml$/, use: ['xml-loader'] }
    ].filter(Boolean)
  },
  resolve: {
    mainFields: ['esm2015', 'module', 'main'],
    extensions: ['.ts', '.js', '.json'],
    alias: {
      'igniteui-theming': path.resolve(__dirname, 'node_modules/igniteui-theming')
    },
    plugins: [new TsconfigPathsPlugin({
      configFile: './tsconfig.json',
      extensions: ['.ts', '.js'],
      mainFields: ['esm2015', 'module', 'main']
    })]
  },
  plugins: plugins,
  devServer: {
    static: path.join(__dirname, 'browser/dist/'),
    compress: true,
    port: 4200,
    hot: true,
    historyApiFallback: true,
    client: {
      overlay: {
        runtimeErrors: (error) => {
          if (error.message === 'ResizeObserver loop limit exceeded' || 
              error.message === 'ResizeObserver loop completed with undelivered notifications.') {
            return false;
          }
          return true;
        },
      },
    },
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
        igniteuiDataGrids: {
          test: /[\\/]node_modules[\\/](igniteui-webcomponents-data-grids)[\\/]/,
          name: 'igniteui-webcomponents-data-grids',
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
        igniteuiDashboards: {
          test: /[\\/]node_modules[\\/](igniteui-webcomponents-dashboards)[\\/]/,
          name: 'igniteui-webcomponents-dashboards',
          chunks: 'all',
        },
        igniteuiDockmanager: {
          test: /[\\/]node_modules[\\/](igniteui-dockmanager)[\\/]/,
          name: 'igniteui-dockmanager',
          chunks: 'all',
        },
        igniteuiWebComponents: {
          test: /[\\/]node_modules[\\/](igniteui-webcomponents)[\\/]/,
          name: 'igniteui-webcomponents',
          chunks: 'all',
        }
      }
    }
  }
};

module.exports = config;
