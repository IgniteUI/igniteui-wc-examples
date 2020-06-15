import { SampleBase } from "../../sample-base";
import { ExcelUtility } from "../../../utilities/ExcelUtility";

import { IgcSpreadsheetModule } from 'igniteui-webcomponents-spreadsheet';
import { IgcSpreadsheetComponent } from 'igniteui-webcomponents-spreadsheet';
import { IgcSpreadsheetActiveCellChangedEventArgs } from 'igniteui-webcomponents-spreadsheet';
import { SpreadsheetCell } from 'igniteui-webcomponents-spreadsheet';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcSpreadsheetModule);

let templateHTML = `
<div class="sample-container">
    <div class="options">
        <input id="activateCellTextBox" class="optionText" type="text" />

        <button id="activateCellBtn" class="button">Activate Cell</button>
        <label id="activeCellLabel" class="optionItem"> Current Active Cell: </label>
    </div>
    <igc-spreadsheet id="spreadsheet" width="100%" height="calc(100% - 25px)">
    </igc-spreadsheet>
</div>
`;

export class SpreadsheetActivation extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("SpreadsheetActivation");
    public static register(): any {
        window.customElements.define(this.htmlTagName, SpreadsheetActivation); return this;
    }

    private spreadsheet: IgcSpreadsheetComponent;
    private activateText: string;

    constructor() {
        super();
        this.onSpreadsheetActiveCellChanged = this.onSpreadsheetActiveCellChanged.bind(this);
        this.onActiveCellAddressTextBoxChanged = this.onActiveCellAddressTextBoxChanged.bind(this);
        this.onActivateCellBtnClick = this.onActivateCellBtnClick.bind(this);
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.spreadsheet = document.getElementById("spreadsheet") as IgcSpreadsheetComponent;
        this.spreadsheet.activeCellChanged = this.onSpreadsheetActiveCellChanged;

        let path = "https://static.infragistics.com/xplatform/excel/SalesData.xlsx";
        ExcelUtility.loadFromUrl(path).then((w) => {
            this.spreadsheet.workbook = w;
        });

        document.getElementById("activateCellBtn").addEventListener("click", this.onActivateCellBtnClick);
        document.getElementById("activateCellTextBox").addEventListener("change", this.onActiveCellAddressTextBoxChanged);

    }

    onSpreadsheetActiveCellChanged(s: IgcSpreadsheetComponent, e: IgcSpreadsheetActiveCellChangedEventArgs) {
        document.getElementById("activeCellLabel").textContent = "Current Active Cell: " + e.newValue.toString();
    }

    onActivateCellBtnClick() {
        this.spreadsheet.activeCell = new SpreadsheetCell(this.activateText);
    }

    onActiveCellAddressTextBoxChanged(e: any) {
        this.activateText = e.target.value;
    }
}
