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
        backing-brush="#bddcfc"
        backing-outline="DodgerBlue"
        backing-stroke-thickness="4"
        backing-inner-extent="0"
        backing-outer-extent="1">
    </igc-linear-gauge>
</div>
`;

export class LinearGaugeBacking extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("LinearGaugeBacking");
    public static register(): any {
        window.customElements.define(this.htmlTagName, LinearGaugeBacking); return this;
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