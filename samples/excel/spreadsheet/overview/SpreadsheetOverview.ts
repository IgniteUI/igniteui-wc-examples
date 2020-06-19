import { SampleBase } from "../../sample-base";

import { IgcSpreadsheetModule } from 'igniteui-webcomponents-spreadsheet';
import { IgcSpreadsheetComponent } from 'igniteui-webcomponents-spreadsheet';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { Workbook } from 'igniteui-webcomponents-excel';
import { WorkbookOptionsBase, WorkbookFormat } from "igniteui-webcomponents-excel";

import { ExcelUtility } from "../../../utilities/ExcelUtility";

ModuleManager.register(IgcSpreadsheetModule);

let templateHTML = `
<div class="sample-container">
    <igc-spreadsheet id="spreadsheet" width="100%" height="100%">

    </igc-spreadsheet>
</div>
`;

export class SpreadsheetOverview extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("SpreadsheetOverview");
    public static register(): any {
        window.customElements.define(this.htmlTagName, SpreadsheetOverview); return this;
    }

    private spreadsheet: IgcSpreadsheetComponent;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.spreadsheet = document.getElementById("spreadsheet") as IgcSpreadsheetComponent;

        let path = "https://static.infragistics.com/xplatform/excel/SalesData.xlsx";
        ExcelUtility.loadFromUrl(path).then((w) => {
            this.spreadsheet.workbook = w;
        });
    }
}
