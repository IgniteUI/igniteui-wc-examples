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
let through2 = require('through2');

// simple callback stream used to synchronize stuff
function synchro(done) {
    return through2.obj(function (data, enc, cb) { cb(); },
    function (cb) { cb(); done(); });
}

var igConfig = require('./gulp-config.js')
// var platform = "React";
// var igConfig = require('./gulp-config.js')[platform];

eval(require('typescript')
.transpile(require('fs')
.readFileSync("./tasks/Transformer.ts").toString()));

function log(msg) {
    console.log('>> ' + msg);
}
log('loaded');

// NOTE you can comment out strings in this array to run subset of samples
var sampleSources = [
    igConfig.SamplesCopyPath + '/charts/category-chart/**/package.json',
    igConfig.SamplesCopyPath + '/charts/data-chart/**/package.json',
    igConfig.SamplesCopyPath + '/charts/doughnut-chart/**/package.json',
    igConfig.SamplesCopyPath + '/charts/financial-chart/**/package.json',
    igConfig.SamplesCopyPath + '/charts/pie-chart/**/package.json',
    igConfig.SamplesCopyPath + '/charts/sparkline/**/package.json',
    igConfig.SamplesCopyPath + '/charts/tree-map/**/package.json',
    igConfig.SamplesCopyPath + '/charts/zoomslider/**/package.json',
    igConfig.SamplesCopyPath + '/maps/**/package.json',
    igConfig.SamplesCopyPath + '/excel/excel-library/**/package.json',
    igConfig.SamplesCopyPath + '/excel/spreadsheet/**/package.json',
    igConfig.SamplesCopyPath + '/gauges/bullet-graph/**/package.json',
    igConfig.SamplesCopyPath + '/gauges/linear-gauge/**/package.json',
    igConfig.SamplesCopyPath + '/gauges/radial-gauge/**/package.json',
    igConfig.SamplesCopyPath + '/grids/**/package.json',
    igConfig.SamplesCopyPath + '/editors/**/package.json',
    igConfig.SamplesCopyPath + '/layouts/dock-manager/**/package.json',
    igConfig.SamplesCopyPath + '/layouts/card/**/package.json',
 // igConfig.SamplesCopyPath + '/layouts/**/package.json',
  
    igConfig.SamplesCopyPath + '/scheduling/calendar/**/package.json',

    igConfig.SamplesCopyPath + '/menus/nav-drawer/**/package.json',
    igConfig.SamplesCopyPath + '/menus/navbar/**/package.json',

    igConfig.SamplesCopyPath + '/data/form/**/package.json',
    igConfig.SamplesCopyPath + '/inputs/**/package.json',
 // igConfig.SamplesCopyPath + '/inputs/link-button/**/package.json',
 // igConfig.SamplesCopyPath + '/inputs/button/**/package.json',

 // igConfig.SamplesCopyPath + '/scheduling/calendar/**/package.json',


    // excluding samples that are not finished:
     '!' + igConfig.SamplesCopyPath + '/**/node_modules/**/package.json',
     '!' + igConfig.SamplesCopyPath + '/**/node_modules/**',
     '!' + igConfig.SamplesCopyPath + '/**/node_modules',
];

// this variable stores detailed information about all samples in ./samples/ folder
var samples = [];

var sampleOutputFolder = '';
// var sampleOutputFolder = './sample-test-files/';

function cleanSamples() {
    // cleaning up obsolete files in individual samples
    del.sync("./samples/**/src/sandbox.config.json", {force:true});
    del.sync("./samples/**/manifest.json", {force:true});
}

function lintSamples(cb) {

    // del.sync("./sample-test-files/**/*.*", {force:true}); LinearGaugeLabels.tsx

    gulp.src([
        // './samples/tests2/**/**/LinearGaugeLabels.tsx',
        // './samples/gauges/**/**/*.tsx',
        './templates/**/**/*.ts',
        // './templates/**/**/*.ts',
        // './samples/**/**/**/*.tsx',
    //    '!./samples/**/**/**/index.ts',
    ], {base: './'})
    // .pipe(gSort( { asc: false } ))
    .pipe(es.map(function(file, fileCallback) {

        let fileLocation = Transformer.getRelative(file.dirname) + '/' + file.basename;
        let fileContent = file.contents.toString();
        // log('linting ' + fileLocation);

        let newContent = Transformer.lintSample(fileContent, fileLocation,
            (err, results) => {
              if (err) { fileCallback(err, null); }
            });
        if (newContent !== fileContent) {
            log('changed: ' + fileLocation);
            file.contents = Buffer.from(newContent);
        }
        fileCallback(null, file);
    }))
    .pipe(gulp.dest('./'))
    .on("end", function() {
        cb();
    });
} exports.lintSamples = lintSamples;

