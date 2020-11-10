
let gulp = require('gulp');
let gulpIgnore = require('gulp-ignore');
let uglify = require('gulp-uglify');

// let gSort = require('gulp-sort');
let rename = require('gulp-rename');
let fs = require('fs.extra');
let path = require('path');
let flatten = require('gulp-flatten');
let del = require('del');
let es = require('event-stream');
let shell = require('gulp-shell');
let replace = require('gulp-replace');
let contains = require('gulp-contains');
// function log(msg) {
    // console.log('gulpfile.js ' + msg);
// }

var sb = require('./tasks/gulp-samples.js')

exports.updateSamples = updateSamples = gulp.series(
    sb.lintSamples,
    sb.getSamples,
    sb.updateReadme,
    sb.updatePackages,
    sb.updateIndex,
    sb.updateSharedFiles,
);

exports.updateReadme = updateReadme = gulp.series(
    sb.getSamples,
    sb.updateReadme,
);

exports.updatePackages = updatePackages = gulp.series(
    sb.getSamples,
    sb.updatePackages,
);

exports.updateSharedFiles = updateSharedFiles = gulp.series(
    sb.getSamples,
    sb.updateSharedFiles,
);

exports.updateBrowser = updateBrowser = gulp.series(
    sb.getSamples,
    sb.copySamples,
    // sb.copyPackageJson,
);

// // exports.default = updateBrowser;
// exports.logPublicFiles = sb.logPublicFiles;
// exports.logSourceFiles = sb.logSourceFiles;
// exports.logUniqueFiles = sb.logUniqueFiles;
// exports.logRootFiles   = sb.logRootFiles;
// exports.lintSamples    = sb.lintSamples;

exports.logRoutes = logRoutes = gulp.series(
    sb.getSamples,
    sb.logRoutes,
);

// Create task - copying samples
// C:\Users\source\repos\samples-web-component\src\samples
// Paste below
// C:\Users\Documents\GitHub\igniteui-web-comp-examples\samples

// class SampleInfo {
//     Name = "";
//     Html = "";
//     Directory = "";
// }

