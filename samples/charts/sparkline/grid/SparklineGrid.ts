import { SampleBase } from "../../sample-base";
import { Products } from '../../../utilities/Products';
import "./SharedStyles.css";

import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcDataGridModule } from 'igniteui-webcomponents-grids';
import { IgcDataGridComponent } from 'igniteui-webcomponents-grids';
import { IgcTemplateColumnComponent } from 'igniteui-webcomponents-grids';
import { IgcTemplateCellInfo } from 'igniteui-webcomponents-grids';
import { IgcTemplateCellUpdatingEventArgs } from 'igniteui-webcomponents-grids';

import { IgcSparklineModule } from 'igniteui-webcomponents-charts';
import { IgcSparklineComponent } from 'igniteui-webcomponents-charts';
import { SparklineDisplayType } from 'igniteui-webcomponents-charts';

ModuleManager.register(
    IgcSparklineModule,
    IgcDataGridModule
);

let templateHTML = `
<div class="sample-container">
    <igc-data-grid id="grid"
        height="100%"
        width="100%"
        row-height="70"
        auto-generate-columns="false">

        <igc-text-column property-path="ProductID" header-text="ID" width="60" horizontal-alignment="center"></igc-text-column>
        <igc-text-column property-path="ProductName" header-text="Product" width="*>130"></igc-text-column>
        <igc-numeric-column property-path="ProductPrice" header-text="Price" width="100" positive-prefix="$" show-grouping-separator="true" min-fraction-digits="2"></igc-numeric-column>

        <igc-template-column id="historyColumn"
        property-path="OrderHistory" header-text="Order History" horizontal-alignment="center" width="*>150"></igc-template-column>

        <igc-numeric-column property-path="OrderCount" header-text="Orders" width="*>90" horizontal-alignment="center"></igc-numeric-column>
        <igc-image-column property-path="CountryFlag" header-text="Country" width="*>90" horizontal-alignment="center"></igc-image-column>
        <igc-text-column property-path="Status" header-text="Status" width="110" horizontal-alignment="center"></igc-text-column>

        <igc-template-column id="returnsColumn"
        property-path="ReturnRate" header-text="Return Rate" horizontal-alignment="center" width="*>150" ><igc-template-column>

    </igc-data-grid>
</div>
`;

export class SparklineGrid extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("SparklineGrid");
    public static register(): any {
        window.customElements.define(this.htmlTagName, SparklineGrid); return this;
    }

    private grid: IgcDataGridComponent;

    public data: any[];

    constructor() {
        super();
        this.data = Products.getData();

        this.onUpdatingHistoryColumn = this.onUpdatingHistoryColumn.bind(this);
        this.onUpdatingReturnsColumn = this.onUpdatingReturnsColumn.bind(this);
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.grid = document.getElementById("grid") as IgcDataGridComponent;
        this.grid.dataSource = this.data;

        const historyColumn = document.getElementById("historyColumn") as IgcTemplateColumnComponent;
        historyColumn.cellUpdating = this.onUpdatingHistoryColumn;

        const returnsColumn = document.getElementById("returnsColumn") as IgcTemplateColumnComponent;
        returnsColumn.cellUpdating = this.onUpdatingReturnsColumn;
    }

    public onUpdatingHistoryColumn(s: IgcTemplateColumnComponent, e: IgcTemplateCellUpdatingEventArgs) {
        const content = e.content as HTMLDivElement;
        let chart: IgcSparklineComponent | null = null;
        let info = e.cellInfo as IgcTemplateCellInfo;

        if (content.childElementCount === 0) {
            chart = new IgcSparklineComponent();
            chart.valueMemberPath = "Sold";
            chart.labelMemberPath = "Week";
            chart.displayType = SparklineDisplayType.Line;
            chart.lineThickness = 2;
            chart.brush = "rgb(21, 190, 6)";
            chart.negativeBrush = "rgb(211, 17, 3)";
            chart.width = "100%";
            chart.height = "100%";

            content.style.width = "calc(100% - 10px)";
            content.style.height = "calc(100% - 10px)";
            content.style.padding = "5px";
            content.style.margin = "0px";
            content.style.display = "inline-grid";
            content.appendChild(chart);
        }
        else {
            chart = content.children[0] as IgcSparklineComponent;
        }

        if (chart) {
            chart.dataSource = info.rowItem.OrderHistory;
        }
    }

    public onUpdatingReturnsColumn(s: IgcTemplateColumnComponent, e: IgcTemplateCellUpdatingEventArgs) {
        const content = e.content as HTMLDivElement;
        let chart: IgcSparklineComponent | null = null;
        let info = e.cellInfo as IgcTemplateCellInfo;

        if (content.childElementCount === 0) {
            chart = new IgcSparklineComponent();
            chart.valueMemberPath = "Balance";
            chart.labelMemberPath = "Week";
            chart.displayType = SparklineDisplayType.Column;
            chart.lineThickness = 2;
            chart.brush = "rgb(21, 190, 6)";
            chart.negativeBrush = "rgb(211, 17, 3)";
            chart.width = "100%";
            chart.height = "100%";

            content.style.width = "calc(100% - 10px)";
            content.style.height = "calc(100% - 10px)";
            content.style.padding = "5px";
            content.style.margin = "0px";
            content.style.display = "inline-grid";
            content.appendChild(chart);
        }
        else {
            chart = content.children[0] as IgcSparklineComponent;
        }

        if (chart) {
            chart.dataSource = info.rowItem.ReturnRate;
        }
    }

}

