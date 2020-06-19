import { SampleBase } from "../../sample-base";
import "./SharedStyles.css";

import { IgcBulletGraphModule } from 'igniteui-webcomponents-gauges';
import { IgcBulletGraphComponent } from 'igniteui-webcomponents-gauges';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcBulletGraphModule);

let templateHTML = `
<div class="sampleRows" >
    <igc-bullet-graph
        id="gauge"
        height="80px"
        width="100%"
        minimum-value="0" value="80" interval="10"
        maximum-value="100" target-value="90"
        range-brushes ="#C62828, #F96232, #FF9800"
        range-outlines="#C62828, #F96232, #FF9800">
        <igc-linear-graph-range name="range1"
            start-value="0" end-value="40"
            inner-start-extent="0.075" inner-end-extent="0.075"
            outer-start-extent="0.95" outer-end-extent="0.95" >
        </igc-linear-graph-range>
        <igc-linear-graph-range name="range2"
            start-value="40" end-value="70"
            inner-start-extent="0.075" inner-end-extent="0.075"
            outer-start-extent="0.95" outer-end-extent="0.95" >
        </igc-linear-graph-range>
        <igc-linear-graph-range name="range3"
            start-value="70" end-value="100"
            inner-start-extent="0.075" inner-end-extent="0.075"
            outer-start-extent="0.95" outer-end-extent="0.95" >
        </igc-linear-graph-range>
    </igc-bullet-graph>
</div>
`;

export class BulletGraphRanges extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("BulletGraphRanges");
    public static register(): any {
        window.customElements.define(this.htmlTagName, BulletGraphRanges); return this;
    }

    private gauge: IgcBulletGraphComponent;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.gauge = document.getElementById("gauge") as IgcBulletGraphComponent;

    }

}