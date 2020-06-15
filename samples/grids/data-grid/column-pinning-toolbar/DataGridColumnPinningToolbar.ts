import { SampleBase } from "../../sample-base";
import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcDataGridModule } from 'igniteui-webcomponents-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';
import { IgcDataGridToolbarModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridToolbarComponent } from 'igniteui-webcomponents-grids';
import { DataGridSharedData } from "./DataGridSharedData";

ModuleManager.register(IgcDataGridModule);
ModuleManager.register(IgcDataGridToolbarModule);
ModuleManager.register(IgcGridColumnOptionsModule);

let templateHTML = `
<div class="sample-container">
<igc-data-grid-toolbar
        id="toolbar"
        toolbar-title="Employees"
        column-pinning="true">
</igc-data-grid-toolbar>
<igc-data-grid
    id="grid"
    height="calc(100% - 75px)"
    width="100%"
    auto-generate-columns="false"
    corner-radius-top-left="0"
    corner-radius-top-right="0"
    is-column-options-enabled="true"
    default-column-min-width="120px">

    <igc-text-column property-path="ID" header-text="ID" width="*>110"  horizontal-alignment="center"></igc-text-column>
    <igc-text-column property-path="FirstName" header-text="First Name" width="*>140"></igc-text-column>
    <igc-text-column property-path="LastName" header-text="Last Name" width="*>130"></igc-text-column>

    <igc-date-time-column property-path="Birthday" header-text="Date of Birth" width="*>150" horizontal-alignment="center"></igc-date-time-column>
    <igc-numeric-column property-path="Age" width="*>90" horizontal-alignment="center"></igc-numeric-column>
    <igc-image-column property-path="CountryFlag" header-text="Country" width="*>115" content-opacity="1" horizontal-alignment="center"
                      padding-top="5" padding-bottom="5"></igc-image-column>

    <igc-text-column property-path="Street" header-text="Address" width="*>170"></igc-text-column>
    <igc-text-column property-path="City"  width="*>125" ></igc-text-column>
    <igc-text-column property-path="Country"  width="*>125" ></igc-text-column>

    <igc-numeric-column property-path="Salary" header-text="Salary" positive-prefix="$" show-grouping-separator="true"></igc-numeric-column>
    <igc-numeric-column property-path="Sales" header-text="Sales" positive-prefix="$" show-grouping-separator="true"></igc-numeric-column>
</igc-data-grid>
</div>
`;
export class DataGridColumnPinningToolbar extends SampleBase {

    public data: any[];
    public static htmlTagName: string = SampleBase.tag("DataGridColumnPinningToolbar");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataGridColumnPinningToolbar); return this;
    }
    public grid: IgcDataGridComponent;
    public toolbar: IgcDataGridToolbarComponent;

    constructor() {
        super();
        this.onGridRef = this.onGridRef.bind(this);
        this.data = DataGridSharedData.getEmployees();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.grid = document.getElementById("grid") as IgcDataGridComponent;
        this.grid.dataSource = DataGridSharedData.getEmployees();

        this.toolbar = document.getElementById("toolbar") as IgcDataGridToolbarComponent;
        this.toolbar.targetGrid = this.grid;
    }

    public onGridRef(grid: IgcDataGridComponent) {
        this.grid = grid;
    }
}