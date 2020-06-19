import { SampleBase } from "../../sample-base";

import { IgcDoughnutChartModule } from 'igniteui-webcomponents-charts';
import { IgcDoughnutChartComponent } from 'igniteui-webcomponents-charts';
import { IgcRingSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcRingSeriesModule } from 'igniteui-webcomponents-charts';
import { IgcSliceClickEventArgs } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcDoughnutChartModule,
    IgcRingSeriesModule
);

let templateHTML = `
<div class="sample-container">
    <igc-doughnut-chart id="chart"
        width=“100%”
        height="100%"
        allow-slice-explosion="true"
        allow-slice-selection="false">

        <igc-ring-series
            name="ringSeries" id="ringSeries"
            label-member-path="Company"
            value-member-path="MarketShare"
            radius-factor="0.9">
        </igc-ring-series>

    </igc-doughnut-chart>
</div>
`;

export class DoughnutChartOverview extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DoughnutChartOverview");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DoughnutChartOverview); return this;
    }

    private chart: IgcDoughnutChartComponent;

    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = templateHTML;

        let ringSeries = document.getElementById("ringSeries") as IgcRingSeriesComponent;
        ringSeries.explodedSlices.add(3);
        ringSeries.explodedSlices.add(4);
        ringSeries.dataSource = this.getData();

        this.chart = document.getElementById("chart") as IgcDoughnutChartComponent;
        this.chart.sliceClick = this.onSliceClick;
        // this.chart.series.add(ringSeries);
    }
    public onSliceClick = (s: IgcDoughnutChartComponent, e: IgcSliceClickEventArgs) => {

        e.isExploded = !e.isExploded;
        e.isSelected = false;
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