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
    auto-generate-columns="false"
    is-column-options-enabled="true"
    default-column-min-width=120 >
        <igc-text-column property-path="ID" header-text="ID" width="*>110" horizontal-alignment="center"></igc-text-column>
        <igc-text-column property-path="FirstName" header-text="First Name" width="*>140"></igc-text-column>
        <igc-text-column property-path="LastName" header-text="Last Name" width="*>140"></igc-text-column>

        <igc-date-time-column property-path="Birthday" header-text="Date of Birth" width="*>150" horizontal-alignment="center"></igc-date-time-column>
        <igc-numeric-column property-path="Age" width="*>90" horizontal-alignment="center"></igc-numeric-column>
        <igc-image-column property-path="CountryFlag" header-text="Country" padding-top="5" padding-bottom="5"
        width="*>140" content-opacity="1" horizontal-alignment="center"></igc-image-column>
        <igc-text-column property-path="Street" header-text="Address" width="*>240"></igc-text-column>
        <igc-text-column property-path="City"  width="*>150" ></igc-text-column>
        <igc-text-column property-path="Country"  width="*>150" ></igc-text-column>

        <igc-numeric-column property-path="Salary" header-text="Salary" positive-prefix="$" show-grouping-separator="true"></igc-numeric-column>
        <igc-numeric-column property-path="Sales" header-text="Sales" positive-prefix="$" show-grouping-separator="true"></igc-numeric-column>
    </igc-data-grid>
</div>
`;

export class DataGridHorizontalScrolling extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DataGridHorizontalScrolling");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataGridHorizontalScrolling); return this;
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
