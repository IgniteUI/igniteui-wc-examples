import { SampleBase } from "../../sample-base";

import { IgcSpreadsheetModule } from 'igniteui-webcomponents-spreadsheet';
import { IgcSpreadsheetComponent } from 'igniteui-webcomponents-spreadsheet';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { SpreadsheetAction } from 'igniteui-webcomponents-spreadsheet';
import { ExcelUtility } from "../../../utilities/ExcelUtility";

ModuleManager.register(IgcSpreadsheetModule);

let templateHTML = `
<div class="sample-container">
    <div className="options">
        <input className="optionItem" id="zoomIn" value="Zoom In" onClick={this.onCommandClick} type="button" />
        <input className="optionItem" id="zoomOut" value="Zoom Out" onClick={this.onCommandClick} type="button" />
    </div>
    <igc-spreadsheet id="spreadsheet" width="100%" height="calc(100% - 25px)">

    </igc-spreadsheet>
</div>
`;

export class SpreadsheetCommands extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("SpreadsheetCommands");
    public static register(): any {
        window.customElements.define(this.htmlTagName, SpreadsheetCommands); return this;
    }

    private spreadsheet: IgcSpreadsheetComponent;

    constructor() {
        super();
        this.onZoomInClick = this.onZoomInClick.bind(this);
        this.onZoomOutClick = this.onZoomOutClick.bind(this);
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.spreadsheet = document.getElementById("spreadsheet") as IgcSpreadsheetComponent;

        let path = "https://static.infragistics.com/xplatform/excel/SalesData.xlsx";
        ExcelUtility.loadFromUrl(path).then((w) => {
            this.spreadsheet.workbook = w;
        });

        document.getElementById("zoomIn").addEventListener("click", this.onZoomInClick);
        document.getElementById("zoomOut").addEventListener("click", this.onZoomOutClick);
    }

    onZoomInClick() {
        this.spreadsheet.executeAction(SpreadsheetAction.ZoomIn);
    }

    onZoomOutClick() {
        this.spreadsheet.executeAction(SpreadsheetAction.ZoomOut);
    }
}
