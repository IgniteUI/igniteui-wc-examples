const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

module.exports = (env, argv) => {
    const nodeEnv = (argv && argv.mode) || process.env.NODE_ENV || 'development';
    const isProd = nodeEnv === 'production';
    // Tailwind samples ship a postcss.config.mjs; run PostCSS only for them.
    const usePostcss = fs.existsSync(path.resolve(__dirname, 'postcss.config.mjs'));
    const babelOptions = {
        compact: isProd,
        presets: [
            ['@babel/preset-env', {
                targets: {
                    browsers: [
                        'last 2 Chrome versions',
                        'last 2 Safari versions',
                        'last 2 iOS versions',
                        'last 2 Firefox versions',
                        'last 2 Edge versions']
                }
            }],
            '@babel/preset-typescript'
        ],
        plugins: [
            '@babel/plugin-transform-class-static-block',
            '@babel/plugin-transform-class-properties',
            '@babel/plugin-transform-runtime'
        ]
    };

    return {
        entry: path.resolve(__dirname, 'src'),
        devtool: isProd ? false : 'source-map',
        output: {
            filename: '[fullhash].bundle.js',
            globalObject: 'this',
            path: path.resolve(__dirname, 'dist'),
        },

        resolve: {
            mainFields: ['esm2015', 'module', 'main'],
            extensions: ['.ts', '.js', '.json'],
            plugins: [new TsconfigPathsPlugin({
                configFile: './tsconfig.json',
                extensions: ['.ts', '.js'],
                mainFields: ['esm2015', 'module', 'main']
            })]
        },

        module: {
            rules: [
                { test: /\.(png|svg|jpg|gif)$/, use: ['file-loader'] },
                { test: /\.(csv|tsv)$/, use: ['csv-loader'] },
                { test: /\.xml$/, use: ['xml-loader'] },
                {
                    test: /\.css$/,
                    sideEffects: true,
                    use: usePostcss
                        ? ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }, 'postcss-loader']
                        : ['style-loader', 'css-loader']
                },
                {
                    test: /worker\.(ts|js)$/,
                    use: [
                        { loader: 'worker-loader' },
                        { loader: 'babel-loader', options: babelOptions }
                    ]
                },
                {
                    test: /\.(ts|js)$/, loader: 'babel-loader',
                    options: babelOptions,
                    exclude:
                        function (modulePath) {
                            return /node_modules/.test(modulePath) &&
                                !/igniteui-webcomponents/.test(modulePath) &&
                                !/lit-html/.test(modulePath);
                        }
                }],
        },

        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(nodeEnv)
            }),
            new HtmlWebpackPlugin({
                template: 'index.html'
            }),
            new ForkTsCheckerWebpackPlugin()
        ],

        devServer: {
            client: {
                overlay: {
                    runtimeErrors: (error) =>
                        error.message !== 'ResizeObserver loop limit exceeded' &&
                        error.message !== 'ResizeObserver loop completed with undelivered notifications.',
                },
            },
        }
    };
};
