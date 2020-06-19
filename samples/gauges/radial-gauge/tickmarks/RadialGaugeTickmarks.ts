import { SampleBase } from "../../sample-base";
import "./SharedStyles.css";

import { IgcRadialGaugeModule } from 'igniteui-webcomponents-gauges';
import { IgcRadialGaugeComponent } from 'igniteui-webcomponents-gauges';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcRadialGaugeModule);

let templateHTML = `
<div class="sampleRows">
    <igc-radial-gauge
        id="gauge"
        height="100%"
        width="100%"
        minimum-vue="0" value="50"
        maximum-value="80" interval="10"
        tick-start-extent="0.5"
        tick-end-extent="0.57"
        tick-stroke-thickness="2"
        tick-brush="DodgerBlue"
        minor-tick-count="4"
        minor-tick-end-extent="0.520"
        minor-tick-start-extent="0.57"
        minor-tick-stroke-thickness="1"
        minor-tick-brush="DarkViolet" >
    </igc-radial-gauge>
</div>
`;

export class RadialGaugeTickmarks extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("RadialGaugeTickmarks");
    public static register(): any {
        window.customElements.define(this.htmlTagName, RadialGaugeTickmarks); return this;
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