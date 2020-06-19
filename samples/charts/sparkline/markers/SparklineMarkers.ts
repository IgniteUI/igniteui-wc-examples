import { SampleBase } from "../../sample-base";

import { IgcSparklineModule } from 'igniteui-webcomponents-charts';
import { IgcSparklineCoreModule } from 'igniteui-webcomponents-charts';

import { IgcSparklineComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { SharedData } from "./SharedData";
import { Visibility } from 'igniteui-webcomponents-core';

ModuleManager.register(
    IgcSparklineCoreModule,
    IgcSparklineModule
);

let templateHTML = `
<div class="sample-container">
    <div class="options">
        <label class="optionItem"><input id="High" checked="true" type="checkbox" />High Markers</label>
        <label class="optionItem"><input id="Low" checked="true" type="checkbox" />Low Markers</label>
        <label class="optionItem"><input id="First" checked="true" type="checkbox" />First Markers</label>
        <label class="optionItem"><input id="Last" checked="true" type="checkbox" />Last Markers</label>
        <label class="optionItem"><input id="Negative" checked="true" type="checkbox" />Negative Markers</label>
        <label class="optionItem"><input id="All" checked="true" type="checkbox" />All Markers</label>
    </div>
    <igc-sparkline id="sparkline"
        height="calc(100% - 55px)" width="100%"
        value-member-path="Value"
        display-type="Line"
        minimum="-3"
        maximum="8"
        marker-visibility="Visible"
        high-marker-visibility="Visible"
        low-marker-visibility="Visible"
        first-marker-visibility="Visible"
        last-marker-visibility="Visible"
        negative-marker-visibility="Visible"
        marker-size="10"
        first-marker-size"1"
        last-marker-size="10"
        low-marker-size="10"
        high-marker-size="10"
        negative-marker-size="10">
    </igc-sparkline>
</div >
`;

export class SparklineMarkers extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("SparklineMarkers");
    public static register(): any {
        window.customElements.define(this.htmlTagName, SparklineMarkers); return this;
    }

    private sparkline: IgcSparklineComponent;
    public data: any[];

    constructor() {
        super();
        this.onMarkerCheckboxChanged = this.onMarkerCheckboxChanged.bind(this);

        this.data = SharedData.getPaddedDataForMarkers();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.sparkline = document.getElementById("sparkline") as IgcSparklineComponent;
        this.sparkline.dataSource = this.data;

        let High = document.getElementById("High");
        High.addEventListener('change', this.onMarkerCheckboxChanged);

        let Low = document.getElementById("Low");
        Low.addEventListener('change', this.onMarkerCheckboxChanged);

        let First = document.getElementById("First");
        First.addEventListener('change', this.onMarkerCheckboxChanged);

        let Last = document.getElementById("Last");
        Last.addEventListener('change', this.onMarkerCheckboxChanged);

        let Negative = document.getElementById("Negative");
        Negative.addEventListener('change', this.onMarkerCheckboxChanged);

        let All = document.getElementById("All");
        All.addEventListener('change', this.onMarkerCheckboxChanged);
    }

    public onMarkerCheckboxChanged(e: any) {

        const selection = e.target.checked as boolean;

        let visibility: Visibility;
        if (selection) {
            visibility = Visibility.Visible;
        }
        else {
            visibility = Visibility.Collapsed;
        }

        switch (e.target.id) {
            case "High": {
                this.sparkline.highMarkerVisibility = visibility;
                break;
            }
            case "Low": {
                this.sparkline.lowMarkerVisibility = visibility;
                break;
            }
            case "First": {
                this.sparkline.firstMarkerVisibility = visibility;
                break;
            }
            case "Last": {
                this.sparkline.lastMarkerVisibility = visibility;
                break;
            }
            case "Negative": {
                this.sparkline.negativeMarkerVisibility = visibility;
                break;
            }
            case "All": {
                this.sparkline.markerVisibility = visibility;
                break;
            }
        }
    }

}