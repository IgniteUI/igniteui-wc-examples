let transFS = require('fs.extra');

// let platform = "WebComponents";
// let igConfig = require('./gulp-config.js')[platform];

let igConfig = require('./gulp-config.js');

// function log(msg) {
//     console.log('Transformer.ts ' + msg);
// }
// log('loaded');

// this class provides information about a sample that is implemented in /samples folder
class SampleInfo {
    public ComponentGroup: string;     // maps
    public ComponentFolder: string;    // geo-map
    public ComponentName: string;      // Geo Map
    public ComponentID: string;        // GeoMap

    public HtmlFilePath: string;        // /samples/maps/geo-map/binding-csv-points/index.html
    public HtmlFileCode: string;        // html code of above file
    public HtmlFileRoot: string;        // root code of above file

    // public SampleDirOnDisk: string;    // C:\repo\igniteui-web-comp-examples\samples\maps\geo-map\binding-csv-points\
    public SampleFolderPath: string;     // /samples/maps/geo-map/binding-csv-points/
    public SampleFilePath: string;       // /samples/maps/geo-map/binding-csv-points/src/MapBindingDataCSV.ts
    public SampleRoute: string;          //         /maps/geo-map/binding-csv-points/
    public SampleFolderName: string;     //                       binding-csv-points
    public SampleFileName: string;       // MapBindingDataCSV.ts
    public SampleImportName: string;     // MapBindingDataCSV
    public SampleImportPath: string;     // ./geo-map/binding-csv-points/MapBindingDataCSV
    public SampleDisplayName: string;    // Map Binding Data CSV
    public SampleFileSourcePath: string; // /src/MapBindingDataCSV.ts
    public SampleFileSourceCode: string; // source code from /src/MapBindingDataCSV.ts file
    public SampleFileBrowserCode: string; // source code for a sample in browser
    public SampleFileSourceClass: string; // MapBindingDataCSV
    public SampleFileOriginalClass: string; // MapBindingDataCSV

    public SampleImportLines: string[];
    public SampleImportPackages: string[];
    public SampleImportFiles: string[];
    public SampleReadMe: string;       // content of ReadMe.md file generated for /samples/maps/geo-map/binding-csv-points/
    public SampleFilePaths: string[];  // relative paths to files in sample folder: /samples/maps/geo-map/binding-csv-points/
    public SampleFileNames: string[];  // names of files in sample folder: /samples/maps/geo-map/binding-csv-points/

    public DocsUrl: string             // https://infragistics.com/webcomponentssite/components/geo-map.html

    public SandboxUrlView: string;     // https://codesandbox.io/embed/github/IgniteUI/igniteui-web-comp-examples/tree/master/samples/maps/geo-map/binding-csv-points
    public SandboxUrlEdit: string;     //     https://codesandbox.io/s/github/IgniteUI/igniteui-web-comp-examples/tree/master/samples/maps/geo-map/binding-csv-points
    public SandboxUrlShort: string;    //     https://codesandbox.io/s/github/IgniteUI/igniteui-web-comp-examples/tree/master/samples/maps/geo-map/binding-csv-points

    public PackageFileContent: PackageJson;
    public PackageDependencies: PackageDependency[];

    constructor() {
        this.SampleFileSourceCode = 'let str = "TODO";';
        this.SampleFilePaths = [];
        this.SampleFileNames = [];
        this.PackageDependencies = [];
        // this.PackageDependencies.indexOf
    }

    public isUsingFileName(name: string): boolean {
        return this.SampleFileNames.includes(name);
    }
}

class SampleSourceBlock {
    public ImportLines: string[];
    public ImportFiles: string[];
    public ImportPackages: string[];
    public ImportCSS: string[];
    public OtherLines: string[];
}

class Transformer {

    public static getDependencies(sampleInfo: SampleInfo): PackageDependency[] {
        let dependencies: PackageDependency[] = [];
        let packageJson = sampleInfo.PackageFileContent;
        if (packageJson && packageJson.dependencies) {
            dependencies = [];

            let packages = packageJson.dependencies;

            for (let name in packages) {
                if (packages.hasOwnProperty(name)) {
                    let dependency = new PackageDependency();
                    dependency.name = name;
                    dependency.version = packages[name];
                    dependencies.push(dependency);
                    console.log(name + ": " + packages[name]);
                }
            }
        }
        return dependencies;
    }

    public static sort(samples: SampleInfo[]): void {
        samples.sort((a, b) => a.SampleFolderPath > b.SampleFolderPath ? 1 : -1);
    }

    public static printNames(samples: SampleInfo[]): void {
        for (const info of samples) {
            console.log(info.SampleFolderPath + " => " + info.SampleDisplayName);
        }
    }
    public static printRoutes(samples: SampleInfo[]): void {
        for (const info of samples) {
            console.log(info.SampleFolderPath + " => " + info.SampleRoute);
        }
    }
    public static printUrls(samples: SampleInfo[]): void {
        for (const info of samples) {
            console.log(info.SampleFolderPath + " => " + info.SandboxUrlEdit);
        }
    }

