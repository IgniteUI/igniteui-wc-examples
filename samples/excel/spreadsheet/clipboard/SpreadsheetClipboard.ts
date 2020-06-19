import { SampleBase } from "../../sample-base";

import { IgcSpreadsheetModule } from 'igniteui-webcomponents-spreadsheet';
import { IgcSpreadsheetComponent } from 'igniteui-webcomponents-spreadsheet';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { SpreadsheetAction } from 'igniteui-webcomponents-spreadsheet';
import { ExcelUtility } from "../../../utilities/ExcelUtility";

ModuleManager.register(IgcSpreadsheetModule);

let templateHTML = `
<div class="sample-container">
    <div class="options">
        <input type="button" class="optionItem" id="cutBtn" value="Cut" />
        <input type="button" class="optionItem" id="copyBtn" value="Copy" />
        <input type="button" class="optionItem" id="pasteBtn" value="Paste" />
    </div>
    <igc-spreadsheet id="spreadsheet" width="100%" height="calc(100% - 25px)">

    </igc-spreadsheet>
</div>
`;

export class SpreadsheetClipboard extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("SpreadsheetClipboard");
    public static register(): any {
        window.customElements.define(this.htmlTagName, SpreadsheetClipboard); return this;
    }

    private spreadsheet: IgcSpreadsheetComponent;

    constructor() {
        super();
        this.onCutBtnClick = this.onCutBtnClick.bind(this)
        this.onCopyBtnClick = this.onCopyBtnClick.bind(this)
        this.onPasteBtnClick = this.onPasteBtnClick.bind(this)
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.spreadsheet = document.getElementById("spreadsheet") as IgcSpreadsheetComponent;

        let path = "https://static.infragistics.com/xplatform/excel/SalesData.xlsx";
        ExcelUtility.loadFromUrl(path).then((w) => {
            this.spreadsheet.workbook = w;
        });

        document.getElementById("cutBtn").addEventListener("click", this.onCutBtnClick);
        document.getElementById("copyBtn").addEventListener("click", this.onCopyBtnClick);
        document.getElementById("pasteBtn").addEventListener("click", this.onPasteBtnClick);
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
