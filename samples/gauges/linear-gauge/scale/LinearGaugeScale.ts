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
        is-scale-inverted="false"
        scale-brush="DodgerBlue"
        scale-outline="Red"
        scale-stroke-thickness="2"
        scale-inner-extent="0.05"
        scale-outer-extent="0.65"
        scale-start-extent="0.05"
        scale-end-extent="0.95" >
    </igc-linear-gauge>
</div>
`;

export class LinearGaugeScale extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("LinearGaugeScale");
    public static register(): any {
        window.customElements.define(this.htmlTagName, LinearGaugeScale); return this;
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