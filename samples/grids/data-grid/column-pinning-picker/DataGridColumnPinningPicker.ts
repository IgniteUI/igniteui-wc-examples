import { SampleBase } from "../../sample-base";
import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcDataGridModule } from 'igniteui-webcomponents-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';
import { DataGridSharedData } from "./DataGridSharedData";
import { PinnedPositions } from 'igniteui-webcomponents-grids';
import { Button } from "@material/mwc-button";

ModuleManager.register(IgcDataGridModule);
ModuleManager.register(IgcGridColumnOptionsModule);

let templateHTML = `
<div class="sample-container">
<div class="options" padding-bottom="10px">
    <button id="pinLeft" class="optionItem" style="width: 100px">Pin Left</button>
    <button id="pinRight" class="optionItem" style="width: 100px">Pin Right</button>
    <button id="unpinColumns" class="optionItem" style="width: 115px">Unpin Columns</button>
</div>
<igc-data-grid
id="grid"
height="calc(100% - 75px)"
width="100%"
is-column-options-enabled="true"
auto-generate-columns="false">
    <igc-text-column pinned="left" property-path="ID" header-text="ID" width="*>95"  horizontal-alignment="center"></igc-text-column>
    <igc-text-column pinned="left" property-path="Name" header-text="Name" width="*>170"></igc-text-column>

    <igc-date-time-column property-path="Birthday" header-text="Date of Birth" width="*>150" horizontal-alignment="center"></igc-date-time-column>
    <igc-numeric-column property-path="Age" width="*>95" horizontal-alignment="center"></igc-numeric-column>
    <igc-image-column property-path="CountryFlag" header-text="Country" width="*>125" content-opacity="1" horizontal-alignment="center"
                      padding-top="5" padding-bottom="5"></igc-image-column>

    <igc-text-column property-path="Street" header-text="Address" width="*>240"></igc-text-column>
    <igc-text-column property-path="City"  width="*>150" ></igc-text-column>
    <igc-text-column property-path="Country"  width="*>150" ></igc-text-column>

    <igc-numeric-column property-path="Salary" header-text="Salary" positive-prefix="$" show-grouping-separator="true"></igc-numeric-column>
    <igc-numeric-column property-path="Sales" header-text="Sales" positive-prefix="$" show-grouping-separator="true"></igc-numeric-column>
</igc-data-grid>
</div>
`;
export class DataGridColumnPinningPicker extends SampleBase {

    public data: any[];
    public static htmlTagName: string = SampleBase.tag("DataGridColumnPinningPicker");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataGridColumnPinningPicker); return this;
    }
    public grid: IgcDataGridComponent;
    public buttonLeft: Button;
    public buttonRight: Button;

    constructor() {
        super();
        this.onGridRef = this.onGridRef.bind(this);
        this.onPinLeft = this.onPinLeft.bind(this);
        this.onPinRight = this.onPinRight.bind(this);
        this.onUnPin = this.onUnPin.bind(this);

        this.data = DataGridSharedData.getEmployees();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.grid = document.getElementById("grid") as IgcDataGridComponent;
        this.grid.dataSource = DataGridSharedData.getEmployees();
        this.buttonLeft = document.getElementById("pinLeft") as Button;
        this.buttonRight = document.getElementById("pinRight") as Button;
        this.buttonLeft.disabled = true;
        this.buttonRight.disabled = true;

        document.getElementById("pinLeft").addEventListener("click", this.onPinLeft);
        document.getElementById("pinRight").addEventListener("click", this.onPinRight);
        document.getElementById("unpinColumns").addEventListener("click", this.onUnPin);

    }

    public onGridRef(grid: IgcDataGridComponent) {
        this.grid = grid;
    }

    onPinLeft () {
        this.buttonLeft.disabled = true;
        this.buttonRight.disabled = true;

        let idColumn = this.grid.actualColumns.item(0);
        let nameColumn = this.grid.actualColumns.item(1);

        this.grid.pinColumn(idColumn, PinnedPositions.Left);
        this.grid.pinColumn(nameColumn, PinnedPositions.Left);
    }

    onPinRight () {
        this.buttonLeft.disabled = true;
        this.buttonRight.disabled = true;

        let streetColumn = this.grid.actualColumns.item(5);
        let cityColumn = this.grid.actualColumns.item(6);
        let countryColumn = this.grid.actualColumns.item(7);
        this.grid.pinColumn(streetColumn, PinnedPositions.Right);
        this.grid.pinColumn(cityColumn, PinnedPositions.Right);
        this.grid.pinColumn(countryColumn, PinnedPositions.Right);
    }

    onUnPin () {
        this.buttonLeft.disabled = false;
        this.buttonRight.disabled = false;

        let idColumn = this.grid.actualColumns.item(0);
        let nameColumn = this.grid.actualColumns.item(1);
        this.grid.pinColumn(idColumn, PinnedPositions.None);
        this.grid.pinColumn(nameColumn, PinnedPositions.None);

        let streetColumn = this.grid.actualColumns.item(5);
        let cityColumn = this.grid.actualColumns.item(6);
        let countryColumn = this.grid.actualColumns.item(7);
        this.grid.pinColumn(streetColumn, PinnedPositions.None);
        this.grid.pinColumn(cityColumn, PinnedPositions.None);
        this.grid.pinColumn(countryColumn, PinnedPositions.None);
    }
}