function toTitleCase(str, separator) {
    if (separator === undefined) { separator = ' '; }
    return str.toLowerCase().split(separator).map(function(word) {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
}

function splitCamel(orgStr) {
    return orgStr.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
}

function replaceAll(orgStr, oldStr, newStr) {
    return orgStr.split(oldStr).join(newStr);
}

let templateSharedFiles = [];
let templatesShared = "./templates/shared/src/";
let templateFolderPath = "C:\\Users\\Documents\\GitHub\\igniteui-web-comp-examples\\templates\\shared\\src\\";

function getNamesSharedFiles(cb){
    return gulp.src(templatesShared + '/*')
        .pipe(es.map(function(file, fileCallback) {
            let t = path.relative(templatesShared, file.path);
            let stat = fs.lstatSync(file.path);
            if(!stat.isDirectory()) {
                //console.log(file.path);
                templateSharedFiles.push(t);
                //console.log("get shared files " + t);
            }
            fileCallback();
    }))
    .on("end", function(){
        cb();
    });
}
exports.getNamesSharedFiles = getNamesSharedFiles;

// function getSharedFiles() {
//     return gulp.src(templatesShared + './*')
//         .pipe(es.map(function(file, cb) {
//             let t = path.relative(templatesShared, file.path);
//             let stat = fs.lstatSync(file.path);
//             if(!stat.isDirectory()) {
//                 let f = fs.readFileSync(file.path);
//                 templateSharedFiles.push({name: t, content: f.toString()});
//                 console.log("get shared files " + t);
//             }
//             cb();
//     }));
// }
// exports.getSharedFiles = getSharedFiles;

function mkDirectory(directoryName){
    if(!fs.existsSync(directoryName)) {
        fs.mkdirSync(directoryName);
    }
}

function portingSamples(cb) {

    del.sync("./samples/**/*.*", {force:true});
    del.sync("./samples/**", {force:true});

    let extractedSamples = [];

    let chartSubFolders = [
        "axes",
        "category",
        "features",
        "financial",
        "polar",
        "radial",
        "range",
        "scatter",
        "stacked",
        "utilities"
    ]


    // let templateHtml
    // read the template ./templates/porting/index.html
    let templateHtml = fs.readFileSync("./templates/porting/index.html", "utf8");

    let packageJson = fs.readFileSync("./templates/sample/package.json", "utf8")
    let tsconfigJson = fs.readFileSync("./templates/sample/tsconfig.json", "utf8");
    let webpackConfig = fs.readFileSync("./templates/sample/webpack.config.js", "utf8");
    let readMe = fs.readFileSync("./templates/sample/ReadMe.md", "utf8");
    let sandboxConfig = fs.readFileSync("./templates/sample/sandbox.config.json", "utf8");
    let indexTS = fs.readFileSync("./templates/sample/src/index.ts", "utf8");
    let indexCSS = fs.readFileSync("./templates/sample/src/index.css", "utf8");

    // move each tsx file into their own folder
   return gulp.src(['./../samples-web-component/src/samples/**/*.ts',
                      '!./../samples-web-component/src/samples/**/router*.ts',
                    '!./../samples-web-component/src/samples/**/shared*.ts',
                    '!./../samples-web-component/src/samples/**/*Utility.ts',
                    '!./../samples-web-component/src/samples/**/*Utils.ts',
                    '!./../samples-web-component/src/samples/**/heatworker.worker.ts',
                    '!./../samples-web-component/src/samples/**/MapUtil.ts',
                    '!./../samples-web-component/src/samples/**/sample-base*.ts',
                    '!./../samples-web-component/src/samples/**/*Shared*.ts',
                    '!./../samples-web-component/src/samples/**/*Stocks*.ts',
                    '!./../samples-web-component/src/samples/utilities/*.ts',
                    '!./../samples-web-component/src/samples/charts/data-chart/utilities/*.ts',
                    '!./../samples-web-component/src/samples/**/FinancialData.ts',

    ])
    .pipe(rename(function (file) {
        let fileName = file.basename;
        let folderName = fileName
        .replace("BulletGraph", "")
        .replace("CategoryChart", "")
        .replace("DataChart", "")
        .replace("DockManager", "")
        .replace("DoughnutChart", "")
        .replace("ExcelLibrary", "")
        .replace("Spreadsheet", "")
        .replace("FinancialChart", "")
        .replace("PieChart", "")
        .replace("LinearGauge", "")
        .replace("RadialGauge", "")
        .replace("Map", "")
        .replace("DataGrid", "")
        .replace("Sparkline", "")
        .replace("TreeMap", "")
        .replace("ZoomSlider", "")

        let directory = file.dirname;
        directory = directory.replace("axes\\", "");

        folderName = splitCamel(folderName).split(" ").join("-").toLowerCase();

        // rename chart
        if(chartSubFolders.indexOf(directory) >= 0)
        {
            directory = "data-chart";
        }

        // rename map samples
        folderName = folderName.replace("-shapefile-", "-shp-");
        folderName = folderName.replace("display-imagery", "display");
        folderName = folderName.replace("-tiles", "-imagery");
        folderName = folderName.replace("imagery-sources", "display-all-imagery");

        // rename excel samples
        folderName = folderName.replace("cells", "working-with-cells");
        folderName = folderName.replace("charts", "working-with-charts");
        folderName = folderName.replace("workbooks", "operations-on-workbooks");
        folderName = folderName.replace("worksheets", "operations-on-worksheets");
        if (folderName === "s") {
            folderName = "working-with-sparklines";
        }

        // rename spreadsheet samples
        if (folderName === "adapter") {
            folderName = "adapter-chart";
        }
        folderName = folderName.replace("configuring", "config-options");

        // rename tree samples
        folderName = folderName.replace("tree-overview", "overview");

        // rename linear-gauge samples
        if (folderName === "type-curve") {
            folderName = "type-curved";
        }

        // rename markers to marker-options
        if (folderName === "markers") {
            folderName = "marker-options";
        }

        // rename horizontal scrolling to column-scrolling
        if (folderName === "horizontal-scrolling") {
            folderName = "column-scrolling";
        }

        // rename osm to osm-imagery
        if (folderName === "display-osm") {
            folderName = "display-osm-imagery";
        }

        // rename scatter to shape
        if (folderName === "type-scatter-polygon-series") {
            folderName = "type-shape-polygon-series";
        }

        // rename osm to osm-imagery
        if (folderName === "type-scatter-polyline-series") {
            folderName = "type-shape-polyline-series";
        }

        //C:\Users\Documents\GitHub\samples-web-component\src\samples\excel\excel-library
        let samplePath = "../samples-web-component/src/samples/" + file.dirname + "/" + file.basename + ".ts";
        samplePath = samplePath.replace("\\", "/");
        samplePath = path.resolve(__dirname, samplePath);
        // read samples, extract html, name of sample, path dirname, into array.
        let sampleContent = fs.readFileSync(samplePath, "utf8");
        let sampleLines = sampleContent.split("\n");
        let htmlExtracting = false;
        let tsCode = [];
        let htmlCode = [];

        for (let i = 0; i < sampleLines.length; i++) {
            let line = sampleLines[i];
            if (line.indexOf("let templateHTML") >= 0) {
                htmlExtracting = true;
            } else if (line.indexOf("`;") >= 0) {
                htmlExtracting = false;
                continue;
            }
            if (htmlExtracting) {
                htmlCode.push(line);
            } else {
                tsCode.push(line);
            }
        }

        //Sample file
        directory = "C:\\Users\\Documents\\GitHub\\igniteui-web-comp-examples\\samples\\" + directory;

        directory = directory.replace("data-chart\\axes", "data-chart");
        directory = directory.replace("data-chart\\category", "data-chart");
        directory = directory.replace("data-chart\\features", "data-chart");
        directory = directory.replace("data-chart\\financial", "data-chart");
        directory = directory.replace("data-chart\\polar", "data-chart");
        directory = directory.replace("data-chart\\radial", "data-chart");
        directory = directory.replace("data-chart\\range", "data-chart");
        directory = directory.replace("data-chart\\scatter", "data-chart");
        directory = directory.replace("data-chart\\stacked", "data-chart");
        directory = directory.replace("data-chart\\utilities", "data-chart");

        let sample = {};
        sample.tsName = fileName;
        sample.mainDirectory = directory + "\\" + folderName;

        sample.tsDirectory = directory + "\\" + folderName + "\\src";
        sample.tsCode = tsCode.join("\n");//check string for imports eg. igniteui-webcomponents-charts

        //trim
        sample.tsCode = sample.tsCode.replace("../../../", "./");
        sample.tsCode = sample.tsCode.replace("../", "./");
        sample.tsCode = sample.tsCode.replace("./../", "./");
        sample.tsCode = sample.tsCode.replace("utilities/", "");
        sample.tsCode = sample.tsCode.replace("../utilities", "")
        sample.tsCode = sample.tsCode.replace("../data-chart/utilities/", "./");
        sample.tsCode = sample.tsCode.replace("../data-chart", ".");

        sample.tsCode = sample.tsCode.replace('import { SampleBase } from "./sample-base";', "");
        sample.tsCode = sample.tsCode.replace(" extends SampleBase {", " {\n");
        sample.tsCode = sample.tsCode.replace('this.innerHTML = templateHTML;', "");
        sample.tsCode = sample.tsCode.replace('super();', "");
        sample.tsCode = sample.tsCode.replace("window.customElements.define", "");
        sample.tsCode = sample.tsCode.replace('public static htmlTagName: string = SampleBase.tag', "");
        sample.tsCode = sample.tsCode.replace('public static register(): any {', "");

        //let regex = new RegExp(/\(".*"\);/gm);
        //sample.tsCode = sample.tsCode.replace(regex, "");
        sample.tsCode = sample.tsCode.replace('("' + sample.tsName + '");', "");
        let regex2 = new RegExp(/\(this.htmlTagName,\s.*\);\sreturn this\;\s*}/gm);
        sample.tsCode = sample.tsCode.replace(regex2, "");


        let oldImport = new RegExp(/from\s\"/gm);
        //let newImport = new RegExp(/from\s'/gm);
        sample.tsCode = sample.tsCode.replace('import "./SharedStyles.css";', '');

        sample.tsCode = replaceAll(sample.tsCode, '= "', "= '");
        sample.tsCode = replaceAll(sample.tsCode, oldImport, "from '");
        sample.tsCode = replaceAll(sample.tsCode, '";', "';");
        sample.tsCode = replaceAll(sample.tsCode, '"', "'");
        sample.tsCode = replaceAll(sample.tsCode, 'css";', "css';");
        sample.tsCode = replaceAll(sample.tsCode, 'import "', "import '");

        // sample.tsCode = sample.tsCode.replace('import "./SparklineSharedStyles.css";', '');

        // TODO remove empty space
        // sample.tsCode = sample.tsCode.replace(new RegExp(/\)\s*{\s*\n\s*/gm), "{\n\t\t")
        // sample.tsCode = sample.tsCode.replace(new RegExp(/\n\n\s*\n/gm), "\n");
        if(sample.tsName.indexOf("LinearGauge") >= 0
        || sample.tsName.indexOf("RadialGauge") >= 0
        || sample.tsName.indexOf("BulletGraph") >= 0)
        {
            if(sample.tsCode.indexOf("super()") >=0)
            {
                console.log(sample.tsName + " remove constructor with super");
                let replaceConstructorWithSuper = new RegExp(/constructor\(\)\s\{\n\s*super\(\)\;\n\s*\}\n/gm, "");
                sample.tsCode = replaceAll(sample.tsCode, replaceConstructorWithSuper, "remove constructor with super");

                //sample.tsCode = sample.tsCode.replace("constructor() {\r\n        super();\r\n    }", "test");
            }
            else
            {
                console.log(sample.tsName + " remove constructor with super");
                let replaceConstructorWithoutSuper = new RegExp(/constructor\(\)\s\{\n\s*\}\n/gm);
                sample.tsCode = replaceAll(sample.tsCode, replaceConstructorWithoutSuper, "remove constructor without super");
                //sample.tsCode = sample.tsCode.replace("constructor() {\r\n        super();\r\n    }", "test");
            }

            sample.tsCode = sample.tsCode.replace("connectedCallback", "constructor");

            let fixDoubleConstructor = new RegExp(/constructor\(\)\s{\n\s*\}\n\s*constructor\(\)/gm);
            sample.tsCode = sample.tsCode.replace(fixDoubleConstructor, "constructor{");
        }
        else
        {
            let connectedCallback = new RegExp(/\}\s*\n\s*connectedCallback\(\)\s{/gm);
            sample.tsCode = sample.tsCode.replace(connectedCallback, "");
        }


        sample.tsCode = sample.tsCode + "\n\n" + "let sample = new " + sample.tsName + "();";

        //Html file auto generated from the sample file
        sample.htmlCode = htmlCode.join("\n").replace("let templateHTML = `", "");
        sample.htmlCode = sample.htmlCode.replace("`;", "");
        sample.htmlCode = templateHtml.replace("{InsertHtml}", sample.htmlCode);
        sample.htmlCode = sample.htmlCode.replace("{SampleName}", sample.tsName);
        sample.htmlCode = sample.htmlCode.replace("sample-container", "igContainer");
        sample.htmlCode = sample.htmlCode.replace("sampleColumns", "igContainer-vertical");
        sample.htmlCode = sample.htmlCode.replace("sampleRows", "igContainer-horizontal");
        sample.htmlCode = sample.htmlCode.replace("options", "igOptions");
        sample.htmlCode = sample.htmlCode.replace("option-label", "igOptions-label");
        sample.htmlCode = sample.htmlCode.replace("option-item", "igOptions-item");
        sample.htmlCode = sample.htmlCode.replace("option-value", "igOptions-value");
        sample.htmlCode = sample.htmlCode.replace("legend", "igLegend");
        sample.htmlCode = sample.htmlCode.replace("legend-title", "igLegend-title");
        sample.htmlCode = sample.htmlCode.replace("slider", "igOptions-slider");

        sample.htmlDirectory = directory + "\\" + folderName;
        sample.packageCode = packageJson;
        sample.webpackConfig = webpackConfig;
        sample.sandboxConfig = sandboxConfig;
        sample.indexTS = indexTS;
        sample.sharedFiles = [];
        sample.jsSharedFiles = [];
        sample.sharedCSS = [];
        sample.packageVersion = ': "^1.1.1"';
        sample.dockManagerVersion = ': "^1.0.1"';
        sample.packages = ['"igniteui-webcomponents-core": "^1.1.1"'];

                if(sample.tsCode.toString().match("igniteui-webcomponents-charts"))
                {
                    sample.packages.push('"igniteui-webcomponents-charts"' + sample.packageVersion);
                }
                if(sample.tsCode.toString().match("igniteui-webcomponents-excel"))
                {
                    sample.packages.push('"igniteui-webcomponents-excel"' + sample.packageVersion);
                }
                if(sample.tsCode.toString().match("igniteui-webcomponents-spreadsheet"))
                {
                    sample.packages.push('"igniteui-webcomponents-spreadsheet"' + sample.packageVersion);
                }
                if(sample.tsCode.toString().match("igniteui-webcomponents-spreadsheet-chart-adapter"))
                {
                    sample.packages.push('"igniteui-webcomponents-charts"' + sample.packageVersion);
                    sample.packages.push('"igniteui-webcomponents-spreadsheet-chart-adapter"' + sample.packageVersion);
                }
                if(sample.tsCode.toString().match("igniteui-webcomponents-gauges"))
                {
                    sample.packages.push('"igniteui-webcomponents-gauges"' + sample.packageVersion);
                    sample.htmlCode = sample.htmlCode.replace("igContainer-horizontal", "igContainer-center");
                }
                if(sample.tsCode.toString().match("igniteui-webcomponents-grids"))
                {
                    sample.packages.push('"igniteui-webcomponents-grids"' + sample.packageVersion);
                    sample.packages.push('"igniteui-webcomponents-inputs"' + sample.packageVersion);
                }
                if(sample.tsCode.toString().match("igniteui-webcomponents-maps"))
                {
                    sample.packages.push('"igniteui-webcomponents-maps"' + sample.packageVersion);
                    //sample.sandboxConfig = sample.sandboxConfig.replace('"infiniteLoopProtection": false,', '"infiniteLoopProtection": true,');
                }
                if(sample.tsCode.toString().match("igniteui-dockmanager"))
                {
                    sample.packages.push('"igniteui-dockmanager"' + sample.dockManagerVersion);
                }

                if(sample.tsCode.match("ExcelUtility"))
                {
                    sample.packages.push('"file-saver": "^2.0.2"');
                    sample.packages.push('"@types/file-saver": "^2.0.1"');
                }

                let combinedPackages = sample.packages.join(",\n      ") + ",";
                sample.packageCode = sample.packageCode.replace("insertPACKAGES", combinedPackages);
                // alternative
                // let updateWebpackConfig = "path.resolve(__dirname, 'src/" + sample.tsName + "')";
                // sample.webpackConfig = replaceAll(sample.webpackConfig, "path.resolve(__dirname, 'src')", updateWebpackConfig);
                sample.indexTS = sample.indexTS + "import './" + sample.tsName + "';";


            let tsLines = sample.tsCode.split("\r\n");
            tsLines.forEach(line => {
                let tsFrom = line.indexOf(" from './");
                let tsSemicolon = line.indexOf("';");

                if(tsFrom > 0 && tsSemicolon > 0)
                {
                    let sharedFile = line.substring(tsFrom + 9, tsSemicolon);

                    sharedFile = sharedFile.replace("\n", "");

                    if(sharedFile.toString().match("WorldHierarchicalData")){
                        sample.tsCode = replaceAll(sample.tsCode, "WorldHierarchicalData", "SampleTreeData");
                        sharedFile = "SampleTreeData";
                    }
                    if(sharedFile.toString().match("DataGridDataGridSharedData")){
                        sample.tsCode = replaceAll(sample.tsCode, "DataGridDataGridSharedData", "DataGridSharedData");
                        sharedFile = "DataGridSharedData";
                    }

                    if(sharedFile === "FinancialData"){
                        sample.tsCode = replaceAll(sample.tsCode, "FinancialData", "LiveFinancialData");
                        sharedFile = "LiveFinancialData";
                    }

                    if(sharedFile.toString().match("WorldConnections"))
                    {
                        sample.sharedFiles.push("WorldLocations" + '.ts');
                        sample.sharedFiles.push("WorldUtils" + '.ts');
                    }

                    if(sharedFile === "SharedData" && sample.tsName.indexOf("CategoryChart") >= 0)
                    {
                        sample.tsCode = replaceAll(sample.tsCode, "SharedData", "CategoryChartSharedData");
                        sharedFile = "CategoryChartSharedData";
                    }

                    if(sharedFile === "SharedData" && sample.tsName.indexOf("Sparkline") >= 0)
                    {
                        sample.tsCode = replaceAll(sample.tsCode, "SharedData", "SparklineSharedData");
                        sharedFile = "SparklineSharedData";
                    }

                    if(sharedFile === "SharedData" && sample.tsName.indexOf("DataChart") >= 0)
                    {
                        sample.tsCode = replaceAll(sample.tsCode, "SharedData", "DataChartSharedData");
                        sharedFile = "DataChartSharedData";
                    }



                    sample.sharedFiles.push(sharedFile + '.ts');
                }
            });

            for (let name of templateSharedFiles) {
                sample.tsCode = sample.tsCode.replace("import " + name, "import {" + name);
                sample.tsCode = sample.tsCode.replace(" " + name + " from", " " + name + " } from");
            }

            if(sample.tsCode.indexOf("heatworker.worker") > 0)
            {
                sample.sharedFiles.push("heatworker.worker.ts");
            }
            else if(sample.tsCode.indexOf("odatajs-4.0.0") > 0)
            {
                sample.sharedFiles.push("odatajs-4.0.0.js");
            }

        extractedSamples.push(sample);

    }))
    // save ts and html code separately
   .on("end", function() {

    let fullDir = "C:\\Users\\\Documents\\GitHub\\igniteui-web-comp-examples\\samples\\";

    mkDirectory(fullDir);
    mkDirectory(fullDir + "excel")
    mkDirectory(fullDir + "excel\\excel-library")
    mkDirectory(fullDir + "excel\\spreadsheet")

    mkDirectory(fullDir + "charts")
    mkDirectory(fullDir + "charts\\category-chart")
    mkDirectory(fullDir + "charts\\data-chart")
    mkDirectory(fullDir + "charts\\doughnut-chart")
    mkDirectory(fullDir + "charts\\financial-chart")
    mkDirectory(fullDir + "charts\\pie-chart")
    mkDirectory(fullDir + "charts\\sparkline")
    mkDirectory(fullDir + "charts\\tree-map")
    mkDirectory(fullDir + "charts\\zoomslider")

    mkDirectory(fullDir + "gauges")
    mkDirectory(fullDir + "gauges\\bullet-graph")
    mkDirectory(fullDir + "gauges\\linear-gauge")
    mkDirectory(fullDir + "gauges\\radial-gauge")

    mkDirectory(fullDir + "grids")
    mkDirectory(fullDir + "grids\\data-grid")

    mkDirectory(fullDir + "layouts")
    mkDirectory(fullDir + "layouts\\dock-manager")

    mkDirectory(fullDir + "maps")
    mkDirectory(fullDir + "maps\\geo-map")


    extractedSamples.forEach(item => {
        // Create Main directory
        mkDirectory(item.mainDirectory);

        // Create sample.ts directory
        mkDirectory(item.tsDirectory);

        // Write sample.ts code to file in sample.ts directory
        fs.writeFileSync(item.tsDirectory + "\\" + item.tsName + ".ts", item.tsCode);

        // Write html file
        fs.writeFileSync(item.mainDirectory + "\\index.html", item.htmlCode);

        // Write template files & css
        fs.writeFileSync(item.mainDirectory + "\\package.json", item.packageCode);
        fs.writeFileSync(item.mainDirectory + "\\tsconfig.json", tsconfigJson);
        fs.writeFileSync(item.mainDirectory + "\\webpack.config.js", item.webpackConfig);
        fs.writeFileSync(item.mainDirectory + "\\ReadMe.md", readMe);
        fs.writeFileSync(item.mainDirectory + "\\sandbox.config.json", item.sandboxConfig);
        fs.writeFileSync(item.tsDirectory + "\\index.css", indexCSS);
        fs.writeFileSync(item.tsDirectory + "\\index.ts", item.indexTS);

            // iterate ts sharedFiles
            item.sharedFiles.forEach(sampleSharedFile =>{

                //console.log(item.tsName + " " + item.sharedFiles);
                let sampleSharedFilePath = templateFolderPath + sampleSharedFile;
                //console.log(sampleSharedFilePath);

                if(fs.existsSync(sampleSharedFilePath))
                {
                    let readSharedFile = fs.readFileSync(sampleSharedFilePath, "utf8");
                    //console.log(item.tsDirectory  + "\\" + sampleSharedFile);
                    fs.writeFileSync(item.tsDirectory  + "\\" + sampleSharedFile, readSharedFile);
                }
                else{
                    console.log("Error - Cannot Find Templated File " + sampleSharedFile + " " + item.tsName);
                }
            });

            // iterate item.sharedFiles
            item.jsSharedFiles.forEach(sampleSharedFile =>{

                //console.log(item.tsName + " " + item.sharedFiles);
                let sampleSharedFilePath = templateFolderPath + sampleSharedFile;
                //console.log(sampleSharedFilePath);

                if(fs.existsSync(sampleSharedFilePath))
                {
                    let readSharedFile = fs.readFileSync(sampleSharedFilePath, "utf8");
                    //console.log(item.tsDirectory  + "\\" + sampleSharedFile);
                    fs.writeFileSync(item.tsDirectory  + "\\" + sampleSharedFile, readSharedFile);
                }
                else{
                    console.log("Error - Cannot Find Templated File " + sampleSharedFile + " " + item.tsName);
                }
            });
    });

        cb();
    })

}
exports.portingSamples = portingSamples;

exports.all = all = gulp.series(

    getNamesSharedFiles,
    portingSamples,
);

