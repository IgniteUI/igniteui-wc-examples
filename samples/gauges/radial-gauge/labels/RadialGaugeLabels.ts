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
        font-brush="DodgerBlue"
        font="20px Verdana"
        label-interval="10"
        label-extent="0.65"
        labels-pre-terminal="0"
        labels-post-initial="0"
        height="100%"
        width="100%"
        minimum-value="0" value="50"
        maximum-value="80" interval="10" >
    </igc-radial-gauge>
</div>
`;

export class RadialGaugeLabels extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("RadialGaugeLabels");
    public static register(): any {
        window.customElements.define(this.htmlTagName, RadialGaugeLabels); return this;
    }

    private gauge: IgcRadialGaugeComponent;

    constructor() {
        super();
    }


    connectedCallback() {
        this.innerHTML = templateHTML;

        this.gauge = document.getElementById("gauge") as IgcRadialGaugeComponent;
        this.gauge.font = "22px Verdana"
    }

}