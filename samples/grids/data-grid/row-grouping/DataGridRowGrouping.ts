import { SampleBase } from "../../sample-base";
import { DataGridSharedData } from "./DataGridSharedData";

import { IgcDataGridModule } from 'igniteui-webcomponents-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';
import { IgcColumnGroupDescription } from 'igniteui-webcomponents-grids';
import { DataSourceSectionHeaderDisplayMode } from 'igniteui-webcomponents-core';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcDataGridModule);
ModuleManager.register(IgcGridColumnOptionsModule);

let templateHTML = `
<div class="sample-container">
    <div class="options">
        <span class="optionItem" style="width:175px" >Section Header Display Mode:</span>
        <select class="optionItem" style="width:100px" defaultValue="Split" id="displayModeSelector">
            <option>Split</option>
            <option>Combined</option>
        </select>

        <label class="optionLabel"> Group Header Collapsible: </label>
        <input type="checkbox" id="groupCollapsibleCheckbox"></input>
    </div>

    <igc-data-grid
        id="grid"
        height="calc(100% - 45px)"
        width="100%"
        is-column-options-enabled="true"
        auto-generate-columns="false">
            <igc-text-column property-path="Name" header-text="Name" width="*>230" ></igc-text-column>
            <igc-numeric-column property-path="Age" header-text="Age" width="*>95"></igc-numeric-column>
            <igc-date-time-column property-path="Birthday" header-text="Date of Birth"
            horizontal-alignment="right" width="*>140"></igc-date-time-column>
            <igc-text-column property-path="Street" header-text="Address" width="*>155"></igc-text-column>
            <igc-numeric-column property-path="Salary" header-text="Salary" width="*>105"
            positive-prefix="$" show-grouping-separator="true"></igc-numeric-column>
            <igc-text-column property-path="City" header-text="City" width="*>120" horizontal-alignment="center"></igc-text-column>

            <igc-image-column property-path="CountryFlag" header-text="Country" width="*>120" content-opacity="1" horizontal-alignment="center"
                              padding-top="5" padding-bottom="5"></igc-image-column>
    </igc-data-grid>
</div>
`;

export class DataGridRowGrouping extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DataGridRowGrouping");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataGridRowGrouping); return this;
    }

    private grid: IgcDataGridComponent;

    constructor() {
        super();
        this.onSectionHeaderDisplayModeChanging = this.onSectionHeaderDisplayModeChanging.bind(this);
        this.onGroupHeaderCollapsible = this.onGroupHeaderCollapsible.bind(this);
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.grid = document.getElementById("grid") as IgcDataGridComponent;
        this.grid.dataSource = DataGridSharedData.getEmployees(50);

        this.grid.groupHeaderDisplayMode = DataSourceSectionHeaderDisplayMode.Split;
        this.grid.isGroupCollapsable = true;

        let displayModeSelector = document.getElementById("displayModeSelector") as any ;
        displayModeSelector.addEventListener('change', this.onSectionHeaderDisplayModeChanging);

        let groupCollapsibleCheckbox = document.getElementById("groupCollapsibleCheckbox") as any ;
        groupCollapsibleCheckbox.addEventListener('change', this.onGroupHeaderCollapsible);
        groupCollapsibleCheckbox.checked = true;

        const state = new IgcColumnGroupDescription();
        state.propertyPath = "Country";
        state.displayName = "Location";
        const city = new IgcColumnGroupDescription();
        city.propertyPath = "City";
        city.displayName = "";
        const income = new IgcColumnGroupDescription();
        income.propertyPath = "Income";
        income.displayName = "Income";

        this.grid.groupDescriptions.add(state);
        this.grid.groupDescriptions.add(city);
        this.grid.groupDescriptions.add(income);
    }

    public onSectionHeaderDisplayModeChanging = (e: any) => {
        this.grid.groupHeaderDisplayMode = e.target.value;
    }

    public onGroupHeaderCollapsible = (e: any) => {
        const isCollapsible = e.target.checked;

        if (isCollapsible) {
            this.grid.isGroupCollapsable = true;
        }
        else {
            this.grid.isGroupCollapsable = false ;
        }
    }
}
