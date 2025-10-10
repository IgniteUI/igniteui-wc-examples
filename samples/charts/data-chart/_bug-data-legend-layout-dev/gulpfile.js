var gulp = require('gulp');
var del = require('del');
var flatten = require('gulp-flatten');
var fileRoot = 'C:/work/dev-tools/XPlatform/Main/'
var platformStatic = "WCCore";
var platformFolder = "WebComponents";
function clean(cb) {
    del.sync("src/ig/**/*.*");
    del.sync("src/ig");
    cb();
}
function copyStatic() {
    return gulp.src([
        fileRoot + 'Source/TSCore/*.ts',
        fileRoot + `Source/${platformStatic}/*.ts`,
        fileRoot + 'Source/TSCore/*.tsx',
        fileRoot + `Source/${platformStatic}/*.tsx`
    ])
    .pipe(gulp.dest("src/ig/igniteui-core"))
}
function copy() {
    return gulp.src([
        fileRoot + 'Source/Translator/bin/build/TS/**/*.ts',
        fileRoot + `Source/Translator/bin/build/${platformFolder}/**/*.ts`,
        fileRoot + 'Source/*.JS/**/bin/**/TS/**/*.ts',
        fileRoot + `Source/*.JS/**/bin/**/${platformFolder}/**/*.ts`,
        
        // "!"  + fileRoot + 'Source/Gauges.JS/**/bin/**/*.*',
        "!"  + fileRoot + 'Source/Dashboards.JS/**/bin/**/*.*',
        "!"  + fileRoot + 'Source/GeographicMap.JS/**/bin/**/*.*',

        "!"  + fileRoot + 'Source/Barcode.JS/**/bin/**/*.*',
        "!"  + fileRoot + 'Source/CheckboxList.JS/**/bin/**/*.*',
        "!"  + fileRoot + 'Source/DataAdapters.JS/**/bin/**/*.*',
        "!"  + fileRoot + 'Source/DockManager.JS/**/bin/**/*.*',
        "!"  + fileRoot + 'Source/Documents.Core.JS/**/bin/**/*.*',
        "!"  + fileRoot + 'Source/Excel.JS/**/bin/**/*.*',
        "!"  + fileRoot + 'Source/Encoding.JS/**/bin/**/*.*',
        "!"  + fileRoot + 'Source/Gantt.JS/**/bin/**/*.*',
        "!"  + fileRoot + 'Source/Grid.JS/**/bin/**/*.*',
        "!"  + fileRoot + 'Source/Inputs.JS/**/bin/**/*.*',
        "!"  + fileRoot + 'Source/Layouts.JS/**/bin/**/*.*',
        "!"  + fileRoot + 'Source/PropertyEditor.JS/**/bin/**/*.*',
        "!"  + fileRoot + 'Source/Spreadsheet.JS/**/bin/**/*.*',
        "!"  + fileRoot + 'Source/Spreadsheet.ChartAdapter.JS/**/bin/**/*.*',
        "!"  + fileRoot + 'Source/Schedule.JS/**/bin/**/*.*',
        "!"  + fileRoot + 'Source/RadialMenu.JS/**/bin/**/*.*',
        "!"  + fileRoot + 'Source/WebInputs.JS/**/bin/**/*.*',
        "!"  + fileRoot + 'Source/Toolbar.JS/**/bin/**/*.*',
        "!"  + fileRoot + 'Source/Treemap.JS/**/bin/**/*.*',
        "!"  + fileRoot + 'Source/Undo.JS/**/bin/**/*.*',
        "!"  + fileRoot + 'Source/WebGrids.JS/**/bin/**/*.*',
        "!"  + fileRoot + 'Source/WCBuild/**/',
        "!"  + fileRoot + 'Source/NGBuild/**/',
        "!"  + fileRoot + 'Source/RBuild/**/',
        "!"  + fileRoot + 'Source/RevealBundler/**/',
        "!"  + fileRoot + 'Source/**/igniteui-testframework/**/*.*',
        "!"  + fileRoot + 'Source/**/public_api.*.*',
    ])
    .pipe(flatten({ includeParents: -1 }))
    .pipe(gulp.dest("src/ig"))
}
exports.default = gulp.series(
    clean,
    gulp.parallel(
        copyStatic,
        copy)
);