function findSamples(cb) {

    // cleanBrowser();
    cleanSamples();

    samples = [];
    // del.sync("./sample-test-files/**/*.*", {force:true});
    let sampleTemplate = fs.readFileSync("./src/templates/group/component/name/Sample.ts", "utf8");

    gulp.src(sampleSources)
    // .pipe(gSort( { asc: false } ))
    .pipe(es.map(function(samplePackage, sampleCallback) {

        let SampleFolderName = Transformer.getRelative(samplePackage.dirname);
        // log("findSamples " + SampleFolderName);

        let sampleFiles = [];
        gulp.src([
              SampleFolderName + "/package.json",
              SampleFolderName + "/index.html",
              SampleFolderName + "/src/**",
        // '!' + SampleFolderName + "/src/index.ts",
        //       SampleFolderName + "/**",
        // '!' + SampleFolderName + "/package-lock.json",
        // '!' + SampleFolderName + "/sandbox.config.json",
        // '!' + SampleFolderName + "/node_modules/**",
        ])
        // .pipe(flatten({ "includeParents": -1 }))
        .pipe(es.map(function(file, fileCallback) {
            let fileDir = Transformer.getRelative(file.dirname);
            let filePath = fileDir + "/" + file.basename;
            sampleFiles.push(filePath);
            // log("findSamples " + filePath );
            fileCallback(null, file);
        }))
        .on("end", function() {
            //  log("findSamples " + SampleFolderName + " " + sampleFiles.length + " files" );

            let sampleInfo = Transformer.getSampleInfo(samplePackage, sampleFiles);
            samples.push(sampleInfo);

            sampleCallback(null, samplePackage);
        });

        // sampleCallback(null, sample);
    }))
    .on("end", function() {
        log('findSamples found ' + samples.length + " samples");
        Transformer.sort(samples);
        Transformer.process(samples, sampleTemplate);

        Transformer.sort(samples);

        // log("HtmlFileCode \n" + samples[0].HtmlFileCode)
        //Transformer.verify(samples);
        //Transformer.print(samples);
        //Transformer.getGroups(samples);
        // log('findSamples found ' + samples.length + " samples");
        // for (const sample of samples) {
        //     log(' ' + sample.SampleFolderPath);
        // }
        // let last = samples[samples.length - 1];
        // log('package name ' + last.PackageFileContent.name);
        // last.PackageDependencies = Transformer.getDependencies(last);
        // log('packages \n' + last.PackageFileContent.dependencies);
        // log('dependencies: \n' + last.PackageDependencies);
        cb();
    });

} exports.findSamples = findSamples;

function makeDirectoryFor(filePath) {
    var dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
      return true;
    }
    makeDirectoryFor(dirname);
    fs.mkdirSync(dirname);
    // fs.mkdir(sampleOutputFolder + 'src', { recursive: true }, (err) => { if (err) throw err; });
}

// function copyExclude(files) {
//     return es.map(function(file, cb) {
//         if (files.indexOf(file.basename) >= 0) {
//             // log('+ share data ' + file.basename);
//             cb(null, file);
//         } else {
//             // log('- share data ' + file.basename);
//             cb(null);
//         }
//     });
// }

function cleanBrowser() {
    console.log('>> deleting samples in browser: ./src/samples/*.* ');
    del.sync("./src/samples/**/*.*", {force:true});
    del.sync("./src/samples/*.*", {force:true});
    del.sync("./src/samples/*", {force:true});
}

function logSamples(cb) {

    for (const sample of samples) {
        gulp.src([
            //   sample.SampleFolderPath + '/**/*.*',
              sample.SampleFolderPath + '/src/*.ts',
        // '!' + sample.SampleFolderPath + '/src/index.ts',
        ])
        .pipe(es.map(function(file, fileCallback) {

            let fileLocation = Transformer.getRelative(file.dirname) + '/' + file.basename;
            console.log("" + fileLocation);
            fileCallback(null, file);
        }));
    }

    cb();
} exports.logSamples = logSamples;

