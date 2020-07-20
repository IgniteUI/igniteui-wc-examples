


import { IgcRadialGaugeModule } from 'igniteui-webcomponents-gauges';
import { IgcRadialGaugeComponent } from 'igniteui-webcomponents-gauges';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { RadialGaugeNeedleShape } from 'igniteui-webcomponents-gauges';
import { RadialGaugeScaleOversweepShape } from 'igniteui-webcomponents-gauges';
import { RadialGaugePivotShape } from 'igniteui-webcomponents-gauges';
import { SweepDirection } from 'igniteui-webcomponents-core';
import { RadialGaugeBackingShape } from 'igniteui-webcomponents-gauges';
import { IgcRadialGaugeRangeComponent } from 'igniteui-webcomponents-gauges';

ModuleManager.register(IgcRadialGaugeModule);


export class RadialGaugeTypeColumn {

    private gauge: IgcRadialGaugeComponent;

    constructor() {        

        this.gauge = document.getElementById('gauge') as IgcRadialGaugeComponent;

        this.renderGauge(this.gauge);
    }

    public renderGauge(gauge: IgcRadialGaugeComponent) {

        gauge.minimumValue = 0;
        gauge.maximumValue = 360;
        gauge.value = 270;
        gauge.interval = 30;
        gauge.transitionDuration = 0;

        // setting appearance of labels
        gauge.labelInterval = gauge.interval;
        gauge.labelExtent = 0.85;
        gauge.font = '15px Verdana,Arial';

        gauge.needleShape = RadialGaugeNeedleShape.None;
        gauge.needlePivotShape = RadialGaugePivotShape.None;

        // setting extent of gauge scale
        gauge.scaleStartAngle = 0;
        gauge.scaleEndAngle = 360;
        gauge.scaleBrush = '#e0dfdf';
        gauge.scaleOversweepShape = RadialGaugeScaleOversweepShape.Circular;
        gauge.scaleSweepDirection = SweepDirection.Clockwise;
        gauge.scaleEndExtent = 0.7;
        gauge.scaleStartExtent = 0.6;

        // setting appearance of major/minor ticks
        gauge.minorTickCount = 4;
        gauge.minorTickStartExtent = gauge.scaleEndExtent + 0.0;
        gauge.minorTickEndExtent   = gauge.scaleEndExtent + 0.025;
        gauge.minorTickStrokeThickness = 1;
        gauge.minorTickBrush = 'transparent';
        gauge.tickStartExtent = gauge.scaleEndExtent + 0.0;
        gauge.tickEndExtent   = gauge.scaleEndExtent + 0.05;
        gauge.tickStrokeThickness = 1;
        gauge.tickBrush = '#79797a';

        // setting appearance of backing dial
        gauge.backingBrush = 'transparent';
        gauge.backingOutline = 'transparent';
        gauge.backingShape = RadialGaugeBackingShape.Circular;

        // setting custom gauge ranges
        const range = new IgcRadialGaugeRangeComponent();
        range.startValue = 0;
        range.endValue = gauge.value;
        range.brush   = '#1e90ff';
        range.outline = '#1e90ff';
        range.innerStartExtent = gauge.scaleStartExtent;
        range.innerEndExtent   = gauge.scaleStartExtent;
        range.outerStartExtent = gauge.scaleEndExtent;
        range.outerEndExtent   = gauge.scaleEndExtent;

        gauge.ranges.add(range);

    }
}

let sample = new RadialGaugeTypeColumn();