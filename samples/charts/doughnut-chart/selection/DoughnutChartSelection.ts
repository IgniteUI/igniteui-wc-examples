import { SampleBase } from "../../sample-base";

import { IgcDoughnutChartModule } from 'igniteui-webcomponents-charts';
import { IgcDoughnutChartComponent } from 'igniteui-webcomponents-charts';
import { IgcRingSeriesComponent } from 'igniteui-webcomponents-charts';
import { IgcRingSeriesModule } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcSliceClickEventArgs } from 'igniteui-webcomponents-charts';

ModuleManager.register(
    IgcDoughnutChartModule,
    IgcRingSeriesModule
);

let templateHTML = `
<div class="sample-container" >
    <label id="label" class="sample-label"> Selected Slice: None</label>

    <igc-doughnut-chart
        id="chart"
        height="calc(100% - 25px)"
        allow-slice-selection="true">

        <igc-ring-series
            name="ringSeries" id="ringSeries"
            label-member-path="Company"
            value-member-path="MarketShare"
            radius-factor="0.9">
        </igc-ring-series>

    </igc-doughnut-chart>
</div>
`;

export class DoughnutChartSelection extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("DoughnutChartSelection");
    public static register(): any {
        window.customElements.define(this.htmlTagName, DoughnutChartSelection); return this;
    }

    private chart: IgcDoughnutChartComponent;
    private label: HTMLElement;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        let ringSeries = document.getElementById("ringSeries") as IgcRingSeriesComponent;
        // let ringSeries = new IgcRingSeriesComponent();
        // ringSeries.labelMemberPath = "Company";
        // ringSeries.valueMemberPath = "MarketShare";
        ringSeries.dataSource = this.getData();

        this.chart = document.getElementById("chart") as IgcDoughnutChartComponent;
        // this.chart.series.add(ringSeries);
        this.chart.sliceClick = this.onSliceClick;
        this.chart.selectedSliceOpacity = 0.85;
        this.chart.selectedSliceStrokeThickness = 4;
        this.chart.selectedSliceStroke = "rgba(0, 0, 0, 0.5)";

        this.label = document.getElementById("label");
        this.label.innerText = "Selected Slice: None";
    }

    public onSliceClick = (s: IgcDoughnutChartComponent, e: IgcSliceClickEventArgs) => {

        let selectedSlice: string = "";
        if (e.isOthersSlice) {
            selectedSlice = "Other";
        } else if (e.isSelected &&
                   e.dataContext !== undefined &&
                   e.dataContext.Company !== undefined) {
                    selectedSlice = e.dataContext.Company
        }
        this.label.innerText = "Selected Slice: " + selectedSlice;
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