function logSandboxLinks(cb) {
    let base = "https://codesandbox.io/s/github/IgniteUI/igniteui-wc-examples/tree/master";
    for (const sample of samples) {

        let url = base + "" + sample.SampleFolderPath;
        url = url.replace("../", "/")
        console.log(url);
    }
    cb();
} exports.logSandboxLinks = logSandboxLinks;

function copySamples(cb) {

    cleanBrowser();

    let sampleGroups = Transformer.getSampleGroups(samples);

    console.log('>> generating router files... ');
    let routerTemplate = fs.readFileSync("./src/templates/group/Router.ts", "utf8");
    for (const group of sampleGroups) {
        let outputPath = "./src/samples/" + group.Name + "/router.ts";
        makeDirectoryFor(outputPath);
        // log('created ' + outputPath);

        console.log('>> generating routes for group: ' + group.Name);
        let routingFile = Transformer.getRoutingFile(group, routerTemplate);
        fs.writeFileSync(outputPath, routingFile);
        console.log('>> generating routes done: ' + outputPath);

    }

    console.log('>> generating index file... ');
    let indexTemplate = fs.readFileSync("./src/templates/index.html", "utf8");
    let indexFile = Transformer.getIndexFile(sampleGroups, indexTemplate);
    let indexPath = "./public/index.html";
    fs.writeFileSync(indexPath, indexFile);
    console.log('>> generating index file done: ' + indexPath);

    console.log('>> transforming samples ... ');
    var transformedSamples = 0;
    function onSampleTransformed() {
        transformedSamples += 1;
        if (transformedSamples >= samples.length) {
            console.log('>> transforming samples done: ' + transformedSamples);
            cb();
        }
    }

    let sampleTemplate = fs.readFileSync("./src/templates/group/component/name/Sample.ts", "utf8");

    // let copiedSamples = 0;
    for (const sample of samples) {
        // console.log('copying ' + sample.SampleFolderPath + '/' + sample.SampleFileName);

        // let outputPath = sample.SampleFolderPath;
        let outputPath = './src' + sample.SampleFolderPath.replace('..','');
        // let outputPath = './sample-test-files' + sample.SampleFolderPath.replace('.','');
        // log(outputPath);
        // let outputPath = sampleOutputFolder + '/' + sample.SampleFolderPath;

        gulp.src([
            //   sample.SampleFolderPath + '/**/*.*',
              sample.SampleFolderPath + '/src/*.*',
        // '!' + sample.SampleFolderPath + '/src/index.ts',
        '!' + sample.SampleFolderPath + '/src/index.css',
        '!' + sample.SampleFolderPath + '/src/typedecls.d.ts',
        // '!' + sample.SampleFolderPath + '/sandbox.config.json',
        // '!' + sample.SampleFolderPath + '/README.md',
        // '!' + sample.SampleFolderPath + '/ReadMe.md',
        // '!' + sample.SampleFolderPath + '/readme.md',
        // '!' + sample.SampleFolderPath + '/package.json',
        // '!' + sample.SampleFolderPath + '/package-lock.json',
        ])
        .pipe(es.map(function(file, fileCallback) {

            var fileName = file.basename.toLowerCase();
            var compName = sample.ComponentID.toLowerCase();
            var isSampleFile = fileName === "index.ts";
            // var isSampleFile = fileName.indexOf(compName) >= 0 &&
            //                    fileName.indexOf(".ts") >= 0;

            // console.log ('FinancialChartMultipleData ' + file.basename.indexOf("FinancialChartMultipleData") + ' ' +  file.basename )
            var isDataFile = file.basename.indexOf("Utils.ts") >= 0 ||
                             file.basename.indexOf("Utility.ts") >= 0 ||
                             file.basename.indexOf("Sample") >= 0 ||
                             (file.basename.indexOf("Data.ts") >= 0 &&
                              file.basename.indexOf("MapTriangulatingData") == -1 &&
                              file.basename.indexOf("FinancialChartMultipleData") == -1 &&
                              file.basename.indexOf("DataGridBindingLiveData") == -1 &&
                              file.basename.indexOf("DataGridBindingLocalData") == -1 &&
                              file.basename.indexOf("DataGridBindingRemoteData") == -1);

            // console.log(">> '" + compName + "' " + fileName);

            if (isSampleFile && !isDataFile) {
                console.log(">> transforming " + outputPath + "/" + file.basename);
                let sampleCode = Transformer.getSampleCodeInBrowser(sample, sampleTemplate)
                file.contents = Buffer.from(sampleCode);
            } else {
                // console.log(">> copying file: " + outputPath + "/" + file.basename);
            }

            fileCallback(null, file);
            // console.log("saving src file=" + file.basename);
            // console.log("saving smp file=" + sample.SampleFileName);
            // console.log("saving smp contents=" + sample.SampleFileBrowserCode.length);
            // file.contents = Buffer.from(sample.SampleFileBrowserCode);
        }))
        // .pipe(logFile())
        .pipe(gulp.dest(outputPath))
        .pipe(synchro(onSampleTransformed));
        // .on("end", function() {
        //     copiedSamples++;
        // });

        // break;
    }



    // if (copiedSamples == samples.length){
    //     cb();
    // }
    // cb();

} exports.copySamples = copySamples;


