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
                     minimum-value="0"
                     maximum-value="100"
                     value="50"
                     value-brush="DodgerBlue"
                     value-stroke-thickness="1"
                     value-inner-extent="0.5"
                     value-outer-extent="0.65"
                     target-value="80"
                     target-value-breadth="10"
                     target-value-brush="LimeGreen"
                     target-value-outline="LimeGreen"
                     target-value-stroke-thickness="1"
                     target-value-inner-extent="0.3"
                     target-value-outer-extent="0.85"
                     scale-background-brush = "#e5e5e5"
                     scale-background-outline = "#e5e5e5"
                     backing-brush = "#f7f7f7"
                     backing-outline = "#bfbfbf"
                     tick-stroke-thickness = "1.5" >
                </igc-bullet-graph>
            </div>
`;

export class BulletGraphMeasures extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("BulletGraphMeasures");
    public static register(): any {
        window.customElements.define(this.htmlTagName, BulletGraphMeasures); return this;
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