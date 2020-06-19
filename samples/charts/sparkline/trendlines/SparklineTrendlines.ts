import { SampleBase } from "../../sample-base";

import { IgcSparklineModule } from 'igniteui-webcomponents-charts';
import { IgcSparklineComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { SharedData } from "./SharedData";

ModuleManager.register(IgcSparklineModule);

let templateHTML = `
<div class="sample-container">
    <div class="options">
        <span class="optionItem">Trendline Type: </span>
        <select id="trendlineType"
            defaultValue="ExponentialFit">
            <option>CubicFit</option>
            <option>CumulativeAverage</option>
            <option>ExponentialAverage</option>
            <option>ExponentialFit</option>
            <option>LinearFit</option>
            <option>LogarithmicFit</option>
            <option>ModifiedAverage</option>
            <option>None</option>
            <option>PowerLawFit</option>
            <option>QuadraticFit</option>
            <option>QuarticFit</option>
            <option>QuinticFit</option>
            <option>SimpleAverage</option>
            <option>WeightedAverage</option>
        </select>
    </div>
    <igc-sparkline id="sparkline"
        height="calc(100% - 55px)"
        width="100%"
        value-member-path="Value"
        display-type="Area"
        trend-line-thickness="3"
        trend-line-period="5"
        trend-line-type="ExponentialFit"
        trend-line-brush="Red"></igc-sparkline>
</div>
`;

export class SparklineTrendlines extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("SparklineTrendlines");
    public static register(): any {
        window.customElements.define(this.htmlTagName, SparklineTrendlines); return this;
    }

    private sparkline: IgcSparklineComponent;
    public data: any [];

    constructor() {
        super();
        this.onTrendlineChanged = this.onTrendlineChanged.bind(this);

        this.data = SharedData.getSharedData();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.sparkline = document.getElementById("sparkline") as IgcSparklineComponent;
        this.sparkline.dataSource = this.data;

        let trendlineType = document.getElementById("trendlineType");
        trendlineType.addEventListener('change', this.onTrendlineChanged);
    }

    public onTrendlineChanged(e: any) {
        const selection = e.target.value.toString();
        this.sparkline.trendLineType = selection;
    }
}