function updateSampleReadme(cb) {

    // log('updating readme files... ');
    var template = fs.readFileSync("./templates/sample/ReadMe.md", "utf8");
    for (const sample of samples) {

        // let outputPath = sampleOutputFolder + '/' + sample.SampleFolderPath;
        let outputPath = sampleOutputFolder + sample.SampleFolderPath + "/ReadMe.md";
        makeDirectoryFor(outputPath);
        // log(outputPath);
        let readmeFile = Transformer.updateReadme(sample, template);
        fs.writeFileSync(outputPath, readmeFile);
        // break;
    }
    cb();
} exports.updateSampleReadme = updateSampleReadme;

// updating package.json files for all sample using a template
function updateSamplePackages(cb) {

    // getting content of package.json file from templates
    let templatePackageFile = fs.readFileSync("./templates/sample/package.json");
    let templatePackageJson = JSON.parse(templatePackageFile.toString());

    // let last = samples[samples.length - 1];
    // let content = Transformer.getPackage(last, templatePackageJson);
    // fs.writeFileSync(sampleOutputFolder + "package.json", content);

    for (const sample of samples) {
        let outputPath = sampleOutputFolder + sample.SampleFolderPath + "/package.json";
        let packageFileOld = fs.readFileSync(outputPath).toString();

        // makeDirectoryFor(outputPath);

        let packageFileNew = Transformer.getPackage(sample, templatePackageJson);
        if (packageFileNew !== packageFileOld) {
            console.log('file updated: ' + outputPath);
            fs.writeFileSync(outputPath, packageFileNew);
        }
    }

    cb();
} exports.updateSamplePackages = updateSamplePackages;

// updating browser's package.json file using template's package.json
function copyPackageJson(cb) {

    // getting content of package.json file from templates
    let templatePackageFile = fs.readFileSync("./templates/sample/package.json");
    let templatePackageJson = JSON.parse(templatePackageFile.toString());

    // getting content of package.json file from the browser
    let browserPackageFile = fs.readFileSync("./package.json");
    let browserPackageJson = JSON.parse(browserPackageFile.toString());

    let browserPackageNew = Transformer.updatePackage(browserPackageJson, templatePackageJson);
    if (browserPackageNew !== browserPackageFile) {
        fs.writeFileSync(sampleOutputFolder + "package.json", browserPackageNew);
        // console.log("updated browser's package.json file");
    }

    cb();
} exports.copyPackageJson = copyPackageJson;

