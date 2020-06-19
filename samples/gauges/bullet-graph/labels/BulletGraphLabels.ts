import { SampleBase } from "../../sample-base";
import "./SharedStyles.css";

import { IgcBulletGraphModule } from 'igniteui-webcomponents-gauges';
import { IgcBulletGraphComponent } from 'igniteui-webcomponents-gauges';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcBulletGraphModule);

let templateHTML = `
<div class="sampleRows" >
    <igc-bullet-graph
        id="gauge"
        height="80px"
        width="100%"
        minimum-value="0" value="70" interval="10"
        maximum-value="100"
        target-value="90"
        label-interval="10"
        label-extent="0.025"
        labels-pre-terminal="0"
        labels-post-initial="0"
        font-brush="DodgerBlue"
        font="11px Verdana">
    </igc-bullet-graph>
</div>
`;

export class BulletGraphLabels extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("BulletGraphLabels");
    public static register(): any {
        window.customElements.define(this.htmlTagName, BulletGraphLabels); return this;
    }

    private gauge: IgcBulletGraphComponent;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.gauge = document.getElementById("gauge") as IgcBulletGraphComponent;
    }

}