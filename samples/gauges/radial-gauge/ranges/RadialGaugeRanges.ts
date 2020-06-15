import { SampleBase } from "../../sample-base";
import "./SharedStyles.css";

import { IgcRadialGaugeModule } from 'igniteui-webcomponents-gauges';
import { IgcRadialGaugeComponent } from 'igniteui-webcomponents-gauges';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcRadialGaugeModule);

let templateHTML = `
<div class="sampleRows">
    <igc-radial-gauge
        height="100%"
        width="100%"
        minimum-value="0" value="50"
        maximum-value="80" interval="10"
        range-brushes ="#a4bd29, #F86232"
        range-outlines="#a4bd29, #F86232"  >
        <igc-radial-gauge-range name="range1"
            start-value="10" end-value="25"
            inner-start-extent="0.50" inner-end-extent="0.50"
            outer-start-extent="0.57" outer-end-extent="0.57" >
        </igc-radial-gauge-range>
        <igc-radial-gauge-range name="range2"
            start-value="25" end-value="40"
            inner-start-extent="0.50" inner-end-extent="0.50"
            outer-start-extent="0.57" outer-end-extent="0.57" >
        </igc-radial-gauge-range>
    </igc-radial-gauge>
</div>
`;

export class RadialGaugeRanges extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("RadialGaugeRanges");
    public static register(): any {
        window.customElements.define(this.htmlTagName, RadialGaugeRanges); return this;
    }

    private gauge: IgcRadialGaugeComponent;

    constructor() {
        super();
    }


    connectedCallback() {
        this.innerHTML = templateHTML;

        this.gauge = document.getElementById("gauge") as IgcRadialGaugeComponent;

    }

}