    public static getDataRoutes(samples: SampleInfo[]): void {
        // { name: 'tests', routes: [
        //     { path: '/tests/test-component1-test-sample0', name: 'SampleFileName', component: SampleFileName},
        //     { path: '/tests/test-component1-test-sample1', name: 'MapBindingDataJSON', component: MapBindingDataJSON},
        // ]},
    }


    public static getSandboxUrl(sampleInfo: SampleInfo, sandboxUrlFormat: string): string {
        let url = sandboxUrlFormat + "";

        url = Strings.replace(url, "{SandboxUrlOptions}", igConfig.SandboxUrlOptions);
        url = Strings.replace(url, "{RepositoryPath}", igConfig.RepositoryPath);
        url = Strings.replace(url, "{RepositoryOrg}", igConfig.RepositoryOrg);
        url = Strings.replace(url, "{RepositoryName}", igConfig.RepositoryName);
        url = Strings.replace(url, "{RepositoryBranch}", igConfig.RepositoryBranch);
        url = Strings.replace(url, "{ComponentGroup}", sampleInfo.ComponentGroup);
        url = Strings.replace(url, "{ComponentFolder}", sampleInfo.ComponentFolder);
        url = Strings.replace(url, "{SampleFolderName}", sampleInfo.SampleFolderName);
        url = Strings.replace(url, "{sampleFile}", sampleInfo.SampleFileName);

        return url;
    }

    public static getDocsUrl(sampleInfo: SampleInfo): string {
        let url = igConfig.DocsUrl + "";

        url = Strings.replace(url, "{PlatformName}", igConfig.PlatformName);
        url = Strings.replace(url, "{ComponentFolder}", sampleInfo.ComponentFolder);

        return url;
    }

    public static updatePackage(browsersPackage: PackageJson, templatePackage: PackageJson): string {

        let errors: string[] = [];

        // if (browsersPackage.author !== templatePackage.author)
        // errors.push("author", "does not match author in browser's package.json");

        // checking if the template has same dependencies as the browser
        for (let name in browsersPackage.dependencies) {
            if (templatePackage.dependencies.hasOwnProperty(name) &&
                browsersPackage.dependencies.hasOwnProperty(name)) {
                let browsersDep = browsersPackage.dependencies[name];
                let templateDep = templatePackage.dependencies[name];
                if (templateDep !== browsersDep) {
                    if (name.indexOf('igniteui-') === 0) {
                        browsersPackage.dependencies[name] = templateDep;
                        console.log("- changed browser's package " + name + " from " + browsersDep + " to " + templateDep);
                    } else {
                        errors.push("- template's package.json has \"" + name + "\" with \"" + templateDep + "\" while \"" + browsersDep + "\" is in browser's package.json");
                    }
                }
            }
        }

        // checking if the browser has same dependencies as the template
        // for (let name in templatePackage.dependencies) {
        //     if (templatePackage.dependencies.hasOwnProperty(name) &&
        //         browsersPackage.dependencies.hasOwnProperty(name)) {
        //         let browsersDep = browsersPackage.dependencies[name];
        //         let templateDep = templatePackage.dependencies[name];
        //         if (templateDep !== browsersDep) {
        //             errors.push("- browser's package.json has \"" + name + "\" with \"" + browsersDep + "\" while \"" + templateDep + "\" in template's package.json");
        //         }
        //     }
        // }

        if (errors.length > 0) {
            console.log("ERRORS found in package.json files: \n" + errors.join('\n'))
        }

        return JSON.stringify(browsersPackage, null, '  ');
    }

