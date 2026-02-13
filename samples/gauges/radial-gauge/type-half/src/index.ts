import { IgcRadialGaugeModule } from 'igniteui-webcomponents-gauges';
import { IgcRadialGaugeComponent } from 'igniteui-webcomponents-gauges';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { SweepDirection } from 'igniteui-webcomponents-core';
import { RadialGaugeBackingShape } from 'igniteui-webcomponents-gauges';
import { RadialGaugeNeedleShape } from 'igniteui-webcomponents-gauges';
import { RadialGaugePivotShape } from 'igniteui-webcomponents-gauges';
import { IgcRadialGaugeRangeComponent } from 'igniteui-webcomponents-gauges';

ModuleManager.register(IgcRadialGaugeModule);

export class RadialGaugeTypeHalf {

    private gauge: IgcRadialGaugeComponent;

    constructor() {

        this.gauge = document.getElementById('gauge') as IgcRadialGaugeComponent;

        this.renderGauge(this.gauge);
    }

    public renderGauge(gauge: IgcRadialGaugeComponent) {

        gauge.transitionDuration = 0;

        gauge.minimumValue = 100;
        gauge.maximumValue = 200;
        gauge.value = 125;

        // Scale Settings
        gauge.scaleStartAngle = 180;
        gauge.scaleEndAngle = 0;
        gauge.scaleBrush = 'transparent';
        gauge.scaleSweepDirection = SweepDirection.Clockwise;

        // Backing Settings
        gauge.backingOutline = 'white';
        gauge.backingBrush = 'white';
        gauge.backingShape = RadialGaugeBackingShape.Fitted;

        // Needle Settings
        gauge.needleEndExtent = 0.8;
        gauge.needleShape = RadialGaugeNeedleShape.Triangle;
        gauge.needlePivotShape = RadialGaugePivotShape.CircleOverlay;
        gauge.needlePivotWidthRatio = 0.1;
        gauge.needleBrush = '#79797a';
        gauge.needleOutline = '#79797a';
        gauge.needlePivotBrush = '#79797a';
        gauge.needlePivotOutline = '#79797a';

        // TickMark Settings
        gauge.tickBrush = 'transparent';
        gauge.minorTickBrush = 'transparent';

        // Label Settings
        gauge.labelInterval = 20;
        gauge.labelExtent = 0.935;
        gauge.font = '13px Verdana,Arial';

        // setting custom gauge ranges
        const range1 = new IgcRadialGaugeRangeComponent();
        range1.startValue = 100;
        range1.endValue = 150;
        const range2 = new IgcRadialGaugeRangeComponent();
        range2.startValue = 150;
        range2.endValue = 200;

        gauge.rangeBrushes  = [ '#32f845', '#bf32f8' ];
        gauge.rangeOutlines = [ '#32f845', '#bf32f8' ];
        gauge.ranges.clear();
        gauge.ranges.add(range1);
        gauge.ranges.add(range2);

        // setting extent of all gauge ranges
        for (let i = 0; i < gauge.ranges.count; i++) {
            const range = gauge.ranges.item(i);
            range.innerStartExtent = 0.3;
            range.innerEndExtent = 0.3;
            range.outerStartExtent = 0.875;
            range.outerEndExtent = 0.875;
        }
    }
}

export function initialize() {
  return new RadialGaugeTypeHalf();
}