// update samples' index.ts and index.html files based on template files
function updateSampleIndex(cb) {

    var indexTS = fs.readFileSync("./templates/sample/src/index.ts", "utf8");
    var indexHTML = fs.readFileSync("./templates/sample/public/index.html", "utf8");
    for (const sample of samples) {

        let indexTS_path = sampleOutputFolder + sample.SampleFolderPath + "/src/index.ts";
        // makeDirectoryFor(indexTS_path);
        let indexTS_old = fs.readFileSync(indexTS_path).toString();

        let indexTS_new = Transformer.updateIndexTS(sample, indexTS);
        if (indexTS_new !== indexTS_old) {
            console.log('file updated: ' + indexTS_path);
            fs.writeFileSync(indexTS_path, indexTS_new);
        }

        let indexHTML_path = sampleOutputFolder + sample.SampleFolderPath + "/index.html";
        let indexHTML_old = fs.readFileSync(indexHTML_path).toString();
        let indexHTML_new = Transformer.updateIndexHTML(sample, indexHTML);
        if (indexHTML_new !== indexHTML_old) {
            console.log('file updated: ' + indexHTML_path);
            fs.writeFileSync(indexHTML_path, indexHTML_new);
        }

    }
    cb();
} exports.updateSampleIndex = updateSampleIndex;

// update samples' index.css and *config.json files based on template files
function updateSampleStyles(cb) {

    // always override these shared files
    gulp.src([
        './templates/sample/src/index.css',
        './templates/sample/sandbox.config.json',
        './templates/sample/tsconfig.json',
        './templates/sample/webpack.config.js',
        './templates/sample/.prettierrc',
    ])
    .pipe(flatten({ "includeParents": -1 }))
    .pipe(es.map(function(file, fileCallback) {
        let sourceContent = file.contents.toString();
        let sourcePath = Transformer.getRelative(file.dirname);
        sourcePath = sourcePath.replace('../browser/templates/sample', '');
        sourcePath = sourcePath.replace('../browser/templates/shared', '');

        for (const sample of samples) {
            // if (sample.isUsingFileName(file.basename)) {
                let samplePath = sampleOutputFolder + sample.SampleFolderPath;
                let targetPath = samplePath + sourcePath + '/' + file.basename;

                // log('updateSampleStyles ' + samplePath);
                // log('updateSampleStyles ' + sourcePath);
                // log('updateSampleStyles ' + targetPath);

                if (fs.existsSync(targetPath)) {
                    let targetContent = fs.readFileSync(targetPath, "utf8");
                    if (sourceContent !== targetContent) {
                        fs.writeFileSync(targetPath , sourceContent);
                        console.log('file updated ' + targetPath);
                    } else {
                        // console.log('file skipped ' + targetPath);
                    }
                } else {
                    fs.writeFileSync(targetPath, sourceContent);
                    console.log('file added ' + targetPath);
                }
        }
        fileCallback(null, file);
        // SampleFiles.push(fileDir + "/" + file.basename);
    }))
    .on("end", function() {
        cb();
    });

} exports.updateSampleStyles = updateSampleStyles;

// update samples' resources/data files (.ts) files based on template files
function updateSampleResources(cb) {
    // update these shared files if a sample is using them
    gulp.src(['./templates/shared/src/*.*'])
    .pipe(flatten({ "includeParents": -1 }))
    .pipe(es.map(function(file, fileCallback) {
        let sourceContent = file.contents.toString();
        let sourcePath = Transformer.getRelative(file.dirname);
        sourcePath = sourcePath.replace('./templates/sample', '');
        sourcePath = sourcePath.replace('./templates/shared', '');

        for (const sample of samples) {
            if (sample.isUsingFileName(file.basename)) {

                let samplePath = sampleOutputFolder + sample.SampleFolderPath;
                let targetPath = samplePath + sourcePath + '/' + file.basename;

                if (fs.existsSync(targetPath)) {
                    let targetContent = fs.readFileSync(targetPath, "utf8");
                    if (sourceContent !== targetContent) {
                        fs.writeFileSync(targetPath , sourceContent);
                        log('updated ' + targetPath);
                    }
                } else {
                    fs.writeFileSync(targetPath, sourceContent);
                    log('added ' + targetPath);
                }
            }
        }
        fileCallback(null, file);
    }))
    .on("end", function() {
        cb();
    });


} exports.updateSampleResources = updateSampleResources;

function updateSampleCodeFiles(cb) {

    for (const sample of samples) {

        let tsPath = sampleOutputFolder + sample.SampleFilePath; // + "/src/index.ts";
        // console.log("tsPath " + tsPath);
        let tsOld = fs.readFileSync(tsPath).toString();
        let tsNew = Transformer.lintSample(tsOld, sample.SampleFileSourcePath);
        if (tsNew !== tsOld) {
            console.log('file updated: ' + tsPath);
            fs.writeFileSync(tsPath, tsNew);
        }
    }
    cb();
} exports.updateSampleCodeFiles = updateSampleCodeFiles;

