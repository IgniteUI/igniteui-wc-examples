/* eslint-disable no-undef */

function log(msg) {
    console.log('gulp-config.js ' + msg);
}

// change this variable depending on which platform
let platformTarget = "WebComponents";

log('loaded for ' + platformTarget + ' platform' );

// this configuration defines variables for each platform
let config = {
    WebComponents: {
        PackageKeyword: "igniteui",
        PackageVersion: "^1.1.1",
        PlatformCode: "ts",
        PlatformName: "Web Components",
        BrowserHostUrl: "http://localhost:4200/",
        BrowserRoute: "/samples",
        BrowserRootPath: "./tmp",
        // SamplesCopyPath: "../samples",
        SamplesCopyPath: "./samples",
        SamplesCopyFiles: [".ts", ".css", ".csv", ".html", ".png", ".svg" ],
        SamplesFileExtension: ".ts",
        SamplesFileExclusions: ["Component.ts", "State.ts", "Props.ts", "Base.ts", "Data.ts", "index.ts", "Pager.ts", "LegendOverlay.ts"],
        // SamplesFileExclusions: ["Component.ts", "State.ts", "Props.ts", "Base.ts", "index.ts"],

        DocsUrl: "https://infragistics.com/{PlatformName}site/components/{ComponentFolder}.html",
                 //  "https://infragistics.com/webcomponentssite/components/data-chart.html",

        RepositoryOrg: "IgniteUI",
        RepositoryBranch: "master",
        RepositoryName: "igniteui-web-comp-examples",
        RepositoryPath: "github/{RepositoryOrg}/{RepositoryName}/tree/{RepositoryBranch}/samples/{ComponentGroup}/{ComponentFolder}/{SampleFolderName}",
        RepositoryUrl: "https://github.com/{RepositoryOrg}/{RepositoryName}",
        RepositoryWarning: "NOTE: do not change this file because it's auto re-generated from:",

        SandboxUrlOptions: "fontsize=14&hidenavigation=1&theme=dark&view=preview&file=/src/{SampleFile}",
        SandboxUrlView:  "https://codesandbox.io/embed/{RepositoryPath}?{SandboxUrlOptions}",
        SandboxUrlEdit:  "https://codesandbox.io/s/{RepositoryPath}?{SandboxUrlOptions}",
        SandboxUrlShort: "https://codesandbox.io/embed/{RepositoryPath}",
    },
}

// exporting only config for one platform since SB do not need other variables
module.exports = config[platformTarget];