import { SampleBase } from "../../sample-base";
import "./SharedStyles.css";

import { IgcLinearGaugeModule } from 'igniteui-webcomponents-gauges';
import { IgcLinearGaugeComponent } from 'igniteui-webcomponents-gauges';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcLinearGaugeModule);

let templateHTML = `
<div class="sampleRows">
    <igc-linear-gauge id="gauge" width="100%" height="80px"
        minimum-value="0" value="50"
        maximum-value="100" interval="10"
        rangeBrushes="#a4bd29, #F86232"
        rangeOutlines="#a4bd29, #F86232">

        <igc-linear-graph-range name="range1"
            start-value="0" end-value="50"
            inner-start-extent="0.075" inner-end-extent="0.075"
            outer-start-extent="0.25" outer-end-extent="0.4" >
        </igc-linear-graph-range>

        <igc-linear-graph-range name="range2"
            start-value="50" end-value="100"
            inner-start-extent="0.075" inner-end-extent="0.075"
            outer-start-extent="0.4" outer-end-extent="0.55" >
        </igc-linear-graph-range>

    </igc-linear-gauge>
</div>
`;

export class LinearGaugeRanges extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("LinearGaugeRanges");
    public static register(): any {
        window.customElements.define(this.htmlTagName, LinearGaugeRanges); return this;
    }

    private gauge: IgcLinearGaugeComponent;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.gauge = document.getElementById("gauge") as IgcLinearGaugeComponent;

    }

}