import { SampleBase } from "../../sample-base";

import { IgcSparklineModule } from 'igniteui-webcomponents-charts';
import { IgcSparklineComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { SharedData } from "./SharedData";
import { UnknownValuePlotting } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcSparklineModule);

let templateHTML = `
<div class="sample-container">
    <label class="optionItem">
    <input id="plotUnknownValue" checked="false" type="checkbox"/>Plot Unknown Values</label>
    <igc-sparkline id="sparkline"
        height="calc(100% - 55px)"
        width="100%"
        value-member-path="Value"
        display-type="Area"
        unknown-value-plotting="LinearInterpolate">
    </igc-sparkline>
</div>
`;

export class SparklineUnknownValues extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("SparklineUnknownValues");
    public static register(): any {
        window.customElements.define(this.htmlTagName, SparklineUnknownValues); return this;
    }

    private sparkline: IgcSparklineComponent;
    public data: any[];
    constructor() {
        super();
        this.onRangeVisibilityChanged = this.onRangeVisibilityChanged.bind(this);
        this.data = SharedData.getSharedDataWithNullValues();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.sparkline = document.getElementById("sparkline") as IgcSparklineComponent;
         this.sparkline.dataSource = this.data;

         let plotUnknownValue = document.getElementById("plotUnknownValue");
         plotUnknownValue.addEventListener('change', this.onRangeVisibilityChanged);
    }

    public onRangeVisibilityChanged(e: any) {
        const selection = e.target.checked as boolean;

        if (selection) {
            this.sparkline.unknownValuePlotting = UnknownValuePlotting.LinearInterpolate;
        }
        else {
            this.sparkline.unknownValuePlotting = UnknownValuePlotting.DontPlot;
        }
    }
}
