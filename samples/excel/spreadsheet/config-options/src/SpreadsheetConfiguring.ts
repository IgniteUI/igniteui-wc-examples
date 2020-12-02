import { IgcSpreadsheetModule } from 'igniteui-webcomponents-spreadsheet';
import { IgcSpreadsheetComponent } from 'igniteui-webcomponents-spreadsheet';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { SpreadsheetEnterKeyNavigationDirection } from 'igniteui-webcomponents-spreadsheet';
import { SpreadsheetCellSelectionMode } from 'igniteui-webcomponents-spreadsheet';
import { ExcelUtility } from './ExcelUtility';

ModuleManager.register(IgcSpreadsheetModule);

export class SpreadsheetConfiguring {

    private spreadsheet: IgcSpreadsheetComponent;

    constructor() {

        this.onGridlinesVisibleChanged = this.onGridlinesVisibleChanged.bind(this);
        this.onTabBarAreaVisibleChanged = this.onTabBarAreaVisibleChanged.bind(this);
        this.onIsProtectedChanged = this.onIsProtectedChanged.bind(this);
        this.onSpreadsheetZoomLevelChange = this.onSpreadsheetZoomLevelChange.bind(this);

        this.onHeadersVisibleChanged = this.onHeadersVisibleChanged.bind(this);
        this.onFormulaBarVisibleChanged = this.onFormulaBarVisibleChanged.bind(this);
        this.onEnterKeyNavEnabledChanged = this.onEnterKeyNavEnabledChanged.bind(this);

        this.onEnterKeyNavDirectionChanged = this.onEnterKeyNavDirectionChanged.bind(this);
        this.onSelectionModeChanged = this.onSelectionModeChanged.bind(this);

        this.spreadsheet = document.getElementById('spreadsheet') as IgcSpreadsheetComponent;

        let path = 'https://static.infragistics.com/xplatform/excel/SalesData.xlsx';
        ExcelUtility.loadFromUrl(path).then((w) => {
            this.spreadsheet.workbook = w;
        });

        (document.getElementById('selectionModeDropDown') as any).value = 'Normal';

        document.getElementById('areGridlinesVisibleCheckbox')!.addEventListener('change', this.onGridlinesVisibleChanged);
        document.getElementById('isTabBarAreaVisibleCheckbox')!.addEventListener('change', this.onTabBarAreaVisibleChanged);
        document.getElementById('isProtectedCheckbox')!.addEventListener('change', this.onIsProtectedChanged);
        document.getElementById('spreadsheetZoomLevelRange')!.addEventListener('input', this.onSpreadsheetZoomLevelChange);

        document.getElementById('areHeadersVisibleCheckbox')!.addEventListener('change', this.onHeadersVisibleChanged);
        document.getElementById('isFormulaBarVisibleCheckbox')!.addEventListener('change', this.onFormulaBarVisibleChanged);
        document.getElementById('isEnterKeyNavEnabledCheckbox')!.addEventListener('change', this.onEnterKeyNavEnabledChanged);

        document.getElementById('enterKeyNavDirectionDropDown')!.addEventListener('change', this.onEnterKeyNavDirectionChanged);
        document.getElementById('selectionModeDropDown')!.addEventListener('change', this.onSelectionModeChanged);
    }

    onGridlinesVisibleChanged(e: any) {
        this.spreadsheet.areGridlinesVisible = e.target.checked;
    }

    onTabBarAreaVisibleChanged(e: any) {
        const checked: boolean = e.target.checked;
        if (checked) {
            this.spreadsheet.workbook.windowOptions.tabBarVisible = true;
        }
        else {
            this.spreadsheet.workbook.windowOptions.tabBarVisible = false;
        }
    }

    onIsProtectedChanged(e: any) {
        const checked: boolean = e.target.checked;
        if (checked) {
            this.spreadsheet.activeWorksheet.protect();
        }
        else {
            this.spreadsheet.activeWorksheet.unprotect();
        }
    }

    onSpreadsheetZoomLevelChange(e: any) {
        this.spreadsheet.zoomLevel = e.target.value;
        document.getElementById('zoomLevelLabel')!.textContent = 'Zoom Level: ' + e.target.value.toString() + '%';
    }

    onHeadersVisibleChanged(e: any) {
        this.spreadsheet.areHeadersVisible = e.target.checked;
    }

    onFormulaBarVisibleChanged(e: any) {
        this.spreadsheet.isFormulaBarVisible = e.target.checked;
    }

    onEnterKeyNavEnabledChanged(e: any) {
        this.spreadsheet.isEnterKeyNavigationEnabled = e.target.checked;
    }

    onEnterKeyNavDirectionChanged(e: any) {
        const selection: string = e.target.value;

        switch (selection) {
            case 'Down': {
                this.spreadsheet.enterKeyNavigationDirection = SpreadsheetEnterKeyNavigationDirection.Down;
                break;
            }
            case 'Up': {
                this.spreadsheet.enterKeyNavigationDirection = SpreadsheetEnterKeyNavigationDirection.Up;
                break;
            }
            case 'Left': {
                this.spreadsheet.enterKeyNavigationDirection = SpreadsheetEnterKeyNavigationDirection.Left;
                break;
            }
            case 'Right': {
                this.spreadsheet.enterKeyNavigationDirection = SpreadsheetEnterKeyNavigationDirection.Right;
                break;
            }
        }
    }

    onSelectionModeChanged(e: any) {
        const selection: string = e.target.value;

        switch (selection) {
            case 'AddToSelection': {
                this.spreadsheet.selectionMode = SpreadsheetCellSelectionMode.AddToSelection;
                break;
            }
            case 'ExtendSelection': {
                this.spreadsheet.selectionMode = SpreadsheetCellSelectionMode.ExtendSelection;
                break;
            }
            case 'Normal': {
                this.spreadsheet.selectionMode = SpreadsheetCellSelectionMode.Normal;
                break;
            }
        }
    }
}

let sample = new SpreadsheetConfiguring();
