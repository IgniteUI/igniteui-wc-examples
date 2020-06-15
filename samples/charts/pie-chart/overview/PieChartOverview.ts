import { SampleBase } from "../../sample-base";

import { IgcPieChartModule } from 'igniteui-webcomponents-charts';
import { IgcPieChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcPieChartModule);

let templateHTML = `
<div class="sample-container">
    <igc-pie-chart id="chart"
        width="100%" height="100%"
        label-member-path="Company"
        value-member-path="MarketShare"
        radius-factor="0.7">
    </igc-pie-chart>
</div>
`;

export class PieChartOverview extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("PieChartOverview");
    public static register(): any {
        window.customElements.define(this.htmlTagName, PieChartOverview); return this;
    }

    private chart: IgcPieChartComponent;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.chart = document.getElementById("chart") as IgcPieChartComponent;
        this.chart.dataSource = this.initData();
    }

    public initData(): any[] {
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