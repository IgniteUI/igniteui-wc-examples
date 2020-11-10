
export class RouterExcel {

    private static samples = new Map<string, any>();

    public static async get(route: string): Promise<any>  {

        if (this.samples.has(route)) {
            console.log("SB cashed sample: " + route)
            return this.samples.get(route);
        }

        if (route.indexOf("/excel-library-overview") >= 0) {
            let sample = await import("./excel-library/ExcelLibraryOverview");
            this.samples.set(route, sample.ExcelLibraryOverview.register());
        }
        else if (route.indexOf("/excel-library-working-with-cells") >= 0) {
            let sample = await import("./excel-library/ExcelLibraryCells");
            this.samples.set(route, sample.ExcelLibraryCells.register());
        }
        else if (route.indexOf("/excel-library-working-with-charts") >= 0) {
            let sample = await import("./excel-library/ExcelLibraryCharts");
            this.samples.set(route, sample.ExcelLibraryCharts.register());
        }
        else if (route.indexOf("/excel-library-working-with-sparklines") >= 0) {
            let sample = await import("./excel-library/ExcelLibrarySparklines");
            this.samples.set(route, sample.ExcelLibrarySparklines.register());
        }
        else if (route.indexOf("/excel-library-working-with-tables") >= 0) {
            let sample = await import("./excel-library/ExcelLibraryTables");
            this.samples.set(route, sample.ExcelLibraryTables.register());
        }
        else if (route.indexOf("/excel-library-operations-on-workbooks") >= 0) {
            let sample = await import("./excel-library/ExcelLibraryWorkbooks");
            this.samples.set(route, sample.ExcelLibraryWorkbooks.register());
        }
        else if (route.indexOf("/excel-library-operations-on-worksheets") >= 0) {
            let sample = await import("./excel-library/ExcelLibraryWorksheets");
            this.samples.set(route, sample.ExcelLibraryWorksheets.register());
        }
        // SPREADSHEET
        else if (route.indexOf("/spreadsheet-activation") >= 0) {
            let sample = await import("./spreadsheet/SpreadsheetActivation");
            this.samples.set(route, sample.SpreadsheetActivation.register());
        }
        else if (route.indexOf("/spreadsheet-adapter-combo") >= 0) {
            let sample = await import("./spreadsheet/SpreadsheetAdapterCombo");
            this.samples.set(route, sample.SpreadsheetAdapterCombo.register());
        }
        else if (route.indexOf("/spreadsheet-adapter-chart") >= 0) {
            let sample = await import("./spreadsheet/SpreadsheetAdapter");
            this.samples.set(route, sample.SpreadsheetAdapter.register());
        }
        else if (route.indexOf("/spreadsheet-clipboard") >= 0) {
            let sample = await import("./spreadsheet/SpreadsheetClipboard");
            this.samples.set(route, sample.SpreadsheetClipboard.register());
        }
        else if (route.indexOf("/spreadsheet-commands") >= 0) {
            let sample = await import("./spreadsheet/SpreadsheetCommands");
            this.samples.set(route, sample.SpreadsheetCommands.register());
        }
        else if (route.indexOf("/spreadsheet-conditional-formatting") >= 0) {
            let sample = await import("./spreadsheet/SpreadsheetConditionalFormatting");
            this.samples.set(route, sample.SpreadsheetConditionalFormatting.register());
        }
        else if (route.indexOf("/spreadsheet-config-options") >= 0) {
            let sample = await import("./spreadsheet/SpreadsheetConfiguring");
            this.samples.set(route, sample.SpreadsheetConfiguring.register());
        }
        else if (route.indexOf("/spreadsheet-data-validation") >= 0) {
            let sample = await import("./spreadsheet/SpreadsheetDataValidation");
            this.samples.set(route, sample.SpreadsheetDataValidation.register());
        }
        else if (route.indexOf("/spreadsheet-filter-dialog") >= 0) {
            let sample = await import("./spreadsheet/SpreadsheetFilterDialog");
            this.samples.set(route, sample.SpreadsheetFilterDialog.register());
        }
        else if (route.indexOf("/spreadsheet-format-dialog") >= 0) {
            let sample = await import("./spreadsheet/SpreadsheetFormatDialog");
            this.samples.set(route, sample.SpreadsheetFormatDialog.register());
        }
        else if (route.indexOf("/spreadsheet-hyperlinks") >= 0) {
            let sample = await import("./spreadsheet/SpreadsheetHyperlinks");
            this.samples.set(route, sample.SpreadsheetHyperlinks.register());
        }
        else if (route.indexOf("/spreadsheet-overview") >= 0) {
            let sample = await import("./spreadsheet/SpreadsheetOverview");
            this.samples.set(route, sample.SpreadsheetOverview.register());
        }
        else if (route.indexOf("/spreadsheet-sort-dialog") >= 0) {
            let sample = await import("./spreadsheet/SpreadsheetSortDialog");
            this.samples.set(route, sample.SpreadsheetSortDialog.register());
        }

        if (this.samples.has(route)) {
            console.log("SB imported sample: " + route)
            return this.samples.get(route);
        } else {
            console.log("SB import missing for sample: " + route)
        }


    }

}