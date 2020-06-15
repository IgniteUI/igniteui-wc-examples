import { SampleBase } from "../../sample-base";

import { IgcDataGridModule } from 'igniteui-webcomponents-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';
import { ModuleManager } from 'igniteui-webcomponents-core';

import { DataGridSharedData } from "./DataGridSharedData";
import { ColumnResizingMode } from 'igniteui-webcomponents-grids';
import { ColumnResizingAnimationMode } from 'igniteui-webcomponents-grids';

ModuleManager.register(IgcDataGridModule);
ModuleManager.register(IgcGridColumnOptionsModule);

let templateHTML = `
<div class="sample-container">
    <div class="options">
        <span class="optionItem" style="width: 160px">Resizing Mode:</span>
        <select id="columnResizingModeDropDown" class="optionItem" style="width: 135px" >
            <option>Deferred</option>
            <option>Immediate</option>
            <option>None</option>
        </select>
        <span class="optionItem">Separator Width: </span>
        <input id="separatorWidthRange" type="range" min=1 max=5 step="1" />
    </div>
    <div class="options">
        <span class="optionItem" style="width: 160px">Resizing Animation:</span>
        <select id="columnResizingAnimationModeDropDown" class="optionItem" style="width: 135px" >
            <option>Auto</option>
            <option>Interpolate</option>
            <option>None</option>
        </select>
    </div>

    <igc-data-grid
        id="grid"
        height="calc(100% - 75px)"
        width="100%"
        column-resizing-mode="Deferred"
        column-resizing-animation-mode="Auto"
        column-resizing-separator-width="1"
        default-column-min-width="100"
        is-column-options-enabled="true"
        auto-generate-columns="false" >

        <igc-text-column property-path="Name" width="*>150"></igc-text-column>
        <igc-text-column property-path="Street" header-text="Address" width="*>165" ></igc-text-column>
        <igc-text-column property-path="City" width="*>140" ></igc-text-column>
        <igc-numeric-column property-path="Salary" positive-prefix="$" show-grouping-separator="true" width="*>140" ></igc-numeric-column>
        <igc-date-time-column property-path="Birthday" ></igc-date-time-column>

    </igc-data-grid>
</div>
`;

export class DataGridColumnResizing extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DataGridColumnResizing");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataGridColumnResizing); return this;
    }

    private grid: IgcDataGridComponent;

    constructor() {
        super();
        this.onColumnResizingAnimationModeValueChanged = this.onColumnResizingAnimationModeValueChanged.bind(this);
        this.onColumnResizingModeValueChanged = this.onColumnResizingModeValueChanged.bind(this);
        this.onSeparatorWidthRangeValueChanged = this.onSeparatorWidthRangeValueChanged.bind(this);
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.grid = document.getElementById("grid") as IgcDataGridComponent;
        this.grid.dataSource = DataGridSharedData.getEmployees();

        document.getElementById("columnResizingAnimationModeDropDown").addEventListener("change", this.onColumnResizingAnimationModeValueChanged);
        document.getElementById("separatorWidthRange").addEventListener("change", this.onSeparatorWidthRangeValueChanged);
        document.getElementById("columnResizingModeDropDown").addEventListener("change", this.onColumnResizingModeValueChanged);
    }

    onColumnResizingAnimationModeValueChanged(e: any) {
        let value = e.target.value;

        switch (value) {
            case "Auto": {
                this.grid.columnResizingAnimationMode = ColumnResizingAnimationMode.Auto;
                break;
            }
            case "Interpolate": {
                this.grid.columnResizingAnimationMode = ColumnResizingAnimationMode.Interpolate;
                break;
            }
            case "None": {
                this.grid.columnResizingAnimationMode = ColumnResizingAnimationMode.None;
                break;
            }
        }
    }

    onSeparatorWidthRangeValueChanged(e: any) {
        this.grid.columnResizingSeparatorWidth = e.target.value;
    }

    onColumnResizingModeValueChanged(e: any) {
        let value = e.target.value;

        switch (value) {
            case "Deferred": {
                this.grid.columnResizingMode = ColumnResizingMode.Deferred;
                break;
            }
            case "Immediate": {
                this.grid.columnResizingMode = ColumnResizingMode.Immediate;
                break;
            }
            case "None": {
                this.grid.columnResizingMode = ColumnResizingMode.None;
                break;
            }
        }
    }
}
