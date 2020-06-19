import { SampleBase } from "../../sample-base";

import { IgcDataGridModule } from 'igniteui-webcomponents-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';
import { ModuleManager } from 'igniteui-webcomponents-core';

import { DataGridSharedData } from "./DataGridSharedData";
import { ColumnMovingAnimationMode } from 'igniteui-webcomponents-grids';
import { ColumnMovingMode } from 'igniteui-webcomponents-grids';

ModuleManager.register(IgcDataGridModule);
ModuleManager.register(IgcGridColumnOptionsModule);

let templateHTML = `
<div class="sample-container">
    <div class="options">
        <span class="optionItem" style="width: 160px">Moving Mode:</span>
        <select id="columnMovingModeDropDown" class="optionItem" style="width: 135px" >
            <option>Deferred</option>
            <option>None</option>
        </select>
        <span class="optionItem">Separator Width: </span>
        <input id="separatorWidthRange" type="range" min=1 max=5 step="1" />
    </div>
    <div class="options">
        <span class="optionItem" style="width: 160px">Animation Mode:</span>
        <select id="columnMovingAnimationModeDropDown" class="optionItem" style="width: 135px" >
            <option>Auto</option>
            <option>SlideOver</option>
            <option>None</option>
        </select>
    </div>

    <igc-data-grid
        id="grid"
        height="calc(100% - 75px)"
        width="100%"
        column-moving-mode="Deferred"
        column-moving-animation-mode="Auto"
        column-moving-separator-width="1"
        default-column-min-width="100"
        is-column-options-enabled="true"
        auto-generate-columns="false" >

        <igc-text-column property-path="Name" width="150"></igc-text-column>
        <igc-text-column property-path="Street" header-text="Address"></igc-text-column>
        <igc-text-column property-path="City"></igc-text-column>
        <igc-numeric-column property-path="Salary" positive-prefix="$" show-grouping-separator="true"></igc-numeric-column>
        <igc-date-time-column property-path="Birthday" ></igc-date-time-column>

    </igc-data-grid>
</div>
`;

export class DataGridColumnMoving extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DataGridColumnMoving");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataGridColumnMoving); return this;
    }

    private grid: IgcDataGridComponent;

    constructor() {
        super();
        this.onColumnMovingAnimationModeValueChanged = this.onColumnMovingAnimationModeValueChanged.bind(this);
        this.onColumnMovingModeValueChanged = this.onColumnMovingModeValueChanged.bind(this);
        this.onSeparatorWidthRangeValueChanged = this.onSeparatorWidthRangeValueChanged.bind(this);
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.grid = document.getElementById("grid") as IgcDataGridComponent;
        this.grid.dataSource = DataGridSharedData.getEmployees();

        document.getElementById("columnMovingAnimationModeDropDown").addEventListener("change", this.onColumnMovingAnimationModeValueChanged);
        document.getElementById("separatorWidthRange").addEventListener("change", this.onSeparatorWidthRangeValueChanged);
        document.getElementById("columnMovingModeDropDown").addEventListener("change", this.onColumnMovingModeValueChanged);
    }

    onColumnMovingAnimationModeValueChanged(e: any) {
        let value = e.target.value;

        switch (value) {
            case "Auto": {
                this.grid.columnMovingAnimationMode = ColumnMovingAnimationMode.Auto;
                break;
            }
            case "SlideOver": {
                this.grid.columnMovingAnimationMode = ColumnMovingAnimationMode.SlideOver;
                break;
            }
            case "None": {
                this.grid.columnMovingAnimationMode = ColumnMovingAnimationMode.None;
                break;
            }
        }
    }

    onSeparatorWidthRangeValueChanged(e: any) {
        this.grid.columnMovingSeparatorWidth = e.target.value;
    }

    onColumnMovingModeValueChanged(e: any) {
        let value = e.target.value;

        switch (value) {
            case "Deferred": {
                this.grid.columnMovingMode = ColumnMovingMode.Deferred;
                break;
            }
            case "None": {
                this.grid.columnMovingMode = ColumnMovingMode.None;
                break;
            }
        }
    }
}
