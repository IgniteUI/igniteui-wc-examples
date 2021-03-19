import { ExcelUtility } from './ExcelUtility';
import { IgcSpreadsheetModule } from 'igniteui-webcomponents-spreadsheet';
import { IgcSpreadsheetComponent } from 'igniteui-webcomponents-spreadsheet';
import { IgcSpreadsheetActiveCellChangedEventArgs } from 'igniteui-webcomponents-spreadsheet';
import { SpreadsheetCell } from 'igniteui-webcomponents-spreadsheet';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcSpreadsheetModule);

export class SpreadsheetActivation {

    private spreadsheet: IgcSpreadsheetComponent;
    private activateText: string = "";

    constructor() {

        this.onSpreadsheetActiveCellChanged = this.onSpreadsheetActiveCellChanged.bind(this);
        this.onActiveCellAddressTextBoxChanged = this.onActiveCellAddressTextBoxChanged.bind(this);
        this.onActivateCellBtnClick = this.onActivateCellBtnClick.bind(this);

        this.spreadsheet = document.getElementById('spreadsheet') as IgcSpreadsheetComponent;
        this.spreadsheet.activeCellChanged = this.onSpreadsheetActiveCellChanged;

        let path = 'https://static.infragistics.com/xplatform/excel/SalesData.xlsx';
        ExcelUtility.loadFromUrl(path).then((w) => {
            this.spreadsheet.workbook = w;
        });

        document.getElementById('activateCellBtn')!.addEventListener('click', this.onActivateCellBtnClick);
        document.getElementById('activateCellTextBox')!.addEventListener('change', this.onActiveCellAddressTextBoxChanged);
    }

    onSpreadsheetActiveCellChanged(s: IgcSpreadsheetComponent, e: IgcSpreadsheetActiveCellChangedEventArgs) {
        document.getElementById('activeCellLabel')!.textContent = 'Current Active Cell: ' + e.newValue.toString();
    }

    onActivateCellBtnClick() {
        this.spreadsheet.activeCell = new SpreadsheetCell(this.activateText);
    }

    onActiveCellAddressTextBoxChanged(e: any) {
        this.activateText = e.target.value;
    }
}

new SpreadsheetActivation();
