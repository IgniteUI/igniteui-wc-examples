import { IgcSpreadsheetModule } from 'igniteui-webcomponents-spreadsheet';
import { IgcSpreadsheetComponent } from 'igniteui-webcomponents-spreadsheet';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { ExcelUtility } from './ExcelUtility';

ModuleManager.register(IgcSpreadsheetModule);

export class SpreadsheetConditionalFormatting {

    private spreadsheet: IgcSpreadsheetComponent;

    constructor() {

        this.spreadsheet = document.getElementById('spreadsheet') as IgcSpreadsheetComponent;

        let path = 'https://static.infragistics.com/xplatform/excel/ConditionalData.xlsx';
        ExcelUtility.loadFromUrl(path).then((w) => {
            this.spreadsheet.workbook = w;
        });

        // TODO set property settings (if any) in code-behind:
    }
}

let sample = new SpreadsheetConditionalFormatting();
