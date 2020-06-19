import { SampleBase } from "../../sample-base";

import { IgcPieChartModule } from 'igniteui-webcomponents-charts';
import { IgcPieChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcSliceClickEventArgs } from 'igniteui-webcomponents-charts';

ModuleManager.register(IgcPieChartModule);

let templateHTML = `
<div class="sample-container">
    <igc-pie-chart id="chart"
        width="100%" height="100%"
        label-member-path="Company"
        value-member-path="MarketShare"
        exploded-radius="0.2"
        exploded-slices="1, 2"
        allow-slice-explosion="true"
        radius-factor="0.7">
    </igc-pie-chart>
</div>
`;

export class PieChartExplosion extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("PieChartExplosion");
    public static register(): any {
        window.customElements.define(this.htmlTagName, PieChartExplosion); return this;
    }

    private chart: IgcPieChartComponent;

    constructor() {
        super();
        this.onSliceClick= this.onSliceClick.bind(this);
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.chart = document.getElementById("chart") as IgcPieChartComponent;
        this.chart.dataSource = this.getData();
        this.chart.sliceClick = this.onSliceClick;
    }

    onSliceClick(s: IgcPieChartComponent, e: IgcSliceClickEventArgs) {
        e.isExploded = !e.isExploded;
        e.isSelected = false;
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