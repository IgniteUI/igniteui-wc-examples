
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
//let replace = require('gulp-regex-replace');
let inject = require('gulp-file-inject');

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

let templates = [];
let templateSharedFiles = [];
let templateFiles = "./templates/sample";
let templatesShared = "./templates/shared/src";


// function getTemplates() {
//     return gulp.src(templates + './**/*')
//         .pipe(es.map(function(file, cb) {           
//             let t = path.relative(templates, file.path);
//             //console.log(t);
//             let stat = fs.lstatSync(file.path);
//                 if(!stat.isDirectory()) {
//                     let f = fs.readFileSync(file.path);
//                     templateFiles.push({name: t, content: f.toString()});
//                 } 
//             cb();
//     }));
// }
// exports.getTemplates = getTemplates;

//Get SharedTemplate Files
function getSharedFiles() {
    return gulp.src(templatesShared + './*')
        .pipe(es.map(function(file, cb) {                       
            let t = path.relative(templatesShared, file.path);
            let stat = fs.lstatSync(file.path);            
            if(!stat.isDirectory()) {
                let f = fs.readFileSync(file.path);               
                templateSharedFiles.push({name: t, content: f.toString()});
            } 
            cb();
    }));
}
exports.getSharedFiles = getSharedFiles;

function mkDirectory(directoryName){
    if(!fs.existsSync(directoryName)) {
        fs.mkdirSync(directoryName);
        //console.log('📁  folder created:', dir);    
    }  
}

