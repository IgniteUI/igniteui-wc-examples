import { SampleBase } from "../../sample-base";

import { IgcDataGridModule } from 'igniteui-webcomponents-grids';
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';
import { ModuleManager } from 'igniteui-webcomponents-core';

import { FilterExpression } from 'igniteui-webcomponents-core';
import { FilterFactory } from 'igniteui-webcomponents-core';

import { DataGridSharedData } from "./DataGridSharedData";

ModuleManager.register(IgcDataGridModule);
ModuleManager.register(IgcGridColumnOptionsModule);

let templateHTML = `
<div class="sample-container">
    <div class="options">
        <span class="optionItem">  Column: </span>
        <select id="filterColumnDropDown" class="optionItem">
            <option>Name</option>
            <option>Street</option>
            <option>City</option>
            <option>Country</option>
        </select>
        <select id="filterModeDropDown" class="optionItem">
            <option>Contains</option>
            <option>StartsWith</option>
            <option>EndsWith</option>
        </select>
        <label class="optionItem"> Expression: </label>
        <input id="filterTextBox" class="optionText" type="text" name="title" />
    </div>

    <igc-data-grid
        id="grid"
        height="calc(100% - 30px)"
        width="100%"
        default-column-min-width="100"
        is-column-options-enabled="true"
        auto-generate-columns="false">

        <igc-text-column property-path="Name" width="*>150"></igc-text-column>
        <igc-text-column property-path="Street" width="*>160"></igc-text-column>
        <igc-text-column property-path="City" width="*>125"></igc-text-column>
        <igc-image-column property-path="CountryFlag" header-text="Country" content-opacity="1"
            horizontal-alignment="center" width="*>110" padding-top="5" padding-bottom="5"></igc-image-column>
        <igc-numeric-column property-path="Sales" positive-prefix="$" show-grouping-separator="true"></igc-numeric-column>
        <igc-date-time-column property-path="Birthday" header-text="Birthday" width="*>115"></igc-date-time-column>

    </igc-data-grid>
</div>
`;

export class DataGridColumnFiltering extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DataGridColumnFiltering");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataGridColumnFiltering); return this;
    }

    private grid: IgcDataGridComponent;
    private filterText: string = "";
    private filterMode: string = "Contains";
    private filterColumn: string = "Name";
    private filterFactory: FilterFactory;


    constructor() {
        super();
        this.onFilterColumnDropDownValueChanged = this.onFilterColumnDropDownValueChanged.bind(this);
        this.onFilterModeDropDownValueChanged = this.onFilterModeDropDownValueChanged.bind(this);
        this.onFilterTextBoxTextChanged = this.onFilterTextBoxTextChanged.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.grid = document.getElementById("grid") as IgcDataGridComponent;

        document.getElementById("filterColumnDropDown").addEventListener("change", this.onFilterColumnDropDownValueChanged);
        document.getElementById("filterModeDropDown").addEventListener("change", this.onFilterModeDropDownValueChanged);
        document.getElementById("filterTextBox").addEventListener("change", this.onFilterTextBoxTextChanged);

        this.grid.dataSource = DataGridSharedData.getEmployees(4000);
    }

    public onFilterColumnDropDownValueChanged() {
        let dropDown = document.getElementById("filterColumnDropDown") as any;
        this.filterColumn = dropDown.value;
        this.applyFilter();
    }

    public onFilterModeDropDownValueChanged() {
        let dropDown = document.getElementById("filterModeDropDown") as any;
        this.filterMode = dropDown.value;
        this.applyFilter();
    }

    public onFilterTextBoxTextChanged() {
        let textBox = document.getElementById("filterTextBox") as any;
        this.filterText = textBox.value;
        this.applyFilter();
    }

    public applyFilter() {
        this.grid.filterExpressions.clear();
        if (this.filterText === "" || this.filterText === null) {
            return;
        }

        this.filterFactory = new FilterFactory();
        const expression = this.filterText.toUpperCase();
        const column = this.filterFactory.property(this.filterColumn).toUpper();

        let filter: FilterExpression;
        if (this.filterMode === "Contains") {
            filter = column.contains(expression)
        }
        else if (this.filterMode === "StartsWith") {
            filter = column.startsWith(expression);
        }
        else { // if (this.filterMode === "EndsWith") {
            filter = column.endsWith(expression);
        }

        this.grid.filterExpressions.add(filter);
    }
}
