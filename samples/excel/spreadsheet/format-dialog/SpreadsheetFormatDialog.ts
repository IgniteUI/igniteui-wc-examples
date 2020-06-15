import { SampleBase } from "../../sample-base";

import { IgcSpreadsheetModule } from 'igniteui-webcomponents-spreadsheet';
import { IgcSpreadsheetComponent } from 'igniteui-webcomponents-spreadsheet';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcSpreadsheetModule);

let templateHTML = `
<div class="sample-container">
    <igc-spreadsheet id="spreadsheet" width="100%" height="100%">

    </igc-spreadsheet>
</div>
`;

export class SpreadsheetFormatDialog extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("SpreadsheetFormatDialog");
    public static register(): any {
        window.customElements.define(this.htmlTagName, SpreadsheetFormatDialog); return this;
    }

    private spreadsheet: IgcSpreadsheetComponent;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.spreadsheet = document.getElementById("spreadsheet") as IgcSpreadsheetComponent;

        // TODO set property settings (if any) in code-behind:
    }
}