function portingSamples() {
    del.sync("./samples/**/*.*", {force:true});
    del.sync("./samples/**", {force:true});

    let extractedSamples = [];
   
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
        "C:\\Users\\mdifilippo\\Documents\\GitHub\\igniteui-web-comp-examples\\templates\\package.json",
        "C:\\Users\\mdifilippo\\Documents\\GitHub\\igniteui-web-comp-examples\\templates\\sandbox.config.json",
        "C:\\Users\\mdifilippo\\Documents\\GitHub\\igniteui-web-comp-examples\\templates\\tsconfig.json",
        "C:\\Users\\mdifilippo\\Documents\\GitHub\\igniteui-web-comp-examples\\templates\\webpack.config.js"
    ]

    let excludeFiles = [
        "EsriUtility.ts",
        "heatworker.worker.ts",
        "MapUtils.ts",

    ]
    
    // let templateHtml
    // read the template ./templates/porting/index.html
    let templateHtml = fs.readFileSync("./templates/porting/index.html", "utf8");

    let packageJson = fs.readFileSync("./templates/sample/package.json", "utf8")
    let tsconfigJson = fs.readFileSync("./templates/sample/tsconfig.json", "utf8");
    let webpackConfig = fs.readFileSync("./templates/sample/webpack.config.js", "utf8");
    let readMe = fs.readFileSync("./templates/sample/ReadMe.md", "utf8");
    let sandboxConfig = fs.readFileSync("./templates/sample/sandbox.config.json", "utf8");

    // move each tsx file into their own folder
   return gulp.src(['./../samples-web-component/src/samples/**/*.ts',
                      '!./../samples-web-component/src/samples/**/router*.ts',
                    '!./../samples-web-component/src/samples/**/shared*.ts',
                    '!./../samples-web-component/src/samples/**/data*.ts',
                    '!./../samples-web-component/src/samples/**/*Utility.ts',
                    '!./../samples-web-component/src/samples/**/*Utils.ts',
                    '!./../samples-web-component/src/samples/**/heatworker.worker.ts',
                    '!./../samples-web-component/src/samples/**/MapUtil.ts',
                    '!./../samples-web-component/src/samples/**/sample-base*.ts',
                    '!./../samples-web-component/src/samples/**/*Shared*.ts',
                    '!./../samples-web-component/src/samples/**/*Stocks*.ts',
                    '!./../samples-web-component/src/samples/utiltiies/*.ts',
                    
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
            //console.log(directory + " " + folderName + " " + file.basename);                   
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

        // rename linear-gauge samples
        if (folderName === "type-curve") {
            folderName = "type-curved";
        }

        //C:\Users\mdifilippo\Documents\GitHub\samples-web-component\src\samples\excel\excel-library
        let samplePath = "../samples-web-component/src/samples/" + file.dirname + "/" + file.basename + ".ts";
        samplePath = samplePath.replace("\\", "/");
        samplePath = path.resolve(__dirname, samplePath);
        // read samples, extract html, name of sample, path dirname, into array. 
        let sampleContent = fs.readFileSync(samplePath, "utf8");
        //console.log(samplePath);
        //console.log(sampleContent);
        let sampleLines = sampleContent.split("\n");
        let htmlExtracting = false;
        let tsCode = [];
        let htmlCode = [];
        let packageCode = [];
        let packageVersion = "";
        let dockManagerVersion = "";
        let htmlDirectory = "";
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
        directory = "C:\\Users\\mdifilippo\\Documents\\GitHub\\igniteui-web-comp-examples\\samples\\" + directory;

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
        if(directory.indexOf("data-chart"))
        {
            //console.log(directory);

        }
        //console.log(directory);
      

        let sample = {};
        sample.tsName = fileName;
        sample.mainDirectory = directory + "\\" + folderName;
        
        sample.tsDirectory = directory + "\\" + folderName + "\\src";
        sample.tsCode = tsCode.join("\n");//check string for imports eg. igniteui-webcomponents-charts
        sample.tsCode = sample.tsCode.replace('import { SampleBase } from "../../sample-base";', "");
        // sample.tsCode = sample.tsCode.replace(' extends SampleBase', "");
        sample.tsCode = sample.tsCode.replace(" extends SampleBase {", " {\n");
        sample.tsCode = sample.tsCode.replace('this.innerHTML = templateHTML;', "");
        sample.tsCode = sample.tsCode.replace('super();', "");
        sample.tsCode = sample.tsCode.replace("window.customElements.define", "");
        sample.tsCode = sample.tsCode.replace('public static htmlTagName: string = SampleBase.tag', "");
        sample.tsCode = sample.tsCode.replace('public static register(): any {', "");
        
        
        let regex = new RegExp(/\(".*"\);/gm);
        sample.tsCode = sample.tsCode.replace(regex, "");
        let regex2 = new RegExp(/\(this.htmlTagName,\s.*\);\sreturn this\;\s*}/gm);
        sample.tsCode = sample.tsCode.replace(regex2, "");

        sample.tsCode = sample.tsCode.replace("../../../", "./");
        sample.tsCode = sample.tsCode.replace("utilities/", "");
        sample.tsCode = sample.tsCode.replace("../utilities", "")

        //sample.tsCode = sample.tsCode.replace(new RegExp(/\)\s*{\s*\n\s*/gm), "{\n\t\t")
        sample.tsCode = sample.tsCode.replace(new RegExp(/\n\n\s*\n/gm), "\n")
        //Html file auto generated from the sample file
        sample.htmlCode = htmlCode.join("\n").replace("let templateHTML = `", "");
        sample.htmlCode = sample.htmlCode.replace("`;", "");
        sample.htmlCode = templateHtml.replace("insertHtml", sample.htmlCode);
        sample.htmlDirectory = directory + "\\" + folderName;
        sample.packageCode = packageJson;
        
        sample.packageVersion = ': "^1.1.1"';
        sample.dockManagerVersion = ': "^1.0.1",';
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
                    sample.packages.push('"igniteui-webcomponents-spreadsheet-chart-adapter"' + sample.packageVersion);
                }
                if(sample.tsCode.toString().match("igniteui-webcomponents-gauges"))
                {
                    sample.packages.push('"igniteui-webcomponents-gauges"' + sample.packageVersion);
                }
                if(sample.tsCode.toString().match("igniteui-webcomponents-grids"))
                {
                    sample.packages.push('"igniteui-webcomponents-grids"' + sample.packageVersion);
                    sample.packages.push('"igniteui-webcomponents-inputs"' + sample.packageVersion);
                }
                if(sample.tsCode.toString().match("igniteui-webcomponents-maps"))
                {
                    sample.packages.push('"igniteui-webcomponents-maps"' + sample.packageVersion);
                }
                if(sample.tsCode.toString().match("igniteui-dockmanager"))
                {
                    sample.packages.push('"igniteui-dockmanager"' + sample.dockManagerVersion);
                }

                let combinedPackages = sample.packages.join(",\n      ") + ",";
                sample.packageCode = sample.packageCode.replace("insertPACKAGES", combinedPackages);
        
        extractedSamples.push(sample);
 
    }))
    // save ts and html code separately
   .on("end", function() {

    let fullDir = "C:\\Users\\mdifilippo\\Documents\\GitHub\\igniteui-web-comp-examples\\samples\\";
    
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

        fs.writeFileSync(item.mainDirectory + "\\package.json", item.packageCode);
        fs.writeFileSync(item.mainDirectory + "\\tsconfig.json", tsconfigJson);
        fs.writeFileSync(item.mainDirectory + "\\webpack.config.js", webpackConfig);
        fs.writeFileSync(item.mainDirectory + "\\ReadMe.md", readMe);
        fs.writeFileSync(item.mainDirectory + "\\sandbox.config.json", sandboxConfig);
    });

    getSharedFiles();
    //console.log(templateSharedFiles);
    templateSharedFiles.forEach(item => {
        //console.log(item.mainDirectory + "\\" + item.fileName);
        //fs.writeFileSync(item.mainDirectory + "\\" + item.fileName)
    })
     
    
    
    // Write sample.html code to file in html directory
    // TODO add code for saving ts and html files using extractedSamples array

    // console.log("About to save ts and html files");

    
    })
    // .pipe(rename(function (path) {
    //     path.dirname += "/" + path.basename;
    // }))
    //.pipe(gulp.dest('./samples/'))  
    //.pipe(gulp.dest('/src/'))
    // .pipe(es.map(function(file, cb) {
   
    //     fs.writeFileSync(file.dirname + "/index.html", sample.html);
    //     cb(null, file);
    // }))


    // create folder
    // WARNING 
    // .pipe(gulp.dest('./samples/'))    
    // .pipe()   

}
exports.portingSamples = portingSamples;

function scripts() {
}

exports.scripts = scripts;

exports.all = gulp.series(portingSamples,
    // getTemplates,   
    // getSharedFiles,  
    scripts);

