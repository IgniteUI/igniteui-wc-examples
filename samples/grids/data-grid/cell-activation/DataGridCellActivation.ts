import { SampleBase } from "../../sample-base";

import { IgcDataGridModule } from 'igniteui-webcomponents-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';

import { DataGridSharedData } from "./DataGridSharedData";

import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcDataGridModule);
ModuleManager.register(IgcGridColumnOptionsModule);

let templateHTML = `
<div class="sample-container">
    <igc-data-grid
        id="grid"
        height="100%"
        width="100%"
        default-column-min-width="150"
        is-column-options-enabled="true"
        auto-generate-columns="false"
        selection-mode="None"
        activation-mode="Cell">

        <igc-text-column property-path="Name"></igc-text-column>
        <igc-text-column property-path="Street" header-text="Address"></igc-text-column>
        <igc-text-column property-path="City"></igc-text-column>
        <igc-numeric-column property-path="Salary" positive-prefix="$" show-grouping-separator="true"></igc-numeric-column>
        <igc-date-time-column property-path="Birthday" ></igc-date-time-column>

    </igc-data-grid>
</div>
`;

export class DataGridCellActivation extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DataGridCellActivation");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataGridCellActivation); return this;
    }

    private grid: IgcDataGridComponent;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.grid = document.getElementById("grid") as IgcDataGridComponent;
        this.grid.dataSource = DataGridSharedData.getEmployees();
    }
}
