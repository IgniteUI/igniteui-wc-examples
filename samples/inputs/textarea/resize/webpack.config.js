const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = env => {
    const nodeEnv = process.env.NODE_ENV || 'development';
    const isProd = nodeEnv === 'production';
    const isLegacy = !!process.env.legacy && !(process.env.legacy == "false");
    console.log(">> webpack nodeEnv=" + nodeEnv);
    console.log(">> webpack isProd=" + isProd);
    console.log(">> webpack isLegacy=" + isLegacy);
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

    return {
        entry: isLegacy ? [
            path.resolve(__dirname, 'node_modules/@webcomponents/custom-elements'),
            path.resolve(__dirname, 'node_modules/@webcomponents/template'),
            path.resolve(__dirname, 'src')
        ] : path.resolve(__dirname, 'src'),
        devtool: isProd ? false : 'source-map',
        output: {
            filename: isProd ? '[fullhash].bundle.js' : '[fullhash].bundle.js',
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
                { test: /\.css$/, sideEffects: true, use: ['style-loader', 'css-loader'] },
                {
                    test: /worker\.(ts|js)$/,
                    use: [
                        { loader: 'worker-loader' },
                        {
                            loader: 'babel-loader', options: {
                                "compact": isProd ? true : false,
                                "presets": presets,
                                "plugins": [
                                    "@babel/plugin-proposal-class-properties",
                                    "@babel/plugin-transform-runtime"
                                ]
                            }
                        }
                    ]
                },
                {
                    test: /\.(ts|js)$/, loader: 'babel-loader',
                    options: {
                        "compact": isProd ? true : false,
                        "presets": presets,
                        "plugins": [
                            "@babel/plugin-proposal-class-properties",
                            "@babel/plugin-transform-runtime"
                        ]
                    },
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
                title: 'for-cs',
                template: 'index.html'
            }),
            new ForkTsCheckerWebpackPlugin()
        ]
    };
};
