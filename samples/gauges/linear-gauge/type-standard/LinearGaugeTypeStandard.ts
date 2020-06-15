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
        height="120px"
        width="100%">
    </igc-linear-gauge>
</div>
`;

export class LinearGaugeTypeStandard extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("LinearGaugeTypeStandard");
    public static register(): any {
        window.customElements.define(this.htmlTagName, LinearGaugeTypeStandard); return this;
    }

    private gauge: IgcLinearGaugeComponent;

    constructor() {
        super();
    }

    public setupGauge(gauge: IgcLinearGaugeComponent)  {

        gauge.ranges.clear();
        gauge.minimumValue = 0;
        gauge.maximumValue = 100;
        gauge.value = 80;
        gauge.interval = 10;
        gauge.labelInterval = 10;
        gauge.transitionDuration = 0;

        // setting appearance of needle
        gauge.isNeedleDraggingEnabled = true;
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.gauge = document.getElementById("gauge") as IgcLinearGaugeComponent;

        this.setupGauge(this.gauge);
    }

}