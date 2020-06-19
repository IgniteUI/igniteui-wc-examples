import { SampleBase } from "../../sample-base";

import { IgcPieChartModule } from 'igniteui-webcomponents-charts';
import { IgcPieChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcSliceClickEventArgs } from 'igniteui-webcomponents-charts';

ModuleManager.register(IgcPieChartModule);

let templateHTML = `
<div class="sample-container">
    <label id="label"></label>

    <igc-pie-chart id="chart"
        width="100%"
        height="calc(100% - 25px)"
        label-member-path="Company"
        value-member-path="MarketShare"
        selection-mode="Multiple"
        radius-factor="0.7">
    </igc-pie-chart>
</div>
`;

export class PieChartSelection extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("PieChartSelection");
    public static register(): any {
        window.customElements.define(this.htmlTagName, PieChartSelection); return this;
    }

    private chart: IgcPieChartComponent;
    private label: HTMLElement;

    constructor() {
        super();
        this.onSliceClick= this.onSliceClick.bind(this);
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.chart = document.getElementById("chart") as IgcPieChartComponent;
        this.chart.dataSource = this.getData();
        this.chart.sliceClick = this.onSliceClick;
        this.chart.selectedSliceOpacity = 0.85;
        this.chart.selectedSliceStrokeThickness = 4;
        this.chart.selectedSliceStroke = "rgba(0, 0, 0, 0.5)";

        this.label = document.getElementById("label");
        this.label.innerText = "Selected Slices: None";
    }

    onSliceClick(s: IgcPieChartComponent, e: IgcSliceClickEventArgs) {
        let selectedSlice: string = "";
        const selectedItems = this.chart.selectedItems.toArray();

        for (const item of selectedItems) {
            selectedSlice += item.Company + ", ";
        }

        this.label.innerText = "Selected Slices: " + selectedSlice;
    }

    public getData(): any[] {
        let data = [
            { MarketShare: 30, Company: "Google", },
            { MarketShare: 30, Company: "Apple", },
            { MarketShare: 15, Company: "Microsoft", },
            { MarketShare: 15, Company: "Samsung", },
            { MarketShare: 10, Company: "Other", },
        ];

        return data;
    }
}