function simplifySamples(cb) {

    for (const sample of samples) {

        var sourcePath = sample.SampleFolderPath + "/src/" + sample.SampleFileName;
        var outputPath = sample.SampleFolderPath + "/src/index.ts";
        console.log("simplifying: " + sourcePath); // + " >> " + outputPath);

        fs.writeFileSync(outputPath, sample.SampleFileSourceCode);
        del.sync(sourcePath, {force:true});
    }
    cb();

} exports.simplifySamples = simplifySamples;

function updateCodeViewer(cb) {

    const outputFolder = "./src/assets/code-viewer";

    del.sync(outputFolder + "/**");

    for (const sample of samples) {
        var codeViewPath = outputFolder + sample.SampleRoute + ".json";

        console.log(">> generating: " + codeViewPath);

        var content = "{\r\n \"sampleFiles\":\r\n";
        var contentItems = [];

        var tsItem = new CodeViewer(sample.SampleFilePath, sample.SampleFileSourceCode, "ts", "ts", true);

        contentItems.push(tsItem);

        for (const file of sample.SampleFilePaths) {
            if (file.indexOf(".css") > 0) {
                var cssContent = fs.readFileSync(file, "utf8");
                var cssItem = new CodeViewer(file, cssContent, "css", "css", true);
                contentItems.push(cssItem);
            }
            else if (file.indexOf(".ts") > 0 && file.indexOf(sample.SampleFileName) == -1) {

                var isMain = file.indexOf("index") == -1;
                var tsContent = fs.readFileSync(file, "utf8");
                var tsItem = new CodeViewer(file, tsContent, "ts", "ts", isMain);
                contentItems.push(tsItem);
            }
            else if (file.indexOf(".html") > 0) {
                var tsContent = fs.readFileSync(file, "utf8");
                var tsItem = new CodeViewer(file, tsContent, "html", "html", true);
                contentItems.push(tsItem);
            }
        }

        content += JSON.stringify(contentItems, null, ' ');
        content += "\r\n}";

        makeDirectoryFor(codeViewPath);
        fs.writeFileSync(codeViewPath, content);
    }

    cb();

} exports.updateCodeViewer = updateCodeViewer;

// testing

function logRoutes(cb) {
    // findSamples();

    let routingGroups = Transformer.getRoutingGroups(samples);
    for (const group of routingGroups) {

        console.log('- group ' + group.Name);

        for (const component of group.Components) {

            console.log('- component ' + component.Name);
            for (const sample of component.Samples) {
                console.log('' + sample.SampleRoute + '/ **' + sample.SampleFileName + ' === ' + sample.SampleDisplayName);
            }
        }
    }

    cb();
} exports.logRoutes = logRoutes;

function logFile() {
    return es.map(function(file, cb) {
        let relative = Transformer.getRelative(file.dirname);
        log(relative + '/' + file.basename);
        // log(path.relative(path.join(file.cwd, file.base), file.path))
        cb(null, file);
    });
}

function logPublicFiles(cb) {
    gulp.src([
        './samples/**/public/*.*',
    ])
    .pipe(logFile())
    .on("end", function() { cb(); });
} exports.logPublicFiles = logPublicFiles;

