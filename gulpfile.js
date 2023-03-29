
let gulp = require('gulp');
let sb = require('./browser/tasks/gulp-samples.js')

// NOTE run "gulp updateBrowser" before running "npm run start"
exports.updateBrowser = updateBrowser = gulp.series(
    sb.logPackages,
    sb.findSamples,
    sb.copySamples,
    sb.updateCodeViewer,
);

exports.findSamples = findSamples = gulp.series(
    sb.findSamples,
);

exports.lintSamples = lintSamples = gulp.series(
    sb.lintSamples,
);

exports.updateSamples = updateSamples = gulp.series(
    // sb.lintSamples,
    sb.findSamples,
    sb.updateSampleReadme,
    sb.updateSamplePackages,
    // sb.updateSampleIndex,
    sb.updateSampleStyles,
 // sb.updateSampleResources,
    sb.updateSampleCodeFiles
);

exports.updateReadme = updateReadme = gulp.series(
    sb.findSamples,
    sb.updateSampleReadme,
);

exports.updateSamplePackages = updatePackages = gulp.series(
    sb.findSamples,
    sb.updateSamplePackages,
);

exports.updateSampleWebpackConfigs = updateSampleWebpackConfigs = gulp.series(
    sb.findSamples,
    sb.updateSampleWebpackConfigs,
);

// exports.updateSampleResources = updateSampleResources = gulp.series(
//     sb.findSamples,
//     sb.updateSampleResources,
// );

// exports.updateSampleStyles = updateReadme = gulp.series(
//     sb.findSamples,
//     sb.updateSampleStyles,
// );

// exports.copySamplesToBrowser = copySamplesToBrowser = gulp.series(
//     sb.findSamples,
//     sb.copySamples,
//     // sb.copyPackageJson,
// );

exports.logSamples = logSamples = gulp.series(
    sb.findSamples,
    sb.logSamples,
);

// // exports.default = updateBrowser;
// exports.logPublicFiles = sb.logPublicFiles;
// exports.logSourceFiles = sb.logSourceFiles;
// exports.logUniqueFiles = sb.logUniqueFiles;
// exports.logRootFiles   = sb.logRootFiles;
// exports.lintSamples    = sb.lintSamples;

exports.logPackages   = sb.logPackages;

exports.logRoutes = logRoutes = gulp.series(
    sb.findSamples,
    sb.logRoutes,
);

exports.logSandboxUrls = logSandboxUrls = gulp.series(
    sb.findSamples,
    sb.logSandboxUrls,
);

exports.updateCodeViewer = updateCodeViewer = gulp.series(
    sb.findSamples,
    sb.updateCodeViewer
);

exports.simplifySamples = simplifySamples = gulp.series(
    sb.findSamples,
    sb.simplifySamples,
);

exports.updateIG = sb.updateIG;