import { SampleBase } from "../../sample-base";
import "./SharedStyles.css";

import { IgcLinearGaugeModule } from 'igniteui-webcomponents-gauges';
import { IgcLinearGaugeComponent } from 'igniteui-webcomponents-gauges';
import { IgcLinearGraphRangeComponent } from 'igniteui-webcomponents-gauges';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcLinearGaugeModule);

let templateHTML = `
<div class="sampleRows">
    <igc-linear-gauge
        id="gauge1"
        height="120px" width="100%" >
    </igc-linear-gauge>
    <igc-linear-gauge
        id="gauge2"
        height="120px"
        width="100%" >
    </igc-linear-gauge>
    <igc-linear-gauge
        id="gauge3"
        height="120px"
        width="100%" >
    </igc-linear-gauge>
</div>
`;

export class LinearGaugeTypeSegmented extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("LinearGaugeTypeSegmented");
    public static register(): any {
        window.customElements.define(this.htmlTagName, LinearGaugeTypeSegmented); return this;
    }

    private gauge1: IgcLinearGaugeComponent;
    private gauge2: IgcLinearGaugeComponent;
    private gauge3: IgcLinearGaugeComponent;

    constructor() {
        super();
    }

    public renderGauge(gauge: IgcLinearGaugeComponent, value: number, color: string) {

        gauge.value = value;
        gauge.minimumValue = 0;
        gauge.maximumValue = 100;
        gauge.interval = 10;
        gauge.transitionDuration = 0;
        gauge.labelInterval = gauge.interval;
        gauge.labelExtent = 0.15;
        gauge.formatLabel = (s: any, e : any) => {
            e.label = e.value + "%"
        };

        // setting scale
        gauge.scaleStrokeThickness = 0;
        gauge.scaleBrush   = "#e0dfdf";
        gauge.scaleOutline = "#e0dfdf";
        gauge.scaleInnerExtent = 0.25;
        gauge.scaleOuterExtent = 0.65;
        gauge.scaleStartExtent = 0.05;
        gauge.scaleEndExtent   = 0.95;

        // setting fill range
        const range = new IgcLinearGraphRangeComponent();
        range.brush   = color;
        range.outline = color;
        range.startValue = gauge.minimumValue;
        range.endValue   = gauge.value;
        range.innerStartExtent = gauge.scaleInnerExtent;
        range.innerEndExtent   = gauge.scaleInnerExtent;
        range.outerStartExtent = gauge.scaleOuterExtent;
        range.outerEndExtent   = gauge.scaleOuterExtent;

        gauge.ranges.clear();
        gauge.ranges.add(range);

        // using major ticks as segment bounds
        gauge.tickBrush = "white";
        gauge.tickStrokeThickness = 2;
        gauge.tickStartExtent = gauge.scaleInnerExtent;
        gauge.tickEndExtent   = gauge.scaleOuterExtent;

        // using minor ticks as segment bounds
        gauge.minorTickBrush = "white";
        gauge.minorTickStrokeThickness = 2;
        gauge.minorTickCount = (gauge.interval / 2) - 1;
        gauge.minorTickStartExtent = gauge.scaleInnerExtent;
        gauge.minorTickEndExtent   = gauge.scaleOuterExtent;

        // setting appearance of needle
        gauge.isNeedleDraggingEnabled = false;
        gauge.needleBrush = "transparent";
        gauge.needleOutline = "transparent";

        gauge.backingBrush = "transparent";
        gauge.backingOutline = "transparent";
    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.gauge1 = document.getElementById("gauge1") as IgcLinearGaugeComponent;
        this.gauge2 = document.getElementById("gauge2") as IgcLinearGaugeComponent;
        this.gauge3 = document.getElementById("gauge3") as IgcLinearGaugeComponent;

        this.renderGauge(this.gauge1, 80, "green");
        this.renderGauge(this.gauge2, 50, "orange");
        this.renderGauge(this.gauge3, 30, "red");
    }

}