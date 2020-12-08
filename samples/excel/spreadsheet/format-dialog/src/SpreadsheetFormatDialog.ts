import { IgcSpreadsheetModule } from 'igniteui-webcomponents-spreadsheet';
import { IgcSpreadsheetComponent } from 'igniteui-webcomponents-spreadsheet';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcSpreadsheetModule);

export class SpreadsheetFormatDialog {

    private spreadsheet: IgcSpreadsheetComponent;

    constructor() {

        this.spreadsheet = document.getElementById('spreadsheet') as IgcSpreadsheetComponent;

        // TODO set property settings (if any) in code-behind:
    }
}

new SpreadsheetFormatDialog();
