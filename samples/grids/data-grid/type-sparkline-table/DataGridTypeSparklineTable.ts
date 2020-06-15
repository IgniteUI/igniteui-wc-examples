import { SampleBase } from "../../sample-base";

import { IgcDataGridModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcDataGridModule);

let templateHTML = `
<div class="sample-container">
    <igc-data-grid id="grid" width="100%" height="100%">

    </igc-data-grid>
</div>
`;

export class DataGridTypeSparklineTable extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DataGridTypeSparklineTable");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataGridTypeSparklineTable); return this;
    }

    private grid: IgcDataGridComponent;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.grid = document.getElementById("grid") as IgcDataGridComponent;

        // TODO set property settings (if any) in code-behind:
    }

}