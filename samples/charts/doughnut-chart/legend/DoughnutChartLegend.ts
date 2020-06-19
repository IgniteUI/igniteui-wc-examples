import { SampleBase } from "../../sample-base";
import "./SharedStyles.css";

import { IgcDoughnutChartModule } from 'igniteui-webcomponents-charts';
import { IgcDoughnutChartComponent } from 'igniteui-webcomponents-charts';
import { IgcRingSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcItemLegendComponent } from 'igniteui-webcomponents-charts';
import { IgcItemLegendModule } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDoughnutChartModule,
    IgcItemLegendModule
);

let templateHTML = `
<div class="sample-columns">
    <div class="legend">
        <igc-item-legend id="legend"></igc-item-legend>
    </div>
    <igc-doughnut-chart
        id="chart"
        width="100%"
        height="100%" >

        <igc-ring-series
            name="ringSeries" id="ringSeries"
            label-member-path="Company"
            value-member-path="MarketShare"
            radius-factor="0.9">
        </igc-ring-series>

    </igc-doughnut-chart>
</div>
`;

export class DoughnutChartLegend extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DoughnutChartLegend");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DoughnutChartLegend); return this;
    }

    private chart: IgcDoughnutChartComponent;
    private series: IgcRingSeriesComponent;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.series = document.getElementById("ringSeries") as IgcRingSeriesComponent;
        this.series.dataSource = this.getData();
        this.series.legend = document.getElementById("legend") as IgcItemLegendComponent;
    }

    public getData(): any[] {
        return[
                { MarketShare: 30, Company: "Google",    },
                { MarketShare: 15, Company: "Microsoft", },
                { MarketShare: 30, Company: "Apple",     },
                { MarketShare: 15, Company: "Samsung",   },
                { MarketShare: 10, Company: "Other",     },
        ];
    }
}