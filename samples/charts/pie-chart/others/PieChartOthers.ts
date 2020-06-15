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
        others-category-threshold="20"
        others-category-type="Number"
        others-category-text="Others"
        radius-factor="0.7">
    </igc-pie-chart>
</div>
`;

export class PieChartOthers extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("PieChartOthers");
    public static register(): any {
        window.customElements.define(this.htmlTagName, PieChartOthers); return this;
    }

    private chart: IgcPieChartComponent;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.chart = document.getElementById("chart") as IgcPieChartComponent;
        this.chart.dataSource = this.getData();
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