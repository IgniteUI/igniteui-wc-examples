import { SampleBase } from "../../sample-base";
import "./SharedStyles.css";

import { IgcBulletGraphModule } from 'igniteui-webcomponents-gauges';
import { IgcBulletGraphComponent } from 'igniteui-webcomponents-gauges';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcBulletGraphModule);

let templateHTML = `
<div class="sampleRows" >
    <igc-bullet-graph
        height="80px"
        width="100%"
        minimum-value="0" value="70" interval="10"
        maximum-value="100" target-value="90"
        tick-brush="DodgerBlue"
        ticks-pre-terminal="0"
        ticks-post-initial="0"
        tick-stroke-thickness="2"
        tick-start-extent="0.2"
        tick-end-extent="0.075"
        minor-tick-count="4"
        minor-tick-brush="DarkViolet"
        minor-tick-end-extent="0.1"
        minor-tick-start-extent="0.2"
        minor-tick-stroke-thickness="1" >
    </igc-bullet-graph>
</div>
`;

export class BulletGraphTickmarks extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("BulletGraphTickmarks");
    public static register(): any {
        window.customElements.define(this.htmlTagName, BulletGraphTickmarks); return this;
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