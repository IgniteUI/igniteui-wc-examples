
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

// var sb = require('./tasks/gulp-samples.js')

// exports.updateSamples = updateSamples = gulp.series(
    // sb.lintSamples,
    // sb.getSamples,
    // sb.updateReadme,
    // sb.updatePackages,
    // sb.updateIndex,
    // sb.updateSharedFiles,
// );

// exports.updateReadme = updateReadme = gulp.series(
    // sb.getSamples,
    // sb.updateReadme,
// );

// exports.updatePackages = updatePackages = gulp.series(
    // sb.getSamples,
    // sb.updatePackages,
// );

// exports.updateSharedFiles = updateSharedFiles = gulp.series(
    // sb.getSamples,
    // sb.updateSharedFiles,
// );

// exports.updateBrowser = updateBrowser = gulp.series(
    // sb.getSamples,
    // sb.copySamples,
    // // sb.copyPackageJson,
// );

// // exports.default = updateBrowser;
// exports.logPublicFiles = sb.logPublicFiles;
// exports.logSourceFiles = sb.logSourceFiles;
// exports.logUniqueFiles = sb.logUniqueFiles;
// exports.logRootFiles   = sb.logRootFiles;
// exports.lintSamples    = sb.lintSamples;

// exports.logRoutes = logRoutes = gulp.series(
    // sb.getSamples,
    // sb.logRoutes,
// );

// Create task - copying samples
// C:\Users\mdifilippo\source\repos\samples-web-component\src\samples
// Paste below
// C:\Users\mdifilippo\Documents\GitHub\igniteui-web-comp-examples\samples


function toTitleCase(str, separator) {
    if (separator === undefined) { separator = ' '; }
    return str.toLowerCase().split(separator).map(function(word) {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
}

function splitCamel(orgStr) {
    return orgStr.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
}

//let templateFiles = "./../samples-web-component/src/utilities";

// function getTemplates() {
//     return gulp.src(templates + './**/*')
//         .pipe(es.map(function(file, cb) {           
//             let t = path.relative(templates, file.path);
//             let stat = fs.lstatSync(file.path);
//                 if(!stat.isDirectory()) {
//                     let f = fs.readFileSync(file.path);
//                     templateFiles.push({name: t, content: f.toString()});
//                 } 
//             cb();
//     }));
// }
// exports.getTemplates = getTemplates;

function portingSamples() {
    del.sync("./samples/**/*.*", {force:true});
    del.sync("./samples/**", {force:true});

    let chartSubFolders = [
        "axes", 
        "category",
        "features",
        "finacial",
        "polar",
        "radial",
        "range",
        "scatter",
        "stacked",
        "utilities"
    ]

    let sharedFiles = [
        ""
    ]

    let excludeFiles = [
        "EsriUtility.ts",
        "heatworker.worker.ts",
        "MapUtils.ts",

    ]

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
                    '!./../samples-web-component/src/samples/utiltiies/*.ts',
                    
    ])
    .pipe(rename(function (path) {
        let fileName = path.basename;
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
        
        let directory = path.dirname;
        folderName = splitCamel(folderName).split(" ").join("-").toLowerCase();

        //rename chart
        if(chartSubFolders.indexOf(directory) >= 0)
        {
            directory = "data-chart"; 
            console.log(directory + " " + folderName + " " + path.basename);                   
        }
        
        //rename map samples
        folderName = folderName.replace("-shapefile-", "-shp-");
        folderName = folderName.replace("display-imagery", "display");
        folderName = folderName.replace("-tiles", "-imagery");
        folderName = folderName.replace("imagery-sources", "display-all-imagery");
        
        //rename excel samples
        folderName = folderName.replace("cells", "working-with-cells");
        folderName = folderName.replace("charts", "working-with-charts");
        folderName = folderName.replace("workbooks", "operations-on-workbooks");
        folderName = folderName.replace("worksheets", "operations-on-worksheets");
        if (folderName === "s") {
            folderName = "working-with-sparklines";
        }

        //rename spreadsheet samples
        if (folderName === "adapter") {
            folderName = "adapter-chart";
        }
        folderName = folderName.replace("configuring", "config-options");

        //rename linear-gauge samples
        if (folderName === "type-curve") {
            folderName = "type-curved";
        }

        path.dirname = directory + "/" + folderName; 
    }))
    .pipe(gulp.dest('./samples/'))
	
}
exports.portingSamples = portingSamples;
