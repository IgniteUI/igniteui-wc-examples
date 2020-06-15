import { SampleBase } from "../../sample-base";
import "./SharedStyles.css";

import { IgcLinearGaugeModule } from 'igniteui-webcomponents-gauges';
import { IgcLinearGaugeComponent } from 'igniteui-webcomponents-gauges';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcLinearGaugeModule);

let templateHTML = `
<div class="sampleRows">
    <igc-linear-gauge id="gauge"
        height="80px"
        width="100%"
        minimum-value="0" value="50"
        maximum-value="100" interval="10"

        tick-brush="DodgerBlue"
        ticks-pre-terminal="0"
        ticks-post-initial="0"
        tick-stroke-thickness="2"
        tick-start-extent="0.25"
        tick-end-extent="0.05"

        minor-tick-count="4"
        minor-tick-brush="DarkViolet"
        minor-tick-end-extent="0.05"
        minor-tick-start-extent="0.15"
        minor-tick-stroke-thickness="1">
    </igc-linear-gauge>
</div>
`;

export class LinearGaugeTickmarks extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("LinearGaugeTickmarks");
    public static register(): any {
        window.customElements.define(this.htmlTagName, LinearGaugeTickmarks); return this;
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