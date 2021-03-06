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

export class RadialGaugeTypeRing {

    private gauge: IgcRadialGaugeComponent;

    constructor() {

        this.gauge = document.getElementById('gauge') as IgcRadialGaugeComponent;
        this.renderGauge(this.gauge);
    }

    public renderGauge(gauge: IgcRadialGaugeComponent) {

        gauge.minimumValue = 0;
        gauge.maximumValue = 120;
        gauge.interval = 10;
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
        // gauge.scaleBrush = '#e0dfdf';
        gauge.scaleBrush = 'transparent';
        gauge.scaleOversweepShape = RadialGaugeScaleOversweepShape.Circular;
        gauge.scaleSweepDirection = SweepDirection.Clockwise;
        gauge.scaleEndExtent = 0.725;
        gauge.scaleStartExtent = 0.6;

        // setting appearance of major/minor ticks
        gauge.minorTickCount = 4;
        gauge.minorTickStartExtent = gauge.scaleEndExtent + 0.0;
        gauge.minorTickEndExtent   = gauge.scaleEndExtent + 0.0125;
        gauge.minorTickStrokeThickness = 1;
        gauge.minorTickBrush = 'transparent';
        gauge.tickStartExtent = gauge.scaleEndExtent + 0.0;
        gauge.tickEndExtent   = gauge.scaleEndExtent + 0.025;
        gauge.tickStrokeThickness = 1;
        gauge.tickBrush = '#79797a';

        // setting appearance of backing dial
        gauge.backingBrush = 'transparent';
        gauge.backingOutline = 'transparent';
        gauge.backingShape = RadialGaugeBackingShape.Circular;

        // adding rings using multiple gauge ranges
        this.addRing(gauge, 90, gauge.scaleEndExtent - 0.0, '#10b401');
        this.addRing(gauge, 80, gauge.scaleEndExtent - 0.1, '#fdb417');
        this.addRing(gauge, 60, gauge.scaleEndExtent - 0.2, '#ff0000');
    }

    public addRing(gauge: IgcRadialGaugeComponent, value: number, extent: number, color: string) {

        const rangeBG = new IgcRadialGaugeRangeComponent();
        rangeBG.startValue = gauge.minimumValue;
        rangeBG.endValue = gauge.maximumValue;
        rangeBG.brush   = '#e0dfdf';
        rangeBG.outline = '#e0dfdf';
        rangeBG.innerStartExtent = extent - 0.09;
        rangeBG.innerEndExtent   = extent - 0.09;
        rangeBG.outerStartExtent = extent;
        rangeBG.outerEndExtent   = extent;
        gauge.ranges.add(rangeBG);

        const rangeVal = new IgcRadialGaugeRangeComponent();
        rangeVal.startValue = gauge.minimumValue;
        rangeVal.endValue = value;
        rangeVal.brush   = color;
        rangeVal.outline = color;
        rangeVal.innerStartExtent = extent - 0.09;
        rangeVal.innerEndExtent   = extent - 0.09;
        rangeVal.outerStartExtent = extent;
        rangeVal.outerEndExtent   = extent;
        gauge.ranges.add(rangeVal);
    }
}

new RadialGaugeTypeRing();
