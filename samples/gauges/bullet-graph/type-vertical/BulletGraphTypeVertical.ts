import { SampleBase } from "../../sample-base";
import "./SharedStyles.css";

import { IgcBulletGraphModule } from 'igniteui-webcomponents-gauges';
import { IgcBulletGraphComponent } from 'igniteui-webcomponents-gauges';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { IgcLinearGraphRangeComponent } from 'igniteui-webcomponents-gauges';
import { LinearScaleOrientation } from 'igniteui-webcomponents-gauges';

ModuleManager.register(IgcBulletGraphModule);

let templateHTML = `
<div class="sampleColumns"  >
<igc-bullet-graph
    id="gauge1"
    height="100%"
    width="120px"  >
    </igc-bullet-graph>
<igc-bullet-graph
    id="gauge2"
    height="100%"
    width="120px" >
    </igc-bullet-graph>
<igc-bullet-graph
    id="gauge3"
    height="100%"
    width="120px"  >
    </igc-bullet-graph>
</div>
`;

export class BulletGraphTypeVertical extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("BulletGraphTypeVertical");
    public static register(): any {
        window.customElements.define(this.htmlTagName, BulletGraphTypeVertical); return this;
    }

    private gauge1: IgcBulletGraphComponent;
    private gauge2: IgcBulletGraphComponent;
    private gauge3: IgcBulletGraphComponent;

    constructor() {
        super();
    }

    public renderGauge(gauge: IgcBulletGraphComponent, value: number, target: number, colors: string[]) {

        gauge.orientation = LinearScaleOrientation.Vertical;
        gauge.backingBrush = "transparent";
        gauge.backingOutline = "transparent";
        gauge.transitionDuration = 0;
        gauge.value = value;
        gauge.targetValue = target;
        gauge.minimumValue = 0;
        gauge.maximumValue = 100;
        gauge.interval = (gauge.maximumValue - gauge.minimumValue) / 10;
        gauge.labelInterval = gauge.interval;
        gauge.labelExtent = 0.0;

        gauge.rangeBrushes = colors;
        gauge.rangeOutlines = colors;
        const rangeSpan = gauge.maximumValue - gauge.minimumValue;
        const rangeValueInterval = rangeSpan / colors.length;

        for (let i = 0; i < colors.length; i++) {
            const color = colors[i];
            const range = new IgcLinearGraphRangeComponent();
            range.startValue = rangeValueInterval * i;
            range.endValue   = rangeValueInterval * (i + 1);
            range.brush = color;
            range.outline = color;
            range.innerStartExtent  = 0.2;
            range.innerEndExtent    = 0.2;
            range.outerStartExtent  = 0.95;
            range.outerEndExtent    = 0.95;
            gauge.ranges.add(range);
        }
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.gauge1 = document.getElementById("gauge1") as IgcBulletGraphComponent;
        this.gauge2 = document.getElementById("gauge2") as IgcBulletGraphComponent;
        this.gauge3 = document.getElementById("gauge3") as IgcBulletGraphComponent;

        this.renderGauge(this.gauge1, 90, 80, ["#008000", "#10b401", "#45ec03", "#97f397"]);
        this.renderGauge(this.gauge2, 70, 80, ["#e29b03", "#fdb417", "#fdc957", "#f7d58b"]);
        this.renderGauge(this.gauge3, 40, 80, ["#cf0000", "#ff0000", "#fd3939", "#f88989"]);

    }

}