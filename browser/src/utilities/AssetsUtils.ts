// export class AssetsUtils {

    // public static getAssetsPath(): string {
    //     let path = window.origin;
    //     // appending "webcomponents-demos" folder of the host site on staging/production environment
    //     if (process.env.NODE_ENV !== "development") {
    //         path += "/webcomponents-demos";
    //     }
    //     return path + "/assets";
    // }

    // // gets path to excel file (e.g. .xlsx) with specified file name and file extension
    // public static getExcelPath(fileName: string): string {
    //     return this.getAssetsPath() + "https://static.infragistics.com/xplatform/excel/" + fileName;
    //     // return this.getAssetsPath() + "/excel/" + fileName;
    // }

    // // gets path to shape file (e.g. .shp, .dbf) with specified file name and file extension
    // public static getShapeFile(fileName: string): string {
    //     return this.getAssetsPath() + "https://static.infragistics.com/xplatform/shapes/" + fileName;
    //     // return this.getAssetsPath() + "/shapes/" + fileName;
    // }

    // // gets path to data file (e.g. .csv, .json) with specified file name and file extension
    // public static getDataFile(fileName: string): string {
    //     return this.getAssetsPath() + "https://static.infragistics.com/xplatform/data/" + fileName;
    //     // return this.getAssetsPath() + "/data/" + fileName;
    // }

    // // gets path to image file with specified country name (without file extension)
    // public static getFlagImage(countryName: string): string {
    //     return this.getAssetsPath() + "https://static.infragistics.com/xplatform/images/flags/" + countryName + ".png";
    // }

    // // gets path to image file with specified gender type  (without file extension)
    // public static getGenderImage(gender: string): string {
    //     return this.getAssetsPath() + "https://static.infragistics.com/xplatform/images/genders/" + gender.toLowerCase() + ".png";
    // }

    // // gets path to image file with specified person ID (without file extension)
    // public static getPersonImage(personID: string): string {
    //     return this.getAssetsPath() + "https://static.infragistics.com/xplatform/people/" + personID + ".png";
    // }

    // public static stringEndsWith(str: string, check: string): boolean {
    //     let ind = str.lastIndexOf(check);
    //     return ind >= 0 && ind === str.length - check.length;
    // }


// }