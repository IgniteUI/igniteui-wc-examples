import { SampleBase } from "../../sample-base";
import { DataGridSharedData } from "./DataGridSharedData";

import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcDataGridModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';
import { IgcDataGridToolbarModule } from "igniteui-webcomponents-grids";
import { IgcDataGridToolbarComponent } from "igniteui-webcomponents-grids";
import { IgcGridColumnOptionsModule } from 'igniteui-webcomponents-grids';
import { IgcTemplateColumnComponent } from 'igniteui-webcomponents-grids';
import { IgcTemplateCellInfo } from 'igniteui-webcomponents-grids';
import { IgcTemplateCellUpdatingEventArgs } from 'igniteui-webcomponents-grids';
import { IgcImageColumnComponent } from 'igniteui-webcomponents-grids';

import { IgcColumnGroupDescription } from 'igniteui-webcomponents-grids';
import { IgcColumnSummaryDescription } from 'igniteui-webcomponents-grids'
import { SummaryOperand } from 'igniteui-webcomponents-core';

import { IgcSparklineModule } from 'igniteui-webcomponents-charts';
import { IgcSparklineComponent } from 'igniteui-webcomponents-charts';
import { SparklineDisplayType } from 'igniteui-webcomponents-charts';

ModuleManager.register(
    IgcDataGridModule,
    IgcDataGridToolbarModule,
    IgcGridColumnOptionsModule,
    IgcSparklineModule
);

let templateHTML = `
<div class="sample-container">
    <igc-data-grid-toolbar
    id="toolbar"
    toolbar-title="Sales Team"
    column-chooser="true"
    column-pinning="true">
    </igc-data-grid-toolbar>

    <igc-data-grid
        id="grid"
        height="calc(100% - 2.75rem)"
        width="100%"
        row-height="50"
        auto-generate-columns="false"
        is-column-options-enabled="true"
        default-cColumn-min-width="100"
        summary-scope="Root"
        is-group-collapsable="true"
        group-header-display-mode="Combined"
        group-summary-display-mode="RowTop"
        selection-mode="SingleRow"
        corner-radius-top-left="0"
        corner-radius-top-right="0">

        <igc-image-column property-path="Photo" header-text="Photo"
        content-opacity="1" horizontal-alignment="center" width="110"></igc-image-column>

        <igc-text-column property-path="Name" width="*>130"></igc-text-column>

        <igc-template-column id="salesColumn"
        property-path="Sales" header-text="Sales" horizontal-alignment="center"
        width="*>160" width="*>160"></igc-template-column>

        <igc-numeric-column property-path="Salary" positive-prefix="$"
        show-grouping-separator="true" width="*>160"></igc-numeric-column>

        <igc-template-column id="addressColumn"
        property-path="Address" header-text="Address" horizontal-alignment="left"
        width="*>160" ></igc-template-column>

        <igc-image-column property-path="CountryFlag" header-text="Country"
        content-opacity="1" horizontalAlignment="stretch" width="130"
        padding-top="7.5" padding-bottom="7.5" ></igc-image-column>

        <igc-date-time-column property-path="Birthday" header-text="Date of Birth"
        horizontal-alignment="right" width="*>160"></igc-date-time-column>

        <igc-text-column property-path="Income" width="*>120"horizontal-alignment="center"></igc-text-column>

        <igc-template-column id="productivityColumn"
        property-path="Productivity" header-text="Productivity"
        horizontal-alignment="stretch" width="*>150" ><igc-template-column>

        <igc-text-column property-path="Age" width="*>110"></igc-text-column>

    </igc-data-grid>
</div>
`;

