import { IgcSpreadsheetModule } from 'igniteui-webcomponents-spreadsheet';
import { IgcSpreadsheetComponent } from 'igniteui-webcomponents-spreadsheet';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { SpreadsheetAction } from 'igniteui-webcomponents-spreadsheet';
import { ExcelUtility } from './ExcelUtility';

ModuleManager.register(IgcSpreadsheetModule);

export class SpreadsheetClipboard {

    private spreadsheet: IgcSpreadsheetComponent;

    constructor() {

        this.onCutBtnClick = this.onCutBtnClick.bind(this)
        this.onCopyBtnClick = this.onCopyBtnClick.bind(this)
        this.onPasteBtnClick = this.onPasteBtnClick.bind(this)

        this.spreadsheet = document.getElementById('spreadsheet') as IgcSpreadsheetComponent;

        let path = 'https://static.infragistics.com/xplatform/excel/SalesData.xlsx';
        ExcelUtility.loadFromUrl(path).then((w) => {
            this.spreadsheet.workbook = w;
        });

        document.getElementById('cutBtn')!.addEventListener('click', this.onCutBtnClick);
        document.getElementById('copyBtn')!.addEventListener('click', this.onCopyBtnClick);
        document.getElementById('pasteBtn')!.addEventListener('click', this.onPasteBtnClick);
    }

    onCutBtnClick() {
        this.spreadsheet.executeAction(SpreadsheetAction.Cut);
    }

    onCopyBtnClick() {
        this.spreadsheet.executeAction(SpreadsheetAction.Copy);
    }

    onPasteBtnClick() {
        this.spreadsheet.executeAction(SpreadsheetAction.Paste);
    }
}

let sample = new SpreadsheetClipboard();
