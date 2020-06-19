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
        label-interval="10"
        label-extent="0.025"
        labels-pre-terminal="0"
        labels-post-initial="0"
        font-brush="DodgerBlue"
        font="11px Verdana" >
    </igc-linear-gauge>
</div>
`;

export class LinearGaugeLabels extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("LinearGaugeLabels");
    public static register(): any {
        window.customElements.define(this.htmlTagName, LinearGaugeLabels); return this;
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