import { SampleBase } from "../../sample-base";
import "./SharedStyles.css";

import { IgcLinearGaugeModule } from 'igniteui-webcomponents-gauges';
import { IgcLinearGaugeComponent } from 'igniteui-webcomponents-gauges';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcLinearGaugeModule);

let templateHTML = `
<div class="sampleRows">
    <igc-linear-gauge
        id="gauge"
        height="80px"
        width="100%"
        minimum-value="0" value="50"
        maximum-value="100" interval="10"
        is-needle-dragging-enabled="true"
        needle-shape="Custom"
        needle-brush="DodgerBlue"
        needle-outline="DodgerBlue"
        needle-stroke-thickness="1"
        needle-breadth="15"
        needle-inner-extent="0.35"
        needle-outer-extent="0.65"
        needle-outer-point-extent="0.8"
        needle-inner-point-extent="0.325"
        needle-inner-point-width="0"
        needle-outer-point-width="0.3"
        needle-inner-base-width="0"
        needle-outer-base-width="0.07"  >
    </igc-linear-gauge>
</div>
`;

export class LinearGaugeNeedle extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("LinearGaugeNeedle");
    public static register(): any {
        window.customElements.define(this.htmlTagName, LinearGaugeNeedle); return this;
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