import { SampleBase } from "../../sample-base";

import { IgcDataGridModule } from 'igniteui-webcomponents-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';
import { ModuleManager } from 'igniteui-webcomponents-core';

import { DataGridSharedData } from "./DataGridSharedData";

ModuleManager.register(IgcDataGridModule);
ModuleManager.register(IgcGridColumnOptionsModule);

let templateHTML = `
<div class="sample-container">

    <igc-data-grid
        id="grid"
        height="100%"
        width="100%"
        is-column-options-enabled="true"
        auto-generate-columns="false">

        <igc-image-column property-path="Photo" content-opacity="1" horizontal-alignment="center" width="*>105" ></igc-image-column>
        <igc-text-column property-path="FirstName" header-text="First Name" width="*>130" ></igc-text-column>
        <igc-text-column property-path="LastName" header-text="Last Name" width="*>135"></igc-text-column>
        <igc-text-column property-path="City" width="*>125"></igc-text-column>
        <igc-text-column property-path="Country" width="*>120"></igc-text-column>
        <igc-numeric-column property-path="Sales" width="*>120" positive-prefix="$" show-grouping-separator="true"></igc-numeric-column>
        <igc-numeric-column property-path="Age" width="*>90"></igc-numeric-column>
        <igc-date-time-column property-path="Birthday" header-text="Date of Birth" horizontal-alignment="right" width="*>145"></igc-date-time-column>
    </igc-data-grid>
</div>
`;

export class DataGridRowPinning extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DataGridRowPinning");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataGridRowPinning); return this;
    }

    private grid: IgcDataGridComponent;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.grid = document.getElementById("grid") as IgcDataGridComponent;
        const data = DataGridSharedData.getEmployees();
        this.grid.dataSource = data;

        this.grid.pinnedItems.add(data[2]);
        this.grid.pinnedItems.add(data[4]);
    }
}
