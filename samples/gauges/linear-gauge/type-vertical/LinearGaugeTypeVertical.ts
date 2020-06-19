import { SampleBase } from "../../sample-base";
import "./SharedStyles.css";

import { IgcLinearGaugeModule } from 'igniteui-webcomponents-gauges';
import { IgcLinearGaugeComponent } from 'igniteui-webcomponents-gauges';
import { IgcLinearGraphRangeComponent } from 'igniteui-webcomponents-gauges';
import { LinearScaleOrientation } from 'igniteui-webcomponents-gauges';
import { LinearGraphNeedleShape } from 'igniteui-webcomponents-gauges';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcLinearGaugeModule);

let templateHTML = `
<div class="sampleColumns"  >
    <igc-linear-gauge
        id="gauge1"
        width="120px"
        height="100%" >
    </igc-linear-gauge>
    <igc-linear-gauge
        id="gauge2"
        width="120px"
        height="100%" >
    </igc-linear-gauge>
    <igc-linear-gauge
        id="gauge3"
        width="120px"
        height="100%" >
    <igc-linear-gauge>
</div>
`;

export class LinearGaugeTypeVertical extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("LinearGaugeTypeVertical");
    public static register(): any {
        window.customElements.define(this.htmlTagName, LinearGaugeTypeVertical); return this;
    }

    private gauge1: IgcLinearGaugeComponent;
    private gauge2: IgcLinearGaugeComponent;
    private gauge3: IgcLinearGaugeComponent;

    constructor() {
        super();
    }

    public renderGauge(gauge: IgcLinearGaugeComponent, value: number, colors: string[]) {

        gauge.orientation = LinearScaleOrientation.Vertical;
        gauge.value = value;

        gauge.value = value;
        gauge.minimumValue = 0;
        gauge.maximumValue = 100;
        gauge.interval = 10;
        gauge.labelInterval = gauge.interval;
        gauge.labelExtent = 0.0;
        gauge.transitionDuration = 0;

        // setting extent of gauge scale
        gauge.scaleInnerExtent = 0.25;
        gauge.scaleOuterExtent = 0.8;
        gauge.scaleStartExtent = 0.05;
        gauge.scaleEndExtent = 0.95;

        gauge.rangeBrushes  = colors;
        gauge.rangeOutlines = colors;

        const rangeSpan = gauge.maximumValue - gauge.minimumValue;
        const rangeValueInterval = rangeSpan / colors.length;

        gauge.ranges.clear();
        for (let i = 0; i < colors.length; i++) {
            const color = colors[i];
            const range = new IgcLinearGraphRangeComponent();
            range.startValue = rangeValueInterval * i;
            range.endValue   = rangeValueInterval * (i + 1);
            range.brush = color;
            range.outline = color;
            range.innerStartExtent = gauge.scaleInnerExtent;
            range.innerEndExtent   = gauge.scaleInnerExtent;
            range.outerStartExtent = gauge.scaleOuterExtent;
            range.outerEndExtent   = gauge.scaleOuterExtent;
            gauge.ranges.add(range);
        }

        // setting appearance of needle
        gauge.isNeedleDraggingEnabled = true;
        gauge.needleShape = LinearGraphNeedleShape.Needle;
        gauge.needleBrush = "#494949";
        gauge.needleOutline = "#494949";
        gauge.needleStrokeThickness = 1;
        gauge.needleOuterExtent = 0.9;
        gauge.needleInnerExtent = gauge.scaleInnerExtent + 0.1;
        gauge.needleBreadth = 10;

        // setting appearance of major ticks
        gauge.tickBrush = "gray";
        gauge.tickStartExtent = gauge.scaleInnerExtent - 0.15;
        gauge.tickEndExtent   = gauge.scaleInnerExtent;
        gauge.tickStrokeThickness = 1;

        // setting appearance of minor ticks
        gauge.minorTickBrush = "gray";
        gauge.minorTickStartExtent = gauge.scaleInnerExtent - 0.075;
        gauge.minorTickEndExtent   = gauge.scaleInnerExtent;
        gauge.minorTickStrokeThickness = 1;
        gauge.minorTickCount = (gauge.interval / 2) - 1;

        gauge.backingBrush = "transparent";
        gauge.backingOutline = "transparent";

        // setting extent of gauge scale
        gauge.scaleStrokeThickness = 0;
        gauge.scaleBrush   = "#e0dfdf";
        gauge.scaleOutline = "#e0dfdf";

    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.gauge1 = document.getElementById("gauge1") as IgcLinearGaugeComponent;
        this.gauge2 = document.getElementById("gauge2") as IgcLinearGaugeComponent;
        this.gauge3 = document.getElementById("gauge3") as IgcLinearGaugeComponent;

        this.renderGauge(this.gauge1, 80, ["#008000", "#10b401", "#45ec03", "#2efa2e"]);
        this.renderGauge(this.gauge2, 60, ["#e29b03", "#fdb417", "#fdc957", "#fdd682"]);
        this.renderGauge(this.gauge3, 40, ["#cf0000", "#ff0000", "#fd3939", "#fa6363"]);
    }
}