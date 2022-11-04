
module.exports = function override(config, env) {
    console.log("Running config-overrides.js");
    const paths = require('./node_modules/react-scripts/config/paths');
    console.log(paths);
    let rules = config.module.rules;
    //let paths = config._paths;
    let oneOf = rules[2].oneOf;
    oneOf.splice(0, 0, {
        test: /\.worker\.ts$/,
        include: paths.appSrc,
        use: [ 'worker-loader', {
            loader: require.resolve('ts-loader'),
            options: {
                transpileOnly: true,
            }
        }
    ]});

    config.output.globalObject = 'this';

    //config.optimization.splitChunks = {};
    config.optimization.splitChunks.cacheGroups = {
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
            test: /[\\/]node_modules[\\/](igniteui-webcomponents-inputs)[\\/]/,
            name: 'igniteui-webcomponents-inputs',
            chunks: 'all',
        },
        igniteuiMaps: {
            test: /[\\/]node_modules[\\/](igniteui-webcomponents-layouts)[\\/]/,
            name: 'igniteui-webcomponents-layouts',
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
        igniteuiDockmanager: {
            test: /[\\/]node_modules[\\/](igniteui-dockmanager)[\\/]/,
            name: 'igniteui-dockmanager',
            chunks: 'all',
        }
        };

    return config;
}