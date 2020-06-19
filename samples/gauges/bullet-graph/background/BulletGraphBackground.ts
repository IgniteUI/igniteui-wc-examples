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
        maximum-value="100" target-value="90"
        backing-brush="#bddcfc"
        backing-outline="DodgerBlue"
        backing-stroke-thickness="4"
        backing-inner-extent="0"
        backing-outer-extent="1">
    </igc-bullet-graph>
</div>
`;

export class BulletGraphBackground extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("BulletGraphBackground");
    public static register(): any {
        window.customElements.define(this.htmlTagName, BulletGraphBackground); return this;
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