    // gets updated package.json file for a sample using a template
    public static getPackage(sample: SampleInfo, tempPackage: PackageJson): string {

        let title = tempPackage.name;
        // title = Strings.replace(title, 'platform-name', igConfig.PlatformName);
        title = Strings.replace(title, 'platform-name', 'wc');
        title = Strings.replace(title, 'component-name', sample.ComponentName);
        title = Strings.replace(title, 'sample-name', sample.SampleDisplayName);
        title = Strings.replace(title, ' ', '-');
        title = title.toLowerCase();

        let descr = tempPackage.description;
        descr = Strings.replace(descr, 'platform-name', igConfig.PlatformName);
        descr = Strings.replace(descr, 'component-name', sample.ComponentName);
        descr = Strings.replace(descr, 'sample-name', sample.SampleDisplayName);

        let samplePackage = sample.PackageFileContent;
        //samplePackage.name = title;
        //samplePackage.description = descr;
        samplePackage.author = tempPackage.author;
        samplePackage.main = tempPackage.main;
        samplePackage.license = tempPackage.license;
        samplePackage.homepage = tempPackage.homepage;
        samplePackage.version = tempPackage.version;
        //samplePackage.private = tempPackage.private;
        samplePackage.browserslist = tempPackage.browserslist;

        samplePackage.scripts = tempPackage.scripts;

        // updating scripts in a sample using scripts from the template
        // for (let name in tempPackage.scripts) {
        //     if (tempPackage.scripts.hasOwnProperty(name) &&
        //         samplePackage.scripts.hasOwnProperty(name)) {
        //         samplePackage.scripts[name] = tempPackage.scripts[name]
        //     }
        // }

        // updating devDependencies in a sample using devDependencies from the template
        for (let name in tempPackage.devDependencies) {
            // if (tempPackage.devDependencies.hasOwnProperty(name) &&
            //     samplePackage.devDependencies.hasOwnProperty(name)) {
            //     samplePackage.devDependencies[name] = tempPackage.devDependencies[name];
            // }
            if (!samplePackage.devDependencies.hasOwnProperty(name)) {
                 samplePackage.devDependencies[name] = tempPackage.devDependencies[name];
            }
        }
        // overriding sample dependencies
        // samplePackage.dependencies = {};

        // updating dependencies in sa sample by checking against OPTIONAL dependencies in the template
        for (let name in tempPackage.dependenciesOptional) {
            let dependency = tempPackage.dependenciesOptional[name];
            if (dependency.usage === "always") {
                samplePackage.dependencies[name] = dependency.version;
            } else if (dependency.usage === "detect") {
                let isDependencyImported = sample.SampleFileSourceCode.indexOf(name) >= 0;
                if (isDependencyImported) {
                    samplePackage.dependencies[name] = dependency.version;
                // using keywords to check if the dependency is used by some other file, e.g. ExcelUtility.ts
                } else if (dependency.keywords !== undefined && dependency.keywords.length > 0) {
                    for (let keyword of dependency.keywords) {
                        let isDependencyUsed = sample.SampleFileSourceCode.indexOf(keyword) >= 0;
                        if (isDependencyUsed) {
                            samplePackage.dependencies[name] = dependency.version;
                            break;
                        }
                    }
                }
            }
        }

        // updating dependencies in a sample by checking against REQUIRED dependencies in the template
        for (let name in tempPackage.dependencies) {
            samplePackage.dependencies[name] = tempPackage.dependencies[name];
        }
        // console.log("sample: " + sample.SampleFolderPath);
        // console.log("dependencies \n" + JSON.stringify(samplePackage.dependencies, null, '  '));

        // let str = "{\n";
        // str += this.stringifyValue(samplePackage, "name");
        // str += this.stringifyValue(samplePackage, "version");
        // str += this.stringifyValue(samplePackage, "description");
        // str += this.stringifyValue(samplePackage, "license");
        // str += this.stringifyValue(samplePackage, "main");
        // str += this.stringifyItem(samplePackage, "scripts");
        // str += this.stringifyItem(samplePackage, "dependencies");
        // str += this.stringifyItem(samplePackage, "devDependencies");
        // str += this.stringifyValue(samplePackage, "author");
        // str += this.stringifyValue(samplePackage, "homepage", true);
        // str += "}\n";
        // console.log(str);
        // return str;
        return JSON.stringify(samplePackage, null, '  ');
    }

    public static stringifyItem(obj: any, key: string, skipComma?: boolean): string {
        let str = '  "' + key + '": "' + JSON.stringify(obj[key], null, '  ') + '"';
        if (!skipComma)
            str += ',';
        return str + '\n';
    }

    public static stringifyValue(obj: any, key: string, skipComma?: boolean): string {
        let str = '  "' + key + '": "' + obj[key] + '"';
        if (!skipComma)
            str += ',';
        return str + '\n';
    }


    public static getSampleInfo(samplePackageFile: any, sampleFilePaths?: string[]): SampleInfo {

        let info = new SampleInfo();

        info.SampleFolderPath = this.getRelative(samplePackageFile.dirname);
        info.PackageFileContent = JSON.parse(samplePackageFile.contents.toString());
        info.SampleFilePaths = sampleFilePaths;

        for (const filePath of info.SampleFilePaths) {
            let parts = filePath.split('/');
            info.SampleFileNames.push(parts[parts.length - 1]);
        }
        // info.PackageFileContent = JSON.parse(fs.readFileSync(samplePackageFile));

        return info;
    }

    public static getSampleCode(sample: SampleInfo): string {
        let code = sample.SampleFileSourceCode;

        // find "export class CategoryChartOverview {"
        // add  "export class CategoryChartOverview extends SampleBase {"

        // extract <div id="root">copyHTML</div> from index.html and insert above class line:
        // let templateHTML = `<insertHTML>`;

        // insert the following code below classLine
        // public static htmlTagName: string = SampleBase.tag("CategoryChartOverview");
        // public static register(): any {
        //     window.customElements.define(this.htmlTagName, CategoryChartOverview);
        //     return this;
        // }

        return code;
    }

