import { SampleBase } from "../../sample-base";
import "./SharedStyles.css";

import { IgcRadialGaugeModule } from 'igniteui-webcomponents-gauges';
import { IgcRadialGaugeComponent } from 'igniteui-webcomponents-gauges';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcRadialGaugeModule);

let templateHTML = `
<div class="sampleRows">
    <igc-radial-gauge
        backing-shape="Fitted"
        backing-brush="#fcfcfc"
        backing-outline="DodgerBlue"
        backing-oversweep="5"
        backing-corner-tadius="10"
        backing-stroke-thickness="5"
        backing-outer-extent="0.8"
        backing-inner-extent="0.15"

        scale-start-angle="135"
        scale-end-angle="45"
        scale-brush="#dddddd"

        height="100%"
        width="100%"
        minimum-value="0" value="50"
        maximum-value="80" interval="10" />
</div>
`;

export class RadialGaugeBacking extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("RadialGaugeBacking");
    public static register(): any {
        window.customElements.define(this.htmlTagName, RadialGaugeBacking); return this;
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