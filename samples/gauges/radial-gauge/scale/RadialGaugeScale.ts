import { SampleBase } from "../../sample-base";
import "./SharedStyles.css";

import { IgcRadialGaugeModule } from 'igniteui-webcomponents-gauges';
import { IgcRadialGaugeComponent } from 'igniteui-webcomponents-gauges';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcRadialGaugeModule);

let templateHTML = `
<div class="sampleRows">
    <igc-radial-gauge
        scale-start-angle="135"
        scale-end-angle="45"
        scale-brush="DodgerBlue"
        scale-sweep-direction="Clockwise"
        scale-oversweep="1"
        scale-oversweep-shape="Fitted"
        scale-start-extent="0.45"
        scale-end-extent="0.575"
        height="100%"
        width="100%"
        minimum-value="0" value="50"
        maximum-value="80" interval="10" >
    </igc-radial-gauge>
</div>
`;

export class RadialGaugeScale extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("RadialGaugeScale");
    public static register(): any {
        window.customElements.define(this.htmlTagName, RadialGaugeScale); return this;
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