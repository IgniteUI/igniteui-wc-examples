import { SampleBase } from "../../sample-base";
import "./SharedStyles.css";

import { IgcPieChartModule } from 'igniteui-webcomponents-charts';
import { IgcPieChartComponent } from 'igniteui-webcomponents-charts';
import { IgcItemLegendModule } from 'igniteui-webcomponents-charts';
import { IgcItemLegendComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcPieChartModule,
    IgcItemLegendModule
);

let templateHTML = `
<div class="sample-columns">
    <div class="legend">
        <igc-item-legend id="legend"></igc-item-legend>
    </div>
    <igc-pie-chart id="chart"
        width="100%" height="100%"
        outlines="White"
        value-member-path="MarketShare"
        label-member-path="MarketShare"
        legend-label-member-path="Company"
        radius-factor="0.7">
    </igc-pie-chart>
</div>
`;

export class PieChartLegend extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("PieChartLegend");
    public static register(): any {
        window.customElements.define(this.htmlTagName, PieChartLegend); return this;
    }

    private chart: IgcPieChartComponent;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.chart = document.getElementById("chart") as IgcPieChartComponent;
        this.chart.dataSource = this.getData();
        this.chart.legend = document.getElementById("legend") as IgcItemLegendComponent;
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