export class DataGridOverview extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DataGridOverview");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DataGridOverview); return this;
    }

    private grid: IgcDataGridComponent;
    public toolbar: IgcDataGridToolbarComponent;

    constructor() {
        super();
        this.onUpdatingAddressColumn = this.onUpdatingAddressColumn.bind(this);
        this.onUpdatingSalesColumn = this.onUpdatingSalesColumn.bind(this);
        this.onUpdatingProductivityColumn = this.onUpdatingProductivityColumn.bind(this);
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        const salesColumn = document.getElementById("salesColumn") as IgcTemplateColumnComponent;
        if (salesColumn)
            salesColumn.cellUpdating = this.onUpdatingSalesColumn;

        const addressColumn = document.getElementById("addressColumn") as IgcTemplateColumnComponent;
        if (addressColumn)
            addressColumn.cellUpdating = this.onUpdatingAddressColumn;

        const productivityColumn = document.getElementById("productivityColumn") as IgcTemplateColumnComponent;
        if (productivityColumn)
            productivityColumn.cellUpdating = this.onUpdatingProductivityColumn;

        this.grid = document.getElementById("grid") as IgcDataGridComponent;
        this.grid.dataSource = DataGridSharedData.getEmployees(100);

        this.toolbar = document.getElementById("toolbar") as IgcDataGridToolbarComponent;
        this.toolbar.targetGrid = this.grid;

        const peopleGroup = new IgcColumnGroupDescription();
        peopleGroup.propertyPath = "Country";
        peopleGroup.displayName = "Country";
        this.grid.groupDescriptions.add(peopleGroup);

        const incomeGroup = new IgcColumnGroupDescription();
        incomeGroup.propertyPath = "Income";
        incomeGroup.displayName = "Income";
        this.grid.groupDescriptions.add(incomeGroup);

        const peopleCount = new IgcColumnSummaryDescription();
        peopleCount.propertyPath = "Photo";
        peopleCount.operand = SummaryOperand.Count;
        this.grid.summaryDescriptions.add(peopleCount);

        const sales = new IgcColumnSummaryDescription();
        sales.propertyPath = "Sales";
        sales.operand = SummaryOperand.Max;
        sales.formatOverride = new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
        this.grid.summaryDescriptions.add(sales);

        const salary = new IgcColumnSummaryDescription();
        salary.propertyPath = "Salary";
        salary.operand = SummaryOperand.Average;
        salary.formatOverride = new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
        this.grid.summaryDescriptions.add(salary);
    }

    public onUpdatingAddressColumn(s: IgcTemplateColumnComponent, e: IgcTemplateCellUpdatingEventArgs) {
        const content = e.content as HTMLDivElement;
        let span1: HTMLSpanElement | null = null;
        let span2: HTMLSpanElement | null = null;
        const info = e.cellInfo as IgcTemplateCellInfo;
        const item = info.rowItem;

        if (content.childElementCount === 0) {

            span1 = document.createElement("span");
            span2 = document.createElement("span");

            content.style.fontFamily = "Verdana";
            content.style.fontSize = "13px";
            content.style.verticalAlign = "center";
            content.style.lineHeight = "normal";
            content.style.display = "flex";
            content.style.flexDirection = "column";
            content.style.justifyContent = "center";
            // content.style.alignItems = "center";
            content.style.height = "100%";
            content.style.width = "100%";

            content.appendChild(span1);
            content.appendChild(span2);
        }
        else {
            span1 = content.children[0] as HTMLSpanElement;
            span2 = content.children[1] as HTMLSpanElement;
        }

        if (span1 && span2) {
            span1.textContent = item.Street;
            span2.textContent = item.City + ", " + item.Country;
        }
    }

    public onUpdatingSalesColumn(s: IgcTemplateColumnComponent, e: IgcTemplateCellUpdatingEventArgs) {
        const content = e.content as HTMLDivElement;
        const info = e.cellInfo as IgcTemplateCellInfo;
        const sales = info.rowItem.Sales;
        let gaugeValue: HTMLSpanElement | null = null;
        let gaugeBar: HTMLDivElement | null = null;

        if (content.childElementCount === 0) {
            gaugeValue = document.createElement("span");
            gaugeValue.style.margin = "0px";
            gaugeValue.style.marginTop = "2px";
            gaugeValue.style.padding = "0px";
            gaugeValue.style.fontFamily = "Verdana";
            gaugeValue.style.fontSize = "13px";
            gaugeValue.style.textAlign = "center";

            gaugeBar = document.createElement("div");
            gaugeBar.style.background = "#7f7f7f";
            gaugeBar.style.padding = "0px";
            gaugeBar.style.margin = "0px";
            gaugeBar.style.height = "6px";
            gaugeBar.style.left = "0px";
            gaugeBar.style.top = "0px";
            gaugeBar.style.position = "relative";

            const gauge = document.createElement("div");
            gauge.style.background = "#dddddd";
            gauge.style.padding = "0px";
            gauge.style.margin = "0px";
            gauge.style.height = "6px";
            gauge.style.marginTop = "8px";
            gauge.style.width = "100%";
            gauge.appendChild(gaugeBar);

            content.style.verticalAlign = "center";
            content.style.lineHeight = "normal";
            content.style.display = "flex";
            content.style.flexDirection = "column";
            content.style.justifyContent = "center";
            content.style.height = "100%";
            content.style.width = "calc(100% - 2rem)";
            content.style.marginRight = "1rem";
            content.style.marginLeft = "1rem";

            content.appendChild(gauge);
            content.appendChild(gaugeValue);
        } else {
            const gauge = content.children[0];
            gaugeBar = gauge.children[0] as HTMLDivElement;
            gaugeValue = content.children[1] as HTMLSpanElement;
        }

        // conditional formatting:
        if (sales < 400000) {
            gaugeValue.style.color = "rgb(211, 17, 3)";
            gaugeBar.style.background = "rgb(211, 17, 3)";
        }
        else if (sales < 650000) {
            gaugeValue.style.color = "Orange";
            gaugeBar.style.background = "Orange";
        }
        else {
            gaugeValue.style.color = "rgb(21, 190, 6)";
            gaugeBar.style.background = "rgb(21, 190, 6)";
        }
        let gaugeWidth = (sales / 990000) * 100;
        gaugeWidth = Math.min(100, gaugeWidth);
        gaugeBar.style.width = gaugeWidth + "%";

        gaugeValue.textContent = "$" + sales / 1000 + ",000";
    }

    public onUpdatingProductivityColumn(s: IgcTemplateColumnComponent, e: IgcTemplateCellUpdatingEventArgs) {
        const content = e.content as HTMLDivElement;
        let chart: IgcSparklineComponent | null = null;
        let info = e.cellInfo as IgcTemplateCellInfo;

        if (content.childElementCount === 0) {
            chart = new IgcSparklineComponent();
            chart.valueMemberPath = "Value";
            chart.labelMemberPath = "Week";
            chart.displayType = SparklineDisplayType.Column;
            chart.lineThickness = 2;
            chart.brush = "rgb(21, 190, 6)";
            chart.negativeBrush = "rgb(211, 17, 3)";
            chart.width = "100%";
            chart.height = "100%";

            content.style.width = "100%";
            content.style.height = "calc(100% - 10px)";
            content.style.margin = "0px";
            content.style.marginTop = "5px";
            content.appendChild(chart);
        }
        else {
            chart = content.children[0] as IgcSparklineComponent;
        }

        if (chart) {
            chart.dataSource = info.rowItem.Productivity;
        }
    }
}
