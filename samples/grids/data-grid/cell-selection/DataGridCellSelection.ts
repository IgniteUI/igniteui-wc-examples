import { SampleBase } from "../../sample-base";

import { IgcDataGridModule } from 'igniteui-webcomponents-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { DataGridSharedData } from "./DataGridSharedData";
import { GridSelectionMode } from 'igniteui-webcomponents-grids';
import { GridActivationMode } from 'igniteui-webcomponents-grids';
import { IgcGridSelectedItemsChangedEventArgs } from 'igniteui-webcomponents-grids';
import { IgcGridSelectedKeysChangedEventArgs } from 'igniteui-webcomponents-grids';
import { IgcGridSelectedCellsChangedEventArgs } from 'igniteui-webcomponents-grids';
import { IgcGridSelectedCellRangesChangedEventArgs } from 'igniteui-webcomponents-grids';

ModuleManager.register(IgcDataGridModule);
ModuleManager.register(IgcGridColumnOptionsModule);

let templateHTML = `
<div class="sample-container">
    <div class="options">
        <span class="optionItem">Selection Mode: </span>
        <select id="selectionDropBox" class="optionItem">
            <option>SingleRow</option>
            <option>SingleCell</option>
            <option>MultipleCell</option>
            <option>MultipleRow</option>
            <option>RangeCell</option>
            <option>None</option>
        </select>
    </div>

    <igc-data-grid
        id="grid"
        height="calc(100% - 50px)"
        width="100%"
        selectionMode="SingleRow"
        default-column-min-width="125"
        is-column-options-enabled="true"
        auto-generate-columns="false">

        <igc-text-column property-path="Name" width="*>150"></igc-text-column>
        <igc-text-column property-path="Street" header-text="Street" width="*>155"></igc-text-column>
        <igc-text-column property-path="City" header-text="City" width="*>125"></igc-text-column>
        <igc-numeric-column property-path="Salary" header-text="Salary" positive-prefix="$" show-grouping-separator="true"></igc-numeric-column>

        <igc-image-column property-path="Photo" header-text="Photo" content-opacity="1"
        horizontal-alignment="center"  width="*>90"></igc-image-column>
        <igc-date-time-column property-path="Birthday" header-text="Date of Birth" width="*>140"></igc-date-time-column>

    </igc-data-grid>
</div>
`;

export class DataGridCellSelection extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DataGridCellSelection");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataGridCellSelection); return this;
    }

    private grid: IgcDataGridComponent;

    constructor() {
        super();
        this.onSelectedItemsChanged = this.onSelectedItemsChanged.bind(this);
        this.onSelectedCellsChanged = this.onSelectedCellsChanged.bind(this);
        this.onSelectedKeysChanged = this.onSelectedKeysChanged.bind(this);
        this.onSelectedCellRangesChanged = this.onSelectedCellRangesChanged.bind(this);
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.grid = document.getElementById("grid") as IgcDataGridComponent;
        this.grid.dataSource = DataGridSharedData.getEmployees();

        // this.grid.activationMode = GridActivationMode.Cell;
        this.grid.selectionMode = GridSelectionMode.SingleRow;
        this.grid.selectedItemsChanged = this.onSelectedItemsChanged;
        this.grid.selectedCellsChanged = this.onSelectedCellsChanged;
        this.grid.selectedKeysChanged = this.onSelectedKeysChanged;
        this.grid.selectedCellRangesChanged = this.onSelectedCellRangesChanged;

        let dropDown = document.getElementById("selectionDropBox");
        dropDown.addEventListener("change", this.dropDownValueChanged);
    }

    public onSelectedItemsChanged(s: IgcDataGridComponent, e: IgcGridSelectedItemsChangedEventArgs) {
        let item = this.grid.selectedItems.toArray()[0];
        console.log("onSelectedItemsChanged " + this.grid.selectedItems.count);
        console.log("onSelectedItemsChanged " + item);
    }
    public onSelectedKeysChanged(s: IgcDataGridComponent, e: IgcGridSelectedKeysChangedEventArgs) {
        console.log("onSelectedKeysChanged " + this.grid.selectedKeys.count);
    }
    public onSelectedCellsChanged(s: IgcDataGridComponent, e: IgcGridSelectedCellsChangedEventArgs) {
        console.log("onSelectedCellsChanged " + this.grid.selectedCells.count);
    }
    public onSelectedCellRangesChanged(s: IgcDataGridComponent, e: IgcGridSelectedCellRangesChangedEventArgs) {
        console.log("onSelectedCellRangesChanged " + this.grid.selectedCells.count);
    }

    dropDownValueChanged() {

        let dropDown = document.getElementById("selectionDropBox") as any;
        let grid = document.getElementById("grid") as IgcDataGridComponent;

        switch (dropDown.value) {
            case "None": {
                grid.selectionMode = GridSelectionMode.None;
                break;
            }
            case "SingleCell": {
                grid.selectionMode = GridSelectionMode.SingleCell;
                break;
            }
            case "SingleRow": {
                grid.selectionMode = GridSelectionMode.SingleRow;
                break;
            }
            case "MultipleCell": {
                grid.selectionMode = GridSelectionMode.MultipleCell;
                break;
            }
            case "MultipleRow": {
                grid.selectionMode = GridSelectionMode.MultipleRow;
                break;
            }
            case "RangeCell": {
                grid.selectionMode = GridSelectionMode.RangeCell;
                break;
            }
        }
    }
}