    // splits source code of a sample into block lines with imports, packages, and other lines
    public static getSampleBlocks(sampleSourceCode: string): SampleSourceBlock {
        let sample = new SampleSourceBlock();
        sample.OtherLines = [];
        sample.ImportLines = [];
        sample.ImportFiles = [];
        sample.ImportCSS = [];
        sample.ImportPackages = [];

        let sampleCodeLines = sampleSourceCode.split('\n');
        for (const line of sampleCodeLines) {
            // if (line.indexOf(" from 'react'") > 0) continue;
            if (line.indexOf("//") >= 0) continue;

            if (line.indexOf("import ") >= 0) {
                sample.ImportLines.push(line);
                // if (line.indexOf(" from ") === -1) continue;

                if (line.indexOf(" from ") > 0 && line.indexOf("./") === -1) {

                    let importPackage = line.substring(line.indexOf("'") + 1, line.lastIndexOf("'"));
                    if (importPackage === "") {
                        importPackage = line.substring(line.indexOf('"') + 1, line.lastIndexOf('"'));
                    }
                    // console.log("<" + importPackage + ">");
                    if (sample.ImportPackages.indexOf(importPackage) === -1) {
                        sample.ImportPackages.push(importPackage);
                    }
                } else if (line.indexOf(" from ") === -1) {
                    sample.ImportCSS.push(line);

                } else if (line.indexOf("./") > 0 || line.indexOf("../") > 0) {
                    sample.ImportFiles.push(line);
                }

            } else {
                sample.OtherLines.push(line);
            }
        }
        return sample;
    }

