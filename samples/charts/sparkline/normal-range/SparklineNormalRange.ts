import { SampleBase } from "../../sample-base";

import { IgcSparklineModule } from 'igniteui-webcomponents-charts';
import { IgcSparklineCoreModule } from 'igniteui-webcomponents-charts';
import { IgcSparklineComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { Visibility } from 'igniteui-webcomponents-core';
import { SharedData } from "./SharedData";

ModuleManager.register(
    IgcSparklineCoreModule,
    IgcSparklineModule
);

// all done ex-range update labels
let templateHTML = `
<div class="sample-container">
    <label class="optionItem"><input id="rangeVisibility" checked="true" type="checkbox" />Range Visibility</label>
    <label class="optionItem" ><input id="minRange" type="range" min="-2" max="7" step="0.5"
    value="1" />Min Range <label id="minRangelbl"></label> </label>
    <label class="optionItem"><input id="maxRange" type="range" min="-2" max="7" step="0.5"
    value="4"/>Max Range <label id="maxRangelbl"></label></label>

    <igc-sparkline id="sparkline"
        height="calc(100% - 55px)"
        width="100%"
        value-Member-Path="Value"
        display-type="Area"
        normal-range-visibility="Visible"
        normal-range-minimum="1"
        normal-range-maximum="4"
        normal-range-fill="rgba(255, 0, 0, 0.4)"
        display-normal-range-in-front="true" >
    </igc-sparkline>
</div>
`;

export class SparklineNormalRange extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("SparklineNormalRange");
    public static register(): any {
        window.customElements.define(this.htmlTagName, SparklineNormalRange); return this;
    }

    private sparkline: IgcSparklineComponent;
    public data: any[];
    private minRangelbl: any;
    private maxRangelbl: any;

    constructor() {
        super();
        this.onMinSliderChanged = this.onMinSliderChanged.bind(this);
        this.onMaxSliderChanged = this.onMaxSliderChanged.bind(this);
        this.onRangeVisibilityChanged = this.onRangeVisibilityChanged.bind(this);
        this.data = SharedData.getSharedData();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.sparkline = document.getElementById("sparkline") as IgcSparklineComponent;
        this.sparkline.dataSource = this.data;

        let rangeVisibility = document.getElementById("rangeVisibility");
        rangeVisibility.addEventListener('change', this.onRangeVisibilityChanged);

        let minRange = document.getElementById("minRange");
        minRange.addEventListener('change', this.onMinSliderChanged);

        let maxRange = document.getElementById("maxRange");
        maxRange.addEventListener('change', this.onMaxSliderChanged);

        this.minRangelbl = document.getElementById("minRangelbl");
        this.maxRangelbl = document.getElementById("maxRangelbl");
    }

    public onRangeVisibilityChanged(e: any) {
        const selection = e.target.checked as boolean;

        if (selection) {
            this.sparkline.normalRangeVisibility = Visibility.Visible;
        }
        else {
            this.sparkline.normalRangeVisibility = Visibility.Collapsed;
        }
    }

    public onMinSliderChanged(e: any) {
        const value: number = parseFloat(e.target.value);
        this.sparkline.normalRangeMinimum = value;
      this.minRangelbl.textContent = value;
    }

    public onMaxSliderChanged(e: any) {
        const value: number = parseFloat(e.target.value);
        this.sparkline.normalRangeMaximum = value;
        this.maxRangelbl.textContent = value;
    }
}