import { IgcSpreadsheetModule } from 'igniteui-webcomponents-spreadsheet';
import { IgcSpreadsheetComponent } from 'igniteui-webcomponents-spreadsheet';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { SpreadsheetAction } from 'igniteui-webcomponents-spreadsheet';
import { ExcelUtility } from './ExcelUtility';

ModuleManager.register(IgcSpreadsheetModule);

export class SpreadsheetCommands {

    private spreadsheet: IgcSpreadsheetComponent;

    constructor() {

        this.onZoomInClick = this.onZoomInClick.bind(this);
        this.onZoomOutClick = this.onZoomOutClick.bind(this);

        this.spreadsheet = document.getElementById('spreadsheet') as IgcSpreadsheetComponent;

        let path = 'https://dl.infragistics.com/x/excel/SalesData.xlsx';
        ExcelUtility.loadFromUrl(path).then((w) => {
            this.spreadsheet.workbook = w;
        });

        document.getElementById('zoomIn')!.addEventListener('click', this.onZoomInClick);
        document.getElementById('zoomOut')!.addEventListener('click', this.onZoomOutClick);
    }

    onZoomInClick() {
        this.spreadsheet.executeAction(SpreadsheetAction.ZoomIn);
    }

    onZoomOutClick() {
        this.spreadsheet.executeAction(SpreadsheetAction.ZoomOut);
    }
}

export function initialize() {
  return new SpreadsheetCommands();
}