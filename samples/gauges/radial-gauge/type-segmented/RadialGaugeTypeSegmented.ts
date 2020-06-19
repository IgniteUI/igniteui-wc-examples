import { SampleBase } from "../../sample-base";
import "./SharedStyles.css";

import { IgcRadialGaugeModule } from 'igniteui-webcomponents-gauges';
import { IgcRadialGaugeComponent } from 'igniteui-webcomponents-gauges';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { RadialGaugeNeedleShape } from 'igniteui-webcomponents-gauges';
import { RadialGaugePivotShape } from 'igniteui-webcomponents-gauges';
import { RadialGaugeScaleOversweepShape } from 'igniteui-webcomponents-gauges';
import { SweepDirection } from 'igniteui-webcomponents-core';
import { RadialGaugeBackingShape } from 'igniteui-webcomponents-gauges';
import { IgcRadialGaugeRangeComponent } from 'igniteui-webcomponents-gauges';

ModuleManager.register(IgcRadialGaugeModule);

let templateHTML = `
<div class="sampleOverlays">
    <div class="sampleOverlayItem">
        <igc-radial-gauge
            id="gauge"
            height="100%"
            width="100%"  >
        </igc-radial-gauge>
    </div>

</div>
`;

export class RadialGaugeTypeSegmented extends SampleBase {

    public static htmlTagName: string = SampleBase.tag("RadialGaugeTypeSegmented");
    public static register(): any {
        window.customElements.define(this.htmlTagName, RadialGaugeTypeSegmented); return this;
    }

    private gauge: IgcRadialGaugeComponent;

    constructor() {
        super();
    }

    public renderGauge(gauge: IgcRadialGaugeComponent) {

        gauge.minimumValue = 0;
        gauge.maximumValue = 100;
        gauge.value = 80;
        gauge.interval = 10;
        gauge.transitionDuration = 0;

        // setting appearance of labels
        gauge.labelInterval = gauge.interval;
        gauge.labelExtent = 0.8;
        gauge.font = "15px Verdana,Arial";
        gauge.formatLabel = (s: any, e : any) => {
            if (e.value > 0) {
                e.label = e.value + "%"
            } else {
                e.label = "";
            }
        };

        gauge.needleShape = RadialGaugeNeedleShape.None;
        gauge.needlePivotShape = RadialGaugePivotShape.None;

        // setting extent of gauge scale
        gauge.scaleStartAngle = -90;
        gauge.scaleEndAngle = 270;
        gauge.scaleBrush = "#e0dfdf";
        gauge.scaleOversweepShape = RadialGaugeScaleOversweepShape.Circular;
        gauge.scaleSweepDirection = SweepDirection.Clockwise;
        gauge.scaleEndExtent   = 0.7;
        gauge.scaleStartExtent = 0.6;

        // setting appearance of major/minor ticks
        gauge.minorTickCount = 4;
        gauge.minorTickStartExtent = gauge.scaleStartExtent;
        gauge.minorTickEndExtent   = gauge.scaleEndExtent;
        gauge.minorTickStrokeThickness = 2;
        gauge.minorTickBrush = "white";
        gauge.tickStartExtent = gauge.scaleStartExtent;
        gauge.tickEndExtent   = gauge.scaleEndExtent;
        gauge.tickStrokeThickness = 2;
        gauge.tickBrush = "white";

        // setting appearance of backing dial
        gauge.backingBrush = "transparent";
        gauge.backingOutline = "transparent";
        gauge.backingShape = RadialGaugeBackingShape.Circular;

        // setting custom gauge ranges
        const range = new IgcRadialGaugeRangeComponent();
        range.startValue = 0;
        range.endValue = gauge.value;
        range.brush   = "#1e90ff";
        range.outline = "#1e90ff";
        range.innerStartExtent = gauge.scaleStartExtent;
        range.innerEndExtent   = gauge.scaleStartExtent;
        range.outerStartExtent = gauge.scaleEndExtent;
        range.outerEndExtent   = gauge.scaleEndExtent;

        gauge.ranges.add(range);

    }

    connectedCallback() {
        this.innerHTML = templateHTML;

        this.gauge = document.getElementById("gauge") as IgcRadialGaugeComponent;

        this.renderGauge(this.gauge);
    }

}