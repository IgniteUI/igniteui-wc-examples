import { SampleBase } from "../../sample-base";
// import { ExcelUtility } from "../../../utilities/ExcelUtility";

// import { ModuleManager } from 'igniteui-webcomponents-core';
// import { Workbook } from 'igniteui-webcomponents-excel';
// import { WorkbookOptionsBase, WorkbookFormat } from "igniteui-webcomponents-excel";

let templateHTML = `
<div class="sample-container">
        <button id="button1" class="button">Excel Action</button>
</div>
`;

export class ExcelLibraryTables extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("ExcelLibraryTables");
    public static register(): any {
        window.customElements.define(this.htmlTagName, ExcelLibraryTables); return this;
    }

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        const button = document.getElementById("button1");
        button.addEventListener("click", this.onButtonClick)
    }

    public onButtonClick = (e: any) => {

    }
}