function logSourceFiles(cb) {
    gulp.src([
        './samples/**/src/*.ts',
       '!./samples/**/src/index.*',

       '!./samples/**/src/AssetsUtils.ts',
       '!./samples/**/src/CategoryChartSharedData.ts',
       '!./samples/**/src/DataChartSharedData.ts',
       '!./samples/**/src/DataGridSharedData.ts',
       '!./samples/**/src/DockManagerSharedData.ts',
       '!./samples/**/src/EsriUtility.ts',
       '!./samples/**/src/ExcelUtility.ts',
       '!./samples/**/src/ExcelSharedData.ts',
       '!./samples/**/src/FinancialData.ts',
       '!./samples/**/src/heatworker.worker.ts',
       '!./samples/**/src/LiveFinancialData.ts',
       '!./samples/**/src/MapShapeStyleUtility.ts',
       '!./samples/**/src/MapUtils.ts',
       '!./samples/**/src/odatajs-4.0.0.js',
       '!./samples/**/src/Products.ts',
       '!./samples/**/src/PeriodicElements.ts',
       '!./samples/**/src/SampleCategoryData.ts',
       '!./samples/**/src/SampleDensityData.ts',
       '!./samples/**/src/SampleFinancialData.ts',
       '!./samples/**/src/SamplePolarData.ts',
       '!./samples/**/src/SampleRadialData.ts',
       '!./samples/**/src/SampleRangeData.ts',
       '!./samples/**/src/SampleScatterData.ts',
       '!./samples/**/src/SampleScatterStats.ts',
       '!./samples/**/src/SampleShapeData.ts',
       '!./samples/**/src/SampleSparklineData.ts',
       '!./samples/**/src/SampleTreeData.ts',
       '!./samples/**/src/SparklineSharedData.ts',
       '!./samples/**/src/StocksHistory.ts',
       '!./samples/**/src/StocksUtility.ts',
       '!./samples/**/src/StringUtils.ts',
       '!./samples/**/src/TaskUtils.ts',
       '!./samples/**/src/WorldCities.ts',
       '!./samples/**/src/WorldConnections.ts',
       '!./samples/**/src/WorldLocations.ts',
       '!./samples/**/src/WorldUtils.ts',
    ])
    .pipe(logFile())
    .on("end", function() { cb(); });
} exports.logSourceFiles = logSourceFiles;

function logRootFiles(cb) {
    gulp.src([
        './samples/**/*.*',
       '!./samples/**/src/*.*',
       '!./samples/**/*.ts',
       '!./samples/**/*.ts',
       '!./samples/**/*.css',
       '!./samples/**/index.*',
       '!./samples/**/manifest.json',
       '!./samples/**/package.json',
       '!./samples/**/tsconfig.json',
    ])
    .pipe(es.map(function(file, cbFile) {
        let relative = Transformer.getRelative(file.dirname);
        log(file.basename + ' ' + relative + '/' + file.basename);
        cbFile(null, file);
    }))
    .on("end", function() { cb(); });
} exports.logRootFiles = logRootFiles;

function logUniqueFiles(cb) {

    let fileNames = [];
    gulp.src([
        './samples/**/src/*.ts',
       '!./samples/**/src/index.*',
    ])
    .pipe(es.map(function(file, cbFile) {
        if (fileNames.indexOf(file.basename) === -1) {
            fileNames.push(file.basename);
        }
        cbFile(null, file);
    }))
    .on("end", function() {
        fileNames.sort();
        for (const name of fileNames) {
            log(name);
        }
        cb();
    });

} exports.logUniqueFiles = logUniqueFiles;

function logVersionIgniteUI(cb) {
    let packageFile = fs.readFileSync("./package.json");
    let packageJson = JSON.parse(packageFile.toString());
    let packageData = JSON.stringify(packageJson.dependencies, null, ' ');

    let igPackages = [];
    for (const line of packageData.split('\n')) {
        if (line.indexOf('igniteui-') > 0) {
            let packageLine = Strings.replace(line, ',', '')
            packageLine = Strings.replace(packageLine, '"', '');
            packageLine = Strings.replace(packageLine, '@infragistics/', '');
            let packagePair = packageLine.split(':');
            let packageVersion = packagePair[1].trim();
            let packageName = packagePair[0].trim();

            console.log('>> using package: ' + packageVersion + ' ' + packageName);
            let package = { ver: packageVersion, name: packageName };
            igPackages.push(package);
        }
    }

    let outputText = '[\r\n';
    for (let i = 0; i < igPackages.length; i++) {
        outputText += JSON.stringify(igPackages[i]);
        if (i < igPackages.length - 1)
            outputText += ',';
        outputText += '\r\n';
    }
    outputText += "]";

    const outputPath = "./src/BrowserInfo.json";

    fs.writeFileSync(outputPath, outputText);
    cb();
} exports.logVersionIgniteUI = logVersionIgniteUI;

function logVersionTypescript(cb) {
    var packageFile = fs.readFileSync("./node_modules/typescript/package.json", "utf8");
    let packageJson = JSON.parse(packageFile.toString());
    let packageData = JSON.stringify(packageJson.version, null, ' ');
    console.log(">> using package: " + packageData + ' typescript' );
    cb();
} exports.logVersionTypescript = logVersionTypescript;




