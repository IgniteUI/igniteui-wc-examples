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
        is-needle-dragging-enabled="true"
        is-needle-dragging-constrained="true"
        needle-shape="NeedleWithBulb"
        needle-brush="DodgerBlue"
        needle-outline="DodgerBlue"
        needle-end-extent="0.475"
        needle-stroke-thickness="1"
        needle-pivot-shape="CircleOverlay"
        needle-pivot-brush="#9f9fa0"
        needle-pivot-outline="#9f9fa0"
        needle-pivot-width-ratio="0.2"
        needle-pivot-stroke-thickness="1"
        value="50"
        minimum-value="0"
        maximum=value="80"
        interval="10" >
    </igc-radial-gauge>
</div>
`;

export class RadialGaugeNeedle extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("RadialGaugeNeedle");
    public static register(): any {
        window.customElements.define(this.htmlTagName, RadialGaugeNeedle); return this;
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