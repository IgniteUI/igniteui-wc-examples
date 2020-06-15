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
        is-scale-inverted="false"
        scale-background-brush="DodgerBlue"
        scale-background-outline="Red"
        scale-background-thickness="2"
        scale-start-extent="0.05"
        scale-end-extent="0.95" >
    </igc-bullet-graph>
</div>
`;

export class BulletGraphScale extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("BulletGraphScale");
    public static register(): any {
        window.customElements.define(this.htmlTagName, BulletGraphScale); return this;
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