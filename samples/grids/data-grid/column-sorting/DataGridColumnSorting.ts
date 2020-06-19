import { SampleBase } from "../../sample-base";

import { IgcDataGridModule } from 'igniteui-webcomponents-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';
import { ModuleManager } from 'igniteui-webcomponents-core';

import { DataGridSharedData } from "./DataGridSharedData";
import { HeaderClickAction } from 'igniteui-webcomponents-grids';

ModuleManager.register(IgcDataGridModule);
ModuleManager.register(IgcGridColumnOptionsModule);

let templateHTML = `
<div class="sample-container">
    <div class="options">
        <span class="optionItem">Header Click Action: </span>
        <select id="headerClickActionDropDown" class="optionItem">
            <option>SortByMultipleColumns</option>
            <option>SortByMultipleColumnsTriState</option>
            <option>SortByOneColumnOnly</option>
            <option>SortByOneColumnOnlyTriState</option>
        </select>
    </div>
    <igc-data-grid
        id="grid"
        height="calc(100% - 35px)"
        width="100%"
        auto-generate-columns="false"
        is-column-options-enabled="true"
        default-column-min-width="100" >
            <igc-text-column property-path="ID" width="*>80" horizontal-alignment="center"></igc-text-column>
            <igc-text-column property-path="Property" header-text="Property Type" width="*>150"></igc-text-column>
            <igc-image-column property-path="CountryFlag" header-text="Country" width="*>100" content-opacity="1" horizontal-alignment="center"
                              padding-top="5" padding-bottom="5"></igc-image-column>
            <igc-text-column property-path="City" width="*>130"></igc-text-column>
            <igc-numeric-column property-path="Price" width="*>110" positive-prefix="$" show-grouping-separator="true"></igc-numeric-column>
            <igc-numeric-column property-path="Rooms" width="*>80" ></igc-numeric-column>
    </igc-data-grid>
</div>
`;

export class DataGridColumnSorting extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DataGridColumnSorting");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataGridColumnSorting); return this;
    }

    private grid: IgcDataGridComponent;

    constructor() {
        super();
        this.onHeaderClickActionValueChanged = this.onHeaderClickActionValueChanged.bind(this);
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.grid = document.getElementById("grid") as IgcDataGridComponent;
        this.grid.dataSource = DataGridSharedData.getHouses();
        this.grid.headerClickAction = HeaderClickAction.SortByMultipleColumns;

        document.getElementById("headerClickActionDropDown").addEventListener("change", this.onHeaderClickActionValueChanged);
    }

    onHeaderClickActionValueChanged(e: any) {
        let value = e.target.value;

        switch (value) {
            case "SortByMultipleColumns": {
                this.grid.headerClickAction = HeaderClickAction.SortByMultipleColumns;
                break;
            }
            case "SortByMultipleColumnsTriState": {
                this.grid.headerClickAction = HeaderClickAction.SortByMultipleColumnsTriState;
                break;
            }
            case "SortByOneColumnOnly": {
                this.grid.headerClickAction = HeaderClickAction.SortByOneColumnOnly;
                break;
            }
            case "SortByOneColumnOnlyTriState": {
                this.grid.headerClickAction = HeaderClickAction.SortByOneColumnOnlyTriState;
                break;
            }
        }
    }
}
