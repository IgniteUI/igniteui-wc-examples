import { SampleBase } from "../../sample-base";

import { IgcSpreadsheetModule } from 'igniteui-webcomponents-spreadsheet';
import { IgcSpreadsheetComponent } from 'igniteui-webcomponents-spreadsheet';
import { ModuleManager } from 'igniteui-webcomponents-core';

import { ExcelUtility } from "../../../utilities/ExcelUtility";

ModuleManager.register(IgcSpreadsheetModule);

let templateHTML = `
<div class="sample-container">
    <igc-spreadsheet id="spreadsheet" width="100%" height="100%">

    </igc-spreadsheet>
</div>
`;

export class SpreadsheetHyperlinks extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("SpreadsheetHyperlinks");
    public static register(): any {
        window.customElements.define(this.htmlTagName, SpreadsheetHyperlinks); return this;
    }

    private spreadsheet: IgcSpreadsheetComponent;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.spreadsheet = document.getElementById("spreadsheet") as IgcSpreadsheetComponent;

        let path = "https://static.infragistics.com/xplatform/excel/Hyperlinks.xlsx";
        ExcelUtility.loadFromUrl(path).then((w) => {
            this.spreadsheet.workbook = w;
        });

        // TODO set property settings (if any) in code-behind:
    }
}