    public static getSampleCodeInBrowser(info: SampleInfo, sampleTemplate: string): string {

        // let codeSeparator = "export class " + info.SampleFileSourceClass + " {";
        let classExp = new RegExp(/(export.class.)(.*)(.\{)/g);
        let classMatch = info.SampleFileSourceCode.match(classExp);
        if (classMatch === undefined || classMatch === null || classMatch.length === 0)
        {
            console.log(">> cannot find 'export class' in file: " + info.SampleFilePath);
            console.log("-----------------------");
            console.log(info.SampleFileSourceCode);
            console.log("-----------------------");
        }
        let className = classMatch[0];
        let classSeparator = "" + className + "";

        let fileLines = info.SampleFileSourceCode.split("\n");
        let lines = info.SampleFileSourceCode.split(classSeparator);
        // console.log(" ------------------------------ ");
        // console.log("  classSeparator '" + classSeparator + "'");
        // console.log("  file.length " + fileLines.length);
        // console.log("  lines.length " + lines.length);

        let code = "";

        if (lines.length < 2) {
            console.log("WARNING Transformer cannot find: '" + classSeparator + "' \n in sample: " + info.SampleFilePath);
        } else {

            // let codeRemoveLines = [
            //     "let sample = new CategoryChartOverview();",
            // ];
            let codeImports = lines[0].trim();
            // codeImports += "\n" + 'import { SampleBase } from "../../../../core/SampleBase";';
            let codeClassName = "export class " + info.SampleFileSourceClass + " extends SampleBase {";
            let codeClassBody = lines[1].trim();
            let codeClassConstructor = `
    connectedCallback() { // auto renamed from constructor"
        // console.log("Sample connectedCallback");
        this.innerHTML = htmlTemplate; // auto insert
            `;

            codeClassBody = codeClassBody.replace("constructor() {", codeClassConstructor);
            // codeClassBody = codeClassBody.replace("constructor() {", "connectedCallback() { // auto renamed from constructor");
            // codeClassBody = codeClassBody.replace("constructor() {", "");

            code = sampleTemplate + "";
            code = Strings.replace(code, "} // auto remove", "");
            // code = "// -------------------------------------------------" + code;
            code = Strings.replace(code, "// AutoInsertImports", codeImports);
            code = Strings.replace(code, "// AutoInsertClassBody", codeClassBody);
            code = Strings.replace(code, "AutoInsertHtml", info.HtmlFileRoot);
            code = Strings.replace(code, "AutoInsertClassName", info.SampleFileSourceClass);
            // removing CodeSandbox's workaround for creating WC element:
            code = Strings.replace(code, "new " + info.SampleFileSourceClass + "();", "");
            code = Strings.replace(code, "new " + info.SampleFileOriginalClass + "();", "");

            code = this.lintSample(code);
            code = Strings.replace(code, "// AutoInsertNewLine", "");
            // code = code.trim();
            // console.log(codeClassName);
            // console.log(" ------------------------------ ");
            // console.log(code);
            // console.log(info.HtmlFileCode);
            // console.log(" ------------------------------ ");
            // console.log(info.HtmlFileRoot);
        }
        if (code.trim() === "") {
            console.log("ERROR cannot transform " + info.SampleFileSourcePath)
        }

        // console.log("  code.length " + code.length);

        return code;
    }

    public static process(samples: SampleInfo[], sampleTemplate: string): void {

        for (const info of samples) {
            // let SampleDirectory = info.SampleDirOnDisk;

            // info.PackageDependencies = this.getDependencies(info);

            // ../samples/maps/geo-map/binding-csv-points
            // let relativePath = this.getRelative(SampleDirectory);
            // .., samples, maps, geo-map, binding-csv-points
            let folders = info.SampleFolderPath.split('/');

            if (folders.length > 2) info.ComponentGroup = folders[2];
            if (folders.length > 3) info.ComponentFolder = folders[3];
            if (folders.length > 4) info.SampleFolderName = folders[4];

            info.ComponentName = Strings.toTitleCase(info.ComponentFolder, '-');
            info.ComponentName = info.ComponentName.replace("Geo Map", "Geographic Map");
            info.ComponentID   = Strings.replace(info.ComponentName, " ", "");
            info.ComponentID   = Strings.replace(info.ComponentID, "-", "");
            info.ComponentID   = info.ComponentID.replace("Geographic", "");

            // info.SampleFolderPath = relativePath;
            info.SampleRoute = "/" +  info.ComponentGroup + "/" + info.ComponentFolder + "-" + info.SampleFolderName;

            // console.log("Processing " + info.SampleFolderPath + " with " + info.SampleFilePaths.length + " files");

            let fileNames = [];
            let fileFound = [];
            for (const filePath of info.SampleFilePaths) {
                // console.log(filePath);
                fileFound.push(filePath);
                // load .html file and extract sample's html code
                if (filePath.indexOf('.html') > 0) {
                    info.HtmlFilePath = filePath;
                    info.HtmlFileCode = transFS.readFileSync(info.HtmlFilePath, "utf8");
                    let divStart = info.HtmlFileCode.indexOf('<div');
                    let divLast = info.HtmlFileCode.lastIndexOf('</div>') + 7;
                    info.HtmlFileRoot = info.HtmlFileCode.substring(divStart, divLast);

                    // remove root div if found in the html code
                    let divRoot = info.HtmlFileRoot.indexOf('<div id="root">');
                    // console.log('<div id="root"> ' + divRoot);
                    if (divRoot >= 0) {
                        info.HtmlFileRoot = info.HtmlFileRoot.replace('<div id="root">', '');
                        divLast = info.HtmlFileRoot.lastIndexOf('</div>');
                        info.HtmlFileRoot = info.HtmlFileRoot.substring(0, divLast);
                    }
                    info.HtmlFileRoot = info.HtmlFileRoot.trim();
                }

                if (filePath.indexOf('index.ts') > 0) {
                    fileNames.push(filePath);
                }

                // if (Strings.includes(filePath, igConfig.SamplesFileExtension) &&
                //     Strings.excludes(filePath, igConfig.SamplesFileExclusions, true)) {
                //         fileNames.push(filePath);
                //     // console.log(filePath);
                //     // && !filePath.includes("index.tsx")
                //     // info.SampleFileName = this.getFileName(filePath);
                // }
            }

            if (fileNames.length === 0) {
                console.log("WARNING Transformer cannot match any " + igConfig.SamplesFileExtension + " files in " + info.SampleFolderPath + " sample:");
                for (const name of fileFound) {
                    console.log('- ' + name);
                }
            } else if (fileNames.length > 1) {
                console.log("WARNING Transformer cannot decide which " + igConfig.SamplesFileExtension + " file to use for sample name: ");
                console.log(" - " + fileNames.join("\n - "));
            } else { // only one .ts file per a sample
                info.SampleFilePath = fileNames[0];
                info.SampleFileName = this.getFileName(info.SampleFilePath);
                info.SampleFileSourcePath = "./src/" + info.SampleFileName;
                info.SampleFileSourceCode = transFS.readFileSync(info.SampleFilePath, "utf8");
                info.SampleFileSourceCode = this.lintSample(info.SampleFileSourceCode, info.SampleFileSourcePath, true);

                let orgClassExp = new RegExp(/(export.class.)(.*)(.\{)/g);
                let orgClassName = info.SampleFileSourceCode.match(orgClassExp)[0];
                orgClassName = orgClassName.replace('export class ', '');
                orgClassName = orgClassName.replace(' {', '');
                orgClassName = Strings.replace(orgClassName, ' ', '');
                info.SampleFileOriginalClass = orgClassName;

                // using folder names to make sure each sample has unique class name
                let className = info.ComponentFolder + "-" + info.SampleFolderName;
                className = Strings.replace(className, "/", " ");
                className = Strings.replace(className, "-", " ");
                className = Strings.toTitleCase(className);
                className = Strings.replace(className, " ", "");
                info.SampleFileSourceClass = className;

                // console.log("TRANS '" + className + "'");
                // info.SampleFileBrowserCode = this.getSampleCodeInBrowser(info, sampleTemplate)

                let sampleBlocks = this.getSampleBlocks(info.SampleFileSourceCode);
                info.SampleImportLines = sampleBlocks.ImportLines;
                info.SampleImportFiles = sampleBlocks.ImportFiles;
                info.SampleImportPackages = sampleBlocks.ImportPackages;
                info.SampleImportName = info.SampleFileSourceClass.replace('.ts', '');
                info.SampleImportPath = './' + info.ComponentFolder + '/' + info.SampleFolderName + '/' + info.SampleImportName;

                info.SampleDisplayName = Strings.splitCamel(info.SampleFileSourceClass);
                info.SampleDisplayName = Strings.replace(info.SampleDisplayName, igConfig.SamplesFileExtension, "");
                info.SampleDisplayName = Strings.replace(info.SampleDisplayName, "Map Type ", "");
                info.SampleDisplayName = Strings.replace(info.SampleDisplayName, "Map Binding ", "Binding ");
                info.SampleDisplayName = Strings.replace(info.SampleDisplayName, "Map Display ", "Display ");
                info.SampleDisplayName = Strings.replace(info.SampleDisplayName, "Data Chart Type ", "");
                info.SampleDisplayName = Strings.replace(info.SampleDisplayName, info.ComponentName + " ", "");

                info.SandboxUrlView = this.getSandboxUrl(info, igConfig.SandboxUrlView);
                info.SandboxUrlEdit = this.getSandboxUrl(info, igConfig.SandboxUrlEdit);
                info.SandboxUrlShort = this.getSandboxUrl(info, igConfig.SandboxUrlShort);

                info.DocsUrl = this.getDocsUrl(info);
                // console.log("SAMPLE " + info.SampleFilePath + " => " + info.SampleDisplayName);
            }

            // console.log(info.SampleFolderPath + " => " + info.SampleRoute + " => " + info.SampleDisplayName);

        }
    }

    public static getRelative(path: string): string {
        if (path.indexOf(igConfig.RepositoryName) > -1) {
            path = path.split(igConfig.RepositoryName)[1];
            path = path.split("\\").join("/");
            return ".." + path;
        }

        console.log("failed on getRelative " + path);
        return path;
    }

    public static getFileName(relativePath: string): string {
        // ./samples/maps/geo-map/display-esri-imagery/src/FileName.tsx
        let parts = relativePath.split("/");
        if (parts.length > 0) {
            return parts[parts.length - 1]; // FileName.tsx
        }
        console.log("failed on getFileName " + relativePath);
        return "";
    }

    public static getSourcePath(relativePath: string): string {
        // ./samples/maps/geo-map/display-esri-imagery/src/FileName.tsx
        let parts = relativePath.split("/src");
        if (parts.length > 0) {
            console.log("./src" + parts[parts.length - 1]);
            return "./src" + parts[parts.length - 1]; // ./src/FileName.tsx
        }
        console.log("failed on getSourcePath " + relativePath);
        return "";
    }

    public static getParent(path: string): string {
        const folders = path.split('\\');
        if (folders.length > 1) {
            return folders[folders.length  - 1];
        }
        return "";
    }

    public static updateIndexTS(sample: SampleInfo, template: string): string {
        let content = template + "";

        content = Strings.replace(content, "SampleFileName", sample.SampleFileName);
        content = Strings.replace(content, ".ts", "");
        return content;
    }

    public static updateIndexHTML(sample: SampleInfo, template: string): string {

        let content = template + "";

        content = Strings.replace(content, "{SampleHtmlCode}", sample.HtmlFileRoot);

        content = Strings.replace(content, "{SampleFileName}", sample.SampleFileSourceClass);
        // content = Strings.replace(content, sample.SampleFileName + ".ts", sample.SampleFileName);
        return content;
    }


    // generates content of readme file for a given sample based on provided template of readme file
    public static updateReadme(sample: SampleInfo, template: string): string {

        // let ComponentGroup = "maps";
        // let ComponentFolder = "geo-map";
        // let SampleFolderName = "binding-csv-points";
        // let sampleFile = "MapBindingDataCSV.tsx";

        let readMe = template + "";
        // replacing variables with values that were generated while processing each sample:
        readMe = Strings.replace(readMe, "{SandboxUrlView}", sample.SandboxUrlView);
        readMe = Strings.replace(readMe, "{SandboxUrlEdit}", sample.SandboxUrlEdit);

        readMe = Strings.replace(readMe, "{ComponentFolder}", sample.ComponentFolder);
        readMe = Strings.replace(readMe, "{ComponentGroup}", sample.ComponentGroup);
        readMe = Strings.replace(readMe, "{ComponentName}", sample.ComponentName);

        // readMe = Strings.replace(readMe, "{SampleFolderPath}", sample.SampleFolderPath);
        readMe = Strings.replace(readMe, "{SampleFolderPath}", sample.SampleFolderPath);
        readMe = Strings.replace(readMe, "{SampleFolderName}", sample.SampleFolderName);
        readMe = Strings.replace(readMe, "{SampleRoute}", sample.SampleRoute);
        readMe = Strings.replace(readMe, "{SampleDisplayName}", sample.SampleDisplayName);
        readMe = Strings.replace(readMe, "{SampleFileName}", sample.SampleFileName);
        readMe = Strings.replace(readMe, "{SampleFilePath}", sample.SampleFilePath);
        readMe = Strings.replace(readMe, "{SampleFileSourcePath}", sample.SampleFileSourcePath);
        readMe = Strings.replace(readMe, "{SampleFileSourceCode}", sample.SampleFileSourceCode);

        readMe = Strings.replace(readMe, "{DocsUrl}", sample.DocsUrl);

        readMe = Strings.replace(readMe, "{RepositoryWarning}", igConfig.RepositoryWarning);
        readMe = Strings.replace(readMe, "{RepositoryUrl}", igConfig.RepositoryUrl);
        readMe = Strings.replace(readMe, "{RepositoryPath}", igConfig.RepositoryPath);
        readMe = Strings.replace(readMe, "{RepositoryBranch}", igConfig.RepositoryBranch);
        readMe = Strings.replace(readMe, "{RepositoryOrg}", igConfig.RepositoryOrg);
        readMe = Strings.replace(readMe, "{RepositoryName}", igConfig.RepositoryName);

        readMe = Strings.replace(readMe, "{PlatformCode}", igConfig.PlatformCode);
        readMe = Strings.replace(readMe, "{PlatformName}", igConfig.PlatformName);

        readMe = Strings.replace(readMe, "{BrowserHostUrl}", igConfig.BrowserHostUrl);
        readMe = Strings.replace(readMe, "{BrowserRootPath}", igConfig.BrowserRootPath);

        // console.log("====== ReadMe.md File =======================");
        // console.log(readMe);
        // console.log("====== ReadMe.md File =======================");
        return readMe;
    }

    public static getSampleGroups(samples: SampleInfo[]): SampleGroup[] {
        let componentsMap = new Map<string, SampleComponent>();

        for (const item of samples) {
            if (componentsMap.has(item.ComponentName)) {
                componentsMap.get(item.ComponentName).Samples.push(item);
            } else {
                let component = new SampleComponent();
                component.Name = item.ComponentName;
                component.Group = item.ComponentGroup;
                component.Samples.push(item);
                componentsMap.set(item.ComponentName, component);
            }
        }

        let groupMap = new Map<string, SampleGroup>();

        for (let key of Array.from( componentsMap.keys()) ) {
            let component = componentsMap.get(key);

            if (groupMap.has(component.Group)) {
                groupMap.get(component.Group).Components.push(component);
            } else {
                let group = new SampleGroup();
                group.Name = component.Group;
                group.Components.push(component);
                groupMap.set(component.Group, group);
            }
        }

        let groups: SampleGroup[] = [];
        for (let key of Array.from( groupMap.keys()) ) {
            let group = groupMap.get(key);
            group.Components = group.Components.sort(this.sortByComponentsName);

            for (let i = 0; i < group.Components.length; i++) {
                // const element = group.Components[i];
                group.Components[i].Samples = group.Components[i].Samples.sort(this.sortBySamplesName);
            }
            groups.push(group);
        }
        return groups;
    }

    public static sortByComponentsName(a: any, b: any) {
        if (a.Name > b.Name) { return 1; }
        if (a.Name < b.Name) { return -1; }
        return 0;
    }

    public static sortBySamplesName(a: any, b: any) {
        if (a.SampleDisplayName > b.SampleDisplayName) { return 1; }
        if (a.SampleDisplayName < b.SampleDisplayName) { return -1; }
        return 0;
    }

    public static getIndexFile(groups: SampleGroup[], indexTemplate: string): string {

        let sampleLinks = "";
        for (const group of groups) {
            console.log('>> generating links for group: ' + group.Name);

            sampleLinks += '       <div class="nav-group">' + group.Name.toUpperCase() + '</div> \n'
            for (const component of group.Components) {
                console.log('>> generating links for component: ' + component.Name);

                let idLabel = "nav-" + Strings.replace(component.Name, " ", "-").toLowerCase();
                let idLists = idLabel + "-list";
                sampleLinks += '       <label id="' + idLabel + '" class="nav-component">' + component.Name + '</label> \n';
                sampleLinks += '       <div id="' + idLists + '" class="nav-list" state="collapsed"> \n';

                for (const info of component.Samples) {
                    let route = "/samples" + info.SampleRoute;
                    sampleLinks += '           <a class="nav-link" href="#" data-nav="' + route + '">─<span>' + info.SampleDisplayName + '</span></a> \n';
                }
                sampleLinks += '       </div>\n';
            }
            sampleLinks += '\n';
        }

        let indexFile = indexTemplate.replace("<!-- {AutoInsertSampleLinks} -->", sampleLinks);
        return indexFile;
    }

    public static getRoutingFile(group: SampleGroup, routingTemplate: string): string {

        let fileContent = routingTemplate + "";
        let routingConditions = "";
        let isFirstSample = true;

        for (const component of group.Components) {
            console.log('>> generating routes for component: ' + component.Name);

            for (const info of component.Samples) {
                // console.log('- generated: ' + info.SampleFileName);
                // console.log('- generated: ' + info.SampleFilePath);
                routingConditions += this.getRoutingCondition(info, isFirstSample);
                // console.log('sample ' + sample.SampleFolderName);
                if (isFirstSample) {
                    isFirstSample = false;
                }
                // let sampleClass = info.SampleFileName.replace('.tsx','');
                // let samplePath = './' + info.ComponentFolder + '/' + info.SampleFolderName + '/' + info.SampleClassName;
            }
            routingConditions += '\n';
        }
        routingConditions += "       ";
        routingConditions += " else { console.log('SB is missing router for: ' + route) }";
        routingConditions += '\n';

        fileContent = fileContent.replace('// {AutoInsertRoutingConditions}', routingConditions);
        fileContent = fileContent.replace('GroupName', Strings.toTitleCase(group.Name));
        // console.log(fileContent);
        return fileContent;
    }

    public static getRoutingCondition(sampleInfo: SampleInfo, isFirstSample: boolean): string {

        let condition = "";
        if (isFirstSample) {
            condition += 'if ';
        }
        else {
            condition += '        else if ';
        }
        // let samplePath = sampleInfo.ComponentFolder + '/' + sampleInfo.SampleFolderName + '/' + sampleInfo.SampleImportName;
        let samplePath = sampleInfo.ComponentFolder + '/' + sampleInfo.SampleFolderName + '/index';
        let routingPath = sampleInfo.SampleRoute.replace('/' + sampleInfo.ComponentGroup.toLowerCase(), "");
        //condition += '(route.indexOf("' + routingPath + '") >= 0) {\n';
        routingPath = "/" + sampleInfo.ComponentGroup.toLowerCase() + routingPath
        condition += '(route === "' + routingPath + '") {\n';
        condition += '            let sample = await import("./' + samplePath + '");\n';
        condition += '            this.cachedSamples.set(route, sample.' + sampleInfo.SampleImportName + '.register());\n';
        condition += '        }\n';

        return condition;
    }

    public static lintSample(
        fileContent: string,
        fileLocation?: string,
        isBrowserFile?: boolean,
        callback?: (err: any, results: string | null) => void): string {

        let firstLine = true;
        let validLines: string[] = [];
        if (isBrowserFile)
            fileContent = fileContent.replace(new RegExp('(let.sample.=.new.\.*.*)'), '');

        let fileLines = fileContent.split("\n");
        for (let i = 0; i < fileLines.length; i++) {
            let currLine = fileLines[i].trimRight();
            let nextLine = "";
            if (i < fileLines.length - 1)
                nextLine = fileLines[i + 1].trimRight();

            if (currLine === '' && firstLine) { continue; }
            if (currLine === '' && nextLine === '') { continue; }
            if (currLine === '' && nextLine.indexOf(' }') > 0) { continue; }

            firstLine = false;
            validLines.push(currLine);

            // auto insert new line between '' and public field/function
            if (currLine.indexOf(' }') > 0 &&
                nextLine.indexOf(' public') > 0 ) {
                validLines.push("");
            }
            // auto insert new line between '' and private field/function
            if (currLine.indexOf(' }') > 0 &&
                nextLine.indexOf(' private') > 0 ) {
                validLines.push("");
            }

        }

        let importingLines = true;
        let importLines: string[] = [];
        let sourceLines: string[] = [];
        for (const line of validLines) {

            if (line.indexOf('import') !== 0 && line.indexOf('//') !== 0 && line !== '')
                importingLines = false;

            if (importingLines && line !== '') {
                importLines.push(line);
            }
            else {
                sourceLines.push(line);
            }
        }

        // importLines = importLines.sort();
        let lintedContent = '';
        lintedContent += importLines.join('\n') + '\n';
        lintedContent += sourceLines.join('\n') + '\n';

        // console.log('======================================================');
        // console.log(importLines.join('\n') + '\n\n' + sourceLines.join('\n'));
        // console.log(validLines.join('\n'));
        // console.log('======================================================');
        // console.log('linting ' + fileLocation + ' done');
        // callback(null, vfile.toString());
        // callback(null, lintedContent);
        return lintedContent;
    }
}

class SampleGroup {

    public Name: string;
    public Components: SampleComponent[];

    constructor() {
        this.Components = [];
    }
}

class SampleComponent {

    public Name: string;
    public Group: string;
    public Samples: SampleInfo[];

    constructor() {
        this.Samples = [];
    }
}

class Strings {

    public static excludes(str: string, exclusions: string[], useEndsWith?: boolean): boolean {
        for (const exclusion of exclusions) {
            if (useEndsWith) {
                if (str.endsWith(exclusion)) { return false; }
            } else {
                if (str.includes(exclusion)) { return false; }
            }
        }
        return true;
    }

    public static includes(str: string, pattern: string): boolean {
        return str.includes(pattern);
    }

    public static replace(orgStr: string, oldStr: string, newStr: string): string {
        return orgStr.split(oldStr).join(newStr);
    }

    public static toTitleCase(str: string, separator?: string) {
        if (separator === undefined) { separator = ' '; }
        return str.toLowerCase().split(separator).map(function(word) {
          return (word.charAt(0).toUpperCase() + word.slice(1));
        }).join(' ');
      }

    public static splitCamel(orgStr: string): string {
        return orgStr.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
    }

    // .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    //   .split(/(?=[A-Z])/) v

}

class PackageJson {
    public name?: string;
    public description?: string;
    public author?: string;
    public homepage?: string;
    public main?: string;
    public license?: string;
    public version?: string;
    public private?: boolean;
    public scripts: any;
    public dependencies: any;
    public dependenciesOptional: any;
    public devDependencies: any;
    public browserslist?: string[];
}

class PackageDependency {
    public name: string;
    public version: string;

    public samples?: SampleInfo[];

    constructor() {
        this.samples = [];
    }

    public toString(): string {
        return '"' + this.name + `": "` + this.version + '"';
    }
}

class CodeViewer {
    public path: string;
    public hasRelativeAssetsUrls: Boolean;
    public isMain: Boolean;
    public fileExtension: string;
    public fileHeader: string;
    public content: string;

    constructor(filePath: string, content: string, fileExtension: string, fileHeader: string, isMain: Boolean) {

        const jsonContent = content;
        // jsonContent = jsonContent.replace(/\/\//g, "/");

        this.hasRelativeAssetsUrls = false;
        this.path = filePath;
        this.content = jsonContent;
        this.isMain = isMain;
        this.fileExtension = fileExtension;
        this.fileHeader = fileHeader;
    }
}