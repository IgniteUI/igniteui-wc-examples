import { IgcSpreadsheetModule } from 'igniteui-webcomponents-spreadsheet';
import { IgcSpreadsheetComponent } from 'igniteui-webcomponents-spreadsheet';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { Workbook } from 'igniteui-webcomponents-excel';
import { WorkbookOptionsBase, WorkbookFormat } from 'igniteui-webcomponents-excel';
import { ExcelUtility } from './ExcelUtility';

ModuleManager.register(IgcSpreadsheetModule);

export class SpreadsheetOverview {

    private spreadsheet: IgcSpreadsheetComponent;

    constructor() {

        this.spreadsheet = document.getElementById('spreadsheet') as IgcSpreadsheetComponent;

        let path = 'https://static.infragistics.com/xplatform/excel/SalesData.xlsx';
        ExcelUtility.loadFromUrl(path).then((w) => {
            this.spreadsheet.workbook = w;
        });
    }
}

let sample = new SpreadsheetOverview();
